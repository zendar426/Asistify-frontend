<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  upload: [file: File]
}>()

const selectedFile = ref<File | null>(null)
const isDragging = ref(false)

const acceptedFormats = ['.pdf', '.txt', '.md']

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0]
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (acceptedFormats.includes(extension)) {
      selectedFile.value = file
    }
  }
}

const handleUpload = () => {
  if (selectedFile.value) {
    emit('upload', selectedFile.value)
    selectedFile.value = null
  }
}

const handleCancel = () => {
  selectedFile.value = null
  emit('close')
}

const formatFileSize = (bytes: number) => {
  const mb = bytes / 1024 / 1024
  return mb < 1 ? `${(bytes / 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`
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
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleCancel"
      >
        <div class="fixed inset-0 bg-black/40" @click="handleCancel" />

        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="relative bg-white rounded-lg shadow-xl max-w-lg w-full z-10"
            @click.stop
          >
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Agregar Documento</h3>

              <div
                class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
                :class="
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                "
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <input
                  type="file"
                  :accept="acceptedFormats.join(',')"
                  class="hidden"
                  id="file-upload"
                  @change="handleFileSelect"
                />

                <label
                  for="file-upload"
                  class="cursor-pointer flex flex-col items-center justify-center"
                >
                  <svg
                    class="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p class="text-sm text-gray-600 mb-1">
                    <span class="font-medium text-blue-600 hover:text-blue-700"
                      >Haz clic para seleccionar</span
                    >
                    o arrastra y suelta
                  </p>
                  <p class="text-xs text-gray-500">PDF, TXT o Markdown (máx. 50MB)</p>
                </label>
              </div>

              <div v-if="selectedFile" class="mt-4 p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ selectedFile.name }}
                      </p>
                      <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
                    </div>
                  </div>
                  <button
                    @click="selectedFile = null"
                    class="ml-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-6 flex gap-3 justify-end">
                <BaseButton variant="outline" size="md" @click="handleCancel">
                  Cancelar
                </BaseButton>
                <BaseButton
                  variant="primary"
                  size="md"
                  :disabled="!selectedFile"
                  @click="handleUpload"
                >
                  Subir Documento
                </BaseButton>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
