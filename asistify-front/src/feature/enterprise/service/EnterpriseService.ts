import { Axios } from "axios";

const API_BASE_URL = "http://localhost:3000"
export class EnterpriseService {

//TODO: implementar el coso a traves de un env
    constructor(private apiClient: Axios) {
        function createEnterprise(data: { name: string; description: string }) {
            return this.apiClient.post(`${API_BASE_URL}/enterprise-categories`, data);
        }
    }
}
