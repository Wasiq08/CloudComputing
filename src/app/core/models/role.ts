import { BaseModel } from './base.model';
import { Permission } from './permission';

export class Role {

    id: number;
    roleId: number;
    roleName: string;
    selected: boolean;
    roleCode: string;
    departmentId: number;
    permissions: Permission[];
    value: string;

}
