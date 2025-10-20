import { z } from 'zod'

export const ReceptionistDtoSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().optional(),
    profilePicture: z.url().optional().or(z.literal('')),
})

export type ReceptionistDto = z.infer<typeof ReceptionistDtoSchema>
