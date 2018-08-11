class RDField {
    public Label: Array<RDLabel>;
    public Position = {value: -1};
    constructor(type: RDFieldType) {
        switch (type) {
            case RDFieldType.D:
                this.Label = [
                    new RDLabel(0, -1, 3),      // A
                    new RDLabel(-1, -1, 1),     // B
                    new RDLabel(-1, -1, 1),     // C
                    new RDLabel(-1, -1, 2),     // D
                    new RDLabel(-1, -1, 1),     // E
                    new RDLabel(-1, -1, 1),     // F
                    new RDLabel(-1, -1, 1),     // G
                    new RDLabel(-1, -1, 1),     // H
                    new RDLabel(-1, -1, 1),     // I
                    new RDLabel(-1, -1, 1),     // J
                    new RDLabel(-1, -1, 1)      // K
                ];
                break;
            case RDFieldType.M:
                this.Label = [
                    new RDLabel(0, -1, 3),      // A
                    new RDLabel(-1, -1, 3),     // B
                    new RDLabel(-1, -1, 1),     // C
                    new RDLabel(-1, -1, 1),     // D
                    new RDLabel(-1, -1, 1),     // E
                    new RDLabel(-1, -1, 1),     // F
                    new RDLabel(-1, -1, 1),     // G
                    new RDLabel(-1, -1, 1),     // H
                    new RDLabel(-1, -1, 1),     // I
                    new RDLabel(-1, -1, 1),     // J
                    new RDLabel(-1, -1, 1),     // K
                    new RDLabel(-1, -1, 1),     // L
                    new RDLabel(-1, -1, 2),     // M
                    new RDLabel(-1, -1, 1),     // N
                    new RDLabel(-1, -1, 2),     // O
                    new RDLabel(-1, -1, 13),    // P
                    new RDLabel(-1, -1, 1),     // Q
                    new RDLabel(-1, -1, 5),     // R
                    new RDLabel(-1, -1, 1),     // S
                    new RDLabel(-1, -1, 2),     // T
                    new RDLabel(-1, -1, 1),     // U
                    new RDLabel(-1, -1, 1),     // V
                    new RDLabel(-1, -1, 1),     // W
                ];
                break;
            case RDFieldType.S:
                this.Label = [
                    new RDLabel(0, -1, 3),      // A
                    new RDLabel(-1, -1, 1),     // B
                    new RDLabel(-1, -1, 1),     // C
                    new RDLabel(-1, -1, 1),     // D
                    new RDLabel(-1, -1, 1)      // E
                ];
                break;
        }
    }
}