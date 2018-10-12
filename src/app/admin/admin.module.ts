import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { AdminHomeComponent } from './home/admin.home.component';
import { RegionComponent, AddRegionField, DeleteRegionField, EditRegionField } from './setup-forms/region/region.component';
import { BranchComponent, AddBranchField, DeleteBranchField, EditBranchField } from './setup-forms/branch/branch.component';
import { DesignationComponent, AddDesignationField, DeleteDesignationField, EditDesignationField } from './setup-forms/designation/designation.component';
import { DepartmentComponent, AddDepartmentField, DeleteDepartmentField, EditDepartmentField } from './setup-forms/department/department.component';
import { RoleComponent, AddRoleField, DeleteRoleField, EditRoleField } from './setup-forms/role/role.component';
import { PermissionComponent, AddPermissionField, DeletePermissionField, EditPermissionField } from './setup-forms/permission/permission.component';
import { AssignPermissionComponent, ViewRolePermission } from './setup-forms/assign.permission/assign.permission.component';
import { CaseTypeComponent, AddCaseTypeField, DeleteCaseTypeField, EditCaseTypeField } from './setup-forms/case.type/case.type.component';
import { CaseNatureComponent, AddCaseNatureField, DeleteCaseNatureField, EditCaseNatureField } from './setup-forms/case.nature/case.nature.component';
import { CaseTerritoryComponent, AddCaseTerritoryField, DeleteCaseTerritoryField, EditCaseTerritoryField } from './setup-forms/case.territory/case.territory.component';
import { CaseClassificationComponent, AddCaseClassificationField, DeleteCaseClassificationField, EditCaseClassificationField } from './setup-forms/case.classification/case.classification.component';
import { CaseDocumentComponent, AddCaseDocumentField, DeleteCaseDocumentField, EditCaseDocumentField } from './setup-forms/case.document/case.document.component';
import { CaseDocumentNatureComponent, AddCaseDocumentNatureField, DeleteCaseDocumentNatureField, EditCaseDocumentNatureField } from './setup-forms/case.document.nature/case.document.nature.component';

import { ManageBranchComponent, ManageAddBranchField, ManageDeleteBranchField, ManageEditBranchField } from './setup-forms/manage.branch/manage.branch.component';
import { ManageRoleComponent, ManageAddRoleField, ManageDeleteRoleField, ManageEditRoleField } from './setup-forms/manage.role/manage.role.component';
import { CaseSetupComponent } from './setup-forms/case.setup/case.setup.component';

import { UserListComponent } from './users/user.list.component';
import { UserAddComponent } from './users/user.add.component';
import { UserFilterPipe } from '../pipes/user-filter.pipe';

import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        AdminHomeComponent,
        RegionComponent, AddRegionField,
        DeleteRegionField, EditRegionField,
        BranchComponent, AddBranchField,
        DeleteBranchField, EditBranchField,
        DesignationComponent, AddDesignationField,
        DeleteDesignationField, EditDesignationField,
        DepartmentComponent, AddDepartmentField,
        DeleteDepartmentField, EditDepartmentField,
        RoleComponent, AddRoleField,
        DeleteRoleField, EditRoleField,
        PermissionComponent, AddPermissionField,
        DeletePermissionField, EditPermissionField,
        AssignPermissionComponent, ViewRolePermission,
        ManageBranchComponent, ManageAddBranchField,
        ManageDeleteBranchField, ManageEditBranchField,
        ManageRoleComponent, ManageAddRoleField,
        ManageDeleteRoleField, ManageEditRoleField,
        CaseSetupComponent,
        CaseTypeComponent, AddCaseTypeField,
        DeleteCaseTypeField, EditCaseTypeField,
        CaseNatureComponent, AddCaseNatureField,
        DeleteCaseNatureField, EditCaseNatureField,
        CaseTerritoryComponent, AddCaseTerritoryField,
        DeleteCaseTerritoryField, EditCaseTerritoryField,
        CaseClassificationComponent, AddCaseClassificationField,
        DeleteCaseClassificationField, EditCaseClassificationField,
        CaseDocumentComponent, AddCaseDocumentField,
        DeleteCaseDocumentField, EditCaseDocumentField,
        CaseDocumentNatureComponent, AddCaseDocumentNatureField,
        DeleteCaseDocumentNatureField, EditCaseDocumentNatureField,
        UserListComponent,
        UserAddComponent,
        UserFilterPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild([
            {
                path: 'home',
                component: AdminHomeComponent
            },
            // {
            //     path: 'region',
            //     component: RegionComponent
            // },
            // {
            //     path: 'branch',
            //     component: BranchComponent
            // },
            // {
            //     path: 'designation',
            //     component: DesignationComponent
            // },
            {
                path: 'department',
                component: DepartmentComponent
            },
            // {
            //     path: 'role',
            //     component: RoleComponent
            // },
            // {
            //     path: 'permission',
            //     component: PermissionComponent
            // },

            // {
            //     path: 'case-type',
            //     component: CaseTypeComponent
            // },
            // {
            //     path: 'case-nature',
            //     component: CaseNatureComponent
            // },
            // {
            //     path: 'case-territory',
            //     component: CaseTerritoryComponent
            // },
            // {
            //     path: 'case-classification',
            //     component: CaseClassificationComponent
            // },

            {
                path: 'assign-permission',
                component: AssignPermissionComponent
            },
            {
                path: 'manage-branch',
                component: ManageBranchComponent
            },
            {
                path: 'case-setup',
                component: CaseSetupComponent
            },
            {
                path: 'manage-role',
                component: ManageRoleComponent
            },
            {
                path: 'users/list',
                component: UserListComponent
            },
            {
                path: 'users/add',
                component: UserAddComponent
            },
            { path: '**', redirectTo: '/', pathMatch: 'full' }
        ])
    ],
    entryComponents: [
        AddRegionField,
        DeleteRegionField, EditRegionField,
        AddBranchField,
        DeleteBranchField, EditBranchField,
        AddDesignationField,
        DeleteDesignationField, EditDesignationField,
        AddDepartmentField,
        DeleteDepartmentField, EditDepartmentField,
        AddRoleField,
        DeleteRoleField, EditRoleField,
        AddPermissionField,
        DeletePermissionField, EditPermissionField,
        ViewRolePermission,
        ManageAddBranchField,
        ManageDeleteBranchField, ManageEditBranchField,
        ManageAddRoleField,
        ManageDeleteRoleField, ManageEditRoleField,
        AddCaseTypeField,
        DeleteCaseTypeField, EditCaseTypeField,
        AddCaseNatureField,
        DeleteCaseNatureField, EditCaseNatureField,
        AddCaseTerritoryField,
        DeleteCaseTerritoryField, EditCaseTerritoryField,
        AddCaseClassificationField,
        DeleteCaseClassificationField, EditCaseClassificationField,
        AddCaseDocumentField,
        DeleteCaseDocumentField, EditCaseDocumentField,
        AddCaseDocumentNatureField, 
        DeleteCaseDocumentNatureField, EditCaseDocumentNatureField,
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ]
})

export class AdminModule { }