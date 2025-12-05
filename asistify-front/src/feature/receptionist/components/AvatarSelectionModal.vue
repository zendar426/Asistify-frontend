<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSpinner from '@/components/BaseSpinner.vue'
import { AvatarService } from '../service/AvatarService'
import type { Avatar } from '../models/Avatar'
import { useToastStore } from '@/stores/ToastStore'

interface Props {
    isOpen: boolean
    selectedAvatarId?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'select', avatar: Avatar): void
}>()

const avatarService = AvatarService.getInstance()
const toastStore = useToastStore()

const avatars = ref<Avatar[]>([])
const loading = ref(true)

const fetchAvatars = async () => {
    loading.value = true
    const result = await avatarService.findAll()
    
    if (result.success && result.data) {
        avatars.value = result.data
    } else {
        toastStore.addToast(result.type, result.message)
    }
    loading.value = false
}

const selectAvatar = (avatar: Avatar) => {
    emit('select', avatar)
    emit('close')
}

onMounted(() => {
    fetchAvatars()
})
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="$emit('close')">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <!-- Header -->
            <div class="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-xl font-bold text-dark/90">Seleccionar Avatar</h3>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
                    <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
                </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-4">
                <div v-if="loading" class="flex justify-center py-8">
                    <BaseSpinner size="lg" />
                </div>

                <div v-else-if="avatars.length === 0" class="text-center py-8 text-gray-500">
                    No hay avatares disponibles.
                </div>

                <div v-else class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    <div 
                        v-for="avatar in avatars" 
                        :key="avatar.id"
                        class="cursor-pointer group relative rounded-lg overflow-hidden border-2 transition-all duration-200"
                        :class="[
                            selectedAvatarId === avatar.id 
                                ? 'border-primary ring-2 ring-primary/20' 
                                : 'border-transparent hover:border-gray-200'
                        ]"
                        @click="selectAvatar(avatar)"
                    >
                        <div class="aspect-square bg-gray-100 relative">
                            <img 
                                :src="avatar.url" 
                                :alt="avatar.name"
                                class="w-full h-full object-contain"
                            />
                            <!-- Selected Overlay -->
                            <div 
                                v-if="selectedAvatarId === avatar.id"
                                class="absolute inset-0 bg-primary/10 flex items-center justify-center"
                            >
                                <div class="bg-primary text-white rounded-full p-2 shadow-lg">
                                    <font-awesome-icon icon="fa-solid fa-check" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-gray-100 flex justify-end">
                <BaseButton variant="outline" @click="$emit('close')">
                    Cancelar
                </BaseButton>
            </div>
        </div>
    </div>
</template>
