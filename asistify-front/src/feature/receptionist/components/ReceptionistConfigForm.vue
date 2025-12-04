<script setup lang="ts">
import { onMounted } from 'vue'
import { useReceptionistFormValidation } from '../composables/useReceptionistFormValidation'
import FormInput from './FormInput.vue'
import FormTextarea from './FormTextarea.vue'
import FormSlider from './FormSlider.vue'
import BaseButton from '@/components/BaseButton.vue'
import type { Receptionist } from '../models/Receptionist'
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

                <!-- Avatar ID -->
                <FormInput
                    v-model="avatarId"
                    label="Avatar ID"
                    type="text"
                    placeholder="UUID del avatar"
                    :error="errors.avatarId"
                    :maxlength="50"
                    :required="true"
                />

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
</template>
