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
    public static Decode(input: Array<string>, counter: {value: number}, start: number, length: number, isTIS: boolean): string {
        let result: string = "";
        if (isTIS === true) {
            if (length > 0) {
                for (let i = start; i < start + length; i++) {
                    if (Object.keys(tismap).indexOf(input[i]) != -1) {
                        result += tismap[input[i]];
                    }
                }
            } else {
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
        } else {
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
        }
        return result;
    }
    public static Encode(input: string, isTIS: boolean): Array<string> {
        let result = new Array<string>();
        for (let i = 0; i < input.length; i++) {
            if (isTIS === true) {
                result.push(Object.keys(tismap).find(key => tismap[key] === input[i]));
            } else {
                result.push(RDConverter.PrefixZero(input.charCodeAt(i), 4));
            }
        }
        return result;
    }
    private cleanup(): void {
        this.data = new RDData();
        this.file = new RDFile();
    }
}