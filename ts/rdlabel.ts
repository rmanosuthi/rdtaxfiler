class RDLabel {
    public Content: string;
    private position: number;
    private length: number;
    private initialBreak: number;
    constructor(position: number, length: number, initialBreak: number) {
        this.position = position;
        this.length = length;
        this.initialBreak = initialBreak;
    }
}