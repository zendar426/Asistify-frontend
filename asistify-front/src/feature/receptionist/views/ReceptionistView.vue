<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ReceptionistCard from '../components/ReceptionistCard.vue'
import { useReceptionistStore } from '@/feature/receptionist/stores/ReceptionistStore'
import { ToastType, useToastStore } from '@/stores/ToastStore'
import { ReceptionistService } from '../service/ReceptionistService'
import BaseSpinner from '@/components/BaseSpinner.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { sleep } from '@/utils/sleep'
import { useRouter } from 'vue-router'


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

/** Refs */
const loading = ref(true)
const showDeleteModal = ref(false)
const receptionistToDelete = ref<string | null>(null)

const fetchReceptionists = async () => {
  const result = await receptionistService.findAll();
  // result.success ? loading.value = false : toastStore.addToast(result.type, result.message)

  await sleep(500)
  loading.value = false; // TODO: remove on integration
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
  
  // TODO: Call delete API
  console.log('Delete receptionist:', receptionistToDelete.value)
  // await receptionistService.delete(receptionistToDelete.value)
  // await fetchReceptionists()
  
  toastStore.addToast(ToastType.success, 'Recepcionista eliminado exitosamente')
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
          <h1 class="text-3xl font-bold text-gray-900">Recepcionistas</h1>
          <p class="text-gray-600 mt-2">Gestiona tus recepcionistas virtuales</p>
        </div>
        <div class="flex items-center">
          <!-- Mobile: Icon only -->
          <BaseButton 
            icon="fa-solid fa-plus" 
            variant="icon" 
            size="md" 
            @click="handleAddReceptionist"
            class="md:hidden"
          />
          <!-- Desktop: Full text -->
          <BaseButton 
            icon="fa-solid fa-plus" 
            variant="primary" 
            size="md" 
            @click="handleAddReceptionist"
            class="hidden md:flex"
          >
            Agregar Recepcionista
          </BaseButton>
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
            :phone-number="receptionist.phoneNumber"
            :avatar="receptionist.avatar"
            :formality-level="receptionist.formalityLevel"
            :dynamism-level="receptionist.dynamismLevel"
            :appointment-max-days="receptionist.appointmentMaxDays"
            :appointment-min-days="receptionist.appointmentMinDays"
            @delete="handleDeleteReceptionist"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-1 flex-col items-center justify-center text-center py-12">
          <div class="text-gray-400 mb-4">
            <font-awesome-icon icon="fa-solid fa-users" size="2xl" />
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay recepcionistas</h3>
          <p class="text-gray-500 mb-6">Comienza agregando tu primer recepcionista virtual</p>
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
