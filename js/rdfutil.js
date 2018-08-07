class RDFUtil {
    constructor() {
        this.data = new RDData();
        this.file = new RDFile();
        this.breakCharacter = "1024";
        this.Load = (input) => {
            this.cleanup();
            this.data.LoadFromRaw(input);
            this.file.LoadFromData(this.data);
        };
    }
    chunkBreak(input, length) {
        let output = new Array();
        for (let i = 0; i < input.length; i++) {
            if (i % length === 0) {
                output.push("");
            }
            output[Math.floor(i / length)] += input.charAt(i);
        }
        return output;
    }
    separateEntries(input) {
        let output = new Array();
        let occurrences = new Array();
        for (let i = 0; i < input.length; i++) {
            if (input[i] == "0124" &&
                input[i + 1] == "0124" &&
                input[i + 2] == "0124") {
                occurrences[occurrences.length] = i;
                i += 2;
            }
        }
        occurrences[occurrences.length] = input.length;
        for (let i = 0; i < occurrences.length - 1; i++) {
            output[i] = new Array();
            for (var j = occurrences[i]; j < occurrences[i + 1]; j++) {
                output[i].push(input[j]);
            }
        }
        return output;
    }
    validate() {
        return true;
    }
    static decodeDecimal(input, counter, start, length) {
        let result = "";
        console.log("counter: " + counter.toString());
        console.log("start: " + start.toString());
        console.log("length:" + length.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
            counter.value = start + length - 1;
        }
        else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                }
                else {
                    result += String.fromCharCode(parseInt(input[i], 10));
                }
            }
        }
        console.log(result);
        return result;
    }
    static decodeTIS(input, counter, start, length) {
        let result = "";
        console.log("start: " + start.toString());
        if (length > 0) {
            for (let i = start; i < start + length; i++) {
                if (Object.keys(tismap).indexOf(input[i]) != -1) {
                    result += tismap[input[i]];
                }
            }
            counter.value = start + length - 1;
        }
        else { // indeterminate length
            for (let i = start; i < input.length; i++) {
                if (input[i] == "0124") {
                    counter.value = i - 1;
                    break;
                }
                else {
                    if (Object.keys(tismap).indexOf(input[i]) != -1) {
                        result += tismap[input[i]];
                    }
                }
            }
        }
        return result;
    }
    cleanup() {
        this.data = new RDData();
        this.file = new RDFile();
    }
}
