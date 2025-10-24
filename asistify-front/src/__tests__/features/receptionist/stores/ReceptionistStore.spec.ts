import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useReceptionistStore } from '../../../../feature/receptionist/stores/ReceptionistStore'
import { Receptionist } from '../../../../feature/receptionist/models/Receptionist'

describe('ReceptionistStore', () => {
    let store: ReturnType<typeof useReceptionistStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useReceptionistStore()
    })

    describe('Initial State', () => {
        it('should initialize with empty receptionist array', () => {
            expect(store.receptionist).toEqual([])
            expect(store.receptionist.length).toBe(0)
        })
    })

    describe('setReceptionists', () => {
        it('should set the receptionists array', () => {
            const receptionists = [
                new Receptionist(
                    '1',
                    'Juan Pérez',
                    '+56912345678',
                    'https://example.com/juan.jpg',
                    '', // companyInfo
                    'Cliente VIP',
                    'No llamar después de las 18:00',
                    0.7,
                    0.6,
                    60,
                    2,
                ),
                new Receptionist(
                    '2',
                    'María González',
                    '+56987654321',
                    'https://example.com/maria.jpg',
                    '', // companyInfo
                    'Cliente regular',
                    'Horario flexible',
                    0.8,
                    0.7,
                    30,
                    1,
                ),
            ]

            store.setReceptionists(receptionists)

            expect(store.receptionist).toEqual(receptionists)
            expect(store.receptionist.length).toBe(2)
        })

        it('should replace existing receptionists when called multiple times', () => {
            const firstBatch = [
                new Receptionist('1', 'First', '+56911111111', '', '', '', '', 0.5, 0.5, 30, 1),
            ]
            const secondBatch = [
                new Receptionist('2', 'Second', '+56922222222', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('3', 'Third', '+56933333333', '', '', '', '', 0.5, 0.5, 30, 1),
            ]

            store.setReceptionists(firstBatch)
            expect(store.receptionist.length).toBe(1)

            store.setReceptionists(secondBatch)
            expect(store.receptionist.length).toBe(2)
            expect(store.receptionist[0].id).toBe('2')
            expect(store.receptionist[1].id).toBe('3')
        })
    })

    describe('addReceptionist', () => {
        it('should add a new receptionist to the array', () => {
            const receptionist = new Receptionist(
                '1',
                'Carlos Rodríguez',
                '+56912345678',
                'https://example.com/carlos.jpg',
                '', // companyInfo
                'Cliente nuevo',
                'Sin restricciones',
                0.6,
                0.7,
                45,
                1,
            )

            store.addReceptionist(receptionist)

            expect(store.receptionist.length).toBe(1)
            expect(store.receptionist[0]).toEqual(receptionist)
            expect(store.receptionist[0].name).toBe('Carlos Rodríguez')
        })

        it('should append receptionist to existing array', () => {
            const first = new Receptionist(
                '1',
                'First',
                '+56911111111',
                '',
                '', // companyInfo
                '',
                '',
                0.5,
                0.5,
                30,
                1,
            )
            const second = new Receptionist(
                '2',
                'Second',
                '+56922222222',
                '',
                '', // companyInfo
                '',
                '',
                0.5,
                0.5,
                30,
                1,
            )

            store.addReceptionist(first)
            store.addReceptionist(second)

            expect(store.receptionist.length).toBe(2)
            expect(store.receptionist[0].id).toBe('1')
            expect(store.receptionist[1].id).toBe('2')
        })

        it('should maintain order of added receptionists', () => {
            const receptionists = [
                new Receptionist('1', 'First', '+56911111111', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('2', 'Second', '+56922222222', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('3', 'Third', '+56933333333', '', '', '', '', 0.5, 0.5, 30, 1),
            ]

            receptionists.forEach((r) => store.addReceptionist(r))

            expect(store.receptionist.map((r) => r.id)).toEqual(['1', '2', '3'])
        })
    })

    describe('removeReceptionist', () => {
        beforeEach(() => {
            const receptionists = [
                new Receptionist('1', 'First', '+56911111111', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('2', 'Second', '+56922222222', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('3', 'Third', '+56933333333', '', '', '', '', 0.5, 0.5, 30, 1),
            ]
            store.setReceptionists(receptionists)
        })

        it('should remove receptionist by id', () => {
            store.removeReceptionist('2')

            expect(store.receptionist.length).toBe(2)
            expect(store.receptionist.find((r) => r.id === '2')).toBeUndefined()
            expect(store.receptionist.map((r) => r.id)).toEqual(['1', '3'])
        })

        it('should not affect array if id does not exist', () => {
            const initialLength = store.receptionist.length

            store.removeReceptionist('non-existent-id')

            expect(store.receptionist.length).toBe(initialLength)
        })

        it('should remove correct receptionist when multiple exist', () => {
            store.removeReceptionist('1')

            expect(store.receptionist.length).toBe(2)
            expect(store.receptionist[0].id).toBe('2')
            expect(store.receptionist[1].id).toBe('3')
        })

        it('should handle removing the last receptionist', () => {
            store.removeReceptionist('1')
            store.removeReceptionist('2')
            store.removeReceptionist('3')

            expect(store.receptionist.length).toBe(0)
            expect(store.receptionist).toEqual([])
        })
    })

    describe('updateReceptionist', () => {
        beforeEach(() => {
            const receptionists = [
                new Receptionist(
                    '1',
                    'Original Name',
                    '+56911111111',
                    'https://example.com/original.jpg',
                    '', // companyInfo
                    'Original info',
                    'Original restrictions',
                    0.5,
                    0.5,
                    30,
                    1,
                ),
                new Receptionist('2', 'Second', '+56922222222', '', '', '', '', 0.5, 0.5, 30, 1),
            ]
            store.setReceptionists(receptionists)
        })

        it('should update existing receptionist', () => {
            const updated = new Receptionist(
                '1',
                'Updated Name',
                '+56999999999',
                'https://example.com/updated.jpg',
                'Updated company',
                'Updated info',
                'Updated restrictions',
                0.8,
                0.9,
                60,
                2,
            )

            store.updateReceptionist(updated)

            expect(store.receptionist.length).toBe(2)
            expect(store.receptionist[0].name).toBe('Updated Name')
            expect(store.receptionist[0].phoneNumber).toBe('+56999999999')
            expect(store.receptionist[0].formalityLevel).toBe(0.8)
            expect(store.receptionist[0].dynamismLevel).toBe(0.9)
        })

        it('should not affect other receptionists when updating one', () => {
            const updated = new Receptionist(
                '1',
                'Updated Name',
                '+56999999999',
                '',
                '', // companyInfo
                '',
                '',
                0.8,
                0.9,
                60,
                2,
            )

            store.updateReceptionist(updated)

            expect(store.receptionist[1].name).toBe('Second')
            expect(store.receptionist[1].phoneNumber).toBe('+56922222222')
        })
        it('should not add new receptionist if id does not exist', () => {
            const nonExistent = new Receptionist(
                '999',
                'Non Existent',
                '+56900000000',
                '',
                '', // companyInfo
                '',
                '',
                0.5,
                0.5,
                30,
                1,
            )

            const initialLength = store.receptionist.length
            store.updateReceptionist(nonExistent)

            expect(store.receptionist.length).toBe(initialLength)
        })

        it('should maintain array order after update', () => {
            const updated2 = new Receptionist(
                '2',
                'Updated Second',
                '+56944444444',
                '',
                '', // companyInfo
                '',
                '',
                0.6,
                0.5,
                35,
                1,
            )

            store.updateReceptionist(updated2)

            expect(store.receptionist[0].id).toBe('1')
            expect(store.receptionist[1].id).toBe('2')
            expect(store.receptionist[1].name).toBe('Updated Second')
        })
    })

    describe('Complex Scenarios', () => {
        it('should handle multiple operations in sequence', () => {
            // Add
            const first = new Receptionist(
                '1',
                'First',
                '+56911111111',
                '',
                '', // companyInfo
                '',
                '',
                0.5,
                0.5,
                30,
                1,
            )
            store.addReceptionist(first)
            expect(store.receptionist.length).toBe(1)

            // Add another
            const second = new Receptionist(
                '2',
                'Second',
                '+56922222222',
                '',
                '', // companyInfo
                '',
                '',
                0.5,
                0.5,
                30,
                1,
            )
            store.addReceptionist(second)
            expect(store.receptionist.length).toBe(2)

            // Update
            const updated = new Receptionist(
                '1',
                'Updated First',
                '+56911111111',
                '',
                '', // companyInfo
                '',
                '',
                0.8,
                0.8,
                60,
                2,
            )
            store.updateReceptionist(updated)
            expect(store.receptionist[0].name).toBe('Updated First')

            // Remove
            store.removeReceptionist('2')
            expect(store.receptionist.length).toBe(1)
            expect(store.receptionist[0].id).toBe('1')
        })

        it('should handle setting empty array after having receptionists', () => {
            const receptionists = [
                new Receptionist('1', 'First', '+56911111111', '', '', '', '', 0.5, 0.5, 30, 1),
                new Receptionist('2', 'Second', '+56922222222', '', '', '', '', 0.5, 0.5, 30, 1),
            ]
            store.setReceptionists(receptionists)
            expect(store.receptionist.length).toBe(2)

            store.setReceptionists([])
            expect(store.receptionist.length).toBe(0)
            expect(store.receptionist).toEqual([])
        })
    })
})
