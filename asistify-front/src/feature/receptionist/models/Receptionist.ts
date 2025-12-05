import type { ReceptionistData } from "../dto/ReceptionistData"
import type { ReceptionistDto } from "../dto/ReceptionistDto"

export class Receptionist {
    constructor(
        public id: string,
        public name: string,
        public cellphone?: string,
        public avatarId?: string,
        public avatar?: { id: string; url: string },
        public enterpriseInformation?: string,
        public clientInformation?: string,
        public businessRestrictions?: string,
        public levelFormality?: number,
        public levelDynamism?: number,
        public anticipationMaxDays?: number,
        public anticipationMinDays?: number,
        public createdAt?: Date,
    ) {}

    static fromReceptionistDto(dto: ReceptionistDto): Receptionist {
        return new Receptionist(
            dto.id,
            dto.name,
            dto.cellphone,
            dto.avatarId,
            dto.avatar,
            dto.enterpriseInformation ?? undefined,
            dto.clientInformation ?? undefined,
            dto.businessRestrictions ?? undefined,
            dto.levelFormality,
            dto.levelDynamism,
            dto.anticipationMaxDays,
            dto.anticipationMinDays,
            dto.createdAt ? new Date(dto.createdAt) : undefined
        )
    }

    static fromReceptionistDtoArray(dtos: ReceptionistDto[]): Receptionist[] {
        return dtos.map((dto) => this.fromReceptionistDto(dto))
    }

    static fromReceptionistData(data: Omit<ReceptionistData, 'id'>): Receptionist {
        return new Receptionist(
            crypto.randomUUID(),
            data.name,
            data.cellphone,
            data.avatarId,
            undefined, // avatar
            data.enterpriseInformation,
            data.clientInformation,
            data.businessRestrictions,
            data.levelFormality,
            data.levelDynamism,
            data.anticipationMaxDays,
            data.anticipationMinDays,
            new Date() // Default for new data
        )
    }   
}
