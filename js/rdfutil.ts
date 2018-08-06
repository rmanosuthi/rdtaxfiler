import JSZip from "./jszip";
import "./tismap";
import {RDFile, RDData, RDField, RDFieldType} from "./rdfile";
export class RDFUtil {
    private zipFile: any = new JSZip();
    private data: RDData = new RDData();
    private rdFile: RDFile = new RDFile();
    private breakCharacter: string = "1024";
    constructor() { }
    public Load(input: Array<string>): void {
        this.cleanup();
        this.data.D.Raw = input[0];
        this.data.M.Raw = input[0];
        this.data.S.Raw = input[2];
        this.data.D.Blocks = this.separateEntries(this.chunkBreak(this.data.D.Raw, 4));
        this.data.M.Blocks = this.chunkBreak(this.data.M.Raw, 4);
        this.data.S.Blocks = this.separateEntries(this.chunkBreak(this.data.S.Raw, 4));
        this.blockToField(this.data.D.Blocks, RDFieldType.D);
        this.blockToField(this.data.M.Blocks, RDFieldType.M);
        this.blockToField(this.data.S.Blocks, RDFieldType.S);
    }
    private blockToField(input: Array<Array<string>> | Array<string>, mode: RDFieldType): void {
        if (typeof input[0] !== 'string') {
            for (let i = 0; i < input.length; i++) {
                let db: Array<string> = <Array<string>> input[i];
                let de: number = 0;
                if (mode == RDFieldType.D) {
                    this.data.D.Fields[i].A = this.decodeDecimal(db, de, 3, -1);
                    this.data.D.Fields[i].B = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].C = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].D = this.decodeTIS(db, de, de + 3, -1);
                    this.data.D.Fields[i].E = this.decodeTIS(db, de, de + 2, -1);
                    this.data.D.Fields[i].F = this.decodeTIS(db, de, de + 2, -1);
                    this.data.D.Fields[i].G = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].H = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].I = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].J = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.D.Fields[i].K = this.decodeDecimal(db, de, de + 2, -1);
                } else if (mode == RDFieldType.S) {
                    this.data.S.Fields[i].A = this.decodeDecimal(db, de, 3, 4);
                    this.data.S.Fields[i].B = this.decodeDecimal(db, de, 8, -1);
                    this.data.S.Fields[i].C = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.S.Fields[i].D = this.decodeDecimal(db, de, de + 2, -1);
                    this.data.S.Fields[i].E = this.decodeDecimal(db, de, de + 2, -1);
                } else {
                    console.log("Wrong RDFieldType, received " + mode.toString());
                }
            }
        }
        if (typeof input[0] === "string") {
            if (mode == RDFieldType.M) {
                let db: Array<string> = <Array<string>> input;
                let de: number = 0;
                this.data.M.Fields[0].A = this.decodeDecimal(db, de, 3, -1);
                this.data.M.Fields[0].B = this.decodeDecimal(db, de, de + 4, -1);
                this.data.M.Fields[0].C = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].D = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].E = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].F = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].G = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].H = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].I = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].J = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].K = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].L = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].M = this.decodeDecimal(db, de, de + 3, -1);
                this.data.M.Fields[0].N = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].O = this.decodeDecimal(db, de, de + 3, -1);
                this.data.M.Fields[0].P = this.decodeDecimal(db, de, de + 14, -1);
                this.data.M.Fields[0].Q = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].R = this.decodeDecimal(db, de, de + 6, -1);
                this.data.M.Fields[0].S = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].T = this.decodeDecimal(db, de, de + 3, -1);
                this.data.M.Fields[0].U = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].V = this.decodeDecimal(db, de, de + 2, -1);
                this.data.M.Fields[0].W = this.decodeDecimal(db, de, de + 2, -1);
            }
        }
    }
    private chunkBreak(input: string, length: number): Array<string> {
        let output: Array<string>;
        for (let i = 0; i < input.length; i++) {
            if (i % length === 0) {
                output[Math.floor((i) / length)] = "";
            }
            output[Math.floor(i / length)] += input[i];
        }
        return output;
    }
    private separateEntries(input: Array<string>): Array<Array<string>> {
        let output: Array<Array<string>>;
        let occurrences: Array<number>;
        for (let i = 0; i < input.length; i++) {
            if (input[i] == this.breakCharacter &&
                input[i + 1] == this.breakCharacter &&
                input[i + 2] == this.breakCharacter) {
                occurrences[occurrences.length] = i;
                i += 2;
            }
        }
        occurrences[occurrences.length] = input.length;
        for (let i = 0; i < occurrences.length - 1; i++) {
            output[i] = [];
            for (var j = occurrences[i]; j < occurrences[i + 1]; j++) {
                output[i].push(input[j]);
            }
        }
        return output;
    }
    private validate(): boolean {
        return true;
    }
    private decodeDecimal(input: Array<string>, counter: number, start: number, length: number): string {
        let result:string;
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
            counter = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == this.breakCharacter) {
                    counter = i - 1;
                    break;
                } else {
                    result += String.fromCharCode(parseInt(input[i], 10));
                }
            }
        }
        return result;
    }
    private decodeTIS(input: Array<string>, counter: number, start: number, length: number): string {
        let result:string;
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                if (Object.keys(tismap).includes(input[i]) === true) {
                    result += tismap[input[i]];
                }
            }
            counter = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == this.breakCharacter) {
                    counter = i - 1;
                    break;
                } else {
                    if (Object.keys(tismap).includes(input[i]) === true) {
                        result += tismap[input[i]];
                    }
                }
            }
        }
        return result;
    }
    private cleanup(): void {
        this.data = new RDData();
        this.rdFile = new RDFile();
    }
}