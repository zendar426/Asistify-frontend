import { logger } from '@/utils/logger'
import type { DocumentRepository } from './DocumentRepository'
import { Document } from '../models/document.model'
import { DocumentChunkModel } from '../models/document-chunk.model'

const generateMockChunks = (documentId: string, count: number): DocumentChunkModel[] => {
  return Array.from({ length: count }, (_, i) => {
    const sectionTitles = ['Introducción', 'Desarrollo', 'Detalles Técnicos', 'Conclusión', 'Anexo']
    return new DocumentChunkModel(
      `chunk-${documentId}-${i + 1}`,
      i,
      `Este es el contenido del chunk ${i + 1}. Contiene información relevante extraída del documento que ha sido procesada y vectorizada para su uso en el sistema RAG. El contenido incluye contexto suficiente para responder preguntas específicas relacionadas con esta sección.`,
      ['documento', 'información', 'rag', 'contexto'].slice(0, Math.floor(Math.random() * 3) + 2),
      `${sectionTitles[Math.floor(Math.random() * sectionTitles.length)]} - Parte ${i + 1}`,
      { page: Math.floor(i / 3) + 1, position: (i % 3) + 1 },
      new Date().toISOString(),
      'enterprise-1',
      documentId,
    )
  })
}

const MOCK_DOCUMENTS: Document[] = [
  new Document(
    '1',
    'Manual de Usuario.pdf',
    'pdf',
    '2.5',
    '/documents/manual-usuario.pdf',
    'manual-usuario',
    'type-1',
    'enterprise-1',
    '2024-01-15T10:00:00Z',
    '2024-01-15T10:00:00Z',
    generateMockChunks('1', 12),
  ),
  new Document(
    '2',
    'Politicas de Seguridad.txt',
    'txt',
    '1.2',
    '/documents/politicas-seguridad.txt',
    'politicas-seguridad',
    'type-2',
    'enterprise-1',
    '2024-02-10T14:30:00Z',
    '2024-02-10T14:30:00Z',
    generateMockChunks('2', 8),
  ),
  new Document(
    '3',
    'Guia de Instalacion.md',
    'md',
    '0.8',
    '/documents/guia-instalacion.md',
    'guia-instalacion',
    'type-1',
    'enterprise-1',
    '2024-03-05T09:15:00Z',
    '2024-03-05T09:15:00Z',
    generateMockChunks('3', 15),
  ),
]

export class DocumentRepositoryLocal implements DocumentRepository {
  private static instance: DocumentRepositoryLocal
  private documents: Document[] = [...MOCK_DOCUMENTS]

  private constructor() {}

  public static getInstance(): DocumentRepositoryLocal {
    if (!DocumentRepositoryLocal.instance) {
      DocumentRepositoryLocal.instance = new DocumentRepositoryLocal()
    }
    return DocumentRepositoryLocal.instance
  }

  async create(params: { enterpriseId: string; file: File }): Promise<Document> {
    logger.info('[LOCAL_CREATE_DOCUMENT]', params)

    const documentId = `doc-${Date.now()}`
    const chunksCount = Math.floor(Math.random() * 10) + 5

    const newDocument = new Document(
      documentId,
      params.file.name,
      params.file.name.split('.').pop() || '',
      (params.file.size / 1024 / 1024).toFixed(2),
      `/documents/${params.file.name}`,
      params.file.name.replace(/\.[^/.]+$/, ''),
      'type-1',
      params.enterpriseId,
      new Date().toISOString(),
      new Date().toISOString(),
      generateMockChunks(documentId, chunksCount),
    )

    this.documents.push(newDocument)
    return newDocument
  }

  async findAll(params: {
    enterpriseId: string
    pageNumber?: number
    limit?: number
    name?: string
    documentTypeId?: string
    size?: number
  }): Promise<{ data: Document[]; metadata: { limit: number; actualPage: number; nextPage: number | null; totalPages: number } }> {
    logger.info('[LOCAL_GET_DOCUMENTS]', params)

    let filtered = this.documents.filter((doc) => doc.enterprise_id === params.enterpriseId)

    if (params.name) {
      filtered = filtered.filter((doc) =>
        doc.original_name.toLowerCase().includes(params.name!.toLowerCase()),
      )
    }

    if (params.documentTypeId) {
      filtered = filtered.filter((doc) => doc.document_type_id === params.documentTypeId)
    }

    if (params.size) {
      filtered = filtered.filter((doc) => parseFloat(doc.size) <= params.size!)
    }

    // Simulación de paginación y metadata
    const limit = params.limit ?? filtered.length
    const actualPage = params.pageNumber ?? 1
    const totalPages = Math.ceil(filtered.length / limit)
    const nextPage = actualPage < totalPages ? actualPage + 1 : null
    const paginated = filtered.slice((actualPage - 1) * limit, actualPage * limit)

    return {
      data: paginated,
      metadata: {
        limit,
        actualPage,
        nextPage,
        totalPages
      }
    }
  }

  async findOne(params: { enterpriseId: string; documentId: string }): Promise<Document> {
    logger.info('[LOCAL_GET_DOCUMENT]', params)

    const document = this.documents.find(
      (doc) => doc.id === params.documentId && doc.enterprise_id === params.enterpriseId,
    )

    if (!document) {
      throw new Error('Documento no encontrado')
    }

    return document
  }

  async delete(params: { enterpriseId: string; documentId: string }): Promise<Document> {
    logger.info('[LOCAL_DELETE_DOCUMENT]', params)

    const index = this.documents.findIndex(
      (doc) => doc.id === params.documentId && doc.enterprise_id === params.enterpriseId,
    )

    if (index === -1) {
      throw new Error('Documento no encontrado')
    }

    const deleted = this.documents[index]
    this.documents.splice(index, 1)

    if (!deleted) {
      throw new Error('Error al eliminar el documento')
    }

    return deleted
  }

  async download(params: { enterpriseId: string; documentId: string }): Promise<Blob> {
    logger.info('[LOCAL_DOWNLOAD_DOCUMENT]', params)

    const document = this.documents.find(
      (doc) => doc.id === params.documentId && doc.enterprise_id === params.enterpriseId,
    )

    if (!document) {
      throw new Error('Documento no encontrado')
    }

    const mockContent = `Contenido mock del documento: ${document.original_name}

Este es un archivo de ejemplo generado localmente para desarrollo.

Información del documento:
- ID: ${document.id}
- Nombre: ${document.original_name}
- Tipo: ${document.extension_content}
- Tamaño: ${document.size} MB
- Fecha de creación: ${document.created_at}

Este contenido es solo para propósitos de testing.
En producción, este archivo se descargará desde el servidor.`

    const blob = new Blob([mockContent], {
      type: this.getMimeType(document.extension_content)
    })

    return blob
  }

  private getMimeType(extension: string): string {
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      txt: 'text/plain',
      md: 'text/markdown',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream'
  }
}
