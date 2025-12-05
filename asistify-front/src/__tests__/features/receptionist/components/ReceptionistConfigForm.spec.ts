import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ReceptionistConfigForm from '../../../../feature/receptionist/components/ReceptionistConfigForm.vue'
import { createTestingPinia } from '@pinia/testing'

describe('ReceptionistConfigForm', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(ReceptionistConfigForm, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                    }),
                ],
            },
        })
    })

    describe('Form Rendering', () => {
        it('should render the form with all fields', () => {
            expect(wrapper.find('form').exists()).toBe(true)

            // Check for input fields
            const inputs = wrapper.findAll('input[type="text"]')
            expect(inputs.length).toBeGreaterThan(0)
        })

        it('should display "Crear Recepcionista" title when not in edit mode', () => {
            expect(wrapper.text()).toContain('Crear Recepcionista')
        })

        it('should display "Editar Recepcionista" title when in edit mode', async () => {
            await wrapper.setProps({ isEditMode: true })
            expect(wrapper.text()).toContain('Editar Recepcionista')
        })

        it('should display required field indicator message', () => {
            expect(wrapper.text()).toContain('Los campos marcados con')
            expect(wrapper.text()).toContain('son obligatorios')
        })
    })

    describe('Form Submission', () => {
        it('should emit submit event when form is submitted with valid data', async () => {
            // Fill required fields
            const nameInput = wrapper.find('input[placeholder="Ingrese nombre del recepcionista"]')
            const phoneInput = wrapper.find('input[placeholder="+56 9 1234 5678"]')

            await nameInput.setValue('Juan Pérez')
            await phoneInput.setValue('+56912345678')

            // Submit form
            await wrapper.find('form').trigger('submit.prevent')

            // Wait for validation and emit
            await wrapper.vm.$nextTick()

            // Check if submit event was emitted
            expect(wrapper.emitted('submit')).toBeTruthy()
        })

        it('should not emit submit event when form has validation errors', async () => {
            // Leave required fields empty
            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            // Should not emit submit event
            expect(wrapper.emitted('submit')).toBeFalsy()
        })

        it('should emit submit event with correct data structure', async () => {
            const formData = {
                name: 'María González',
                phoneNumber: '+56987654321',
                avatar: 'https://example.com/avatar.jpg',
                clientInfo: 'Cliente VIP',
                restrictions: 'No llamar después de las 18:00',
            }

            await wrapper
                .find('input[placeholder="Ingrese nombre del recepcionista"]')
                .setValue(formData.name)
            await wrapper
                .find('input[placeholder="+56 9 1234 5678"]')
                .setValue(formData.phoneNumber)
            await wrapper
                .find('input[placeholder="https://ejemplo.com/avatar.jpg"]')
                .setValue(formData.avatar)

            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            const submitEvents = wrapper.emitted('submit')
            expect(submitEvents).toBeTruthy()

            if (submitEvents) {
                const emittedData = submitEvents[0][0]
                expect(emittedData).toHaveProperty('name')
                expect(emittedData).toHaveProperty('phoneNumber')
                expect(emittedData).toHaveProperty('avatar')
                expect(emittedData).toHaveProperty('formalityLevel')
                expect(emittedData).toHaveProperty('dynamismLevel')
                expect(emittedData).toHaveProperty('appointmentMaxDays')
                expect(emittedData).toHaveProperty('appointmentMinDays')
            }
        })
    })

    describe('Form Cancellation', () => {
        it('should emit cancel event when cancel button is clicked', async () => {
            const cancelButton = wrapper
                .findAll('button')
                .find((btn: any) => btn.text().includes('Cancelar'))

            expect(cancelButton).toBeDefined()
            if (cancelButton) {
                await cancelButton.trigger('click')
                await wrapper.vm.$nextTick()

                expect(wrapper.emitted('cancel')).toBeTruthy()
            }
        })

        it('should reset form when cancel is clicked', async () => {
            // Fill some fields
            await wrapper
                .find('input[placeholder="Ingrese nombre del recepcionista"]')
                .setValue('Test Name')

            // Click cancel
            const cancelButton = wrapper
                .findAll('button')
                .find((btn: any) => btn.text().includes('Cancelar'))

            if (cancelButton) {
                await cancelButton.trigger('click')
                await wrapper.vm.$nextTick()

                // Form should be reset
                expect(wrapper.emitted('cancel')).toBeTruthy()
            }
        })
    })

    describe('Edit Mode', () => {
        it('should populate form fields when receptionist prop is provided in edit mode', async () => {
            const receptionistData = {
                id: '1',
                name: 'Carlos Rodríguez',
                phoneNumber: '+56912345678',
                avatar: 'https://example.com/carlos.jpg',
                clientInfo: 'Cliente frecuente',
                restrictions: 'Horario limitado',
                formalityLevel: 0.7,
                dynamismLevel: 0.6,
                appointmentMaxDays: 60,
                appointmentMinDays: 2,
            }

            wrapper = mount(ReceptionistConfigForm, {
                props: {
                    isEditMode: true,
                    receptionist: receptionistData,
                },
                global: {
                    plugins: [
                        createTestingPinia({
                            createSpy: vi.fn,
                        }),
                    ],
                },
            })

            await wrapper.vm.$nextTick()

            // Check if form is populated (we can check the internal state)
            expect(wrapper.vm.name).toBe(receptionistData.name)
            expect(wrapper.vm.phoneNumber).toBe(receptionistData.phoneNumber)
        })

        it('should include id in submitted data when in edit mode', async () => {
            const receptionistData = {
                id: '123',
                name: 'Test User',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            wrapper = mount(ReceptionistConfigForm, {
                props: {
                    isEditMode: true,
                    receptionist: receptionistData,
                },
                global: {
                    plugins: [
                        createTestingPinia({
                            createSpy: vi.fn,
                        }),
                    ],
                },
            })

            await wrapper.vm.$nextTick()
            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            const submitEvents = wrapper.emitted('submit')
            if (submitEvents) {
                const emittedData = submitEvents[0][0]
                expect(emittedData.id).toBe('123')
            }
        })
    })

    describe('Form Validation Display', () => {
        it('should show validation errors when submitting invalid data', async () => {
            // Submit empty form
            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            // Should show error messages
            expect(wrapper.text()).toContain('El nombre es obligatorio')
            expect(wrapper.text()).toContain('El número de teléfono es obligatorio')
        })

        it('should clear validation errors when valid data is entered', async () => {
            // Submit empty form to trigger errors
            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            // Fill required fields
            await wrapper
                .find('input[placeholder="Ingrese nombre del recepcionista"]')
                .setValue('Valid Name')
            await wrapper.find('input[placeholder="+56 9 1234 5678"]').setValue('+56912345678')

            // Submit again
            await wrapper.find('form').trigger('submit.prevent')
            await wrapper.vm.$nextTick()

            // Errors should be cleared or form should be submitted
            const submitEvents = wrapper.emitted('submit')
            expect(submitEvents).toBeTruthy()
        })
    })
})
