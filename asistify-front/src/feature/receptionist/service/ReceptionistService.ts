import type { ReceptionistRepository } from "../repository/ReceptionistRepository";
import { ReceptionistRepositoryApi } from "../repository/ReceptionistRepositoryApi";
import { ReceptionistRepositoryLocal } from "../repository/ReceptionistRepositoryLocal";

export class ReceptionistService {
    private static instance: ReceptionistService;
    private readonly receptionistRepository: ReceptionistRepository;

    private constructor() {
        this.receptionistRepository = ReceptionistRepositoryLocal.getInstance();
    }

    public static getInstance(): ReceptionistService {
        if (!ReceptionistService.instance) {
            ReceptionistService.instance = new ReceptionistService();
        }
        return ReceptionistService.instance;
    }

    public findAll() {
        return this.receptionistRepository.findAll();
    }

    public findById(id: string) {
        return this.receptionistRepository.findById(id);
    }

    public create(receptionistData: any) {
        return this.receptionistRepository.create(receptionistData);
    }

    public update(id: string, receptionistData: any) {
        return this.receptionistRepository.update(id, receptionistData);
    }

    public delete(id: string) {
        return this.receptionistRepository.delete(id);
    }

}
