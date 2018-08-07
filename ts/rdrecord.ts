class RDRecord {
    Entry: number;
    ID: number;
    Prefix: string;
    FirstName: string;
    LastName: string;
    Date: Date;
    Amount: number;
    Tax: number;
    Conditions: RDCondition;
    private init(): void {
        this.Entry = -1;
        this.ID = -1;
        this.Prefix = "";
        this.FirstName = "";
        this.LastName = "";
        this.Date = new Date();
        this.Amount = -1;
        this.Tax = -1;
        this.Conditions = RDCondition.NONE;
    }
    constructor() {
        this.init();
    }
}