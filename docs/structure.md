# Program structure

```
class RDFUtil {
    class RDData {
        D: {
            Raw: string;
            Blocks: Array<Array<string>>;
            Fields: Array<RDField>;
        }
        M: {
            Raw: string;
            Blocks: Array<string>;
            Fields: Array<RDField>;
        }
        S: {
            Raw: string;
            Blocks: Array<Array<string>>;
            Fields: Array<RDField>;
        }
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
        }
        Records: Array<Array<RDRecord>>;
    }
}
+-----------------------------------------+
class RDRecord {
    Entry: number;
    ID: number;
    Prefix: string;
    FirstName: string;
    LastName: string;
    Date: Date;
    Amount: number;
    Tax: number;
    Conditions: RDCondition;
}
+-----------------------------------------+
class RDField {
    [key: string]: string;
}
```