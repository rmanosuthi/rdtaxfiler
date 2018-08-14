class RDLabel {
    public Content: string;
    public Position: number;
    public Length: number;
    public InitialBreak: number;
    public IsTIS: boolean;
    constructor(position: number, length: number, initialBreak: number, isTIS: boolean) {
        this.Position = position;
        this.Length = length;
        this.InitialBreak = initialBreak;
        this.IsTIS = isTIS;
    }
}