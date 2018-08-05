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
function addRow(form) {
    var table = document.getElementById("t" + form);
    var newrow = table.insertRow();
    var cells = [];
    var cellContent = [];
    var dateblocklength = [2, 2, 4];
    var dateblock = [];
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
    for (var j = 0; j < 9; j++) {
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
function onlyShow(page) {
    let main = document.getElementById("view_summary");
    for (let i = 1; i < 6; i++) {
        console.log(i);
        if (page == 0) {
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
            onlyShow(1);
            break;
        case "#attach_2":
            onlyShow(2);
            break;
        case "#attach_3":
            onlyShow(3);
            break;
        case "#attach_4":
            onlyShow(4);
            break;
        case "#attach_5":
            onlyShow(5);
            break;
        default:
            onlyShow(0);
            break;
    }
}
function window_ready() {
    navigate();
    for (let i = 1; i < 6; i++) {
        addRow(i);
        var button = document.getElementById("attachment_" + i.toString() + "_addrow");
        button.addEventListener("click", function (event) {
            addRow(i);
        });
    }
}