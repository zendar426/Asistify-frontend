import type { ReceptionistDto } from "../dto/ReceptionistDto"

export class Receptionist {
    constructor(
        public id: string,
        public name: string,
        public phoneNumber?: string,
        public profilePicture?: string
    ) {}

    static fromReceptionistDto(dto: ReceptionistDto): Receptionist {
        return new Receptionist(
            dto.id,
            dto.name,
            dto.phoneNumber,
            dto.profilePicture
        )
    }

    static fromReceptionistDtoArray(dtos: ReceptionistDto[]): Receptionist[] {
        return dtos.map((dto) => this.fromReceptionistDto(dto))
    }
}
