export class User{
    public name: String
    public surname:String
    public email:String
    public orgName:String

    constructor(json:any){
        this.name=json.name
        this.surname=json.surname
        this.email=json.email
        this.orgName=json.orgName
    }

    asJson():any{
        return {
            name:this.name,
            surname:this.surname,
            email:this.email,
            orgName:this.orgName
        }
    }
}