<script setup lang="ts">
import { computed } from 'vue'
import type { Document } from '../models/document.model'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  isOpen: boolean
  document: Document | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  download: [documentId: string, fileName: string]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatSize = (size: string) => {
  const sizeNum = parseFloat(size)
  if (sizeNum < 1) {
    return `${(sizeNum * 1024).toFixed(0)} KB`
  }
  return `${sizeNum.toFixed(2)} MB`
}

const fileIcon = computed(() => {
  if (!props.document) return '📄'
  const icons: Record<string, string> = {
    pdf: '📄',
    txt: '📝',
    md: '📋',
    doc: '📃',
    docx: '📃',
  }
  return icons[props.document.extension_content.toLowerCase()] || '📄'
})

const downloadDocument = () => {
  if (props.document) {
    emit('download', props.document.id, props.document.original_name)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && document"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div class="fixed inset-0 bg-black/40" @click="emit('close')" />

        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen && document"
            class="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden z-10"
            @click.stop
          >
            <div class="flex flex-col h-full max-h-[90vh]">
              <div class="flex items-center justify-between p-6 border-b bg-gray-50">
                <div class="flex items-center gap-4 flex-1 min-w-0">
                  <div class="text-4xl">{{ fileIcon }}</div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-semibold text-gray-900 truncate">
                      {{ document.original_name }}
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ formatSize(document.size) }} • {{ document.extension_content.toUpperCase() }}
                    </p>
                  </div>
                </div>
                <button
                  @click="emit('close')"
                  class="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex-1 overflow-y-auto p-6">
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <p class="text-sm text-gray-600 mb-1">ID del Documento</p>
                      <p class="font-mono text-sm text-gray-900 break-all">{{ document.id }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <p class="text-sm text-gray-600 mb-1">Tipo de Documento</p>
                      <p class="font-medium text-gray-900">{{ document.document_type_id }}</p>
                    </div>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-600 mb-1">Nombre Interno</p>
                    <p class="font-medium text-gray-900">{{ document.name }}</p>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-600 mb-1">Ruta del Archivo</p>
                    <p class="font-mono text-sm text-gray-900 break-all">
                      {{ document.file_path }}
                    </p>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <p class="text-sm text-gray-600 mb-1">Fecha de Creación</p>
                      <p class="text-sm text-gray-900">{{ formatDate(document.created_at) }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <p class="text-sm text-gray-600 mb-1">Última Actualización</p>
                      <p class="text-sm text-gray-900">{{ formatDate(document.updated_at) }}</p>
                    </div>
                  </div>

                  <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div class="flex items-start gap-3">
                      <svg
                        class="w-5 h-5 text-blue-600 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-blue-900">
                          Información del Documento
                        </p>
                        <p class="text-sm text-blue-700 mt-1">
                          Este documento ha sido procesado y dividido en chunks para su uso en el
                          sistema RAG. Puedes ver los chunks generados usando el botón
                          correspondiente en la lista de documentos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 justify-end p-6 border-t bg-gray-50">
                <BaseButton variant="outline" size="md" @click="downloadDocument">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Descargar
                </BaseButton>
                <BaseButton variant="primary" size="md" @click="emit('close')">
                  Cerrar
                </BaseButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
