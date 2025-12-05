import { ref } from 'vue'

export function useReceptionistFormValidation() {
    const name = ref('')
    const cellphone = ref('')
    const avatarId = ref('')
    const enterpriseInformation = ref('')
    const businessRestrictions = ref('')
    const levelFormality = ref(5)
    const levelDynamism = ref(5)
    const anticipationMaxDays = ref(30)
    const anticipationMinDays = ref(1)

    const errors = ref({
        name: '' as string | null,
        cellphone: '' as string | null,
        avatarId: '' as string | null,
        enterpriseInformation: '' as string | null,
        businessRestrictions: '' as string | null,
        levelFormality: '' as string | null,
        levelDynamism: '' as string | null,
        anticipationMaxDays: '' as string | null,
        anticipationMinDays: '' as string | null,
    })

    const phoneRegex = /^\+?[\d\s-()]+$/
    // const urlRegex = /^https?:\/\/.+/ // Removed as we are using UUID for avatarId

    function validate(): boolean {
        let ok = true

        errors.value = {
            name: null,
            cellphone: null,
            avatarId: null,
            enterpriseInformation: null,
            businessRestrictions: null,
            levelFormality: null,
            levelDynamism: null,
            anticipationMaxDays: null,
            anticipationMinDays: null,
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

        // cellphone
        const phoneTrimmed = cellphone.value.trim()
        if (!phoneTrimmed) {
            errors.value.cellphone = 'El número de teléfono es obligatorio'
            ok = false
        } else if (phoneTrimmed && !phoneRegex.test(phoneTrimmed)) {
            errors.value.cellphone = 'Formato de teléfono inválido'
            ok = false
        } else if (phoneTrimmed.length < 6) {
            errors.value.cellphone = 'Mínimo 6 caracteres'
            ok = false
        } else if (phoneTrimmed.length > 20) {
            errors.value.cellphone = 'Máximo 20 caracteres'
            ok = false
        }

        // avatarId
        const avatarIdTrimmed = avatarId.value.trim()
        if (!avatarIdTrimmed) {
             errors.value.avatarId = 'El ID del avatar es obligatorio'
             ok = false
        }
        // if (avatarTrimmed && !urlRegex.test(avatarTrimmed)) {
        //     errors.value.avatar = 'Debe ser una URL válida (http/https)'
        //     ok = false
        // } else if (avatarTrimmed.length > 500) {
        //     errors.value.avatar = 'Máximo 500 caracteres'
        //     ok = false
        // }

        // enterpriseInformation
        const enterpriseInformationTrimmed = enterpriseInformation.value.trim()
        if (enterpriseInformationTrimmed.length > 1000) {
            errors.value.enterpriseInformation = 'Máximo 1000 caracteres'
            ok = false
        }

        // businessRestrictions
        const businessRestrictionsTrimmed = businessRestrictions.value.trim()
        if (businessRestrictionsTrimmed.length > 500) {
            errors.value.businessRestrictions = 'Máximo 500 caracteres'
            ok = false
        }

        // levelFormality
        if (levelFormality.value < 0 || levelFormality.value > 10) {
            errors.value.levelFormality = 'Debe estar entre 0 y 10'
            ok = false
        }

        // levelDynamism
        if (levelDynamism.value < 0 || levelDynamism.value > 10) {
            errors.value.levelDynamism = 'Debe estar entre 0 y 10'
            ok = false
        }

        // anticipationMaxDays
        if (anticipationMaxDays.value < 1) {
            errors.value.anticipationMaxDays = 'Mínimo 1 día'
            ok = false
        } else if (anticipationMaxDays.value > 365) {
            errors.value.anticipationMaxDays = 'Máximo 365 días'
            ok = false
        }

        // anticipationMinDays
        if (anticipationMinDays.value < 0) {
            errors.value.anticipationMinDays = 'Mínimo 0 días'
            ok = false
        } else if (anticipationMinDays.value > 30) {
            errors.value.anticipationMinDays = 'Máximo 30 días'
            ok = false
        }

        // Cross-field validation
        if (anticipationMinDays.value > anticipationMaxDays.value) {
            errors.value.anticipationMinDays = 'Mínimo no puede ser mayor que máximo'
            ok = false
        }

        return ok
    }

    function reset() {
        name.value = ''
        cellphone.value = ''
        avatarId.value = ''
        enterpriseInformation.value = ''
        businessRestrictions.value = ''
        levelFormality.value = 5
        levelDynamism.value = 5
        anticipationMaxDays.value = 30
        anticipationMinDays.value = 1
        errors.value = {
            name: null,
            cellphone: null,
            avatarId: null,
            enterpriseInformation: null,
            businessRestrictions: null,
            levelFormality: null,
            levelDynamism: null,
            anticipationMaxDays: null,
            anticipationMinDays: null,
        }
    }

    return {
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
        reset,
    }
}
