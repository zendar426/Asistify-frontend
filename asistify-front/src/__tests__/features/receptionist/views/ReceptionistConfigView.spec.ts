import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import ReceptionistConfigView from '../../../../feature/receptionist/views/ReceptionistConfigView.vue'
import ReceptionistConfigForm from '../../../../feature/receptionist/components/ReceptionistConfigForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useReceptionistStore } from '../../../../feature/receptionist/stores/ReceptionistStore'
import { useToastStore } from '../../../../stores/ToastStore'

// Mock vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush,
        currentRoute: { value: { name: 'receptionist-config', params: {} } },
    }),
}))

// Mock ReceptionistService - create the mock object first
const mockCreate = vi.fn()
const mockReceptionistServiceInstance = {
    create: mockCreate,
    update: vi.fn(),
    delete: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
}

vi.mock('@/feature/receptionist/service/ReceptionistService', () => ({
    ReceptionistService: {
        getInstance: vi.fn(() => mockReceptionistServiceInstance),
    },
}))

describe('ReceptionistConfigView', () => {
    let wrapper: VueWrapper<any>
    let receptionistStore: any
    let toastStore: any

    beforeEach(() => {
        mockPush.mockClear()
        mockCreate.mockClear()

        // Configure the mock return value
        mockCreate.mockResolvedValue({
            success: true,
            message: 'Recepcionista creado con éxito',
            type: 'success',
        })

        wrapper = mount(ReceptionistConfigView, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                        stubActions: false,
                    }),
                ],
                // Stub child components to simplify testing
                stubs: {
                    FormInput: true,
                    FormTextarea: true,
                    FormSlider: true,
                    BaseButton: true,
                },
            },
        })

        receptionistStore = useReceptionistStore()
        toastStore = useToastStore()
    })

    describe('Component Rendering', () => {
        it('should render the view with title and description', () => {
            expect(wrapper.text()).toContain('Configuración de Recepcionista')
            expect(wrapper.text()).toContain('Configura los detalles de tu recepcionista virtual')
        })

        it('should render the ReceptionistConfigForm component', () => {
            const form = wrapper.findComponent(ReceptionistConfigForm)
            expect(form.exists()).toBe(true)
        })
    })

    describe('Form Submission Handler', () => {
        it('should call handleSubmit when form emits submit event', async () => {
            const formData = {
                name: 'Test Name',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            // Find form and emit submit event
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            // Check that the service was called (which means handleSubmit was called)
            expect(mockCreate).toHaveBeenCalledWith(formData)
        })

        it('should call ReceptionistService.create when form is submitted', async () => {
            const formData = {
                name: 'Test Name',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            // Emit submit event from the form
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            expect(mockCreate).toHaveBeenCalledWith(formData)
        })

        it('should call ReceptionistService.create with correct data', async () => {
            const formData = {
                name: 'María González',
                phoneNumber: '+56987654321',
                avatar: 'https://example.com/avatar.jpg',
                clientInfo: 'Cliente VIP',
                restrictions: 'No llamar después de las 18:00',
                formalityLevel: 0.7,
                dynamismLevel: 0.6,
                appointmentMaxDays: 60,
                appointmentMinDays: 2,
            }

            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            expect(mockCreate).toHaveBeenCalledWith(formData)
        })

        it('should show success toast after successful creation', async () => {
            const formData = {
                name: 'Test',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            expect(toastStore.addToast).toHaveBeenCalledWith(
                'success',
                'Recepcionista creado con éxito',
            )
        })

        it('should navigate to receptionist list after successful creation', async () => {
            const formData = {
                name: 'Test',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            expect(mockPush).toHaveBeenCalledWith({ name: 'receptionist' })
        })

        it('should show error toast when creation fails', async () => {
            mockCreate.mockResolvedValue({
                success: false,
                message: 'Error al crear recepcionista',
                type: 'error',
            })

            const formData = {
                name: 'Test',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            expect(toastStore.addToast).toHaveBeenCalledWith(
                'error',
                'Error al crear recepcionista',
            )
        })
    })

    describe('Form Cancellation Handler', () => {
        it('should call handleCancel when form emits cancel event', async () => {
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('cancel')
            await flushPromises()

            // Check that router.push was called (which means handleCancel was called)
            expect(mockPush).toHaveBeenCalledWith({ name: 'receptionist' })
        })

        it('should navigate to receptionist list when cancel is clicked', async () => {
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('cancel')
            await flushPromises()

            expect(mockPush).toHaveBeenCalledWith({ name: 'receptionist' })
        })

        it('should not call ReceptionistService.create when cancel is clicked', async () => {
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('cancel')
            await flushPromises()

            expect(mockCreate).not.toHaveBeenCalled()
        })
    })

    describe('Integration Flow', () => {
        it('should complete full submission flow: click submit -> call service -> show toast -> navigate', async () => {
            const formData = {
                name: 'Integration Test',
                phoneNumber: '+56912345678',
                avatar: '',
                clientInfo: '',
                restrictions: '',
                formalityLevel: 0.5,
                dynamismLevel: 0.5,
                appointmentMaxDays: 30,
                appointmentMinDays: 1,
            }

            // 1. Emit submit from form
            const form = wrapper.findComponent(ReceptionistConfigForm)
            await form.vm.$emit('submit', formData)
            await flushPromises()

            // 2. Service should be called
            expect(mockCreate).toHaveBeenCalledWith(formData)

            // 3. Toast should be shown
            expect(toastStore.addToast).toHaveBeenCalledWith(
                'success',
                'Recepcionista creado con éxito',
            )

            // 4. Navigation should occur
            expect(mockPush).toHaveBeenCalledWith({ name: 'receptionist' })
        })
    })
})
