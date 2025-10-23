<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
    id: string
    name: string
    phoneNumber?: string
    avatar?: string
}

const props = withDefaults(defineProps<Props>(), {
    phoneNumber: '',
    avatar: '',
})

const router = useRouter()

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
}
</script>

<template>
    <div
        class="bg-white rounded-lg shadow-md p-6 flex items-center justify-between gap-4 hover:shadow-lg transition-shadow duration-200"
    >
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
                <p class="text-gray-600 text-sm mt-1">{{ phoneNumber }}</p>
            </div>
        </div>

        <!-- Right section: Actions -->
        <div class="flex-shrink-0">
            <BaseButton variant="outline" size="sm" @click="handleEdit"> Editar </BaseButton>
        </div>
    </div>
</template>
