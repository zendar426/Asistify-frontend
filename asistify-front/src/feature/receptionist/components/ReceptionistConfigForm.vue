<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useReceptionistFormValidation } from '../composables/useReceptionistFormValidation'
import FormInput from './FormInput.vue'
import FormTextarea from './FormTextarea.vue'
import FormSlider from './FormSlider.vue'
import AvatarSelectionModal from './AvatarSelectionModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import type { Receptionist } from '../models/Receptionist'
import type { Avatar } from '../models/Avatar'
import { logger } from '@/utils/logger'

interface Props {
    receptionist?: Receptionist
    isEditMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isEditMode: false
})

const emit = defineEmits<{
    submit: [data: any]
    cancel: []
}>()

const {
    name,
    cellphone,
    avatarId,
    enterpriseInformation,
    businessRestrictions,
    levelFormality,
    levelDynamism,
    anticipationMaxDays,
    anticipationMinDays,
    errors,
    validate,
    reset
} = useReceptionistFormValidation()

const showAvatarModal = ref(false)
const selectedAvatarUrl = ref<string>('')

const handleAvatarSelect = (avatar: Avatar) => {
    avatarId.value = avatar.id
    selectedAvatarUrl.value = avatar.url
}

// Populate form if in edit mode
onMounted(() => {
    if (props.isEditMode && props.receptionist) {
        name.value = props.receptionist.name
        cellphone.value = props.receptionist.cellphone || ''
        avatarId.value = props.receptionist.avatarId || ''
        enterpriseInformation.value = props.receptionist.enterpriseInformation || ''
        businessRestrictions.value = props.receptionist.businessRestrictions || ''
        levelFormality.value = props.receptionist.levelFormality || 5
        levelDynamism.value = props.receptionist.levelDynamism || 5
        anticipationMaxDays.value = props.receptionist.anticipationMaxDays || 30
        anticipationMinDays.value = props.receptionist.anticipationMinDays || 1
        
        if (props.receptionist.avatar) {
            selectedAvatarUrl.value = props.receptionist.avatar.url
        }
    }
})

const handleSubmit = async () => {
    if (!validate()) return
    
    logger.debug('Form is valid, submitting...')

    const formData = {
        id: props.isEditMode ? props.receptionist?.id : undefined,
        name: name.value,
        cellphone: cellphone.value,
        avatarId: avatarId.value,
        enterpriseInformation: enterpriseInformation.value,
        businessRestrictions: businessRestrictions.value,
        levelFormality: levelFormality.value,
        levelDynamism: levelDynamism.value,
        anticipationMaxDays: anticipationMaxDays.value,
        anticipationMinDays: anticipationMinDays.value
    }
    
    emit('submit', formData)
}

const handleCancel = () => {
    reset()
    emit('cancel')
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-dark/90 mb-2">
            {{ isEditMode ? 'Editar Recepcionista' : 'Crear Recepcionista' }}
        </h2>
        <p class="text-sm text-dark/60 mb-6">
            Los campos marcados con <span class="text-alert">*</span> son obligatorios.
        </p>
        
        <form class="p-4 md:p-5" @submit.prevent="handleSubmit" novalidate>
            <div class="grid gap-4 mb-10 grid-cols-2">
                <!-- Name -->
                <FormInput
                    v-model="name"
                    label="Nombre"
                    placeholder="Ingrese nombre del recepcionista"
                    :error="errors.name"
                    :maxlength="50"
                    :required="true"
                />

                <!-- Cellphone -->
                <FormInput
                    v-model="cellphone"
                    label="Número de teléfono"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    :error="errors.cellphone"
                    :maxlength="20"
                    :required="true"
                />

                <!-- Avatar Selection -->
                <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm font-medium text-dark/80 mb-1">
                        Avatar <span class="text-alert">*</span>
                    </label>
                    <div class="flex items-center gap-4">
                        <div 
                            class="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden flex-shrink-0 cursor-pointer hover:border-primary transition-colors"
                            @click="showAvatarModal = true"
                        >
                            <img 
                                v-if="selectedAvatarUrl" 
                                :src="selectedAvatarUrl" 
                                alt="Selected Avatar"
                                class="w-full h-full object-cover"
                            />
                            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                                <font-awesome-icon icon="fa-solid fa-user" size="2x" />
                            </div>
                        </div>
                        <div>
                            <BaseButton 
                                variant="outline" 
                                size="sm" 
                                type="button"
                                @click="showAvatarModal = true"
                            >
                                {{ selectedAvatarUrl ? 'Cambiar Avatar' : 'Seleccionar Avatar' }}
                            </BaseButton>
                            <p v-if="errors.avatarId" class="text-xs text-alert mt-1">
                                {{ errors.avatarId }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Enterprise Information -->
                <FormTextarea
                    v-model="enterpriseInformation"
                    label="Información del cliente"
                    placeholder="Describe la información relevante sobre tus clientes"
                    :error="errors.enterpriseInformation"
                    :maxlength="1000"
                    :rows="4"
                />

                <!-- Business Restrictions -->
                <FormTextarea
                    v-model="businessRestrictions"
                    label="Restricciones"
                    placeholder="Define las restricciones o límites del recepcionista"
                    :error="errors.businessRestrictions"
                    :maxlength="500"
                    :rows="3"
                />

                <!-- Formality Level -->
                <FormSlider
                    v-model="levelFormality"
                    label="Nivel de formalidad"
                    :min="0"
                    :max="10"
                    :step="1"
                    :error="errors.levelFormality"
                />

                <!-- Dynamism Level -->
                <FormSlider
                    v-model="levelDynamism"
                    label="Nivel de dinamismo"
                    :min="0"
                    :max="10"
                    :step="1"
                    :error="errors.levelDynamism"
                />

                <!-- Anticipation Min Days -->
                <FormInput
                    v-model="anticipationMinDays"
                    label="Días mínimos para citas"
                    type="number"
                    placeholder="1"
                    :error="errors.anticipationMinDays"
                    :min="0"
                    :max="30"
                />

                <!-- Anticipation Max Days -->
                <FormInput
                    v-model="anticipationMaxDays"
                    label="Días máximos para citas"
                    type="number"
                    placeholder="30"
                    :error="errors.anticipationMaxDays"
                    :min="1"
                    :max="365"
                />
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 justify-end">
                <BaseButton
                    variant="outline"
                    size="md"
                    type="button"
                    @click="handleCancel"
                >
                    Cancelar
                </BaseButton>
                <BaseButton
                    v-if="!isEditMode"
                    variant="primary"
                    size="md"
                    type="submit"
                    icon="fa-solid fa-plus"
                >
                    Crear Recepcionista
                </BaseButton>
                <BaseButton
                    v-else
                    variant="primary"
                    size="md"
                    type="submit"
                    icon="fa-solid fa-pen-to-square"
                >
                    Actualizar Recepcionista
                </BaseButton>
            </div>
        </form>
    </div>

    <AvatarSelectionModal
        :is-open="showAvatarModal"
        :selected-avatar-id="avatarId"
        @close="showAvatarModal = false"
        @select="handleAvatarSelect"
    />
</template>
