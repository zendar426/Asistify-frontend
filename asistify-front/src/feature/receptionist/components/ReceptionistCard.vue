<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
    id: string
    name: string
    phoneNumber?: string
    avatar?: string
    formalityLevel?: number
    dynamismLevel?: number
    appointmentMaxDays?: number
    appointmentMinDays?: number
}

const props = withDefaults(defineProps<Props>(), {
    phoneNumber: '',
    avatar: '',
    formalityLevel: 0.5,
    dynamismLevel: 0.5,
    appointmentMaxDays: 30,
    appointmentMinDays: 1
})

const emit = defineEmits<{
    delete: [id: string]
}>()

const router = useRouter()
const showDropdown = ref(false)

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const handleEdit = () => {
    router.push({ 
        name: 'receptionistConfigEdit', 
        params: { id: props.id } 
    })
    showDropdown.value = false
}

const handleDelete = () => {
    emit('delete', props.id)
    showDropdown.value = false
}

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
    showDropdown.value = false
}
</script>

<template>
    <div
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        @click="closeDropdown"
    >
        <div class="flex items-start justify-between gap-4 mb-4">
            <!-- Left section: Profile Picture and Info -->
            <div class="flex items-center gap-4 flex-1 min-w-0">
                <!-- Profile Picture -->
                <div class="flex-shrink-0">
                    <div v-if="avatar" class="w-16 h-16 rounded-full overflow-hidden">
                        <img :src="avatar" :alt="name" class="w-full h-full object-cover" />
                    </div>
                    <div
                        v-else
                        class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold"
                    >
                        {{ getInitials(name) }}
                    </div>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">{{ name }}</h3>
                    <p v-if="phoneNumber" class="text-gray-600 text-sm mt-1">
                        <font-awesome-icon icon="fa-solid fa-phone" class="mr-2" />
                        {{ phoneNumber }}
                    </p>
                </div>
            </div>

            <!-- Right section: Actions Menu -->
            <div class="flex-shrink-0 relative">
                <button
                    @click.stop="toggleDropdown"
                    class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="text-gray-600" />
                </button>

                <!-- Dropdown Menu -->
                <div
                    v-if="showDropdown"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                    @click.stop
                >
                    <button
                        @click="handleEdit"
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-t-lg"
                    >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-blue-600" />
                        Editar
                    </button>
                    <button
                        @click="handleDelete"
                        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                    >
                        <font-awesome-icon icon="fa-solid fa-trash" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <!-- Formality Level -->
            <div>
                <p class="text-xs text-gray-500 mb-1">Formalidad</p>
                <div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                            class="bg-indigo-600 h-2 rounded-full"
                            :style="{ width: `${formalityLevel * 100}%` }"
                        />
                    </div>
                    <span class="text-xs font-medium text-gray-700">{{ (formalityLevel * 100).toFixed(0) }}%</span>
                </div>
            </div>

            <!-- Dynamism Level -->
            <div>
                <p class="text-xs text-gray-500 mb-1">Dinamismo</p>
                <div class="flex items-center gap-2">
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                            class="bg-green-600 h-2 rounded-full"
                            :style="{ width: `${dynamismLevel * 100}%` }"
                        />
                    </div>
                    <span class="text-xs font-medium text-gray-700">{{ (dynamismLevel * 100).toFixed(0) }}%</span>
                </div>
            </div>

            <!-- Appointment Min Days -->
            <div>
                <p class="text-xs text-gray-500 mb-1">Días mínimos</p>
                <p class="text-sm font-semibold text-gray-900">
                    {{ appointmentMinDays }} 
                    <span class="text-xs font-normal text-gray-600">{{ appointmentMinDays === 1 ? 'día' : 'días' }}</span>
                </p>
            </div>

            <!-- Appointment Max Days -->
            <div>
                <p class="text-xs text-gray-500 mb-1">Días máximos</p>
                <p class="text-sm font-semibold text-gray-900">
                    {{ appointmentMaxDays }} 
                    <span class="text-xs font-normal text-gray-600">{{ appointmentMaxDays === 1 ? 'día' : 'días' }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
