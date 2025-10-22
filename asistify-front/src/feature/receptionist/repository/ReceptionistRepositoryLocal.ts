import type { Result } from '@/utils/types'
import type { ReceptionistRepository } from './ReceptionistRepository'
import { dummyReceptionists } from '../data/dummyData'
import type { Receptionist } from '../models/Receptionist'
import { ToastType } from '@/stores/ToastStore'
import { useReceptionistStore } from '../stores/ReceptionistStore'

export class ReceptionistRepositoryLocal implements ReceptionistRepository {
    private static instance: ReceptionistRepositoryLocal
    private dummy: Receptionist[]
    private receptionistStore = useReceptionistStore()

    private constructor() {
        this.dummy = dummyReceptionists
    }

    public static getInstance(): ReceptionistRepositoryLocal {
        if (!ReceptionistRepositoryLocal.instance) {
            ReceptionistRepositoryLocal.instance = new ReceptionistRepositoryLocal()
        }
        return ReceptionistRepositoryLocal.instance
    }

    public async findAll(): Promise<Result<Receptionist[] | void>> {
        this.receptionistStore.setReceptionists(this.dummy)

        return {
            success: true,
            message: 'Dummy receptionists fetched successfully',
            type: ToastType.success,
            data: this.dummy,
        } as Result<Receptionist[]>
    }

    public async findById(id: string): Promise<Result<Receptionist | void>> {
        const receptionist = this.dummy.find((r) => r.id === id)
        if (receptionist) {
            return {
                success: true,
                data: receptionist,
                message: 'Dummy receptionist fetched successfully',
            } as Result<Receptionist>
        }
        return {
            success: false,
            message: 'Receptionist not found',
            type: ToastType.error,
        } as Result<Receptionist>
    }
    public async create(receptionistData: any): Promise<Result<Receptionist | void>> {
        throw new Error('Method not implemented.')
    }

    public async update(id: string, receptionistData: any): Promise<Result> {
        throw new Error('Method not implemented.')
    }

    public async delete(id: string): Promise<Result> {
        throw new Error('Method not implemented.')
    }
}
