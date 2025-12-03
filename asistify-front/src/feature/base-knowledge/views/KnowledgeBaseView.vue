<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useDocuments } from '../composables/useDocuments'
import MetricCard from '../components/MetricCard.vue'
import SearchBar from '../components/SearchBarFixed.vue'
import DocumentCard from '../components/DocumentCard.vue'
import UploadDocumentModal from '../components/UploadDocumentModal.vue'
import ViewDocumentModal from '../components/ViewDocumentModal.vue'
import ViewChunksModal from '../components/ViewChunksModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'

const ENTERPRISE_ID = 'enterprise-1'

const {
  isLoading,
  filteredDocuments,
  totalDocuments,
  totalChunks,
  totalSize,
  loadDocuments,
  uploadDocument,
  deleteDocument,
  downloadDocument,
  handleSearch,
  handleFilter,
} = useDocuments()

const showUploadModal = ref(false)
const showDeleteModal = ref(false)
const showViewDocumentModal = ref(false)
const showViewChunksModal = ref(false)
const documentToDelete = ref<string | null>(null)

const selectedDocument = computed(() => {
  if (!documentToDelete.value && !showViewDocumentModal.value && !showViewChunksModal.value) {
    return null
  }
  const docId = documentToDelete.value || currentDocumentId.value
  return filteredDocuments.value.find((doc) => doc.id === docId) || null
})

const currentDocumentId = ref<string | null>(null)

const filterOptions = {
  documentTypes: [
    { value: '4fc9ff43-cfb7-4b3f-a1b2-01eeab4c7a29', label: 'General' },
    { value: 'd01d9195-875a-496e-a427-b97e28b66317', label: 'Especifico' },
    { value: '57d132bc-6c4a-48f2-9938-00c2d627af6a', label: 'Normativo' },
  ],
  sizeOptions: [
    { value: 1, label: 'Hasta 1 MB' },
    { value: 5, label: 'Hasta 5 MB' },
    { value: 10, label: 'Hasta 10 MB' },
    { value: 50, label: 'Hasta 50 MB' },
  ],
}

onMounted(() => {
  loadDocuments(ENTERPRISE_ID)
})

const handleUpload = async (file: File) => {
  await uploadDocument(file)
  showUploadModal.value = false
}

const handleDeleteClick = (documentId: string) => {
  documentToDelete.value = documentId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!documentToDelete.value) return;
  await deleteDocument(documentToDelete.value)
  showDeleteModal.value = false
  documentToDelete.value = null
}

const handleView = (documentId: string) => {
  currentDocumentId.value = documentId
  showViewDocumentModal.value = true
}

const handleViewChunks = (documentId: string) => {
  currentDocumentId.value = documentId
  showViewChunksModal.value = true
}

const closeViewModals = () => {
  showViewDocumentModal.value = false
  showViewChunksModal.value = false
  currentDocumentId.value = null
}

const handleDownload = async (fileName: string) => {
  if (!currentDocumentId.value) return
  await downloadDocument(currentDocumentId.value, fileName)
}
</script>

<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <div class="flex justify-between gap-4">
        <div class="border-l-4 border-primary pl-4">
          <h1 class="text-3xl font-bold text-gray-900">Base de Conocimiento</h1>
          <p class="text-gray-600 mt-2">Gestiona y organiza los documentos de tu organización</p>
        </div>
      </div>

      <div v-if="isLoading && totalDocuments === 0" class="flex justify-center py-12">
        <BaseSpinner />
      </div>

      <template v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Total de Documentos" :value="totalDocuments" icon="📚" />
          <MetricCard
            title="Total de Chunks"
            :value="totalChunks"
            icon="📄"
          />
          <MetricCard
            title="Tamaño Total"
            :value="`${totalSize.toFixed(2)} MB`"
            icon="💾"
          />
        </div>

        <SearchBar
          :filter-options="filterOptions"
          @search="handleSearch"
          @filter="handleFilter"
          @add-document="showUploadModal = true"
        />

        <div v-if="filteredDocuments.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay documentos</h3>
          <p class="mt-1 text-sm text-gray-500">
            Comienza agregando tu primer documento.
          </p>
        </div>

        <div v-else class="space-y-5">
          <DocumentCard
            v-for="document in filteredDocuments"
            :key="document.id"
            :document="document"
            :chunks-count="document.chunksCount"
            @view="handleView"
            @view-chunks="handleViewChunks"
            @delete="handleDeleteClick"
          />
        </div>
      </template>

      <UploadDocumentModal
        :is-open="showUploadModal"
        @close="showUploadModal = false"
        @upload="handleUpload"
      />

      <ViewDocumentModal
        :is-open="showViewDocumentModal"
        :document="selectedDocument"
        @close="closeViewModals"
        @download="handleDownload"
      />

      <ViewChunksModal
        :is-open="showViewChunksModal"
        :document="selectedDocument"
        @close="closeViewModals"
      />

      <ConfirmModal
        :is-open="showDeleteModal"
        title="Eliminar Documento"
        message="¿Estás seguro de que deseas eliminar este documento? Esta acción es irreversible y eliminará todos los chunks asociados. Ten en cuenta que generar este contenido tiene un costo."
        confirm-text="Eliminar"
        cancel-text="Cancelar"
        confirm-variant="danger"
        @confirm="confirmDelete"
        @cancel="showDeleteModal = false"
        @close="showDeleteModal = false"
      />
    </div>
  </div>
</template>
