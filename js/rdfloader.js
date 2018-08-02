function readFile(input, mode) {
    var datablock;
    if (mode == "D" || mode == "M" || mode == "S") {
        chunkBreak(input, datablock, 4);
        if (validate(datablock, mode) == true) {

        }
    } else {
        console.log("Unknown file type '" + mode + "', aborting!");
    }
}
function chunkBreak(input, output, length) {
    for (var i = 0; i < input.length; i++) {
        output[Math.floor((i + 1) / length)] += input[i];
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