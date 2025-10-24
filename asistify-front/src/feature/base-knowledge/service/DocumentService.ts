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

  async createDocument(enterpriseId: string, file: File): Promise<Document> {
    return this.repository.create({ enterpriseId, file })
  }

  async getAllDocuments(params: {
    enterpriseId: string
    pageNumber?: number
    limit?: number
    name?: string
    documentTypeId?: string
    size?: number
  }): Promise<Document[]> {
    return this.repository.findAll(params)
  }

  async getDocumentById(enterpriseId: string, documentId: string): Promise<Document> {
    return this.repository.findOne({ enterpriseId, documentId })
  }

  async deleteDocument(enterpriseId: string, documentId: string): Promise<Document> {
    return this.repository.delete({ enterpriseId, documentId })
  }

  async downloadDocument(enterpriseId: string, documentId: string): Promise<Blob> {
    return this.repository.download({ enterpriseId, documentId })
  }
}
