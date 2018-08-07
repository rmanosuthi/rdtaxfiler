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
               this.prefixZero(date.getDate());

    }
    private static prefixZero(input: number): string {
        if (input < 10) {
            return "0" + input.toString();
        } else {
            return input.toString();
        }
    }
}