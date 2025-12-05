import type { Result } from "@/utils/types";
import type { Avatar } from "../models/Avatar";

export abstract class AvatarRepository {
    public abstract findAll(): Promise<Result<Avatar[]>>
}
