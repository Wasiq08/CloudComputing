import { BaseModel } from "./base.model";

import { Specialist } from './specialist.model';

export class User extends BaseModel {

    userId: number;
    firstName: string;
    lastName: string;
    password: any;
    confirmPassword: any
    email: string;
    fullName: string;
    mobileNumber: String;
    credentials: String;
    title: String;
    country: string;
    countryId: number;
    city: string;
    cityId: number;
    region: string;
    regionId: number;
    branch: string;
    branchId: number;
    userStatus:string;
    zipCode: string;
    // specialist: Specialist = new Specialist();
    terms: string;
    token: string;
    expiry: number;
    entityType: string;
    entityName: string;
    entityId: number;
    profilePic: any;
    accountVerified: boolean;
    userRole: string;
    roleId: number;
    roleName: string;
    lastLogin: string;
    created: string;
    stateName:string;
    updated: string;
    gender: string;

    utcDSTOffset:number;
    // employer: string;
    // address: string;
    // state: string;
    // secretQuestion1: string;
    // secretQuestion2: string;
    // secretAnswer1: string;
    // secretAnswer2: string;
    // webUrl: string;
}