import type { AvatarRepository } from '../repository/AvatarRepository'
import { AvatarRepositoryApi } from '../repository/AvatarRepositoryApi'

export class AvatarService {
    private static instance: AvatarService
    private readonly avatarRepository: AvatarRepository

    private constructor() {
        this.avatarRepository = AvatarRepositoryApi.getInstance()
    }

    public static getInstance(): AvatarService {
        if (!AvatarService.instance) {
            AvatarService.instance = new AvatarService()
        }
        return AvatarService.instance
    }

    public findAll() {
        return this.avatarRepository.findAll()
    }
}
