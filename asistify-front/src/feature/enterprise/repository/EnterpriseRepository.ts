import type { Result } from "@/utils/types";
import { Enterprise, type EnterpriseDto } from "../models/Enterprise";

export abstract class EnterpriseRepository {
    // Enterprise CRUD
    public abstract findAll(): Promise<Result<Enterprise[] | void>>;
    public abstract findById(id: string): Promise<Result<Enterprise | void>>;
    public abstract create(data: EnterpriseDto): Promise<Result<Enterprise | void>>;
    public abstract update(id: string, data: Partial<EnterpriseDto>): Promise<Result<Enterprise | void>>;
    public abstract delete(id: string): Promise<Result<void>>;
}