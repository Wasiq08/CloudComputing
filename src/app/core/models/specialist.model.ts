import { BaseModel } from "./base.model";

export class Specialist extends BaseModel {
    speciality: string;
    deaNumber: string;
    npiNumber: string;
    physicianLicenseNumber: string;
    licensedStates: string;
    practiceGroup: string;
}