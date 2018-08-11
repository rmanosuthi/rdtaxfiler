class RDLabel {
    public Content: string;
    public Position: number;
    public Length: number;
    public InitialBreak: number;
    constructor(position: number, length: number, initialBreak: number) {
        this.Position = position;
        this.Length = length;
        this.InitialBreak = initialBreak;
    }
}