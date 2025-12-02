import { z } from 'zod'

export const ReceptionistDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    cellphone: z.string().optional(),
    avatarId: z.string().uuid(),
    avatar: z.object({
        id: z.string(),
        url: z.string(),
    }).optional(),
    enterpriseInformation: z.string().optional(),
    clientInformation: z.string().optional(),
    businessRestrictions: z.string().optional(),
    levelFormality: z.number().min(0).max(1).optional(),
    levelDynamism: z.number().min(0).max(1).optional(),
    anticipationMaxDays: z.number().min(1).optional(),
    anticipationMinDays: z.number().min(1).optional(),
})

export type ReceptionistDto = z.infer<typeof ReceptionistDtoSchema>
