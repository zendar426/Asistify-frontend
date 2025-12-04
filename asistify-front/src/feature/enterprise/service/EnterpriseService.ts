// TODO: Refactor all LLM's code generated and move to the respective file

export interface Enterprise {
    id: string;
    name: string;
    description?: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface EnterpriseCategory {
    id: string;
    name: string;
    description?: string;
}

export interface EnterpriseProfile {
    id: string;
    enterpriseId: string;
    profileId: string;
}

export interface CreateEnterpriseDto {
    name: string;
    description?: string;
    categoryId: string;
}

export interface UpdateEnterpriseDto {
    name?: string;
    description?: string;
    categoryId?: string;
}

export interface CreateEnterpriseCategoryDto {
    name: string;
    description?: string;
}

export interface CreateEnterpriseProfileDto {
    enterpriseId: string;
    profileId: string;
}

export const EnterpriseService = {
    // Enterprise CRUD
    async findAll(): Promise<Enterprise[]> {
        const response = await api.get<Enterprise[]>('/enterprises');
        return response.data;
    },

    async findById(id: string): Promise<Enterprise> {
        const response = await api.get<Enterprise>(`/enterprises/${id}`);
        return response.data;
    },

    async create(data: CreateEnterpriseDto): Promise<Enterprise> {
        const response = await api.post<Enterprise>('/enterprises', data);
        return response.data;
    },

    async update(id: string, data: UpdateEnterpriseDto): Promise<Enterprise> {
        const response = await api.patch<Enterprise>(`/enterprises/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/enterprises/${id}`);
    },

    // Enterprise Categories
    async findAllCategories(): Promise<EnterpriseCategory[]> {
        const response = await api.get<EnterpriseCategory[]>('/enterprise-categories');
        return response.data;
    },

    async findCategoryById(id: string): Promise<EnterpriseCategory> {
        const response = await api.get<EnterpriseCategory>(`/enterprise-categories/${id}`);
        return response.data;
    },

    async createCategory(data: CreateEnterpriseCategoryDto): Promise<EnterpriseCategory> {
        const response = await api.post<EnterpriseCategory>('/enterprise-categories', data);
        return response.data;
    },

    // Enterprise Profiles
    async findProfilesByEnterprise(enterpriseId: string): Promise<EnterpriseProfile[]> {
        const response = await api.get<EnterpriseProfile[]>(`/enterprise-profiles/enterprise/${enterpriseId}`);
        return response.data;
    },

    async findProfilesByProfile(profileId: string): Promise<EnterpriseProfile[]> {
        const response = await api.get<EnterpriseProfile[]>(`/enterprise-profiles/profile/${profileId}`);
        return response.data;
    },

    async createProfile(data: CreateEnterpriseProfileDto): Promise<EnterpriseProfile> {
        const response = await api.post<EnterpriseProfile>('/enterprise-profiles', data);
        return response.data;
    },

    async deleteProfile(enterpriseId: string, profileId: string): Promise<void> {
        await api.delete(`/enterprise-profiles/${enterpriseId}/${profileId}`);
    },
};