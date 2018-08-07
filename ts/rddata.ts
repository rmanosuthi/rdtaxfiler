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