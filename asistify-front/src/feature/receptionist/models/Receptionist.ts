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
    ) {}

    static fromReceptionistDto(dto: ReceptionistDto): Receptionist {
        return new Receptionist(
            dto.id,
            dto.name,
            dto.cellphone,
            dto.avatarId,
            dto.avatar,
            dto.enterpriseInformation,
            dto.clientInformation,
            dto.businessRestrictions,
            dto.levelFormality,
            dto.levelDynamism,
            dto.anticipationMaxDays,
            dto.anticipationMinDays
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
            data.anticipationMinDays
        )
    }   
}
