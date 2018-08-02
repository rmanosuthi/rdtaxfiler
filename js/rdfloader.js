var activefile = {
    D: {},
    M: {},
    S: {}
};
var ext_db;
var breakCharacter = "0124";
var endedAt = 0;

function readFile(input, mode) {
    var datablock = [];
    if (mode == "D" || mode == "M" || mode == "S") {
        chunkBreak(input, datablock, 4);
        if (validate(datablock, mode) == true) {
            switch (mode) {
                case "D":
                    activefile.D.A = decodeDecimal(datablock, 3, 4);
                    activefile.D.B = decodeDecimal(datablock, 8, 1);
                    activefile.D.C = decodeDecimal(datablock, 10, 13);
                    activefile.D.D = decodeTIS(datablock, 25, -1);
                    activefile.D.E = decodeTIS(datablock, endedAt + 2, -1);
                    activefile.D.F = decodeTIS(datablock, endedAt + 2, -1);
                    activefile.D.G = decodeDecimal(datablock, endedAt + 2, 10);
                    activefile.D.H = decodeDecimal(datablock, endedAt + 2, -1);
                    activefile.D.I = decodeDecimal(datablock, endedAt + 2, -1);
                    activefile.D.J = decodeDecimal(datablock, endedAt + 2, 1);
                    break;
                case "M":
                    break;
                case "S":
                    break;
            }
        }
    } else {
        console.log("Unknown file type '" + mode + "', aborting!");
    }
}
function chunkBreak(input, output, length) {
    for (var i = 0; i < input.length; i++) {
        if (i % length === 0) {
            output[Math.floor((i) / length)] = "";
        }
        output[Math.floor(i / length)] += input[i];
    }
}
function validate(input, mode) {
    switch (mode) {
        case "D":
            return true;
        case "M":
            return true;
        case "S":
            return true;
        default:
            console.log("Unknown file type '" + mode + "', aborting!");
            break;
    }
}
function decodeDecimal(input, start, length) {
    var result = "";
    if (length > 0) {
        for (var i = start; i < start + length; i++) {
            result += String.fromCharCode(parseInt(input[i], 10));
        }
        endedAt = start + length - 1;
    } else { // indeterminate length
        for (var i = start; i < input.length; i++) {
            if (input[i] == breakCharacter) {
                endedAt = i - 1;
                break;
            } else {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
        }
    }
    return result;
}
function decodeTIS(input, start, length) {
    var result = "";
    if (length > 0) {
        for (var i = start; i < start + length; i++) {
            if (Object.keys(tismap).includes(input[i]) === true) {
                result += tismap[input[i]];
            }
        }
        endedAt = start + length - 1;
    } else { // indeterminate length
        for (var i = start; i < input.length; i++) {
            if (input[i] == breakCharacter) {
                endedAt = i - 1;
                break;
            } else {
                if (Object.keys(tismap).includes(input[i]) === true) {
                    result += tismap[input[i]];
                }
            }
        }
    }
    return result;
}