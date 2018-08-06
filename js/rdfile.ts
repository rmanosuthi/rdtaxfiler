import "./rdrecord";

// refer to '/docs'
// RDData -> RDFile
export class RDFile {
    Summary: {
        PndVersion: number;
        TaxFilerID: number;
        FormVariant: number;
        Branch: number;
        FilingNo: number;
        FilingMonth: number;
        FilingYear: number;
        BookName: string;
        BookDate: Date;
        Version: string;
    };
    Records: Array<Array<RDRecord>>;
    constructor() {}
}
export class RDData {
    D: {
        Raw: string;
        Blocks: Array<Array<string>>;
        Fields: Array<RDField>;
    };
    M: {
        Raw: string;
        Blocks: Array<string>;
        Fields: RDField;
    };
    S: {
        Raw: string;
        Blocks: Array<Array<string>>;
        Fields: Array<RDField>;
    };
    constructor() {}
}
export interface RDField {
    [key: string]: string;
}
export enum RDFieldType {
    D, M, S
}