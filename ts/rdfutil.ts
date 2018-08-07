class RDFUtil {
    private data: RDData = new RDData();
    public file: RDFile = new RDFile();
    private breakCharacter: string = "1024";
    constructor() { }
    public Load = (input: Array<string>): void => {
        this.cleanup();
        this.data.LoadFromRaw(input);
        this.file.LoadFromData(this.data);
    }
    private chunkBreak(input: string, length: number): Array<string> {
        let output: Array<string> = new Array<string>();
        for (let i = 0; i < input.length; i++) {
            if (i % length === 0) {
                output.push("");
            }
            output[Math.floor(i / length)] += input.charAt(i);
        }
        return output;
    }
    private separateEntries(input: Array<string>): Array<Array<string>> {
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
    private validate(): boolean {
        return true;
    }
    public static decodeDecimal(input: Array<string>, counter: {value: number}, start: number, length: number): string {
        let result:string = "";
        console.log("counter: " + counter.toString());
        console.log("start: " + start.toString());
        console.log("length:" + length.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
            counter.value = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                } else {
                    result += String.fromCharCode(parseInt(input[i], 10));
                }
            }
        }
        console.log(result);
        return result;
    }
    public static decodeTIS(input: Array<string>, counter: {value: number}, start: number, length: number): string {
        let result:string = "";
        console.log("start: " + start.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                if (Object.keys(tismap).indexOf(input[i]) != -1) {
                    result += tismap[input[i]];
                }
            }
            counter.value = start + length - 1;
        } else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                } else {
                    if (Object.keys(tismap).indexOf(input[i]) != -1) {
                        result += tismap[input[i]];
                    }
                }
            }
        }
        return result;
    }
    private cleanup(): void {
        this.data = new RDData();
        this.file = new RDFile();
    }
}