import { z } from 'zod'

export const ReceptionistDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    cellphone: z.string().optional(),
    avatarId: z.string(),
    avatar: z
        .object({
            id: z.string(),
            url: z.string(),
        })
        .optional(),
    enterpriseInformation: z.string().nullable().optional(),
    clientInformation: z.string().nullable().optional(),
    businessRestrictions: z.string().nullable().optional(),
    levelFormality: z.number().min(0).max(10).optional(),
    levelDynamism: z.number().min(0).max(10).optional(),
    anticipationMaxDays: z.number().min(1).optional(),
    anticipationMinDays: z.number().min(1).optional(),
    createdAt: z.string().or(z.date()).optional(),
})

export type ReceptionistDto = z.infer<typeof ReceptionistDtoSchema>
