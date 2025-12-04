import { API_ROUTE } from '@/utils/config'
import { logger } from '@/utils/logger'
import type { DocumentRepository } from './DocumentRepository'
import { Document } from '../models/document.model'
import { DocumentChunkModel } from '../models/document-chunk.model'
import { api } from '@/api/axios'

interface ChunkResponse {
    id: string
    index: number
    content: string
    keywords: string[]
    sectionTitle: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>
    createdAt: string
    enterpriseId: string
    documentId: string
}

interface DocumentResponse {
    id: string
    originalName: string
    extensionContent: string
    size: string
    filePath: string
    name: string
    documentTypeId: string
    enterpriseId: string
    createdAt: string
    updatedAt: string
    chunkCount?: number
    chunks?: ChunkResponse[]
}

export class DocumentRepositoryApi implements DocumentRepository {
    private static instance: DocumentRepositoryApi

    private constructor() {}

    public static getInstance(): DocumentRepositoryApi {
        if (!DocumentRepositoryApi.instance) {
            DocumentRepositoryApi.instance = new DocumentRepositoryApi()
        }
        return DocumentRepositoryApi.instance
    }

    private parseChunks(chunks?: ChunkResponse[]): DocumentChunkModel[] {
        if (!chunks || chunks.length === 0) return []

        return chunks.map(
            (chunk) =>
                new DocumentChunkModel(
                    chunk.id,
                    chunk.index,
                    chunk.content,
                    chunk.keywords,
                    chunk.sectionTitle ?? '',
                    chunk.metadata,
                    chunk.createdAt,
                    chunk.enterpriseId,
                    chunk.documentId,
                ),
        )
    }

    private parseDocument(data: DocumentResponse): Document {
        // Map backend properties to frontend expectations
        const sizeMb =
            typeof data.size === 'number' ? (data.size / (1024 * 1024)).toFixed(2) : data.size
        const chunksCount = data.chunkCount ?? (data.chunks ? data.chunks.length : 0)
        const createdAt = data.createdAt
            ? new Date(data.createdAt).toISOString()
            : new Date().toISOString()
        const updatedAt = data.updatedAt
            ? new Date(data.updatedAt).toISOString()
            : new Date().toISOString()
        return new Document(
            data.id,
            data.originalName,
            chunksCount,
            data.extensionContent,
            sizeMb,
            data.filePath,
            data.name,
            data.documentTypeId,
            data.enterpriseId,
            createdAt,
            updatedAt,
            this.parseChunks(data.chunks),
        )
    }

    async create(params: { enterpriseId: string; file: File }): Promise<Document> {
        const formData = new FormData()
        formData.append('file', params.file)
        formData.append('enterprise_id', params.enterpriseId)

        try {
            const response = await api.post(`${API_ROUTE}/documents/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            logger.info('[CREATE_DOCUMENT]', 'response:', response)

            if (response.status === 201) {
                return this.parseDocument(response.data)
            }

            throw new Error('Error al crear el documento')
        } catch (error) {
            logger.error('[CREATE_DOCUMENT]', error)
            throw error
        }
    }

    async findAll(_params: {
        enterpriseId: string
        pageNumber?: number
        limit?: number
        name?: string
        documentTypeId?: string
        size?: number
    }): Promise<{
        data: Document[]
        metadata: { limit: number; actualPage: number; nextPage: number | null; totalPages: number }
    }> {
        try {
            const response = await api.get(`${API_ROUTE}/documents`)

            logger.info('[GET_DOCUMENTS]', 'response:', response)

            if (response.status === 200) {
                return {
                    data: response.data.data.map((doc: DocumentResponse) =>
                        this.parseDocument(doc),
                    ),
                    metadata: response.data.metadata,
                }
            }

            return { data: [], metadata: { limit: 0, actualPage: 0, nextPage: 0, totalPages: 0 } }
        } catch (error) {
            logger.error('[GET_DOCUMENTS]', error)
            throw error
        }
    }

    async findOne(params: { enterpriseId: string; documentId: string }): Promise<Document> {
        try {
            const response = await api.get(
                `${API_ROUTE}/documents/${params.documentId}?enterprise_id=${params.enterpriseId}`,
            )

            logger.info('[GET_DOCUMENT]', 'response:', response)

            if (response.status === 200) {
                return this.parseDocument(response.data)
            }

            throw new Error('Documento no encontrado')
        } catch (error) {
            logger.error('[GET_DOCUMENT]', error)
            throw error
        }
    }

    async delete(params: { documentId: string }): Promise<Document | null> {
        try {
            const response = await api.delete(`${API_ROUTE}/documents/${params.documentId}`)

            logger.info('[DELETE_DOCUMENT]', 'response:', response)

            if (response.status === 200 || response.status === 204) {
                // Si la API responde sin datos, simplemente retorna un objeto vacío o null
                return response.data ? this.parseDocument(response.data) : null
            }

            throw new Error('Error al eliminar el documento')
        } catch (error) {
            logger.error('[DELETE_DOCUMENT]', error)
            throw error
        }
    }

    async download(params: { documentId: string }): Promise<Blob> {
        try {
            const response = await api.get(`${API_ROUTE}/documents/${params.documentId}/download`, {
                responseType: 'blob',
            })

            logger.info('[DOWNLOAD_DOCUMENT]', 'response:', response)

            if (response.status === 200) {
                return response.data
            }

            throw new Error('Error al descargar el documento')
        } catch (error) {
            logger.error('[DOWNLOAD_DOCUMENT]', error)
            throw error
        }
    }
}
