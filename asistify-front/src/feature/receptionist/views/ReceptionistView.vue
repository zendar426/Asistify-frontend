<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ReceptionistCard from '../components/ReceptionistCard.vue'
import { useReceptionistStore } from '@/feature/receptionist/stores/ReceptionistStore'
import { dummyReceptionists } from '../data/dummyData'
import { ToastType, useToastStore } from '@/stores/ToastStore'
import { Receptionist } from '../models/Receptionist'
import { ReceptionistService } from '../service/ReceptionistService'
import BaseSpinner from '@/components/BaseSpinner.vue'
import { sleep } from '@/utils/sleep'

/**
 * Stores and Services
 */
const toastStore = useToastStore()
const receptionistService = ReceptionistService.getInstance();

/**
 * Handle receptionists data source
 */
// const receptionists = computed(() => receptionistStore.receptionist)
const receptionists = dummyReceptionists;

/** Refs */
const loading = ref(true);


const fetchReceptionists = async () => {
  const result = await receptionistService.findAll();
  result.success ? loading.value = false : toastStore.addToast(result.type, result.message)

  loading.value = false; // TODO: remove on integration
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
  <div class="min-h-screen bg-background flex flex-col">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
      <!-- Title -->
      <div class="mb-8 border-l-4 border-primary pl-4">
        <h1 class="text-3xl font-bold text-gray-900">Recepcionistas</h1>
        <p class="text-gray-600 mt-2">Gestiona tus recepcionistas virtuales</p>
      </div>

      <div v-if="loading" class="flex flex-1 justify-center items-center">
        <BaseSpinner size="lg" />
      </div>

      <div v-else>
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
