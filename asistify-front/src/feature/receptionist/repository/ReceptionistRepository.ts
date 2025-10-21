import type { Result } from "@/utils/types";
import type { Receptionist } from "../models/Receptionist";

export abstract class ReceptionistRepository {
    public abstract findAll(): Promise<Result>;
    public abstract findById(id: string): Promise<Result | null>;
    public abstract create(receptionist: Receptionist): Promise<Result | null>;
    public abstract update(id: string, receptionist: Receptionist): Promise<Result | null>;
    public abstract delete(id: string): Promise<Result | null>;
}