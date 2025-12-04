import { z } from 'zod'

// Esquema del DTO de Enterprise
export const EnterpriseDtoSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional().default(''),
})

// Tipo inferido desde el esquema
export type EnterpriseDto = z.infer<typeof EnterpriseDtoSchema>

// Helper opcional para validar un objeto cualquiera contra el esquema
export function validateEnterpriseDto(input: unknown): EnterpriseDto {
    return EnterpriseDtoSchema.parse(input)
}