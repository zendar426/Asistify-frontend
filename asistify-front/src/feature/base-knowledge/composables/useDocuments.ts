import { ref, computed } from 'vue'
import { useDocumentStore } from '../stores/DocumentStore'
import { DocumentService } from '../service/DocumentService'
import { useToastStore, ToastType } from '@/stores/ToastStore'

export const useDocuments = () => {
    const documentStore = useDocumentStore()
    const toastStore = useToastStore()
    const documentService = DocumentService.getInstance()

    const isLoading = computed(() => documentStore.isLoading)
    const documents = computed(() => documentStore.documents)
    const totalDocuments = computed(() => documentStore.totalDocuments)
    const totalChunks = computed(() => documentStore.totalChunks)
    const totalSize = computed(() => documentStore.totalSize)
    const chunksTrend = computed(() => documentStore.chunksTrend)

    const searchQuery = ref('')
    const documentTypeFilter = ref<string>('')
    const sizeFilter = ref<number | undefined>(undefined)

    const filteredDocuments = computed(() => {
        let result = documents.value

        if (searchQuery.value) {
            result = result.filter((doc) =>
                doc.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
            )
        }

        if (documentTypeFilter.value) {
            result = result.filter((doc) => {
                return (
                    typeof doc.documentTypeId === 'string' &&
                    doc.documentTypeId.trim() === documentTypeFilter.value.trim()
                )
            })
        }

        if (sizeFilter.value) {
            result = result.filter((doc) => parseFloat(doc.size) <= sizeFilter.value!)
        }

        return result
    })

    const loadDocuments = async (enterpriseId: string) => {
        try {
            documentStore.setLoading(true)
            const { data, metadata } = await documentService.getAllDocuments({ enterpriseId })
            documentStore.setDocuments(data)
            documentStore.setTotalDocumentsCount(metadata.totalPages)

            const chunksCount = data.reduce((acc, doc) => acc + doc.chunksCount, 0)
            documentStore.setTotalChunks(chunksCount)

            // simulate with the previous month
            const previousMonthChunks = Math.round(chunksCount * 0.85)
            documentStore.setPreviousMonthChunks(previousMonthChunks)
        } catch {
            toastStore.addToast(ToastType.error, 'Error al cargar los documentos')
        } finally {
            documentStore.setLoading(false)
        }
    }

    const uploadDocument = async (file: File) => {
        let processingToastId: number | undefined

        try {
            documentStore.setLoading(true)

            processingToastId = toastStore.addToast(
                ToastType.info,
                'Procesando documento y generando chunks...',
                0,
            )

            const newDocument = await documentService.createDocument(file)
            documentStore.addDocument(newDocument)

            // recalculate total chunks after adding document
            const chunksCount = documentStore.documents.reduce(
                (acc, doc) => acc + doc.chunksCount,
                0,
            )
            documentStore.setTotalChunks(chunksCount)

            if (processingToastId !== undefined) {
                toastStore.removeToast(processingToastId)
            }

            toastStore.addToast(
                ToastType.success,
                'Documento procesado y chunks generados exitosamente',
                5000,
            )

            return newDocument
        } catch (error) {
            if (processingToastId !== undefined) {
                toastStore.removeToast(processingToastId)
            }
            toastStore.addToast(ToastType.error, 'Error al subir el documento')
            throw error
        } finally {
            documentStore.setLoading(false)
        }
    }

    const deleteDocument = async (documentId: string) => {
        let deletingToastId: number | undefined

        try {
            documentStore.setLoading(true)

            deletingToastId = toastStore.addToast(
                ToastType.warning,
                'Eliminando documento y chunks...',
                0,
            )

            await documentService.deleteDocument(documentId)
            documentStore.removeDocument(documentId)

            // recalculate total chunks after deleting document
            const chunksCount = documentStore.documents.reduce(
                (acc, doc) => acc + doc.chunksCount,
                0,
            )
            documentStore.setTotalChunks(chunksCount)

            if (deletingToastId !== undefined) {
                toastStore.removeToast(deletingToastId)
            }

            toastStore.addToast(ToastType.success, 'Documento y chunks eliminados exitosamente')
        } catch (error) {
            if (deletingToastId !== undefined) {
                toastStore.removeToast(deletingToastId)
            }
            toastStore.addToast(ToastType.error, 'Error al eliminar el documento')
            throw error
        } finally {
            documentStore.setLoading(false)
        }
    }

    const handleSearch = (query: string) => {
        searchQuery.value = query
    }

    const handleFilter = (filters: { documentTypeId?: string; size?: number }) => {
        documentTypeFilter.value = filters.documentTypeId || ''
        sizeFilter.value = filters.size
    }

    const downloadDocument = async (documentId: string, fileName: string) => {
        try {
            const blob = await documentService.downloadDocument(documentId)

            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toastStore.addToast(ToastType.success, 'Documento descargado exitosamente')
        } catch (error) {
            toastStore.addToast(ToastType.error, 'Error al descargar el documento')
            throw error
        }
    }

    return {
        isLoading,
        documents,
        filteredDocuments,
        totalDocuments,
        totalChunks,
        totalSize,
        chunksTrend,
        loadDocuments,
        uploadDocument,
        deleteDocument,
        downloadDocument,
        handleSearch,
        handleFilter,
    }
}
