import JSZip from "./jszip";
import "./tismap";
export class RDFUtil {
    private zip: any = new JSZip();
    private rawFile: RDRawfile = new RDRawfile();
    private currentFile: RDFile = new RDFile();
    private breakCharacter: string = "1024";
    private decodingEndedAt:number = 0;
    constructor() { }
    public Load(input: string[]): void {
        
    }
    private blockToRaw(): void {

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
            if (input[i] == breakCharacter &&
                input[i + 1] == breakCharacter &&
                input[i + 2] == breakCharacter) {
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
    private decodeDecimal(input: Array<string>, start: number, length: number): string {
        let result:string;
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
            this.decodingEndedAt = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == breakCharacter) {
                    endedAt = i - 1;
                    break;
                } else {
                    result += String.fromCharCode(parseInt(input[i], 10));
                }
            }
        }
        return result;
    }
    private decodeTIS(input: Array<string>, start: number, length: number): string {
        let result:string;
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                if (Object.keys(tismap).includes(input[i]) === true) {
                    result += tismap[input[i]];
                }
            }
            endedAt = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == breakCharacter) {
                    endedAt = i - 1;
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
        this.rawFile = new RDRawfile();
        this.currentFile = new RDFile();
    }
}