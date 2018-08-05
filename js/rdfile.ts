// refer to '/docs'
class RDRawfile {
    D: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
        F: string;
        G: string;
        H: string;
        I: string;
        J: string;
        K: string;
    };
    M: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
        F: string;
        G: string;
        H: string;
        I: string;
        J: string;
        K: string;
        L: string;
        M: string;
        N: string;
        O: string;
        P: string;
        Q: string;
        R: string;
        S: string;
        T: string;
        U: string;
        V: string;
        W: string;
    };
    S: {
        A: string;
        B: string;
        C: string;
        D: string;
        E: string;
    };
    constructor() {}
}
class RDFile {
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