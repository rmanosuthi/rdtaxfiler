class RDFieldManager {
    public static GetTransactionsCount(input: Array<Array<RDRecord>>): number {
        let counter: number = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter++;
            }
        }
        return counter;
    }
    public static GetTotalIncome(input: Array<Array<RDRecord>>): number {
        let counter: number = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter += input[i][j].Amount;
            }
        }
        return counter;
    }
    public static GetTotalFieldIncome(input: Array<RDRecord>): number {
        let counter: number = 0;
        for (let i = 0; i < input.length; i++) {
            counter += input[i].Amount;
        }
        return counter;
    }
    public static GetTotalTax(input: Array<Array<RDRecord>>): number {
        let counter: number = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter += input[i][j].Tax;
            }
        }
        return counter;
    }
    public static GetTotalFieldTax(input: Array<RDRecord>): number {
        let counter: number = 0;
        for (let i = 0; i < input.length; i++) {
            counter += input[i].Tax;
        }
        return counter;
    }
    public static GetEntries(input: Array<RDRecord>): number {
        return input.length;
    }
}