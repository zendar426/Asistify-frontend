import { defineStore } from 'pinia'
import type { Document } from '../models/document.model'

interface DocumentState {
  documents: Document[]
  isLoading: boolean
  totalChunks: number
  previousMonthChunks: number
}

export const useDocumentStore = defineStore('document', {
  state: (): DocumentState => ({
    documents: [],
    isLoading: false,
    totalChunks: 0,
    previousMonthChunks: 0,
  }),

  getters: {
    totalDocuments: (state) => state.documents.length,

    totalSize: (state) =>
      state.documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0),

    documentsByType: (state) =>
      state.documents.reduce((acc, doc) => {
        acc[doc.document_type_id] = (acc[doc.document_type_id] || 0) + 1
        return acc
      }, {} as Record<string, number>),

    chunksTrend: (state) => {
      if (state.previousMonthChunks === 0) {
        return null
      }

      const difference = state.totalChunks - state.previousMonthChunks
      const percentageChange = (difference / state.previousMonthChunks) * 100

      return {
        value: Math.round(Math.abs(percentageChange)),
        isPositive: percentageChange >= 0
      }
    },
  },

  actions: {
    setDocuments(documents: Document[]) {
      this.documents = documents
    },

    addDocument(document: Document) {
      this.documents.push(document)
    },

    removeDocument(documentId: string) {
      this.documents = this.documents.filter((doc) => doc.id !== documentId)
    },

    updateDocument(document: Document) {
      const index = this.documents.findIndex((doc) => doc.id === document.id)
      if (index !== -1) {
        this.documents[index] = document
      }
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setTotalChunks(total: number) {
      this.totalChunks = total
    },

    setPreviousMonthChunks(total: number) {
      this.previousMonthChunks = total
    },
  },
})
