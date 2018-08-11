// refer to '/docs'
// RDData -> RDFile
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
    private init(): void {
        this.Summary = {
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
        this.Records = new Array<Array<RDRecord>>();
    }
    constructor() {
        this.init();
    }
    public LoadFromData(input: RDData): void {
        this.fieldsToFile(input.D.Fields, RDFieldType.D);
        this.fieldsToFile(input.M.Fields, RDFieldType.M);
    }
    private fieldsToFile(fields: Array<RDField>, mode: RDFieldType): void {
        switch (mode) {
            case RDFieldType.D:
                for (let i = 0; i < 5; i++) {
                    this.Records.push(new Array<RDRecord>());
                }
                for (let i = 0; i < fields.length; i++) {
                    let tab: number = -1;
                    let record = new RDRecord();
                    if (fields[i].Label[0].Content == "401N") {
                        tab = 0;
                    } else if (fields[i].Label[0].Content == "401S") {
                        tab = 1;
                    } else if (fields[i].Label[0].Content == "4012") {
                        tab = 2;
                    } else if (fields[i].Label[0].Content == "402I") {
                        tab = 3;
                    } else if (fields[i].Label[0].Content == "402E") {
                        tab = 4;
                    } else {
                        throw new Error("Invalid tab type at data.D.Fields[" + i.toString() + "]");
                    }
                    record.Entry = parseInt(fields[i].Label[1].Content);
                    record.ID = parseInt(fields[i].Label[2].Content);
                    record.Prefix = fields[i].Label[3].Content;
                    record.FirstName = fields[i].Label[4].Content;
                    record.LastName = fields[i].Label[5].Content;
                    record.Date = new Date(fields[i].Label[6].Content);
                    record.Amount = parseFloat(fields[i].Label[7].Content);
                    record.Tax = parseFloat(fields[i].Label[8].Content);
                    record.Conditions = RDCondition[RDCondition[parseInt(fields[i].Label[9].Content) + 1]];
                    this.Records[tab].push(record);
                }
                break;
            case RDFieldType.M:
                this.Summary.PndVersion = parseInt(fields[0].Label[0].Content);
                this.Summary.TaxFilerID = parseInt(fields[0].Label[1].Content);
                this.Summary.FormVariant = parseInt(fields[0].Label[2].Content);
                this.Summary.Branch = parseInt(fields[0].Label[3].Content);
                this.Summary.FilingNo = parseInt(fields[0].Label[4].Content);
                this.Summary.FilingMonth = parseInt(fields[0].Label[5].Content);
                this.Summary.FilingYear = parseInt(fields[0].Label[6].Content);
                this.Summary.BookName = fields[0].Label[7].Content;
                this.Summary.BookDate = new Date(fields[0].Label[8].Content);
                this.Summary.Version = fields[0].Label[9].Content;
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
enum RDFieldType {
    D, M, S
}