class RDFUtil {
    private data: RDData = new RDData();
    public file: RDFile = new RDFile();
    private breakCharacter: string = "0124";
    constructor() { }
    public Load = (input: Array<string>): void => {
        this.cleanup();
        this.data.LoadFromRaw(input);
        this.file.LoadFromData(this.data);
    }
    private validate(): boolean {
        return true;
    }
    public Reload() {
        this.data = new RDData();
        this.data.LoadFromFile(this.file);
    }
    public static BlocksToFields(input: Array<string>, field: RDField, blockSize: number): void {
        for (let i = 0; i < field.Label.length; i++) {
            field.Position += field.Label[i].InitialBreak;
            if (field.Label[i].Length == -1) {
                field.Label[i].Content = RDFUtil.Decode(
                    input.slice(
                        field.Position, // start
                        field.Position + this.SeekBreak(input, field.Position) // end
                    ), field.Label[i].IsTIS);
                field.Position += this.SeekBreak(input, field.Position);
            } else {
                field.Label[i].Content = RDFUtil.Decode(input.slice(field.Position, field.Position + field.Label[i].Length), field.Label[i].IsTIS);
                field.Position += field.Label[i].Length;
            }
        }
    }
    public static SeekBreak(input: Array<string>, start: number): number {
        for (let i = start; i < input.length; i++) {
            if (input[i] === "0124") {
                return i - start;
            }
        }
        return -1;
    }
    public static Decode(input: Array<string>, isTIS: boolean): string {
        let result: string = "";
        for (let i = 0; i < input.length; i++) {
            if (isTIS === true) {
                if (Object.keys(tismap).indexOf(input[i]) != 0) {
                    result += tismap[input[i]];
                }
            } else {
                result += String.fromCharCode(parseInt(input[i]));
            }
        }
        return result;
    }
    public static Encode(string_to_encode: string, isTIS: boolean): Array<string> {
        let result = new Array<string>();
        for (let i = 0; i < string_to_encode.length; i++) {
            if (isTIS === true) {
                result.push(Object.keys(tismap).find(key => tismap[key] === string_to_encode[i]));
            } else {
                result.push(RDConverter.PrefixZero(string_to_encode.charCodeAt(i), 4));
            }
        }
        return result;
    }
    private cleanup(): void {
        this.data = new RDData();
        this.file = new RDFile();
    }
}