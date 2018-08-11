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
    private encode(input: string): Array<string> {
        let result = new Array<string>();
        for (let i = 0; i < input.length; i++) {
            result.push(RDConverter.PrefixZero(input.charCodeAt(i), 4));
        }
        return result;
    }
    private cleanup(): void {
        this.data = new RDData();
        this.file = new RDFile();
    }
}