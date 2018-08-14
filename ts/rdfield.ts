class RDField {
    public Label: Array<RDLabel>;
    public Position: number;
    constructor(type: RDFieldType) {
        switch (type) {
            case RDFieldType.D:
                this.Label = [
                    new RDLabel(0, -1, 3, false),      // A
                    new RDLabel(-1, -1, 1, false),     // B
                    new RDLabel(-1, -1, 1, false),     // C
                    new RDLabel(-1, -1, 2, true),     // D
                    new RDLabel(-1, -1, 1, true),     // E
                    new RDLabel(-1, -1, 1, true),     // F
                    new RDLabel(-1, -1, 1, false),     // G
                    new RDLabel(-1, -1, 1, false),     // H
                    new RDLabel(-1, -1, 1, false),     // I
                    new RDLabel(-1, -1, 1, false),     // J
                    new RDLabel(-1, -1, 1, false)      // K
                ];
                break;
            case RDFieldType.M:
                this.Label = [
                    new RDLabel(0, -1, 3 , false),      // A
                    new RDLabel(-1, -1, 3, false),     // B
                    new RDLabel(-1, -1, 1, false),     // C
                    new RDLabel(-1, -1, 1, false),     // D
                    new RDLabel(-1, -1, 1, false),     // E
                    new RDLabel(-1, -1, 1, false),     // F
                    new RDLabel(-1, -1, 1, false),     // G
                    new RDLabel(-1, -1, 1, false),     // H
                    new RDLabel(-1, -1, 1, false),     // I
                    new RDLabel(-1, -1, 1, false),     // J
                    new RDLabel(-1, -1, 1, false),     // K
                    new RDLabel(-1, -1, 1, false),     // L
                    new RDLabel(-1, -1, 2, false),     // M
                    new RDLabel(-1, -1, 1, false),     // N
                    new RDLabel(-1, -1, 2, false),     // O
                    new RDLabel(-1, -1, 13, false),    // P
                    new RDLabel(-1, -1, 1, false),     // Q
                    new RDLabel(-1, -1, 5, false),     // R
                    new RDLabel(-1, -1, 1, false),     // S
                    new RDLabel(-1, -1, 2, false),     // T
                    new RDLabel(-1, -1, 1, false),     // U
                    new RDLabel(-1, -1, 1, false),     // V
                    new RDLabel(-1, -1, 1, false),     // W
                ];
                break;
            case RDFieldType.S:
                this.Label = [
                    new RDLabel(0, -1, 3, false),      // A
                    new RDLabel(-1, -1, 1, false),     // B
                    new RDLabel(-1, -1, 1, false),     // C
                    new RDLabel(-1, -1, 1, false),     // D
                    new RDLabel(-1, -1, 1, false)      // E
                ];
                break;
        }
    }
}