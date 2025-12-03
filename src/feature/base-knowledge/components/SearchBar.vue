<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

interface FilterOptions {
  documentTypes: { value: string; label: string }[]
  sizeOptions: { value: number; label: string }[]
}

interface Props {
  filterOptions: FilterOptions
}

defineProps<Props>()

const emit = defineEmits<{
  search: [query: string]
  filter: [filters: { documentTypeId?: string; size?: number }]
  addDocument: []
}>()

const searchQuery = ref('')
const selectedType = ref<string>('')
const selectedSize = ref<number | undefined>(undefined)
const showFilters = ref(false)

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleFilter = () => {
  emit('filter', {
    documentTypeId: selectedType.value || undefined,
    size: selectedSize.value,
  })
}

const clearFilters = () => {
  selectedType.value = ''
  selectedSize.value = undefined
  handleFilter()
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 space-y-4">
    <div class="flex gap-3">
      <div class="flex-1 relative flex items-center">
        <svg
          class="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none"
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
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar documentos por nombre..."
          class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          @input="handleSearch"
        />
      </div>
      <BaseButton
        variant="outline"
        size="md"
        @click="showFilters = !showFilters"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtros
      </BaseButton>
      <BaseButton
        variant="primary"
        size="md"
        @click="emit('addDocument')"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Agregar Documento
      </BaseButton>
    </div>

    <Transition
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showFilters" class="flex gap-3 pt-2 border-t">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
          <select
            v-model="selectedType"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            @change="handleFilter"
          >
            <option value="">Todos los tipos</option>
            <option
              v-for="type in filterOptions.documentTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tamaño Máximo (MB)</label>
          <select
            v-model="selectedSize"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            @change="handleFilter"
          >
            <option :value="undefined">Sin límite</option>
            <option
              v-for="size in filterOptions.sizeOptions"
              :key="size.value"
              :value="size.value"
            >
              {{ size.label }}
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <BaseButton
            variant="outline"
            size="md"
            @click="clearFilters"
          >
            Limpiar filtros
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

