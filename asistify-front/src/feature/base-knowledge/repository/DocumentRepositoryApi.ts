import api from '@/utils/axios'
import { API_ROUTE } from '@/utils/config'
import { logger } from '@/utils/logger'
import type { DocumentRepository } from './DocumentRepository'
import { Document } from '../models/document.model'
import { DocumentChunkModel } from '../models/document-chunk.model'

interface ChunkResponse {
    id: string
    index: number
    content: string
    keywords: string[]
    section_title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>
    created_at: string
    enterprise_id: string
    document_id: string
}

interface DocumentResponse {
    id: string
    original_name: string
    extension_content: string
    size: string
    file_path: string
    name: string
    document_type_id: string
    enterprise_id: string
    created_at: string
    updated_at: string
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
          chunk.section_title,
          chunk.metadata,
          chunk.created_at,
          chunk.enterprise_id,
          chunk.document_id,
        ),
    )
  }

  private parseDocument(data: DocumentResponse): Document {
    return new Document(
      data.id,
      data.original_name,
      data.extension_content,
      data.size,
      data.file_path,
      data.name,
      data.document_type_id,
      data.enterprise_id,
      data.created_at,
      data.updated_at,
      this.parseChunks(data.chunks),
    )
  }

  async create(params: { enterpriseId: string; file: File }): Promise<Document> {
    const formData = new FormData()
    formData.append('file', params.file)
    formData.append('enterprise_id', params.enterpriseId)

    try {
      const response = await api.post(`${API_ROUTE}/documents`, formData, {
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

  async findAll(params: {
    enterpriseId: string
    pageNumber?: number
    limit?: number
    name?: string
    documentTypeId?: string
    size?: number
  }): Promise<Document[]> {
    try {
      const queryParams = new URLSearchParams({
          enterprise_id: params.enterpriseId,
          ...(params.pageNumber && { page: params.pageNumber.toString() }),
          ...(params.limit && { limit: params.limit.toString() }),
          ...(params.name && { name: params.name }),
          ...(params.documentTypeId && { document_type_id: params.documentTypeId }),
          ...(params.size && { size: params.size.toString() }),
      })

      const response = await api.get(`${API_ROUTE}/documents?${queryParams}`)

      logger.info('[GET_DOCUMENTS]', 'response:', response)

      if (response.status === 200) {
        return response.data.map((doc: DocumentResponse) => this.parseDocument(doc))
      }

      return []
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

  async delete(params: { enterpriseId: string; documentId: string }): Promise<Document> {
    try {
      const response = await api.delete(
          `${API_ROUTE}/documents/${params.documentId}?enterprise_id=${params.enterpriseId}`,
      )

      logger.info('[DELETE_DOCUMENT]', 'response:', response)

      if (response.status === 200) {
        return this.parseDocument(response.data)
      }

      throw new Error('Error al eliminar el documento')
    } catch (error) {
      logger.error('[DELETE_DOCUMENT]', error)
      throw error
    }
  }

  async download(params: { enterpriseId: string; documentId: string }): Promise<Blob> {
    try {
      const response = await api.get(
        `${API_ROUTE}/documents/${params.documentId}/download?enterprise_id=${params.enterpriseId}`,
        {
          responseType: 'blob',
        },
      )

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
