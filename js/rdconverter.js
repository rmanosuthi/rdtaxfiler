class RDConverter {
    static TabNumToString(tab) {
        if (tab == 0) {
            return "401N";
        }
        else if (tab == 1) {
            return "401S";
        }
        else if (tab == 2) {
            return "4012";
        }
        else if (tab == 3) {
            return "402I";
        }
        else if (tab == 4) {
            return "402E";
        }
        else {
            throw new Error("Invalid tab number " + tab.toString());
        }
    }
    static DateObjectToString(date) {
        return date.getFullYear().toString() + "-" +
            (date.getMonth() + 1).toString() + "-" +
            this.prefixZero(date.getDate(), 2);
    }
    static prefixZero(input, digits) {
        let output = "";
        for (let i = 0; i < digits - RDConverter.getDigits(input); i++) {
            output += "0";
        }
        output += input.toFixed(0);
        return output;
    }
    static getDigits(input) {
        let counter = 1;
        while (input / Math.pow(10, counter) >= 1) {
            counter++;
        }
        return counter;
    }
    static BranchNumToString(branch) {
        return this.prefixZero(branch, 5);
    }
}
