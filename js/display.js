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
    for (let i = 0; i < currentfile.summary.overview.length; i++) {
        document.getElementById("summary_table").rows[i + 1].cells[2].innerHTML = currentfile.summary.overview[i].entries;
        document.getElementById("summary_table").rows[i + 1].cells[3].innerHTML = currentfile.summary.overview[i].total_income;
        document.getElementById("summary_table").rows[i + 1].cells[4].innerHTML = currentfile.summary.overview[i].total_tax_due;
    }
    for (let i = 0; i < currentfile.records.length; i++) {
        if (getRecordCount(i) < currentfile.records[i].length) {
            addRow()
        }
    }
}
function getRecordCount(table) {
    return document.getElementById("t" + table).rows.length - 1;
}
function addRow(form, count) {
    let table = document.getElementById("t" + form);
    for (let c = 0; c < count; c++) {
        let newrow = table.insertRow();
        let cells = [];
        let cellContent = [];
        let dateblocklength = [2, 2, 4];
        let dateblock = [];
        for (let i = 0; i < 3; i++) {
            dateblock[i] = document.createElement("input");
            dateblock[i].setAttribute("type", "text");
            dateblock[i].setAttribute("maxlength", dateblocklength[i]);
            dateblock[i].addEventListener("keypress", function (event) {
                let charCode = event.charCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    event.preventDefault();
                }
            });
            dateblock[i].style.width = dateblocklength[i].toString() + "em";
        }
        for (let j = 0; j < 9; j++) {
            cells[j] = newrow.insertCell(j);
            if (j == 0) {
                cellContent[j] = document.createElement("span");
                cellContent[j].innerHTML = table.rows.length - 1;
            } else if (j == 5) {
                cellContent[j] = document.createElement("div");
                for (var k = 0; k < 3; k++) {
                    cellContent[j].appendChild(dateblock[k]);
                    if (k != 2) {
                        cellContent[j].innerHTML += "/";
                    }
                }
            } else {
                cellContent[j] = document.createElement("input");
                cellContent[j].setAttribute("type", "text");
            }
            cells[j].appendChild(cellContent[j]);
        }
    }
}
function onlyShow(page) {
    let main = document.getElementById("view_summary");
    for (let i = 0; i < 5; i++) {
        console.log(i);
        if (page == -1) {
            main.style.display = "flex";
            document.getElementById("at" + i).style.display = "none";
        } else {
            main.style.display = "none";
            if (i == page) {
                document.getElementById("at" + i).style.display = "flex";
            } else {
                document.getElementById("at" + i).style.display = "none";
            }
        }
    }
}
function navigate() {
    switch (window.location.hash) {
        case "#attach_1":
            onlyShow(0);
            break;
        case "#attach_2":
            onlyShow(1);
            break;
        case "#attach_3":
            onlyShow(2);
            break;
        case "#attach_4":
            onlyShow(3);
            break;
        case "#attach_5":
            onlyShow(4);
            break;
        default:
            onlyShow(-1);
            break;
    }
}
function window_ready() {
    navigate();
    for (let i = 0; i < 5; i++) {
        addRow(i, 1);
        document.getElementById("t" + i.toString() + "_addrow").addEventListener("click", function (event) {
            addRow(i, 1);
        });
    }
}