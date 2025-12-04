<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ReceptionistCard from '../components/ReceptionistCard.vue'
import { useReceptionistStore } from '@/feature/receptionist/stores/ReceptionistStore'
import { ToastType, useToastStore } from '@/stores/ToastStore'
import { ReceptionistService } from '../service/ReceptionistService'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useRouter } from 'vue-router'
import type { Result } from '@/utils/types'
import type { Receptionist } from '../models/Receptionist'
import { logger } from '@/utils/logger'


/**
 * Stores and Services
 */
const toastStore = useToastStore()
const router = useRouter()
const receptionistStore = useReceptionistStore()
const receptionistService = ReceptionistService.getInstance();

/**
 * Keeps data of receptionists updated
 */
const receptionists = computed(() => receptionistStore.receptionist)

const lastCreatedText = computed(() => {
  if (receptionists.value.length === 0) return 'N/A'
  
  const sorted = [...receptionists.value].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return dateB - dateA
  })

  const last = sorted[0]
  if (!last || !last.createdAt) return 'N/A'

  const date = new Date(last.createdAt)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffTime / (1000 * 60))

  if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`
  if (diffHours < 24) return `Hace ${diffHours} horas`
  if (diffDays === 1) return 'Ayer'
  return `Hace ${diffDays} días`
})

/** Refs */
const loading = ref(true)
const showDeleteModal = ref(false)
const receptionistToDelete = ref<string | null>(null)

const fetchReceptionists = async () => {
  const result = await receptionistService.findAll();
  result.success ? loading.value = false : toastStore.addToast(result.type, result.message)
}

const handleAddReceptionist = () => {
  router.push({ name: 'receptionistConfig' })
}

const handleDeleteReceptionist = (id: string) => {
  receptionistToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!receptionistToDelete.value) return
  
  const response: Result<Receptionist | void> = await receptionistService.delete(receptionistToDelete.value)
  toastStore.addToast(response.type, response.message)
  receptionistToDelete.value = null
}

const cancelDelete = () => {
  receptionistToDelete.value = null
}

/**
 * Fetch receptionists on component mount
 */
onMounted(() => {
  fetchReceptionists()
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
      <!-- Title and Add Button -->
      <div class="mb-8 flex justify-between gap-4">
        <div class="border-l-4 border-primary pl-4">
          <h1 class="text-3xl font-bold text-dark/90">Recepcionistas</h1>
          <p class="text-dark/80 mt-2">Gestiona tus recepcionistas virtuales</p>
        </div>
        <div class="flex items-center">
          <!-- Mobile: Icon only -->
          <BaseButton 
            icon="fa-solid fa-plus" 
            variant="icon" 
            size="md" 
            :onClick="handleAddReceptionist"
            class="md:hidden"
          />
          <!-- Desktop: Full text -->
          <BaseButton 
            icon="fa-solid fa-plus" 
            variant="primary" 
            size="md" 
            :onClick="handleAddReceptionist"
            class="hidden md:flex"
          >
            Agregar Recepcionista
          </BaseButton>
        </div>
        
      </div>

      <!-- Stats above the cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-dark/80 mb-1">Total Recepcionistas</p>
              <p class="text-3xl font-bold text-dark/90">{{ receptionists.length }}</p>
            </div>
            <div class="bg-primary/10 p-3 rounded-full">
              <font-awesome-icon icon="fa-solid fa-users" class="text-primary text-xl" />
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-dark/80 mb-1">Último agregado</p>
              <p class="text-sm font-semibold text-dark/90">{{ lastCreatedText }}</p>
            </div>
            <div class="bg-primary/10 p-3 rounded-full">
              <font-awesome-icon icon="fa-solid fa-clock" class="text-primary text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex flex-1 justify-center items-center">
        <BaseSpinner size="lg" />
      </div>

      <div v-else>
        <!-- Receptionists Grid -->
        <div v-if="receptionists.length > 0" class="space-y-4 mb-8">
          <ReceptionistCard
            v-for="receptionist in receptionists"
            :key="receptionist.id"
            :id="receptionist.id"
            :name="receptionist.name"
            :cellphone="receptionist.cellphone"
            :avatar="receptionist.avatar"
            :level-formality="receptionist.levelFormality"
            :level-dynamism="receptionist.levelDynamism"
            :anticipation-max-days="receptionist.anticipationMaxDays"
            :anticipation-min-days="receptionist.anticipationMinDays"
            @delete="handleDeleteReceptionist"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-1 flex-col items-center justify-center text-center py-12">
          <div class="text-dark/40 mb-4">
            <font-awesome-icon icon="fa-solid fa-users" size="2xl" />
          </div>
          <h3 class="text-xl font-semibold text-dark/80 mb-2">No hay recepcionistas</h3>
          <p class="text-dark/80 mb-6">Comienza agregando tu primer recepcionista virtual</p>
          <BaseButton icon="fa-solid fa-plus" variant="primary" size="lg" @click="handleAddReceptionist">
            Agregar Recepcionista
          </BaseButton>
        </div>
      </div>
      
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Eliminar Recepcionista"
      message="¿Estás seguro de que deseas eliminar este recepcionista? Esta acción no se puede deshacer."
      confirm-text="Eliminar"
      cancel-text="Cancelar"
      confirm-variant="danger"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="showDeleteModal = false"
    />
  </div>
</template>

<style scoped>

</style>
