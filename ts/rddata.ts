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
    public Export(input: RDFile): void {
        this.fileToFields(input);
        this.fieldsToBlocks();
    }
    public LoadFromRaw(input: Array<string>): void {
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
    private fileToFields(input: RDFile): void {
        for (let i = 0; i < input.Records.length; i++) {
            this.D.Fields.push(new RDField(RDFieldType.D));
            for (let j = 0; j < input.Records[i].length; j++) {
                this.D.Fields[i].Label[0].Content = RDConverter.TabNumToString(i);
                this.D.Fields[j].Label[1].Content = j.toString();
                this.D.Fields[j].Label[2].Content = input.Records[i][j].ID.toString();
                this.D.Fields[j].Label[3].Content = input.Records[i][j].Prefix;
                this.D.Fields[j].Label[4].Content = input.Records[i][j].FirstName;
                this.D.Fields[j].Label[5].Content = input.Records[i][j].LastName;
                this.D.Fields[j].Label[6].Content = RDConverter.DateObjectToString(input.Records[i][j].Date);
                this.D.Fields[j].Label[7].Content = input.Records[i][j].Amount.toFixed(2);
                this.D.Fields[j].Label[8].Content = input.Records[i][j].Tax.toFixed(2);
            }
        }
        this.M.Fields.push(new RDField(RDFieldType.M));
        this.M.Fields[0].Label[0].Content = input.Summary.Version;
        this.M.Fields[0].Label[1].Content = input.Summary.TaxFilerID.toString();
        this.M.Fields[0].Label[2].Content = input.Summary.FormVariant.toString();
        this.M.Fields[0].Label[3].Content = RDConverter.BranchNumToString(input.Summary.Branch);
        this.M.Fields[0].Label[4].Content = input.Summary.FilingNo.toString();
        this.M.Fields[0].Label[5].Content = input.Summary.FilingMonth.toString();
        this.M.Fields[0].Label[6].Content = input.Summary.FilingYear.toString();
        this.M.Fields[0].Label[7].Content = input.Summary.BookName;
        this.M.Fields[0].Label[8].Content = RDConverter.DateObjectToString(input.Summary.BookDate);
        this.M.Fields[0].Label[9].Content = RDFieldManager.GetTransactionsCount(input.Records).toString();
        this.M.Fields[0].Label[10].Content = RDFieldManager.GetTotalIncome(input.Records).toString();
        this.M.Fields[0].Label[11].Content = RDFieldManager.GetTotalTax(input.Records).toString();
        this.M.Fields[0].Label[12].Content = this.M.Fields[0].Label[11].Content;
        this.M.Fields[0].Label[13].Content = this.M.Fields[0].Label[11].Content;
        this.M.Fields[0].Label[14].Content = input.Summary.Version;
        /* TODO: Label P-V */
        for (let i = 0; i < input.Records.length; i++) {
            this.S.Fields.push(new RDField(RDFieldType.S));
            this.S.Fields[i].Label[0].Content = RDConverter.TabNumToString(i);
            this.S.Fields[i].Label[1].Content = RDFieldManager.GetEntries(input.Records[i]).toString();
            this.S.Fields[i].Label[2].Content = RDFieldManager.GetTotalFieldIncome(input.Records[i]).toString();
            this.S.Fields[i].Label[3].Content = RDFieldManager.GetTotalFieldTax(input.Records[i]).toString();
        }
    }
    private fieldsToBlocks(): void {
        for (let i = 0; i < this.D.Fields.length; i++) {
            this.D.Blocks[i] = new Array<string>();
            for (let j = 0; j < this.D.Fields[i].Label.length; j++) {
                this.addBlockBreak(this.D.Fields[i].Label[j].InitialBreak, i, RDFieldType.D);
                this.addBlockCode(this.D.Fields[i].Label[j].Content, i, RDFieldType.D);
            }
            this.D.Blocks[i].push(this.getHashBlock(i, RDFieldType.D));
        }
        this.M.Blocks = new Array<string>();
        for (let i = 0; i < this.M.Fields[0].Label.length; i++) {
            this.addBlockBreak(this.M.Fields[0].Label[i].InitialBreak, i, RDFieldType.M);
            this.addBlockCode(this.M.Fields[0].Label[i].Content, i, RDFieldType.M);
        }
        this.M.Blocks.push(this.getHashBlock(0, RDFieldType.M));
        for (let i = 0; i < this.S.Fields.length; i++) {
            this.S.Blocks[i] = new Array<string>();
            for (let j = 0; j < this.S.Fields[i].Label.length; j++) {
                this.addBlockBreak(this.S.Fields[i].Label[j].InitialBreak, i, RDFieldType.S);
                this.addBlockCode(this.S.Fields[i].Label[j].Content, i, RDFieldType.S);
            }
            this.S.Blocks[i].push(this.getHashBlock(i, RDFieldType.S));
        }
    }
    private addBlockCode(input: string, block: number, type: RDFieldType) {
        switch (type) {
            case RDFieldType.D:
                for (let i = 0; i < input.length; i++) {
                    this.D.Blocks[block].push(RDConverter.PrefixZero(input.charCodeAt(i), 4));
                }
                break;
            case RDFieldType.M:
                for (let i = 0; i < input.length; i++) {
                    this.M.Blocks.push(RDConverter.PrefixZero(input.charCodeAt(i), 4));
                }
                break;
            case RDFieldType.S:
                for (let i = 0; i < input.length; i++) {
                    this.S.Blocks[block].push(RDConverter.PrefixZero(input.charCodeAt(i), 4));
                }
                break;
        }
    }
    private addBlockBreak(count: number, block: number, type: RDFieldType) {
        switch (type) {
            case RDFieldType.D:
                for (let i = 0; i < count; i++) {
                    this.D.Blocks[block].push("0124");
                }
                break;
            case RDFieldType.M:
                for (let i = 0; i < count; i++) {
                    this.M.Blocks.push("0124");
                }
                break;
            case RDFieldType.S:
                for (let i = 0; i < count; i++) {
                    this.S.Blocks[block].push("0124");
                }
                break;
        }
    }
    private getHashBlock(block: number, type: RDFieldType): string {
        let sum: number = 0;
        switch (type) {
            case RDFieldType.D:
                for (let i = 0; i < this.D.Blocks[block].length; i++) {
                    sum += parseInt(this.D.Blocks[block][i], 10);
                }
                break;
            case RDFieldType.M:
                for (let i = 0; i < this.M.Blocks.length; i++) {
                    sum += parseInt(this.M.Blocks[i], 10);
                }
                break;
            case RDFieldType.S:
                for (let i = 0; i < this.S.Blocks[block].length; i++) {
                    sum += parseInt(this.S.Blocks[block][i], 10);
                }
                break;
        }
        return sum.toString().substr(sum.toString().length - 4, 4);
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
                let db: Array<string> = <Array<string>>input[i];
                let de = { // fix to pass by reference
                    value: 0
                };
                if (mode == RDFieldType.D) {
                    this.D.Fields.push(new RDField(RDFieldType.D));
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
                    this.S.Fields.push(new RDField(RDFieldType.S));
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
                let db: Array<string> = <Array<string>>input;
                let de = {
                    value: 0
                };
                this.M.Fields.push(new RDField(RDFieldType.M));
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