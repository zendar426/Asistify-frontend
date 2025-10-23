
export class ReceptionistData {
    constructor(
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

}
