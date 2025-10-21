import { ReceptionistRepositoryApi } from "../repository/ReceptionistRepositoryApi";

export class ReceptionistService {
    private static instance: ReceptionistService;
    private readonly receptionistRepositoryApi: ReceptionistRepositoryApi;

    private constructor() {
        this.receptionistRepositoryApi = ReceptionistRepositoryApi.getInstance();
    }

    public static getInstance(): ReceptionistService {
        if (!ReceptionistService.instance) {
            ReceptionistService.instance = new ReceptionistService();
        }
        return ReceptionistService.instance;
    }

    public findAll() {
        return this.receptionistRepositoryApi.findAll();
    }

    public findById(id: string) {
        return this.receptionistRepositoryApi.findById(id);
    }

    public create(receptionistData: any) {
        return this.receptionistRepositoryApi.create(receptionistData);
    }

    public update(id: string, receptionistData: any) {
        return this.receptionistRepositoryApi.update(id, receptionistData);
    }

    public delete(id: string) {
        return this.receptionistRepositoryApi.delete(id);
    }

}
