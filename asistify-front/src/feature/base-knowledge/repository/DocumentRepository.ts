import type { Document } from "../models/document.model";

export interface DocumentRepository {
  create(params: {enterpriseId: string, file: File}): Promise<Document>;
  findAll(params: {enterpriseId: string, pageNumber?: number, limit?: number, name?: string, documentTypeId?: string, size?: number}): Promise<Document[]>
  findOne(params: {enterpriseId: string, documentId: string}): Promise<Document>;
  delete(params: {enterpriseId: string, documentId: string}): Promise<Document>;
  download(params: {enterpriseId: string, documentId: string}): Promise<Blob>;
}
