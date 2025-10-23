import { z } from 'zod'

export const ReceptionistDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().optional(),
    avatar: z.url().optional().or(z.literal('')),
    companyInfo: z.string().optional(),
    clientInfo: z.string().optional(),
    restrictions: z.string().optional(),
    formalityLevel: z.number().min(0).max(1).optional(),
    dynamismLevel: z.number().min(0).max(1).optional(),
    appointmentMaxDays: z.number().min(1).optional(),
    appointmentMinDays: z.number().min(1).optional(),
})

export type ReceptionistDto = z.infer<typeof ReceptionistDtoSchema>
