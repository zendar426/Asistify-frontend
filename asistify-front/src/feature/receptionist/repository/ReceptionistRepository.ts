import type { Result } from "@/utils/types";
import type { Receptionist } from "../models/Receptionist";

export abstract class ReceptionistRepository {
    public abstract findAll(): Promise<Result<Receptionist[] | void>>;
    public abstract findById(id: string): Promise<Result<Receptionist | void>>;
    public abstract create(receptionist: Receptionist): Promise<Result<Receptionist | void>>;
    public abstract update(id: string, receptionist: Receptionist): Promise<Result<Receptionist | void>>;
    public abstract delete(id: string): Promise<Result | null>;
}