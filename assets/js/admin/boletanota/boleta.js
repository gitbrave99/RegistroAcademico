const db = firebase.firestore();
const cTheader = new TableHeader();
const tblistGradesTeacher = document.querySelector("#tblistGrados tbody");
const tblistAllStudensInTeachergrade = document.querySelector("#tblistStudents tbody");
const titleGradSelected = document.querySelector("#titleGradeSel");
const sOptionsToPrimNotasPeriodo = document.getElementById("selPerFnNotas");

window.addEventListener("DOMContentLoaded", async (e) => {
    db.collection("profesor").get()
        .then((querySnapshot) => {
            tblistGradesTeacher.innerHTML = "";
            querySnapshot.forEach((doc) => {
                tblistGradesTeacher.innerHTML += `
                    <tr>
                        <td class="text-center">${doc.data().gradoEncargado}</td>
                        <td class="text-center">${doc.data().nombre}</td>
                        <td class="text-center">
                            <a class="btn btn-info btn-sm btnShowAllStudentsByGradeTeacher" href="#pnllisStudents" data-grade="${doc.data().gradoEncargado}">
                               Mostrar
                            </a>
                        </td>
                    </tr>`;
            });
            const btnstoShowStudbytg = document.querySelectorAll(".btnShowAllStudentsByGradeTeacher");
            btnstoShowStudbytg.forEach((btn) => {
                btn.addEventListener("click", (evt) => {
                    const dtgrade = evt.target.dataset.grade;
                    if (dtgrade === "Primer Año Bachillerato" || dtgrade == "Segundo Año Bachillerato") {
                        sOptionsToPrimNotasPeriodo.innerHTML = cTheader.GetSelectForFourPeriodosAddNota();
                    } else {
                        sOptionsToPrimNotasPeriodo.innerHTML = cTheader.GetSelectForThreePeriodosAddNota();
                    }
                    ShowAllStudentsByGradeTeacher(dtgrade);
                    titleGradSelected.innerHTML = dtgrade;
                });
            });

        }).catch((error) => {
            console.log(error);
        });




});

function ShowAllStudentsByGradeTeacher(pGrade) {
    db.collection("estudiante").where("grado", "==", pGrade)
        .get()
        .then((querySnapshot) => {
            tblistAllStudensInTeachergrade.innerHTML = "";
            querySnapshot.forEach((doc) => {

                tblistAllStudensInTeachergrade.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().nombre}</td>
                    <td class="text-center">${doc.data().fechNacimiento}</td>
                    <td class="text-center">${doc.data().sexo}</td>
                    <td class="text-center">${doc.data().user}</td>
                    <td class="text-center">${doc.data().password}</td>
                    <td class="text-center">${doc.data().responsable}</td>
                    <td class="text-center">${doc.data().telefono}</td>
                    <td class="text-center">${doc.data().email}</td>
                    <td class="text-center">${doc.data().dui}</td>
                    <td class="text-center">${doc.data().direccion}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-info green accent-4 btnUsetoPrintn" data-grdestu="${doc.data().grado}" data-nmestuden="${doc.data().nombre}" data-toggle="modal" data-target="#mdPrevImpresion">
                        Imprimir
                        </button>
                    </td>
                </tr>`;
            });
            const btnToprePrnt = document.querySelectorAll(".btnUsetoPrintn");
            btnToprePrnt.forEach((ele) => {
                ele.addEventListener("click", (ev) => {
                    
                    document.getElementById("nmStudente").innerHTML = ev.target.dataset.nmestuden;
                    // document.getElementById("graengrStte").innerHTML= ev.target.dataset.nmestuden;

                    let nmStusleted = document.getElementById("nmStudente").innerHTML;
                    ShowSubjectForPeriPrint('I Periodo', nmStusleted);
                });
            });

        }).catch((error) => {
            console.log("erros: show students", error);
        });

    document.getElementById("selPerFnNotas").addEventListener("change", (e) => {
        let opSelted = e.target.value;
        console.log("clicke", opSelted);
        let nmStusleted = document.getElementById("nmStudente").innerHTML;
        switch (opSelted) {
            case "1":
                console.log("selected", opSelted);
                ShowSubjectForPeriPrint('I Periodo', nmStusleted);
                break;
            case "2":
                console.log("selected", opSelted);
                ShowSubjectForPeriPrint('II Periodo', nmStusleted);
                break;
            case "3":
                console.log("selected", opSelted);
                ShowSubjectForPeriPrint('III Periodo', nmStusleted);
                break;
            case "4":
                console.log("selected", opSelted);
                ShowSubjectForPeriPrint('IIII Periodo', nmStusleted);
                break;
            case "11":
                console.log("selected", opSelted);
                ShowSubjectForPeriPrint('Finales', nmStusleted);
                break;

            default:
                ShowSubjectForPeriPrint('Finales', nmStusleted);
                break;
        }
    });
}

function GetColorNotaPasONo(trunCnot) {
    let valor = ``;
    if (trunCnot >= 5) {
        valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
    } else {
        valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
    }
    return valor;
}
function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}

function ShowSubjectForPeriPrint(pNperiodo, pnmStu) {
    let totPrdo = 0, totP1 = 0, totP2 = 0, totP3 = 0, totP4 = 0, totFinal = 0;
    let not1 = 0, not2 = 0, not3 = 0;
    let tblistar = document.querySelector("#tbToPrintNtStudent");
    const cTheader = new TableHeader();
    const tbNotasDetalle = document.querySelector("#tbToPrintNtStudent thead#tableContent");
    const tbNotasFinalDetalle = document.querySelector("#tbToPrintNtStudent thead#tableContent");
    const tbNotasDetalleCompleto = document.querySelector("#tbToPrintNtStudent tbody#tableContent");
    db.collection("materia").where("estudiante", "==", pnmStu)
        .get()
        .then((querySnapshot) => {
            tbNotasDetalle.innerHTML = "";
            tbNotasFinalDetalle.innerHTML = "";
            tbNotasDetalleCompleto.innerHTML = "";
            tbNotasDetalle.innerHTML=cTheader.fTbHeaderForGradesDetails();
            
            querySnapshot.forEach((doc) => {
                switch (pNperiodo) {
                    case 'I Periodo':
                        totPrdo = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        not1 = doc.data().p1nota1;
                        not2 = doc.data().p1nota2;
                        not3 = doc.data().p1nota3;
                        break;
                    case 'II Periodo':
                        totPrdo = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        not1 = doc.data().p2nota1;
                        not2 = doc.data().p2nota2;
                        not3 = doc.data().p2nota3;
                        break;
                    case 'III Periodo':
                        totPrdo = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        not1 = doc.data().p3nota1;
                        not2 = doc.data().p3nota2;
                        not3 = doc.data().p3nota3;
                        break;
                    case 'IIII Periodo':
                        totPrdo = ((doc.data().p4nota1 * 0.45) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));
                        not1 = doc.data().p4nota1;
                        not2 = doc.data().p4nota2;
                        not3 = doc.data().p4nota3;
                        break;
                    case 'Finales':
                        totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        //para cuatro periodos
                        if (doc.data().p4nota1 != null || doc.data().p4nota1 != undefined) {
                            totP4 = ((doc.data().p4nota1 * 0.35) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));
                            totFinal = (totP1 + totP2 + totP3 + totP4) / 4;
                        } else {
                            //para 3 periodos
                            totFinal = (totP1 + totP2 + totP3) / 3;
                        }
                        totPrdo = totFinal
                        break;
                    default:
                        break;
                }
                totFinal = totPrdo;
                
                let matnota = "";
                matnota += `<tr><td class="text-center">${doc.data().materia}</td>`;

                if(pNperiodo == 'Finales'){
                    matnota += `<td class="text-center">${GetColorNotaPasONo(totFinal)}</td></tr>`;
                }else if (totP4 == 0) {
                    matnota += `<td class="text-center">${GetColorNotaPasONo(not1)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not2)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not3)}</td>
                    <td class="text-center">${GetColorNotaPasONo(totFinal)}</td></tr>`;
                } else {
                    matnota += `<td class="text-center">${GetColorNotaPasONo(not1)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not2)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not3)}</td>
                    <td class="text-center">${GetColorNotaPasONo(totFinal)}</td></tr>`;
                }

                if(pNperiodo == 'I Periodo' || pNperiodo == 'II Periodo' || pNperiodo == 'III Periodo' || pNperiodo == 'IIII Periodo'){
                    console.log("yamete");
                    tbNotasDetalle.innerHTML;
                    tbNotasDetalleCompleto.innerHTML += matnota;
                }
                else if(pNperiodo == 'Finales'){
                    console.log("onichan");
                    tbNotasFinalDetalle.innerHTML = cTheader.fTbHeaderForGradesDetailsFinalNotes();
                    tbNotasFinalDetalle.innerHTML;
                    tbNotasDetalleCompleto.innerHTML += matnota;
                }
                
                
            });
        });
}


$(document).ready(function () {
    //FOR TECHER GRADE
    $("#buscarTeacher").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblistGrados tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tblistGrados th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

    //FOR STUDENTS
    $("#buscarStudent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblistStudents tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tblistStudents th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

});