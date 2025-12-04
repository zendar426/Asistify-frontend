import type { Document } from '../models/document.model'

export interface DocumentRepository {
    create(params: { file: File }): Promise<Document>
    findAll(params: {
        pageNumber?: number
        limit?: number
        name?: string
        documentTypeId?: string
        size?: number
    }): Promise<{
        data: Document[]
        metadata: {
            limit: number
            actualPage: number
            nextPage: number | null
            totalPages: number
        }
    }>
    findOne(params: { documentId: string }): Promise<Document>
    delete(params: { documentId: string }): Promise<Document | null>
    download(params: { documentId: string }): Promise<Blob>
}
