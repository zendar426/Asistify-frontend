<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ReceptionistCard from '../components/ReceptionistCard.vue'
import { useReceptionistStore } from '@/feature/receptionist/stores/ReceptionistStore'
import { dummyReceptionists } from '../data/dummyData'
import { useToastStore } from '@/stores/ToastStore'
import { Receptionist } from '../models/Receptionist'
import { ReceptionistService } from '../service/ReceptionistService'

const toastStore = useToastStore()
const receptionistService = ReceptionistService.getInstance();


/**
 * Handle receptionists data source
 */
// const receptionists = computed(() => receptionistStore.receptionist)
const receptionists = dummyReceptionists;

const fetchReceptionists = async () => {
  const result = await receptionistService.findAll();
  if (!result.success) {
    toastStore.addToast(
      result.type,
      result.message,
    )
  }
}

const handleAddReceptionist = () => {
  // TODO: Implement add receptionist functionality
  console.log('Add new receptionist')
}

/**
 * Fetch receptionists on component mount
 */
onMounted(() => {
  fetchReceptionists()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Recepcionistas</h1>
        <p class="text-gray-600 mt-2">Gestiona tus recepcionistas virtuales</p>
      </div>

      <div>
        <!-- TODO: ADD LOADER -->
      </div>

      <div>
        <!-- Receptionists Grid -->
        <div class="space-y-4 mb-8">
          <ReceptionistCard
            v-for="receptionist in receptionists"
            :key="receptionist.id"
            :name="receptionist.name"
            :phone-number="receptionist.phoneNumber"
            :profile-picture="receptionist.profilePicture"
          />
        </div>

        <!-- Add New Receptionist Button -->
        <div class="flex justify-center mt-8">
          <BaseButton variant="primary" size="lg" @click="handleAddReceptionist">
            Agregar Recepcionista
          </BaseButton>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>

</style>
