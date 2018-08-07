// refer to '/docs'
// RDData -> RDFile
class RDFile {
    Summary = {
        PndVersion: -1,
        TaxFilerID: -1,
        FormVariant: -1,
        Branch: -1,
        FilingNo: -1,
        FilingMonth: -1,
        FilingYear: -1,
        BookName: "-1",
        BookDate: new Date(),
        Version: "-1"
    };
    Records = Array<Array<RDRecord>>();
    constructor() {}
    public DataToFile(input: RDData): void {
        this.dataToFile(input.D.Fields, RDFieldType.D);
        this.dataToFile(input.M.Fields, RDFieldType.M);
    }
    private dataToFile(fields: Array<RDField>, mode: RDFieldType): void {
        switch (mode) {
            case RDFieldType.D:
                for (let i = 0; i < 5; i++) {
                    this.Records.push(new Array<RDRecord>());
                }
                for (let i = 0; i < fields.length; i++) {
                    let tab: number = -1;
                    let record = new RDRecord();
                    if (fields[i].A == "401N") {
                        tab = 0;
                    } else if (fields[i].A == "401S") {
                        tab = 1;
                    } else if (fields[i].A == "4012") {
                        tab = 2;
                    } else if (fields[i].A == "402I") {
                        tab = 3;
                    } else if (fields[i].A == "402E") {
                        tab = 4;
                    } else {
                        throw new Error("Invalid tab type at data.D.Fields[" + i.toString() + "]");
                    }
                    record.Entry = parseInt(fields[i].B);
                    record.ID = parseInt(fields[i].C);
                    record.Prefix = fields[i].D;
                    record.FirstName = fields[i].E;
                    record.LastName = fields[i].F;
                    record.Date = new Date(fields[i].G);
                    record.Amount = parseFloat(fields[i].H);
                    record.Tax = parseFloat(fields[i].I);
                    record.Conditions = RDCondition[RDCondition[parseInt(fields[i].J) + 1]];
                    this.Records[tab].push(record);
                }
                break;
            case RDFieldType.M:
                this.Summary.PndVersion = parseInt(fields[0].A);
                this.Summary.TaxFilerID = parseInt(fields[0].B);
                this.Summary.FormVariant = parseInt(fields[0].C);
                this.Summary.Branch = parseInt(fields[0].D);
                this.Summary.FilingNo = parseInt(fields[0].E);
                this.Summary.FilingMonth = parseInt(fields[0].F);
                this.Summary.FilingYear = parseInt(fields[0].G);
                this.Summary.BookName = fields[0].H;
                this.Summary.BookDate = new Date(fields[0].I);
                this.Summary.Version = fields[0].O;
                break;
            case RDFieldType.S:
                throw new Error("Section S should not be used in the decoding process");
                break;
            default:
                throw new Error("Invalid RDFieldType");
                break;
        }
    }
}
class RDData {
    D = {
        Raw: "-1",
        Blocks: new Array<Array<string>>(),
        Fields: new Array<RDField>()
    };
    M = {
        Raw: "-1",
        Blocks: new Array<string>(),
        Fields: new Array<RDField>()
    };
    S = {
        Raw: "-1",
        Blocks: new Array<Array<string>>(),
        Fields: new Array<RDField>()
    };
    constructor() {}
    public FileToData(input: RDFile): void {
        this.fileToFields(input);
    }
    private fileToFields(input: RDFile): void {
        for (let i = 0; i < input.Records.length; i++) {
            this.D.Fields.push(new RDField());
            for (let j = 0; j < input.Records[i].length; j++) {
                this.D.Fields[i].A = RDConverter.TabNumToString(i);
                this.D.Fields[j].B = j.toString();
                this.D.Fields[j].C = input.Records[i][j].ID.toString();
                this.D.Fields[j].D = input.Records[i][j].Prefix;
                this.D.Fields[j].E = input.Records[i][j].FirstName;
                this.D.Fields[j].F = input.Records[i][j].LastName;
                this.D.Fields[j].G = RDConverter.DateObjectToString(input.Records[i][j].Date);
                this.D.Fields[j].H = input.Records[i][j].Amount.toFixed(2);
                this.D.Fields[j].I = input.Records[i][j].Tax.toFixed(2);
            }
        }
        this.M.Fields.push(new RDField());
        this.M.Fields[0].A = input.Summary.Version;
        this.M.Fields[0].B = input.Summary.TaxFilerID.toString();
        this.M.Fields[0].C = input.Summary.FormVariant.toString();
        this.M.Fields[0].D = RDConverter.BranchNumToString(input.Summary.Branch);
        this.M.Fields[0].E = input.Summary.FilingNo.toString();
        this.M.Fields[0].F = input.Summary.FilingMonth.toString();
        this.M.Fields[0].G = input.Summary.FilingYear.toString();
        this.M.Fields[0].H = input.Summary.BookName;
        this.M.Fields[0].I = RDConverter.DateObjectToString(input.Summary.BookDate);
        this.M.Fields[0].J = RDFieldManager.GetTransactionsCount(input.Records).toString();
        this.M.Fields[0].K = RDFieldManager.GetTotalIncome(input.Records).toString();
        this.M.Fields[0].L = RDFieldManager.GetTotalTax(input.Records).toString();
        this.M.Fields[0].M = this.M.Fields[0].L;
        this.M.Fields[0].N = this.M.Fields[0].L;
        this.M.Fields[0].O = input.Summary.Version;
        /* TODO: Label P-V */
        for (let i = 0; i < input.Records.length; i++) {
            this.S.Fields.push(new RDField());
            this.S.Fields[i].A = RDConverter.TabNumToString(i);
            this.S.Fields[i].B = RDFieldManager.GetEntries(input.Records[i]).toString();
            this.S.Fields[i].C = RDFieldManager.GetTotalFieldIncome(input.Records[i]).toString();
            this.S.Fields[i].D = RDFieldManager.GetTotalFieldTax(input.Records[i]).toString();
        }
    }
}

class RDField {
    [key: string]: string;
}
enum RDFieldType {
    D, M, S
}