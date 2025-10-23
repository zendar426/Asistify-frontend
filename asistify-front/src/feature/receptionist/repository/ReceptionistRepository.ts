import type { Result } from "@/utils/types";
import type { Receptionist } from "../models/Receptionist";
import type { ReceptionistData } from '../dto/ReceptionistData'

export abstract class ReceptionistRepository {
    public abstract findAll(): Promise<Result<Receptionist[] | void>>
    public abstract findById(id: string): Promise<Result<Receptionist | void>>
    public abstract create(receptionist: ReceptionistData): Promise<Result<Receptionist | void>>
    public abstract update(receptionist: Receptionist): Promise<Result<Receptionist | void>>
    public abstract delete(id: string): Promise<Result<Receptionist | void>>
}