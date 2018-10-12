import { BaseModel } from "./base.model";

import { Role } from './role';

export class User extends BaseModel {

    userId: number;
    sapId: string;
    firstName: string;
    lastName: string;
    password: any;
    confirmPassword: any
    email: string;

    fullName: string;
    mobileNumber: String;
    phoneNumber: String;
    cnic: String;

    credentials: String;
    title: String;
    country: string;
    countryId: number;
    region: string;
    regionId: number;
    state: string;
    stateId: number;
    city: string;
    cityId: number;
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
    designationId: number;
    designationName: string;
    departmentId: number;
    departmentName: string;
    userRole: string;
    userRolePermission: Role = new Role();
    // roleId: number;
    // roleName: string;

    lastLogin: string;
    stateName:string;

    // createdOn: string;
    // createdBy: string;
    // updatedOn: string;
    // updatedBy: string;
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
    unsuccessfulAttempts: string;
    isActive: boolean;
    isBlocked: boolean;
    isLoggedIn: boolean;
}