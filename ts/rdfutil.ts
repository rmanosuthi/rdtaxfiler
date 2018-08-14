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
    public static BlocksToField(input: Array<string>, field: RDField, blockSize: number): void {
        for (let i = 0; i < field.Label.length; i++) {
            field.Position += field.Label[i].InitialBreak;
            field.Label[i].Content = RDFUtil.Decode(input.slice(field.Position, field.Label[i].Length), field.Label[i].IsTIS);
            field.Position += field.Label[i].Length;
        }
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