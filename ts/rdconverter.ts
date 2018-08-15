class RDConverter {
    public static TabNumToString(tab: number): string {
        if (tab == 0) {
            return "401N";
        } else if (tab == 1) {
            return "401S";
        } else if (tab == 2) {
            return "4012";
        } else if (tab == 3) {
            return "402I";
        } else if (tab == 4) {
            return "402E";
        } else {
            throw new Error("Invalid tab number " + tab.toString());
        }
    }
    public static DateObjectToString(date: Date): string {
        return date.getFullYear().toString() + "-" +
               (date.getMonth() + 1).toString() + "-" +
               this.PrefixZero(date.getDate(), 2);

    }
    public static PrefixZero(input: number, digits: number): string {
        let output = "";
        for (let i = 0; i < digits - RDConverter.getDigits(input); i++) {
            output += "0";
        }
        output += input.toFixed(0);
        return output;
    }
    private static getDigits(input: number): number {
        let counter = 1;
        while (input / Math.pow(10, counter) >= 1) {
            counter++;
        }
        return counter;
    }
    public static BranchNumToString(branch: number): string {
        return this.PrefixZero(branch, 5);
    }
}