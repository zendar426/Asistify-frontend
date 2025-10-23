import type { ReceptionistData } from "../dto/ReceptionistData"
import type { ReceptionistDto } from "../dto/ReceptionistDto"

export class Receptionist {
    constructor(
        public id: string,
        public name: string,
        public phoneNumber?: string,
        public avatar?: string,
        public companyInfo?: string,
        public clientInfo?: string,
        public restrictions?: string,
        public formalityLevel?: number,
        public dynamismLevel?: number,
        public appointmentMaxDays?: number,
        public appointmentMinDays?: number,
    ) {}

    static fromReceptionistDto(dto: ReceptionistDto): Receptionist {
        return new Receptionist(
            dto.id,
            dto.name,
            dto.phoneNumber,
            dto.avatar,
            dto.companyInfo,
            dto.clientInfo,
            dto.restrictions,
            dto.formalityLevel,
            dto.dynamismLevel,
            dto.appointmentMaxDays,
            dto.appointmentMinDays
        )
    }

    static fromReceptionistDtoArray(dtos: ReceptionistDto[]): Receptionist[] {
        return dtos.map((dto) => this.fromReceptionistDto(dto))
    }

    static fromReceptionistData(data: Omit<ReceptionistData, 'id'>): Receptionist {
        return new Receptionist(
            crypto.randomUUID(),
            data.name,
            data.phoneNumber,
            data.avatar,
            data.companyInfo,
            data.clientInfo,
            data.restrictions,
            data.formalityLevel,
            data.dynamismLevel,
            data.appointmentMaxDays,
            data.appointmentMinDays
        )
    }   
}
