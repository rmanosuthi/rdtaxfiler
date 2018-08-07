class RDFUtil {
    constructor() {
        this.data = new RDData();
        this.rdFile = new RDFile();
        this.breakCharacter = "1024";
        this.Load = (input) => {
            this.cleanup();
            this.data.D.Raw = input[0];
            this.data.M.Raw = input[1];
            this.data.S.Raw = input[2];
            let d_blocks = this.chunkBreak(this.data.D.Raw, 4);
            this.data.D.Blocks = this.separateEntries(d_blocks);
            this.data.M.Blocks = this.chunkBreak(this.data.M.Raw, 4);
            this.data.S.Blocks = this.separateEntries(this.chunkBreak(this.data.S.Raw, 4));
            this.blockToField(this.data.D.Blocks, RDFieldType.D);
            this.blockToField(this.data.M.Blocks, RDFieldType.M);
            this.blockToField(this.data.S.Blocks, RDFieldType.S);
            this.rdFile.DataToFile(this.data);
        };
    }
    blockToField(input, mode) {
        if (typeof input[0] !== 'string') {
            for (let i = 0; i < input.length; i++) {
                let db = input[i];
                let de = {
                    value: 0
                };
                if (mode == RDFieldType.D) {
                    this.data.D.Fields.push(new RDField());
                    this.data.D.Fields[i].A = this.decodeDecimal(db, de, 3, -1);
                    this.data.D.Fields[i].B = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].C = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].D = this.decodeTIS(db, de, de.value + 3, -1);
                    this.data.D.Fields[i].E = this.decodeTIS(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].F = this.decodeTIS(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].G = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].H = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].I = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.D.Fields[i].J = this.decodeDecimal(db, de, de.value + 2, -1);
                }
                else if (mode == RDFieldType.S) {
                    this.data.S.Fields.push(new RDField());
                    this.data.S.Fields[i].A = this.decodeDecimal(db, de, 3, 4);
                    this.data.S.Fields[i].B = this.decodeDecimal(db, de, 8, -1);
                    this.data.S.Fields[i].C = this.decodeDecimal(db, de, de.value + 2, -1);
                    this.data.S.Fields[i].D = this.decodeDecimal(db, de, de.value + 2, -1);
                }
                else {
                    console.log("Wrong RDFieldType, received " + mode.toString());
                }
            }
        }
        if (typeof input[0] === "string") {
            if (mode == RDFieldType.M) {
                let db = input;
                let de = {
                    value: 0
                };
                this.data.M.Fields.push(new RDField());
                this.data.M.Fields[0].A = this.decodeDecimal(db, de, 3, -1);
                this.data.M.Fields[0].B = this.decodeDecimal(db, de, de.value + 4, -1);
                this.data.M.Fields[0].C = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].D = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].E = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].F = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].G = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].H = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].I = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].J = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].K = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].L = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].M = this.decodeDecimal(db, de, de.value + 3, -1);
                this.data.M.Fields[0].N = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].O = this.decodeDecimal(db, de, de.value + 3, -1);
                this.data.M.Fields[0].P = this.decodeDecimal(db, de, de.value + 14, -1);
                this.data.M.Fields[0].Q = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].R = this.decodeDecimal(db, de, de.value + 6, -1);
                this.data.M.Fields[0].S = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].T = this.decodeDecimal(db, de, de.value + 3, -1);
                this.data.M.Fields[0].U = this.decodeDecimal(db, de, de.value + 2, -1);
                this.data.M.Fields[0].V = this.decodeDecimal(db, de, de.value + 2, -1);
            }
        }
    }
    chunkBreak(input, length) {
        let output = new Array();
        for (let i = 0; i < input.length; i++) {
            if (i % length === 0) {
                output.push("");
            }
            output[Math.floor(i / length)] += input.charAt(i);
        }
        return output;
    }
    separateEntries(input) {
        let output = new Array();
        let occurrences = new Array();
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
            output[i] = new Array();
            for (var j = occurrences[i]; j < occurrences[i + 1]; j++) {
                output[i].push(input[j]);
            }
        }
        return output;
    }
    validate() {
        return true;
    }
    decodeDecimal(input, counter, start, length) {
        let result = "";
        console.log("counter: " + counter.toString());
        console.log("start: " + start.toString());
        console.log("length:" + length.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
            counter.value = start + length - 1;
        }
        else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                }
                else {
                    result += String.fromCharCode(parseInt(input[i], 10));
                }
            }
        }
        console.log(result);
        return result;
    }
    decodeTIS(input, counter, start, length) {
        let result = "";
        console.log("start: " + start.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                if (Object.keys(tismap).indexOf(input[i]) != -1) {
                    result += tismap[input[i]];
                }
            }
            counter.value = start + length - 1;
        }
        else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                }
                else {
                    if (Object.keys(tismap).indexOf(input[i]) != -1) {
                        result += tismap[input[i]];
                    }
                }
            }
        }
        return result;
    }
    cleanup() {
        this.data = new RDData();
        this.rdFile = new RDFile();
    }
}
