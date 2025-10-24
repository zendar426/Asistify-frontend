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
    phoneNumber,
    avatar,
    clientInfo,
    restrictions,
    formalityLevel,
    dynamismLevel,
    appointmentMaxDays,
    appointmentMinDays,
    errors,
    validate,
    reset
} = useReceptionistFormValidation()

// Populate form if in edit mode
onMounted(() => {
    if (props.isEditMode && props.receptionist) {
        name.value = props.receptionist.name
        phoneNumber.value = props.receptionist.phoneNumber || ''
        avatar.value = props.receptionist.avatar || ''
        clientInfo.value = props.receptionist.clientInfo || ''
        restrictions.value = props.receptionist.restrictions || ''
        formalityLevel.value = props.receptionist.formalityLevel || 0.5
        dynamismLevel.value = props.receptionist.dynamismLevel || 0.5
        appointmentMaxDays.value = props.receptionist.appointmentMaxDays || 30
        appointmentMinDays.value = props.receptionist.appointmentMinDays || 1
    }
})

const handleSubmit = async () => {
    if (!validate()) return
    
    logger.debug('Form is valid, submitting...')

    const formData = {
        id: props.isEditMode ? props.receptionist?.id : undefined,
        name: name.value,
        phoneNumber: phoneNumber.value,
        avatar: avatar.value,
        clientInfo: clientInfo.value,
        restrictions: restrictions.value,
        formalityLevel: formalityLevel.value,
        dynamismLevel: dynamismLevel.value,
        appointmentMaxDays: appointmentMaxDays.value,
        appointmentMinDays: appointmentMinDays.value
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

                <!-- Phone Number -->
                <FormInput
                    v-model="phoneNumber"
                    label="Número de teléfono"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    :error="errors.phoneNumber"
                    :maxlength="20"
                    :required="true"
                />

                <!-- Avatar URL -->
                <FormInput
                    v-model="avatar"
                    label="Avatar (URL)"
                    type="url"
                    placeholder="https://ejemplo.com/avatar.jpg"
                    :error="errors.avatar"
                    :maxlength="500"
                />

                <!-- Client Info -->
                <FormTextarea
                    v-model="clientInfo"
                    label="Información del cliente"
                    placeholder="Describe la información relevante sobre tus clientes"
                    :error="errors.clientInfo"
                    :maxlength="1000"
                    :rows="4"
                />

                <!-- Restrictions -->
                <FormTextarea
                    v-model="restrictions"
                    label="Restricciones"
                    placeholder="Define las restricciones o límites del recepcionista"
                    :error="errors.restrictions"
                    :maxlength="500"
                    :rows="3"
                />

                <!-- Formality Level -->
                <FormSlider
                    v-model="formalityLevel"
                    label="Nivel de formalidad"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    :error="errors.formalityLevel"
                />

                <!-- Dynamism Level -->
                <FormSlider
                    v-model="dynamismLevel"
                    label="Nivel de dinamismo"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    :error="errors.dynamismLevel"
                />

                <!-- Appointment Min Days -->
                <FormInput
                    v-model="appointmentMinDays"
                    label="Días mínimos para citas"
                    type="number"
                    placeholder="1"
                    :error="errors.appointmentMinDays"
                    :min="0"
                    :max="30"
                />

                <!-- Appointment Max Days -->
                <FormInput
                    v-model="appointmentMaxDays"
                    label="Días máximos para citas"
                    type="number"
                    placeholder="30"
                    :error="errors.appointmentMaxDays"
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
