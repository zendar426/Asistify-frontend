<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

interface Props {
    name: string
    phoneNumber?: string
    profilePicture?: string
}

const props = withDefaults(defineProps<Props>(), {
    phoneNumber: '',
    profilePicture: '',
})

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit receptionist:', props.name)
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
                <div v-if="profilePicture" class="w-16 h-16 rounded-full overflow-hidden">
                    <img :src="profilePicture" :alt="name" class="w-full h-full object-cover" />
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
