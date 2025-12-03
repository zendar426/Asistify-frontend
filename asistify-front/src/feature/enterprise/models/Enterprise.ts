import {z} from 'zod';

const EnterpriseSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
});

export type EnterpriseDto = z.infer<typeof EnterpriseSchema>;

export class Enterprise {
    private readonly name: string;
    private readonly description: string;

    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description || '';
    }

    static fromDto(dto: EnterpriseDto): Enterprise {
        return new Enterprise(dto.name, dto.description);
    }
    
    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    toDTO(): EnterpriseDto {
        return {
            name: this.name,
            description: this.description,
        };
    }
}