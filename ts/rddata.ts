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
        console.log(JSON.stringify(input.Summary));
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
        for (let i = 0; i < this.D.Blocks.length; i++) {
            this.D.Fields.push(new RDField(RDFieldType.D));
            RDFUtil.BlocksToFields(this.D.Blocks[i], this.D.Fields[i], 4);
        }
        this.M.Fields.push(new RDField(RDFieldType.M));
        RDFUtil.BlocksToFields(this.M.Blocks, this.M.Fields[0], 4);
        for (let i = 0; i < this.S.Blocks.length; i++) {
            this.S.Fields.push(new RDField(RDFieldType.S));
            RDFUtil.BlocksToFields(this.S.Blocks[i], this.S.Fields[i], 4);
        }
    }
    private fileToFields(input: RDFile): void {
        console.log(JSON.stringify(input.Records));
        let currentField = 0;
        for (let i = 0; i < input.Records.length; i++) {
            for (let j = 0; j < input.Records[i].length; j++) {
                this.D.Fields.push(new RDField(RDFieldType.D));
                this.D.Fields[currentField].Label[0].Content = RDConverter.TabNumToString(i);
                this.D.Fields[currentField].Label[1].Content = j.toString();
                this.D.Fields[currentField].Label[2].Content = input.Records[i][j].ID.toString();
                this.D.Fields[currentField].Label[3].Content = input.Records[i][j].Prefix;
                this.D.Fields[currentField].Label[4].Content = input.Records[i][j].FirstName;
                this.D.Fields[currentField].Label[5].Content = input.Records[i][j].LastName;
                this.D.Fields[currentField].Label[6].Content = RDConverter.DateObjectToString(input.Records[i][j].Date);
                this.D.Fields[currentField].Label[7].Content = input.Records[i][j].Amount.toFixed(2);
                this.D.Fields[currentField].Label[8].Content = input.Records[i][j].Tax.toFixed(2);
                this.D.Fields[currentField].Label[9].Content = input.Records[i][j].Conditions.toString();
                currentField++;
            }
        }
        this.M.Fields.push(new RDField(RDFieldType.M));
        this.M.Fields[0].Label[0].Content = input.Summary.PndVersion;
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
        /* placeholder */
        this.M.Fields[0].Label[15].Content = "00";
        this.M.Fields[0].Label[16].Content = "0";
        this.M.Fields[0].Label[17].Content = "0";
        this.M.Fields[0].Label[18].Content = "0";
        this.M.Fields[0].Label[19].Content = "0";
        this.M.Fields[0].Label[20].Content = "0";
        this.M.Fields[0].Label[21].Content = "0";
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
        // omit previous checksum
        console.log("Started fields to blocks");
        console.log("D start");
        for (let i = 0; i < this.D.Fields.length; i++) {
            this.D.Blocks[i] = new Array<string>();
            for (let j = 0; j < this.D.Fields[i].Label.length; j++) {
                console.log("Label " + j.toString());
                console.log("Add block break");
                this.addBlockBreak(this.D.Fields[i].Label[j].InitialBreak, i, RDFieldType.D);
                console.log("Concat");
                if (this.D.Fields[i].Label[j].Content != "") {
                    this.D.Blocks[i] = this.D.Blocks[i].concat(RDFUtil.Encode(this.D.Fields[i].Label[j].Content, this.D.Fields[i].Label[j].IsTIS));
                }
                console.log("End concat");
            }
            console.log("Get hash block");
            this.D.Blocks[i].push(this.getHashBlock(i, RDFieldType.D));
        }
        console.log("D done");
        console.log("M start");
        this.M.Blocks = new Array<string>();
        for (let i = 0; i < this.M.Fields[0].Label.length; i++) {
            this.addBlockBreak(this.M.Fields[0].Label[i].InitialBreak, i, RDFieldType.M);
            if (this.M.Fields[0].Label[i].Content != "") {
                this.M.Blocks = this.M.Blocks.concat(RDFUtil.Encode(this.M.Fields[0].Label[i].Content, this.M.Fields[0].Label[i].IsTIS));
            }
        }
        this.M.Blocks.push(this.getHashBlock(0, RDFieldType.M));
        console.log("M done");
        console.log("S start");
        for (let i = 0; i < this.S.Fields.length; i++) {
            this.S.Blocks[i] = new Array<string>();
            for (let j = 0; j < this.S.Fields[i].Label.length; j++) {
                this.addBlockBreak(this.S.Fields[i].Label[j].InitialBreak, i, RDFieldType.S);
                if (this.S.Fields[i].Label[j].Content != "") {
                    this.S.Blocks[i] = this.S.Blocks[i].concat(RDFUtil.Encode(this.S.Fields[i].Label[j].Content, this.S.Fields[i].Label[j].IsTIS));
                }
            }
            this.S.Blocks[i].push(this.getHashBlock(i, RDFieldType.S));
        }
        console.log("S done");
        console.log("Finished loading");
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
}