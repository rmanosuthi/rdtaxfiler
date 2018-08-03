var activeblock = {
    D: {},
    M: {},
    S: {}
};
var records = [[], [], [], [], []];
var chunks = [[], [], []];
var subchunks = [[], [], []];
var ext_db;
var breakCharacter = "0124";
var entries = [];
var endedAt = 0;

function decode(d, m, s) {
    chunkBreak(d, chunks[0], 4);
    separateEntries(chunks[0], subchunks[0]);
    decodeSection(subchunks[0], "D");
}
function decodeSection(input, mode) {
    console.log("Decoding " + input.length + " times");
    for (var i = 0; i < input.length; i++) {
        var datablock = input[i];
        if (mode == "D" || mode == "M" || mode == "S") {
            if (validate(datablock, mode) == true) {
                switch (mode) {
                    case "D":
                        activeblock.D.A = decodeDecimal(datablock, 3, 4);
                        activeblock.D.B = decodeDecimal(datablock, 8, 1);
                        activeblock.D.C = decodeDecimal(datablock, 10, 13);
                        activeblock.D.D = decodeTIS(datablock, 25, -1);
                        activeblock.D.E = decodeTIS(datablock, endedAt + 2, -1);
                        activeblock.D.F = decodeTIS(datablock, endedAt + 2, -1);
                        activeblock.D.G = decodeDecimal(datablock, endedAt + 2, 10);
                        activeblock.D.H = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.D.I = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.D.J = decodeDecimal(datablock, endedAt + 2, 1);
                        store(activeblock.D, "D");
                        break;
                    case "M":
                        activeblock.M.A = decodeDecimal(datablock, 3, 5);
                        activeblock.M.B = decodeDecimal(datablock, 11, 13);
                        activeblock.M.C = decodeDecimal(datablock, 25, 1);
                        activeblock.M.D = decodeDecimal(datablock, 27, 5);
                        activeblock.M.E = decodeDecimal(datablock, 33, 1);
                        activeblock.M.F = decodeDecimal(datablock, 35, -1);
                        activeblock.M.G = decodeDecimal(datablock, endedAt + 2, 4);
                        activeblock.M.H = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.M.I = decodeDecimal(datablock, endedAt + 2, 10);
                        activeblock.M.J = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.M.K = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.M.L = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.M.M = decodeDecimal(datablock, endedAt + 3, -1);
                        activeblock.M.N = decodeDecimal(datablock, endedAt + 2, -1);
                        activeblock.M.O = decodeDecimal(datablock, endedAt + 3, -1);
                        activeblock.M.P = decodeDecimal(datablock, endedAt + 2, 2);
                        activeblock.M.Q = decodeDecimal(datablock, endedAt + 2, 1);
                        activeblock.M.R = decodeDecimal(datablock, endedAt + 6, 1);
                        activeblock.M.S = decodeDecimal(datablock, endedAt + 2, 1);
                        activeblock.M.T = decodeDecimal(datablock, endedAt + 3, 1);
                        activeblock.M.U = decodeDecimal(datablock, endedAt + 2, 1);
                        activeblock.M.V = decodeDecimal(datablock, endedAt + 2, 1);
                        store(activeblock.M, "M");
                        break;
                    case "S":
                        break;
                }
            }
        } else {
            console.log("Unknown file type '" + mode + "', aborting!");
        }
    }
}
function store(input, mode) {
    if (mode == "D") {
        console.log(input.A);
        if (input.A == "401N") {
            records[0].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "401S") {
            records[1].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "4012") {
            records[2].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "402I") {
            records[3].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "402E") {
            records[4].push(JSON.parse(JSON.stringify(input)));
        } else {
            console.log("Invalid record");
        }
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
function separateEntries(input, output) {
    var occurrences = [];
    for (var i = 0; i < input.length; i++) {
        if (input[i] == breakCharacter &&
            input[i + 1] == breakCharacter &&
            input[i + 2] == breakCharacter) {
                occurrences[occurrences.length] = i;
                i += 2;
        }
    }
    occurrences[occurrences.length] = input.length;
    for (var i = 0; i < occurrences.length - 1; i++) {
        output[i] = [];
        for (var j = occurrences[i]; j < occurrences[i + 1]; j++) {
            output[i].push(input[j]);
        }
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