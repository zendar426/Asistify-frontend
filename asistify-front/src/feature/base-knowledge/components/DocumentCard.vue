<script setup lang="ts">
import type { Document } from '../models/document.model'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  document: Document
  chunksCount?: number
}

defineProps<Props>()

const emit = defineEmits<{
  view: [documentId: string]
  viewChunks: [documentId: string]
  delete: [documentId: string]
}>()

const getFileIcon = (extension?: string) => {
  const icons: Record<string, string> = {
    pdf: '📄',
    txt: '📝',
    md: '📋',
    doc: '📃',
    docx: '📃',
  }
  if (!extension) return '📄'
  if (typeof extension !== 'string') extension = String(extension)
  return icons[extension.toLowerCase()] || '📄'
}

const formatSize = (size: string) => {
  const sizeNum = parseFloat(size)
  if (sizeNum < 1) {
    return `${(sizeNum * 1024).toFixed(0)} KB`
  }
  return `${sizeNum.toFixed(2)} MB`
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Sin fecha'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Sin fecha'
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 border border-gray-200"
  >
    <div class="flex items-center gap-4">
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
          {{ getFileIcon(document.extension_content) }}
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-gray-900 truncate">
          {{ document.original_name || document.name }}
        </h3>
        <div class="mt-1 flex items-center gap-4 text-sm text-gray-600">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            {{ formatSize(document.size) }}
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            {{ chunksCount ?? 0 }} chunks
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatDate(document.created_at) }}
          </span>
        </div>
      </div>

      <div class="flex-shrink-0 flex items-center gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          @click="emit('view', document.id)"
          title="Ver documento"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </BaseButton>

        <BaseButton
          variant="outline"
          size="sm"
          @click="emit('viewChunks', document.id)"
          title="Ver chunks"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </BaseButton>

        <BaseButton
          variant="outline"
          size="sm"
          @click="emit('delete', document.id)"
          title="Eliminar documento"
          class="!text-red-600 hover:!bg-red-50"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
