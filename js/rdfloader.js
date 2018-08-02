var activefile = {};
var ext_db;
var breakCharacter = "0124";

function readFile(input, mode) {
    var datablock = [];
    if (mode == "D" || mode == "M" || mode == "S") {
        chunkBreak(input, datablock, 4);
        if (validate(datablock, mode) == true) {
            activefile.A = decodeDecimal(datablock, 3, 4);
            activefile.B = decodeDecimal(datablock, 8, 1);
            activefile.C = decodeDecimal(datablock, 10, 13);
        }
    } else {
        console.log("Unknown file type '" + mode + "', aborting!");
    }
    ext_db = datablock;
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
    } else { // indeterminate length
        for (var i = start; i < input.length; i++) {
            if (input[i] == breakCharacter) {
                break;
            } else {
                result += String.fromCharCode(parseInt(input[i], 10));
            }
        }
    }
    return result;
}