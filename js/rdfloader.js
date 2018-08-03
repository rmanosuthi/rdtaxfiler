var activeblock = {
    D: {},
    M: {},
    S: {}
};
var currentfile = {
    summary: {
        pnd_ver: "",
        taxfiler_id: "",
        form_variant: "",
        branch: "",
        filing_no: "",
        filing_month: "",
        filing_year: "",
        book_name: "",
        book_filedate: "",
        total_transactions: "",
        total_income: "",
        total_tax_due: "",
        program_ver: "",
        overview: [
            {entries: "", total_income: "", total_tax_due: ""},
            {entries: "", total_income: "", total_tax_due: ""},
            {entries: "", total_income: "", total_tax_due: ""},
            {entries: "", total_income: "", total_tax_due: ""},
            {entries: "", total_income: "", total_tax_due: ""}
        ]
    },
    records: [[], [], [], [], []]
};
var chunks = [[], [], []];
var subchunks = [[], [], []];
var ext_db;
var breakCharacter = "0124";
var entries = [];
var endedAt = 0;

function decode(d, m, s) {
    chunkBreak(d, chunks[0], 4);
    chunkBreak(m, chunks[1], 4);
    chunkBreak(s, chunks[2], 4);
    separateEntries(chunks[0], subchunks[0]);
    separateEntries(chunks[2], subchunks[2]);
    decodeSection(subchunks[0], "D");
    decodeSection(chunks[1], "M");
    decodeSection(subchunks[2], "S");
    update_ui();
}
function decodeSection(input, mode) {
    switch (mode) {
        case "D":
            console.log("Decoding " + input.length + " times");
            for (var i = 0; i < input.length; i++) {
                var datablock = input[i];
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
                store(activeblock.D, "D", currentfile);
            }
            break;
        case "M":
            var datablock = input;
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
            activeblock.M.P = decodeDecimal(datablock, endedAt + 14, 2);
            activeblock.M.Q = decodeDecimal(datablock, endedAt + 2, 1);
            activeblock.M.R = decodeDecimal(datablock, endedAt + 6, 1);
            activeblock.M.S = decodeDecimal(datablock, endedAt + 2, 1);
            activeblock.M.T = decodeDecimal(datablock, endedAt + 3, 1);
            activeblock.M.U = decodeDecimal(datablock, endedAt + 2, 1);
            activeblock.M.V = decodeDecimal(datablock, endedAt + 2, 1);
            store(activeblock.M, "M", currentfile);
            break;
        case "S":
            console.log("Decoding " + input.length + " times");
            for (var i = 0; i < input.length; i++) {
                var datablock = input[i];
                activeblock.S.A = decodeDecimal(datablock, 3, 4);
                activeblock.S.B = decodeDecimal(datablock, 8, 1);
                activeblock.S.C = decodeDecimal(datablock, 10, -1);
                activeblock.S.D = decodeTIS(datablock, endedAt + 2, -1);
                store(activeblock.S, "S", currentfile);
            }
            break;
    }
}

function store(input, mode, table) {
    if (mode == "D") {
        console.log(input.A);
        if (input.A == "401N") {
            table.records[0].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "401S") {
            table.records[1].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "4012") {
            table.records[2].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "402I") {
            table.records[3].push(JSON.parse(JSON.stringify(input)));
        } else if (input.A == "402E") {
            table.records[4].push(JSON.parse(JSON.stringify(input)));
        } else {
            console.log("Invalid record");
        }
    } else if (mode == "M") {
        table.summary = {
            pnd_ver: input.A,
            taxfiler_id: input.B,
            form_variant: input.C,
            branch: input.D,
            filing_no: input.E,
            filing_month: input.F,
            filing_year: input.G,
            book_name: input.H,
            book_filedate: input.I,
            total_transactions: input.J,
            total_income: input.K,
            total_tax_due: input.L,
            program_ver: input.O,
            overview: table.summary.overview
        };
    } else if (mode == "S") {
        if (input.A == "401N") {
            table.summary.overview[0] = {
                entries: input.B,
                total_income: input.C,
                total_tax_due: input.D
            };
        } else if (input.A == "401S") {
            table.summary.overview[1] = {
                entries: input.B,
                total_income: input.C,
                total_tax_due: input.D
            };
        } else if (input.A == "4012") {
            table.summary.overview[2] = {
                entries: input.B,
                total_income: input.C,
                total_tax_due: input.D
            };
        } else if (input.A == "402I") {
            table.summary.overview[3] = {
                entries: input.B,
                total_income: input.C,
                total_tax_due: input.D
            };
        } else if (input.A == "402E") {
            table.summary.overview[4] = {
                entries: input.B,
                total_income: input.C,
                total_tax_due: input.D
            };
        } else {
            console.log("Invalid record");
        }
    }
    //cleanup();
}
function cleanup() {
    endedAt = 0;
    activeblock = {
        D: {},
        M: {},
        S: {}
    };
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
function update_ui() {
    document.getElementById("input_id").value = currentfile.summary.taxfiler_id;
    document.getElementById("input_branch").value = currentfile.summary.branch;
    if (currentfile.summary.filing_no == "0") {
        document.getElementById("filing_occasion_normal").checked = true;
        document.getElementById("filing_occasion_additional").checked = false;
    } else {
        document.getElementById("filing_occasion_normal").checked = false;
        document.getElementById("filing_occasion_additional").checked = true;
        document.getElementById("filing_additional").value = parseInt(currentfile.summary.filing_no);
    }
    document.getElementById("input_month").selectedIndex = parseInt(currentfile.summary.filing_month) - 1;
    document.getElementById("input_year").value = currentfile.summary.filing_year;
    for (var i = 0; i < currentfile.summary.overview.length; i++) {
        document.getElementById("summary_table").rows[i + 1].cells[2].innerHTML = currentfile.summary.overview[i].entries;
        document.getElementById("summary_table").rows[i + 1].cells[3].innerHTML = currentfile.summary.overview[i].total_income;
        document.getElementById("summary_table").rows[i + 1].cells[4].innerHTML = currentfile.summary.overview[i].total_tax_due;
    }
}
function addRow(attachment_num) {
    /*
        <th>Entry</th>
        <th>Tax filer ID</th>
        <th>Name</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Tax</th>
        <th>Conditions</th>
    */
    if (attachment_num == 0) {
        var newrow = document.getElementById("attachment_table_1").insertRow();
        var tax_filer_id_input = document.createElement("input")
        tax_filer_id_input.setAttribute("type", "text");
        tax_filer_id_input.style.margin = "0.2em";
        for (var i = 0; i < 7; i++) {
            newrow.insertCell(i);
        }
        newrow.cells[0].innerHTML = document.getElementById("attachment_table_1").rows.length - 1;
        newrow.cells[1].appendChild(tax_filer_id_input);
    }
}

window.onload = function() {
    document.getElementById("attachment_table_1_addrow").addEventListener("click", function() {
        addRow(0);
    });
};