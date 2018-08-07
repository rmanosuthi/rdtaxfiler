class RDData {
    D: {
        Raw: string;
        Blocks: Array<Array<string>>;
        Fields: Array<RDField>;
    };
    M: {
        Raw: string;
        Blocks: Array<string>;
        Fields: Array<RDField>;
    };
    S: {
        Raw: string;
        Blocks: Array<Array<string>>;
        Fields: Array<RDField>;
    };
    private init(): void {
        this.D = {
            Raw: "-1",
            Blocks: new Array<Array<string>>(),
            Fields: new Array<RDField>()
        };
        this.M = {
            Raw: "-1",
            Blocks: new Array<string>(),
            Fields: new Array<RDField>()
        };
        this.S = {
            Raw: "-1",
            Blocks: new Array<Array<string>>(),
            Fields: new Array<RDField>()
        };
    }
    constructor() {
        this.init();
    }
    public LoadFromFile(input: RDFile): void {
        this.fileToFields(input);
    }
    public LoadFromRaw(input: Array<string>): void {
        if (input.length == 2) {
            this.D.Raw = input[0];
            this.M.Raw = input[1];
            this.S.Raw = input[2];
            this.D.Blocks = this.separateBlocks(this.rawToBlocks(this.D.Raw, 4));
            this.M.Blocks = this.rawToBlocks(this.M.Raw, 4);
            this.S.Blocks = this.separateBlocks(this.rawToBlocks(this.S.Raw, 4));
            this.blocksToFields(this.D.Blocks, RDFieldType.D);
            this.blocksToFields(this.M.Blocks, RDFieldType.M);
            this.blocksToFields(this.S.Blocks, RDFieldType.S);
        }
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
    private rawToBlocks(input: string, length: number): Array<string> {
        let output: Array<string> = new Array<string>();
        for (let i = 0; i < input.length; i++) {
            if (i % length === 0) {
                output.push("");
            }
            output[Math.floor(i / length)] += input.charAt(i);
        }
        return output;
    }
    private separateBlocks(input: Array<string>): Array<Array<string>> {
        let output = new Array<Array<string>>();
        let occurrences = new Array<number>();
        for (let i = 0; i < input.length; i++) {
            if (input[i] == "0124" &&
                input[i + 1] == "0124" &&
                input[i + 2] == "0124") {
                occurrences[occurrences.length] = i;
                i += 2;
            }
        }
        occurrences[occurrences.length] = input.length;
        for (let i = 0; i < occurrences.length - 1; i++) {
            output[i] = new Array<string>();
            for (var j = occurrences[i]; j < occurrences[i + 1]; j++) {
                output[i].push(input[j]);
            }
        }
        return output;
    }
    private blocksToFields(input: Array<Array<string>> | Array<string>, mode: RDFieldType): void {
        if (typeof input[0] !== 'string') {
            for (let i = 0; i < input.length; i++) {
                let db: Array<string> = <Array<string>> input[i];
                let de = { // fix to pass by reference
                    value: 0
                };
                if (mode == RDFieldType.D) {
                    this.D.Fields.push(new RDField());
                    this.D.Fields[i].A = RDFUtil.decodeDecimal(db, de, 3, -1);
                    this.D.Fields[i].B = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.D.Fields[i].C = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.D.Fields[i].D = RDFUtil.decodeTIS(db, de, de.value + 3, -1);
                    this.D.Fields[i].E = RDFUtil.decodeTIS(db, de, de.value + 2, -1);
                    this.D.Fields[i].F = RDFUtil.decodeTIS(db, de, de.value + 2, -1);
                    this.D.Fields[i].G = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.D.Fields[i].H = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.D.Fields[i].I = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.D.Fields[i].J = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                } else if (mode == RDFieldType.S) {
                    this.S.Fields.push(new RDField());
                    this.S.Fields[i].A = RDFUtil.decodeDecimal(db, de, 3, 4);
                    this.S.Fields[i].B = RDFUtil.decodeDecimal(db, de, 8, -1);
                    this.S.Fields[i].C = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                    this.S.Fields[i].D = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                } else {
                    console.log("Wrong RDFieldType, received " + mode.toString());
                }
            }
        }
        if (typeof input[0] === "string") {
            if (mode == RDFieldType.M) {
                let db: Array<string> = <Array<string>> input;
                let de = {
                    value: 0
                };
                this.M.Fields.push(new RDField());
                this.M.Fields[0].A = RDFUtil.decodeDecimal(db, de, 3, -1);
                this.M.Fields[0].B = RDFUtil.decodeDecimal(db, de, de.value + 4, -1);
                this.M.Fields[0].C = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].D = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].E = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].F = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].G = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].H = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].I = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].J = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].K = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].L = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].M = RDFUtil.decodeDecimal(db, de, de.value + 3, -1);
                this.M.Fields[0].N = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].O = RDFUtil.decodeDecimal(db, de, de.value + 3, -1);
                this.M.Fields[0].P = RDFUtil.decodeDecimal(db, de, de.value + 14, -1);
                this.M.Fields[0].Q = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].R = RDFUtil.decodeDecimal(db, de, de.value + 6, -1);
                this.M.Fields[0].S = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].T = RDFUtil.decodeDecimal(db, de, de.value + 3, -1);
                this.M.Fields[0].U = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
                this.M.Fields[0].V = RDFUtil.decodeDecimal(db, de, de.value + 2, -1);
            }
        }
    }
}