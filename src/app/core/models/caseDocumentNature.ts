import { BaseModel } from './base.model';

export class CaseDocumentNature {

    id: number;
    documentNatureId: number;
    documentNature: string;
    documentNatureCode: string;
    documentNatureDescription: string;
    documentNatureTooltip: string;
    value: string;
    selected: boolean;
}
