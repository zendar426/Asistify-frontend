import { api} from '@/api/axios'
import type { Enterprise } from '../models/Enterprise'
import type { EnterpriseRepository } from './EnterpriseRepository'  
import { logger } from '@/utils/logger'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { API_ROUTE } from '@/utils/config'

export class EnterpriseRepositoryApi implements EnterpriseRepository {
    private static instance: EnterpriseRepositoryApi
    
    private constructor() {}
    public static getInstance(): EnterpriseRepositoryApi {
        if (!EnterpriseRepositoryApi.instance) {
            EnterpriseRepositoryApi.instance = new EnterpriseRepositoryApi()
        }
        return EnterpriseRepositoryApi.instance
    }
    
    public async findAll(): Promise<Result<Enterprise[] | void>> {
        try {
            const response = await api.get(`${API_ROUTE}/enterprises`)
            logger.info('[GET_ENTERPRISES]', 'response: ', response)

            if (response.status === 200) {
                const enterprisesData = response.data.data || response.data
                const enterprises = enterprisesData.map((data: any) => Enterprise.fromDto(data))
                
                return {
                    success: true,
                    message: 'Seleccione su tipo de empresa',
                    type: ToastType.info,
                    data: enterprises,
                } as Result<Enterprise[]>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Enterprise[]>
        } catch (error: any) {
            logger.error('[GET_ENTERPRISES]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Enterprise[]>
        }   
    }
}