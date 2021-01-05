function update_ui(currentfile: RDFile) {
    (<HTMLInputElement>document.getElementById("input_id")).value = currentfile.Summary.TaxFilerID.toString();
    (<HTMLInputElement>document.getElementById("input_branch")).value = currentfile.Summary.Branch.toString();
    if (currentfile.Summary.FilingNo == 0) {
        (<HTMLInputElement>document.getElementById("filing_occasion_normal")).checked = true;
        (<HTMLInputElement>document.getElementById("filing_occasion_additional")).checked = false;
    } else {
        (<HTMLInputElement>document.getElementById("filing_occasion_normal")).checked = false;
        (<HTMLInputElement>document.getElementById("filing_occasion_additional")).checked = true;
        (<HTMLInputElement>document.getElementById("filing_additional")).value = currentfile.Summary.FilingNo.toString();
    }
    (<HTMLSelectElement>document.getElementById("input_month")).selectedIndex = currentfile.Summary.FilingMonth - 1;
    (<HTMLSelectElement>document.getElementById("input_year")).value = currentfile.Summary.FilingYear.toString();
    /*for (let i = 0; i < currentfile.Summary.overview.length; i++) {
        document.getElementById("summary_table").rows[i + 1].cells[2].innerHTML = currentfile.Summary.overview[i].entries;
        document.getElementById("summary_table").rows[i + 1].cells[3].innerHTML = currentfile.Summary.overview[i].total_income;
        document.getElementById("summary_table").rows[i + 1].cells[4].innerHTML = currentfile.Summary.overview[i].total_tax_due;
    }*/
    for (let i = 0; i < currentfile.Records.length; i++) {
        clearRow(i, -1);
        let recordDiff = currentfile.Records[i].length - getRecordCount(i);
        if (recordDiff > 0) {
            addRow(i, Math.abs(recordDiff));
        } else if (recordDiff < 0) {
            delRow(i, Math.abs(recordDiff));
        }
        for (let j = 0; j < currentfile.Records[i].length; j++) {
            setCell(i, j, 0, getRecordCount(i) + 1);
            setCell(i, j, 1, currentfile.Records[i][j].ID);
            setCell(i, j, 2, currentfile.Records[i][j].Prefix);
            setCell(i, j, 3, currentfile.Records[i][j].FirstName);
            setCell(i, j, 4, currentfile.Records[i][j].LastName);
            setCell(i, j, 5, currentfile.Records[i][j].Date);
            setCell(i, j, 6, currentfile.Records[i][j].Amount);
            setCell(i, j, 7, currentfile.Records[i][j].Tax);
            setCell(i, j, 8, currentfile.Records[i][j].Conditions);
        }
    }
}
function getRecordCount(table) {
    return (<HTMLTableElement>document.getElementById("t" + table)).rows.length - 1;
}
function addRow(form, count) {
    let table = (<HTMLTableElement>document.getElementById("t" + form));
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
function delRow(form, count) {
    for (let i = 0; i < count; i++) {
        (<HTMLTableElement>document.getElementById("t" + form)).deleteRow(-1);
    }
}
function clearRow(form, row) {
    let table = (<HTMLTableElement>document.getElementById("t" + form));
    if (row == -1) {
        for (let i = 1; i < table.rows.length; i++) {
            for (let j = 1; j < 9; j++) {
                if (j != 5) {
                    (<HTMLInputElement>table.rows[i].cells[j].children[0]).value = "";
                } else {
                    for (let k = 0; k < 3; k++) {
                        (<HTMLInputElement>table.rows[i].cells[j].children[0].children[k]).value = "";
                    }
                }
            }
        }
    } else if (row > 0) {
        for (let j = 1; j < 9; j++) {
            if (j != 5) {
                (<HTMLInputElement>table.rows[row + 1].cells[j].children[0]).value = "";
            } else {
                for (let k = 0; k < 3; k++) {
                    (<HTMLInputElement>table.rows[row + 1].cells[j].children[0].children[k]).value = "";
                }
            }
        }
    }
}
function setCell(form, row, cell, value) {
    console.log(form + "," + row + "," + cell + "," + value);
    let table = (<HTMLTableElement>document.getElementById("t" + form));
    let t_c0 = <HTMLInputElement>table.rows[row + 1].cells[cell].children[0];
    if (cell != 5) {
        t_c0.value = value;
    } else {
        (<HTMLInputElement>t_c0.children[2]).value = value.substring(0, 4);
        (<HTMLInputElement>t_c0.children[1]).value = value.substring(5, 7);
        (<HTMLInputElement>t_c0.children[0].children[0]).value = value.substring(8);
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
        case "#summary":
            onlyShow(-1);
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