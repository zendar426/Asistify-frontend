import { IS_PROD } from '@/utils/config'
import type { Document } from '../models/document.model'
import type { DocumentRepository } from '../repository/DocumentRepository'
import { DocumentRepositoryApi } from '../repository/DocumentRepositoryApi'
import { DocumentRepositoryLocal } from '../repository/DocumentRepositoryLocal'

export class DocumentService {
    private static instance: DocumentService
    private readonly repository: DocumentRepository

    private constructor() {
        this.repository = IS_PROD
            ? DocumentRepositoryApi.getInstance()
            : DocumentRepositoryLocal.getInstance()
    }

    public static getInstance(): DocumentService {
        if (!DocumentService.instance) {
            DocumentService.instance = new DocumentService()
        }
        return DocumentService.instance
    }

    async createDocument(file: File): Promise<Document> {
        return this.repository.create({ file })
    }

    async getAllDocuments(params: {
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
        return this.repository.findAll(params)
    }

    async getDocumentById(documentId: string): Promise<Document> {
        return this.repository.findOne({ documentId })
    }

    async deleteDocument(documentId: string): Promise<Document> {
        return this.repository.delete({ documentId })
    }

    async downloadDocument(documentId: string): Promise<Blob> {
        return this.repository.download({ documentId })
    }
}
