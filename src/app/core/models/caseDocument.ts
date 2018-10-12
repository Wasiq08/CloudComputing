import { BaseModel } from './base.model';

export class CaseDocument {

    id: number;
    documentId: number;
    documentBelongTo: number;
    documentName: string;
    selected: boolean;
    documentCode: string;
    documentDescription: string;
    documentTooltip: string;
    value: string;

}
