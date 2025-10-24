import { ref } from 'vue'

export function useReceptionistFormValidation() {
    const name = ref('')
    const phoneNumber = ref('')
    const avatar = ref('')
    const clientInfo = ref('')
    const restrictions = ref('')
    const formalityLevel = ref(0.5)
    const dynamismLevel = ref(0.5)
    const appointmentMaxDays = ref(30)
    const appointmentMinDays = ref(1)

    const errors = ref({
        name: '' as string | null,
        phoneNumber: '' as string | null,
        avatar: '' as string | null,
        clientInfo: '' as string | null,
        restrictions: '' as string | null,
        formalityLevel: '' as string | null,
        dynamismLevel: '' as string | null,
        appointmentMaxDays: '' as string | null,
        appointmentMinDays: '' as string | null,
    })

    const phoneRegex = /^\+?[\d\s-()]+$/
    const urlRegex = /^https?:\/\/.+/

    function validate(): boolean {
        let ok = true

        errors.value = {
            name: null,
            phoneNumber: null,
            avatar: null,
            clientInfo: null,
            restrictions: null,
            formalityLevel: null,
            dynamismLevel: null,
            appointmentMaxDays: null,
            appointmentMinDays: null,
        }

        // name
        const nameTrimmed = name.value.trim()
        if (!nameTrimmed) {
            errors.value.name = 'El nombre es obligatorio'
            ok = false
        } else if (nameTrimmed.length < 6) {
            errors.value.name = 'Mínimo 6 caracteres'
            ok = false
        } else if (nameTrimmed.length > 50) {
            errors.value.name = 'Máximo 50 caracteres'
            ok = false
        }

        // phoneNumber
        const phoneTrimmed = phoneNumber.value.trim()
        if (!phoneTrimmed) {
            errors.value.phoneNumber = 'El número de teléfono es obligatorio'
            ok = false
        } else if (phoneTrimmed && !phoneRegex.test(phoneTrimmed)) {
            errors.value.phoneNumber = 'Formato de teléfono inválido'
            ok = false
        } else if (phoneTrimmed.length < 6) {
            errors.value.phoneNumber = 'Mínimo 6 caracteres'
            ok = false
        } else if (phoneTrimmed.length > 20) {
            errors.value.phoneNumber = 'Máximo 20 caracteres'
            ok = false
        }

        // avatar
        const avatarTrimmed = avatar.value.trim()
        if (avatarTrimmed && !urlRegex.test(avatarTrimmed)) {
            errors.value.avatar = 'Debe ser una URL válida (http/https)'
            ok = false
        } else if (avatarTrimmed.length > 500) {
            errors.value.avatar = 'Máximo 500 caracteres'
            ok = false
        }

        // clientInfo
        const clientInfoTrimmed = clientInfo.value.trim()
        if (clientInfoTrimmed.length > 1000) {
            errors.value.clientInfo = 'Máximo 1000 caracteres'
            ok = false
        }

        // restrictions
        const restrictionsTrimmed = restrictions.value.trim()
        if (restrictionsTrimmed.length > 500) {
            errors.value.restrictions = 'Máximo 500 caracteres'
            ok = false
        }

        // formalityLevel
        if (formalityLevel.value < 0 || formalityLevel.value > 1) {
            errors.value.formalityLevel = 'Debe estar entre 0 y 1'
            ok = false
        }

        // dynamismLevel
        if (dynamismLevel.value < 0 || dynamismLevel.value > 1) {
            errors.value.dynamismLevel = 'Debe estar entre 0 y 1'
            ok = false
        }

        // appointmentMaxDays
        if (appointmentMaxDays.value < 1) {
            errors.value.appointmentMaxDays = 'Mínimo 1 día'
            ok = false
        } else if (appointmentMaxDays.value > 365) {
            errors.value.appointmentMaxDays = 'Máximo 365 días'
            ok = false
        }

        // appointmentMinDays
        if (appointmentMinDays.value < 0) {
            errors.value.appointmentMinDays = 'Mínimo 0 días'
            ok = false
        } else if (appointmentMinDays.value > 30) {
            errors.value.appointmentMinDays = 'Máximo 30 días'
            ok = false
        }

        // Cross-field validation
        if (appointmentMinDays.value > appointmentMaxDays.value) {
            errors.value.appointmentMinDays = 'Mínimo no puede ser mayor que máximo'
            ok = false
        }

        return ok
    }

    function reset() {
        name.value = ''
        phoneNumber.value = ''
        avatar.value = ''
        clientInfo.value = ''
        restrictions.value = ''
        formalityLevel.value = 0.5
        dynamismLevel.value = 0.5
        appointmentMaxDays.value = 30
        appointmentMinDays.value = 1
        errors.value = {
            name: null,
            phoneNumber: null,
            avatar: null,
            clientInfo: null,
            restrictions: null,
            formalityLevel: null,
            dynamismLevel: null,
            appointmentMaxDays: null,
            appointmentMinDays: null,
        }
    }

    return {
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
        reset,
    }
}
