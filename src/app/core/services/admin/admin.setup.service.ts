import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Token } from "../../models/token";
import { environment } from '../../../../environments/environment';
import { Injectable, Inject } from '@angular/core';

import { IAuthService } from '../auth/iauth.service';

@Injectable()
export class AdminSetupService {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService
    ) {
    }

    // --------- OBJECTIVE & CATEGORY
    public addCategory(name): Observable<any> {
        const getUrl = 'backoffice/add/campaign/category';
        const body = {
            categoryName: name
        };

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCategory(post): Observable<any> {

        const getUrl = 'backoffice/update/campaign/category';
        const body = {
            id: post.id,
            categoryName: post.displayName,
        };

        return this._http.put(getUrl, body)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- City
    public getCities(): Observable<any> {
        const getUrl = 'city/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Branch
    public getBranchs(): Observable<any> {
        const getUrl = 'branch/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addBranch(branch): Observable<any> {
        // const getUrl = 'add/branch';
        const getUrl = 'branch/add';
        
        const body = {
            BranchName: branch.branchName,
            CityId: branch.cityId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateBranch(branch): Observable<any> {
        // const getUrl = 'update/branch';
        const getUrl = 'branch/update';
        const body = {
            Id: branch.id,
            BranchId: branch.branchId,
            BranchName: branch.branchName,
            CityId: branch.cityId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteBranch(id): Observable<any> {
        // const getUrl = 'delete/branch';
        const getUrl = 'branch/delete';
        const body = {
            id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- Region
    public getRegions(): Observable<any> {
        const getUrl = 'region/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addRegion(region): Observable<any> {
        // const getUrl = 'add/region';
        const getUrl = 'region/add';
        
        const body = {
            RegionName: region.regionName,
            CountryId: region.countryId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateRegion(region): Observable<any> {
        // const getUrl = 'update/region';
        const getUrl = 'region/update';
        const body = {
            Id: region.id,
            RegionId: region.regionId,
            RegionName: region.regionName,
            CountryId: region.countryId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteRegion(id): Observable<any> {
        // const getUrl = 'delete/region';
        const getUrl = 'region/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- Designation
    public getDesignations(): Observable<any> {
        const getUrl = 'designation/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addDesignation(post): Observable<any> {
        // const getUrl = 'add/designation';
        const getUrl = 'designation/add';
        const body = {
            DesignationName: post.designationName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateDesignation(post): Observable<any> {
        // const getUrl = 'update/designation';
        const getUrl = 'designation/update';
        const body = {
            Id: post.id,
            DesignationId: post.designationId,
            DesignationName: post.designationName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteDesignation(id): Observable<any> {
        // const getUrl = 'delete/designation';
        const getUrl = 'designation/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- Department

    public getDepartments(): Observable<any> {
        const getUrl = 'department/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addDepartment(department): Observable<any> {
        // const getUrl = 'add/department';
        const getUrl = 'department/add';
        const body = {
            DepartmentName: department.departmentName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateDepartment(department): Observable<any> {
        // const getUrl = 'update/department';
        const getUrl = 'department/update';
        const body = {
            Id: department.id,
            DepartmentId: department.departmentId,
            DepartmentName: department.departmentName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteDepartment(id): Observable<any> {
        // const getUrl = 'delete/department';
        const getUrl = 'department/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- Role

    public getRolesViaId(id): Observable<any> {
        // const getUrl = 'role/' + id;
        const getUrl = 'role/via/department/' + id;
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public getRoles(): Observable<any> {
        const getUrl = 'role/all';
        return this._http.get(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addRole(role): Observable<any> {
        // const getUrl = 'add/role';
        const getUrl = 'role/add';
        const body = {
            RoleName: role.roleName,
            DepartmentId: role.departmentId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateRole(role): Observable<any> {
        // const getUrl = 'update/role';
        const getUrl = 'role/update';
        const body = {
            Id: role.id,
            RoleId: role.roleId,
            RoleName: role.roleName,
            DepartmentId: role.departmentId,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteRole(id): Observable<any> {
        // const getUrl = 'delete/role';
        const getUrl = 'role/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getRolesWithPermissions(): Observable<any> {
        const getUrl = 'role/permission/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    // --------- Permission

    public getPermissions(): Observable<any> {
        const getUrl = 'permission/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addPermission(permission): Observable<any> {
        // const getUrl = 'add/permission';
        const getUrl = 'permission/add';
        const body = {
            PermissionName: permission.permissionName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updatePermission(permission): Observable<any> {
        // const getUrl = 'update/permission';
        const getUrl = 'permission/update';
        const body = {
            Id: permission.id,
            PermissionId: permission.permissionId,
            PermissionName: permission.permissionName,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deletePermission(id): Observable<any> {
        // const getUrl = 'delete/permission';
        const getUrl = 'permission/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    public assignPermissionToRole(role, permissions): Observable<any> {
        // const getUrl = 'assign/role/permissions';
        const getUrl = 'role/permission/assign';
        const body = {
            RoleId: role.roleId,
            Permissions: permissions,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- CaseType

    public getCaseTypes(): Observable<any> {
        // const getUrl = 'casetype/all';
        const getUrl = 'case/type/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        
        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseType(caseType): Observable<any> {
        // const getUrl = 'add/casetype';
        const getUrl = 'case/type/add';
        const body = {
            CaseType: caseType.caseType,
            CaseTypeDescription: caseType.caseTypeDescription,
            CaseTypeTooltip: caseType.caseTypeTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseType(caseType): Observable<any> {
        // const getUrl = 'update/caseType';
        const getUrl = 'case/type/update';
        const body = {
            Id: caseType.id,
            CaseTypeId: caseType.caseTypeId,
            CaseType: caseType.caseType,
            CaseTypeDescription: caseType.caseTypeDescription,
            CaseTypeTooltip: caseType.caseTypeTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseType(id): Observable<any> {
        // const getUrl = 'delete/caseType';
        const getUrl = 'case/type/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- CaseNature

    public getCaseNatures(): Observable<any> {
        // const getUrl = 'caseNature/all';
        const getUrl = 'case/nature/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseNature(caseNature): Observable<any> {
        // const getUrl = 'add/caseNature';
        const getUrl = 'case/nature/add';
        const body = {
            CaseNature: caseNature.caseNature,
            CaseNatureDescription: caseNature.caseNatureDescription,
            CaseNatureTooltip: caseNature.caseNatureTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseNature(caseNature): Observable<any> {
        // const getUrl = 'update/caseNature';
        const getUrl = 'case/nature/update';
        const body = {
            Id: caseNature.id,
            CaseNatureId: caseNature.caseNatureId,
            CaseNature: caseNature.caseNature,
            CaseNatureDescription: caseNature.caseNatureDescription,
            CaseNatureTooltip: caseNature.caseNatureTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseNature(id): Observable<any> {
        // const getUrl = 'delete/caseNature';
        const getUrl = 'case/nature/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- CaseTerritory

    public getCaseTerritories(): Observable<any> {
        // const getUrl = 'caseTerritory/all';
        const getUrl = 'case/territory/all';
        
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseTerritory(caseTerritory): Observable<any> {
        // const getUrl = 'add/caseTerritory';
        const getUrl = 'case/territory/add';
        const body = {
            CaseTerritory: caseTerritory.caseTerritory,
            CaseTerritoryDescription: caseTerritory.caseTerritoryDescription,
            CaseTerritoryTooltip: caseTerritory.caseTerritoryTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseTerritory(caseTerritory): Observable<any> {
        // const getUrl = 'update/caseTerritory';
        const getUrl = 'case/territory/update';
        const body = {
            Id: caseTerritory.id,
            CaseTerritoryId: caseTerritory.caseTerritoryId,
            CaseTerritory: caseTerritory.caseTerritory,
            CaseTerritoryDescription: caseTerritory.caseTerritoryDescription,
            CaseTerritoryTooltip: caseTerritory.caseTerritoryTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseTerritory(id): Observable<any> {
        // const getUrl = 'delete/caseTerritory';
        const getUrl = 'case/territory/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- CaseClassification

    public getCaseClassifications(): Observable<any> {
        // const getUrl = 'caseClassification/all';
        const getUrl = 'case/classification/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);


        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseClassification(caseClassification): Observable<any> {
        // const getUrl = 'add/caseClassification';
        const getUrl = 'case/classification/add';
        const body = {
            CaseClassification: caseClassification.caseClassification,
            CaseClassificationDescription: caseClassification.caseClassificationDescription,
            CaseClassificationTooltip: caseClassification.caseClassificationTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseClassification(caseClassification): Observable<any> {
        // const getUrl = 'update/caseClassification';
        const getUrl = 'case/classification/update';
        const body = {
            Id: caseClassification.id,
            CaseClassificationId: caseClassification.caseClassificationId,
            CaseClassification: caseClassification.caseClassification,
            CaseClassificationDescription: caseClassification.caseClassificationDescription,
            CaseClassificationTooltip: caseClassification.caseClassificationTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseClassification(id): Observable<any> {
        // const getUrl = 'delete/caseClassification';
        const getUrl = 'case/classification/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }


    // --------- CaseDocument

    public getCaseDocuments(): Observable<any> {
        // const getUrl = 'caseDocumentType/all';
        const getUrl = 'case/document/type/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseDocument(caseDocument): Observable<any> {
        // const getUrl = 'add/caseDocument';
        const getUrl = 'case/document/add';
        const body = {
            DocumentName: caseDocument.documentName,
            DocumentDescription: caseDocument.documentDescription,
            DocumentTooltip: caseDocument.documentTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseDocument(caseDocument): Observable<any> {
        // const getUrl = 'update/caseDocument';
        const getUrl = 'case/document/update';
        const body = {
            Id: caseDocument.id,
            DocumentId: caseDocument.documentId,
            DocumentName: caseDocument.documentName,
            DocumentDescription: caseDocument.documentDescription,
            DocumentTooltip: caseDocument.documentTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseDocument(id): Observable<any> {
        // const getUrl = 'delete/caseDocument';
        const getUrl = 'case/document/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // --------- CaseDocumentNature

    public getCaseDocumentNatures(): Observable<any> {
        // const getUrl = 'caseDocumentNature/all';
        const getUrl = 'case/document/nature/all';

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    public addCaseDocumentNature(caseDocumentNature): Observable<any> {
        // const getUrl = 'add/caseDocumentNature';
        const getUrl = 'case/document/nature/add';
        const body = {
            DocumentNature: caseDocumentNature.documentNature,
            DocumentNatureDescription: caseDocumentNature.documentNatureDescription,
            DocumentNatureTooltip: caseDocumentNature.documentNatureTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public updateCaseDocumentNature(caseDocumentNature): Observable<any> {
        // const getUrl = 'update/caseDocumentNature';
        const getUrl = 'case/document/nature/update';
        const body = {
            Id: caseDocumentNature.id,
            DocumentNatureId: caseDocumentNature.documentNatureId,
            DocumentNature: caseDocumentNature.documentNature,
            DocumentNatureDescription: caseDocumentNature.documentNatureDescription,
            DocumentNatureTooltip: caseDocumentNature.documentNatureTooltip,
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteCaseDocumentNature(id): Observable<any> {
        // const getUrl = 'delete/caseDocumentNature';
        const getUrl = 'case/document/nature/delete';
        const body = {
            Id: id
        };

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public getPlatformStatisticsList() {
        const url = 'backoffice/get/platform/general/settings/statslist';
        return this._http.get(url)
            .map(res => res.json().genericResponse.genericBody.data);
    }
    
}
