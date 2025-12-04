
export class ReceptionistData {
    constructor(
        public name: string,
        public cellphone?: string,
        public avatarId?: string,
        public enterpriseInformation?: string,
        public clientInformation?: string,
        public businessRestrictions?: string,
        public levelFormality?: number,
        public levelDynamism?: number,
        public anticipationMaxDays?: number,
        public anticipationMinDays?: number,
    ) {}

}
