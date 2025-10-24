<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Document } from '../models/document.model'
import type { DocumentChunkModel } from '../models/document-chunk.model'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  isOpen: boolean
  document: Document | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const selectedChunk = ref<DocumentChunkModel | null>(null)
const searchQuery = ref('')

const chunks = computed(() => {
  if (!props.document) return []
  return props.document.chunks
})

const filteredChunks = computed(() => {
  if (!searchQuery.value) return chunks.value

  const query = searchQuery.value.toLowerCase()
  return chunks.value.filter(
    (chunk) =>
      chunk.content.toLowerCase().includes(query) ||
      chunk.sectionTitle.toLowerCase().includes(query) ||
      chunk.keywords.some((k: string) => k.toLowerCase().includes(query)),
  )
})

const selectChunk = (chunk: DocumentChunkModel) => {
  selectedChunk.value = selectedChunk.value?.id === chunk.id ? null : chunk
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
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
            class="relative bg-white rounded-lg shadow-xl max-w-6xl w-full h-[90vh] overflow-hidden z-10"
            @click.stop
          >
            <div class="flex flex-col h-full">
              <div class="flex items-center justify-between p-6 border-b bg-gray-50">
                <div class="flex items-center gap-4">
                  <div class="text-3xl">{{ fileIcon }}</div>
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900">
                      Chunks del Documento
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ document.original_name }} • {{ chunks.length }} chunks
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

              <div class="p-6 border-b">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar en chunks por contenido, título o palabras clave..."
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex-1 overflow-hidden">
                <div class="grid grid-cols-2 h-full">
                  <div class="border-r overflow-y-auto p-4">
                    <div v-if="filteredChunks.length === 0" class="text-center py-8">
                      <p class="text-gray-500">No se encontraron chunks</p>
                    </div>
                    <div v-else class="space-y-2">
                      <button
                        v-for="chunk in filteredChunks"
                        :key="chunk.id"
                        @click="selectChunk(chunk)"
                        :class="[
                          'w-full text-left p-4 rounded-lg border-2 transition-all',
                          selectedChunk?.id === chunk.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                        ]"
                      >
                        <div class="flex items-start justify-between gap-2">
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <span class="text-xs font-medium text-gray-500">
                                Chunk #{{ chunk.index + 1 }}
                              </span>
                              <span
                                :class="[
                                  'text-xs px-2 py-0.5 rounded-full',
                                  selectedChunk?.id === chunk.id
                                    ? 'bg-blue-200 text-blue-800'
                                    : 'bg-gray-200 text-gray-700',
                                ]"
                              >
                                {{ chunk.keywords.length }} keywords
                              </span>
                            </div>
                            <p class="text-sm font-medium text-gray-900 mb-1">
                              {{ chunk.sectionTitle }}
                            </p>
                            <p class="text-xs text-gray-600 line-clamp-2">
                              {{ chunk.content }}
                            </p>
                          </div>
                          <svg
                            v-if="selectedChunk?.id === chunk.id"
                            class="w-5 h-5 text-blue-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div class="overflow-y-auto p-6 bg-gray-50">
                    <div v-if="!selectedChunk" class="flex items-center justify-center h-full">
                      <div class="text-center">
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                          />
                        </svg>
                        <p class="text-gray-500">
                          Selecciona un chunk de la lista para ver su contenido completo
                        </p>
                      </div>
                    </div>
                    <div v-else class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <h4 class="text-lg font-semibold text-gray-900">
                            {{ selectedChunk.sectionTitle }}
                          </h4>
                          <p class="text-sm text-gray-600">Chunk #{{ selectedChunk.index + 1 }}</p>
                        </div>
                        <BaseButton
                          variant="outline"
                          size="sm"
                          @click="copyToClipboard(selectedChunk.content)"
                        >
                          <svg
                            class="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Copiar
                        </BaseButton>
                      </div>

                      <div class="bg-white p-4 rounded-lg border">
                        <p class="text-sm text-gray-900 whitespace-pre-line leading-relaxed">
                          {{ selectedChunk.content }}
                        </p>
                      </div>

                      <div class="bg-white p-4 rounded-lg border">
                        <p class="text-sm font-medium text-gray-700 mb-2">Palabras Clave:</p>
                        <div class="flex flex-wrap gap-2">
                          <span
                            v-for="keyword in selectedChunk.keywords"
                            :key="keyword"
                            class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {{ keyword }}
                          </span>
                        </div>
                      </div>

                      <div class="bg-white p-4 rounded-lg border">
                        <p class="text-sm font-medium text-gray-700 mb-2">Información Técnica:</p>
                        <div class="space-y-1 text-sm text-gray-600">
                          <p><span class="font-medium">ID:</span> {{ selectedChunk.id }}</p>
                          <p><span class="font-medium">Índice:</span> {{ selectedChunk.index }}</p>
                          <p>
                            <span class="font-medium">Longitud:</span>
                            {{ selectedChunk.content.length }} caracteres
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 justify-end p-6 border-t bg-gray-50">
                <BaseButton variant="primary" size="md" @click="emit('close')"> Cerrar </BaseButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
