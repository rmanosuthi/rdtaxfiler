class RDFieldManager {
    static GetTransactionsCount(input) {
        let counter = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter++;
            }
        }
        return counter;
    }
    static GetTotalIncome(input) {
        let counter = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter += input[i][j].Amount;
            }
        }
        return counter;
    }
    static GetTotalFieldIncome(input) {
        let counter = 0;
        for (let i = 0; i < input.length; i++) {
            counter += input[i].Amount;
        }
        return counter;
    }
    static GetTotalTax(input) {
        let counter = 0;
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                counter += input[i][j].Tax;
            }
        }
        return counter;
    }
    static GetTotalFieldTax(input) {
        let counter = 0;
        for (let i = 0; i < input.length; i++) {
            counter += input[i].Tax;
        }
        return counter;
    }
    static GetEntries(input) {
        return input.length;
    }
}
