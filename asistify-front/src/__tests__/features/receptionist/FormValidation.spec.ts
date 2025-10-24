import { describe, it, expect, beforeEach } from 'vitest'
import { useReceptionistFormValidation } from '@/feature/receptionist/composables/useReceptionistFormValidation'

describe('useReceptionistFormValidation', () => {
    let validation: ReturnType<typeof useReceptionistFormValidation>

    beforeEach(() => {
        validation = useReceptionistFormValidation()
    })

    describe('name validation', () => {
        it('should fail when name is empty', () => {
            validation.name.value = ''
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.name).toBe('El nombre es obligatorio')
        })

        it('should fail when name is only whitespace', () => {
            validation.name.value = '   '
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.name).toBe('El nombre es obligatorio')
        })

        it('should fail when name is less than 6 characters', () => {
            validation.name.value = 'John'
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.name).toBe('Mínimo 6 caracteres')
        })

        it('should fail when name is more than 50 characters', () => {
            validation.name.value = 'a'.repeat(51)
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.name).toBe('Máximo 50 caracteres')
        })

        it('should pass when name is exactly 6 characters', () => {
            validation.name.value = 'Johnie'
            validation.phoneNumber.value = '+56912345678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.name).toBeNull()
        })

        it('should pass when name is exactly 50 characters', () => {
            validation.name.value = 'a'.repeat(50)
            validation.phoneNumber.value = '+56912345678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.name).toBeNull()
        })

        it('should pass when name is valid (between 6 and 50 characters)', () => {
            validation.name.value = 'Juan Pérez'
            validation.phoneNumber.value = '+56912345678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.name).toBeNull()
        })
    })

    describe('phoneNumber validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
        })

        it('should fail when phoneNumber is empty', () => {
            validation.phoneNumber.value = ''
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.phoneNumber).toBe('El número de teléfono es obligatorio')
        })

        it('should fail when phoneNumber is only whitespace', () => {
            validation.phoneNumber.value = '   '
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.phoneNumber).toBe('El número de teléfono es obligatorio')
        })

        it('should fail when phoneNumber has invalid format', () => {
            validation.phoneNumber.value = 'abc-def'
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.phoneNumber).toBe('Formato de teléfono inválido')
        })

        it('should fail when phoneNumber is less than 6 characters', () => {
            validation.phoneNumber.value = '12345'
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.phoneNumber).toBe('Mínimo 6 caracteres')
        })

        it('should fail when phoneNumber is more than 20 characters', () => {
            validation.phoneNumber.value = '1'.repeat(21)
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.phoneNumber).toBe('Máximo 20 caracteres')
        })

        it('should pass with valid phone number format (+56912345678)', () => {
            validation.phoneNumber.value = '+56912345678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.phoneNumber).toBeNull()
        })

        it('should pass with phone number containing spaces', () => {
            validation.phoneNumber.value = '+56 9 1234 5678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.phoneNumber).toBeNull()
        })

        it('should pass with phone number containing dashes', () => {
            validation.phoneNumber.value = '+56-9-1234-5678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.phoneNumber).toBeNull()
        })

        it('should pass with phone number containing parentheses', () => {
            validation.phoneNumber.value = '+56 (9) 1234-5678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.phoneNumber).toBeNull()
        })

        it('should pass with phone number without plus sign', () => {
            validation.phoneNumber.value = '56912345678'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.phoneNumber).toBeNull()
        })
    })

    describe('avatar validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should pass when avatar is empty (optional field)', () => {
            validation.avatar.value = ''
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.avatar).toBeNull()
        })

        it('should fail when avatar is not a valid URL', () => {
            validation.avatar.value = 'not-a-url'
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.avatar).toBe('Debe ser una URL válida (http/https)')
        })

        it('should fail when avatar URL does not start with http/https', () => {
            validation.avatar.value = 'ftp://example.com/avatar.jpg'
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.avatar).toBe('Debe ser una URL válida (http/https)')
        })

        it('should fail when avatar URL is more than 500 characters', () => {
            validation.avatar.value = 'https://example.com/' + 'a'.repeat(500)
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.avatar).toBe('Máximo 500 caracteres')
        })

        it('should pass with valid http URL', () => {
            validation.avatar.value = 'http://example.com/avatar.jpg'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.avatar).toBeNull()
        })

        it('should pass with valid https URL', () => {
            validation.avatar.value = 'https://example.com/avatar.jpg'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.avatar).toBeNull()
        })
    })

    describe('clientInfo validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should pass when clientInfo is empty (optional field)', () => {
            validation.clientInfo.value = ''
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.clientInfo).toBeNull()
        })

        it('should fail when clientInfo is more than 1000 characters', () => {
            validation.clientInfo.value = 'a'.repeat(1001)
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.clientInfo).toBe('Máximo 1000 caracteres')
        })

        it('should pass when clientInfo is exactly 1000 characters', () => {
            validation.clientInfo.value = 'a'.repeat(1000)
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.clientInfo).toBeNull()
        })

        it('should pass when clientInfo is valid', () => {
            validation.clientInfo.value = 'Cliente importante con información relevante'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.clientInfo).toBeNull()
        })
    })

    describe('restrictions validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should pass when restrictions is empty (optional field)', () => {
            validation.restrictions.value = ''
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.restrictions).toBeNull()
        })

        it('should fail when restrictions is more than 500 characters', () => {
            validation.restrictions.value = 'a'.repeat(501)
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.restrictions).toBe('Máximo 500 caracteres')
        })

        it('should pass when restrictions is exactly 500 characters', () => {
            validation.restrictions.value = 'a'.repeat(500)
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.restrictions).toBeNull()
        })

        it('should pass when restrictions is valid', () => {
            validation.restrictions.value = 'No reservar los lunes'
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.restrictions).toBeNull()
        })
    })

    describe('formalityLevel validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should fail when formalityLevel is less than 0', () => {
            validation.formalityLevel.value = -0.1
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.formalityLevel).toBe('Debe estar entre 0 y 1')
        })

        it('should fail when formalityLevel is greater than 1', () => {
            validation.formalityLevel.value = 1.1
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.formalityLevel).toBe('Debe estar entre 0 y 1')
        })

        it('should pass when formalityLevel is 0', () => {
            validation.formalityLevel.value = 0
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.formalityLevel).toBeNull()
        })

        it('should pass when formalityLevel is 1', () => {
            validation.formalityLevel.value = 1
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.formalityLevel).toBeNull()
        })

        it('should pass when formalityLevel is 0.5', () => {
            validation.formalityLevel.value = 0.5
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.formalityLevel).toBeNull()
        })
    })

    describe('dynamismLevel validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should fail when dynamismLevel is less than 0', () => {
            validation.dynamismLevel.value = -0.1
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.dynamismLevel).toBe('Debe estar entre 0 y 1')
        })

        it('should fail when dynamismLevel is greater than 1', () => {
            validation.dynamismLevel.value = 1.1
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.dynamismLevel).toBe('Debe estar entre 0 y 1')
        })

        it('should pass when dynamismLevel is 0', () => {
            validation.dynamismLevel.value = 0
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.dynamismLevel).toBeNull()
        })

        it('should pass when dynamismLevel is 1', () => {
            validation.dynamismLevel.value = 1
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.dynamismLevel).toBeNull()
        })

        it('should pass when dynamismLevel is 0.5', () => {
            validation.dynamismLevel.value = 0.5
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.dynamismLevel).toBeNull()
        })
    })

    describe('appointmentMaxDays validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should fail when appointmentMaxDays is less than 1', () => {
            validation.appointmentMaxDays.value = 0
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.appointmentMaxDays).toBe('Mínimo 1 día')
        })

        it('should fail when appointmentMaxDays is greater than 365', () => {
            validation.appointmentMaxDays.value = 366
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.appointmentMaxDays).toBe('Máximo 365 días')
        })

        it('should pass when appointmentMaxDays is 1', () => {
            validation.appointmentMaxDays.value = 1
            validation.appointmentMinDays.value = 0
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMaxDays).toBeNull()
        })

        it('should pass when appointmentMaxDays is 365', () => {
            validation.appointmentMaxDays.value = 365
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMaxDays).toBeNull()
        })

        it('should pass when appointmentMaxDays is 30', () => {
            validation.appointmentMaxDays.value = 30
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMaxDays).toBeNull()
        })
    })

    describe('appointmentMinDays validation', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should fail when appointmentMinDays is less than 0', () => {
            validation.appointmentMinDays.value = -1
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.appointmentMinDays).toBe('Mínimo 0 días')
        })

        it('should fail when appointmentMinDays is greater than 30', () => {
            validation.appointmentMinDays.value = 31
            validation.appointmentMaxDays.value = 32
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.appointmentMinDays).toBe('Máximo 30 días')
        })

        it('should pass when appointmentMinDays is 0', () => {
            validation.appointmentMinDays.value = 0
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })

        it('should pass when appointmentMinDays is 30', () => {
            validation.appointmentMinDays.value = 30
            validation.appointmentMaxDays.value = 30
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })

        it('should pass when appointmentMinDays is 1', () => {
            validation.appointmentMinDays.value = 1
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })
    })

    describe('cross-field validation (appointmentMinDays vs appointmentMaxDays)', () => {
        beforeEach(() => {
            validation.name.value = 'Valid Name'
            validation.phoneNumber.value = '+56912345678'
        })

        it('should fail when appointmentMinDays is greater than appointmentMaxDays', () => {
            validation.appointmentMinDays.value = 10
            validation.appointmentMaxDays.value = 5
            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.appointmentMinDays).toBe(
                'Mínimo no puede ser mayor que máximo',
            )
        })

        it('should pass when appointmentMinDays equals appointmentMaxDays', () => {
            validation.appointmentMinDays.value = 10
            validation.appointmentMaxDays.value = 10
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })

        it('should pass when appointmentMinDays is less than appointmentMaxDays', () => {
            validation.appointmentMinDays.value = 5
            validation.appointmentMaxDays.value = 10
            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })
    })

    describe('reset function', () => {
        it('should reset all fields to default values', () => {
            // Set some values
            validation.name.value = 'Test Name'
            validation.phoneNumber.value = '+56912345678'
            validation.avatar.value = 'https://example.com/avatar.jpg'
            validation.clientInfo.value = 'Some client info'
            validation.restrictions.value = 'Some restrictions'
            validation.formalityLevel.value = 0.8
            validation.dynamismLevel.value = 0.3
            validation.appointmentMaxDays.value = 60
            validation.appointmentMinDays.value = 5

            // Trigger validation to populate errors
            validation.validate()

            // Reset
            validation.reset()

            // Check all fields are reset
            expect(validation.name.value).toBe('')
            expect(validation.phoneNumber.value).toBe('')
            expect(validation.avatar.value).toBe('')
            expect(validation.clientInfo.value).toBe('')
            expect(validation.restrictions.value).toBe('')
            expect(validation.formalityLevel.value).toBe(0.5)
            expect(validation.dynamismLevel.value).toBe(0.5)
            expect(validation.appointmentMaxDays.value).toBe(30)
            expect(validation.appointmentMinDays.value).toBe(1)

            // Check all errors are reset
            expect(validation.errors.value.name).toBeNull()
            expect(validation.errors.value.phoneNumber).toBeNull()
            expect(validation.errors.value.avatar).toBeNull()
            expect(validation.errors.value.clientInfo).toBeNull()
            expect(validation.errors.value.restrictions).toBeNull()
            expect(validation.errors.value.formalityLevel).toBeNull()
            expect(validation.errors.value.dynamismLevel).toBeNull()
            expect(validation.errors.value.appointmentMaxDays).toBeNull()
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })
    })

    describe('multiple validation errors', () => {
        it('should return false and set multiple errors when multiple fields are invalid', () => {
            validation.name.value = 'A' // Too short
            validation.phoneNumber.value = 'invalid' // Invalid format
            validation.avatar.value = 'not-a-url' // Invalid URL
            validation.formalityLevel.value = 2 // Out of range

            const result = validation.validate()

            expect(result).toBe(false)
            expect(validation.errors.value.name).toBe('Mínimo 6 caracteres')
            expect(validation.errors.value.phoneNumber).toBe('Formato de teléfono inválido')
            expect(validation.errors.value.avatar).toBe('Debe ser una URL válida (http/https)')
            expect(validation.errors.value.formalityLevel).toBe('Debe estar entre 0 y 1')
        })
    })

    describe('complete valid form', () => {
        it('should pass validation with all valid required and optional fields', () => {
            validation.name.value = 'Juan Pérez González'
            validation.phoneNumber.value = '+56 9 1234 5678'
            validation.avatar.value = 'https://example.com/avatar.jpg'
            validation.clientInfo.value = 'Cliente VIP con preferencias especiales'
            validation.restrictions.value = 'No llamar después de las 18:00'
            validation.formalityLevel.value = 0.7
            validation.dynamismLevel.value = 0.6
            validation.appointmentMaxDays.value = 90
            validation.appointmentMinDays.value = 2

            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.name).toBeNull()
            expect(validation.errors.value.phoneNumber).toBeNull()
            expect(validation.errors.value.avatar).toBeNull()
            expect(validation.errors.value.clientInfo).toBeNull()
            expect(validation.errors.value.restrictions).toBeNull()
            expect(validation.errors.value.formalityLevel).toBeNull()
            expect(validation.errors.value.dynamismLevel).toBeNull()
            expect(validation.errors.value.appointmentMaxDays).toBeNull()
            expect(validation.errors.value.appointmentMinDays).toBeNull()
        })

        it('should pass validation with only required fields', () => {
            validation.name.value = 'Maria Lopez'
            validation.phoneNumber.value = '+56912345678'
            // All other fields remain at default values

            const result = validation.validate()

            expect(result).toBe(true)
            expect(validation.errors.value.name).toBeNull()
            expect(validation.errors.value.phoneNumber).toBeNull()
        })
    })
})
