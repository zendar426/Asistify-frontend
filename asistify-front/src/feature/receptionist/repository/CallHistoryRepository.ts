import type { Result } from "@/utils/types";

export interface CallHistoryData {
    date: Date
    clientName: string
    durationInSeconds: number
    receptionistId: string
    state: string
}

export abstract class CallHistoryRepository {
    public abstract save(data: CallHistoryData): Promise<Result<void>>
}
