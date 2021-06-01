//BTN ADD NOTAS
const db = firebase.firestore();
const cTheader = new TableHeader();
const nombreUserStudent = GetLSSesionUser();
//tbody 
const tableRegistroNotas = document.querySelector("#tbListEstNotasAlumnoUser tbody#tbodyalln");
//head table
const tbNotasStudent= document.querySelector("#tbListEstNotasAlumnoUser thead#theadalln");
//try to fill a table
const tbNotasDetalle = document.querySelector("#tbToPrintNtStudent thead#theadGrades");

const selctForTrimsToPrint= document.getElementById("selPerFnNotas");
window.addEventListener("DOMContentLoaded", async (e) => {
    //cargar datos

    db.collection("estudiante").where("user", "==", nombreUserStudent)
        .get()
        .then((querySnapShot) => {
            querySnapShot.forEach((doc) => {
               
                document.getElementById("shwNmStudenToPrint").innerHTML=doc.data().nombre;
                document.getElementById("shwGradeStToPrint").innerHTML=doc.data().grado;

                db.collection("materia").where("estudiante", "==", doc.data().nombre)
                    .get()
                    .then((querySnapShotm) => {
                        tableRegistroNotas.innerHTML = "";
                        querySnapShotm.forEach((doc) => {
                            if (GetGradoResponsable() === "Primer Año Bachillerato" || GetGradoResponsable() == "Segundo Año Bachillerato") {
                                selctForTrimsToPrint.innerHTML = cTheader.GetSelectForFourPeriodosToPrint();
                                tbNotasStudent.innerHTML = cTheader.fTbHeaderForTecBachelor();
                            } else {
                                selctForTrimsToPrint.innerHTML = cTheader.GetSelectForThreePeriodosToPrint();
                                tbNotasStudent.innerHTML=cTheader.fTbHeaderForGrades();
                                tbNotasDetalle.innerHTML=cTheader.fTbHeaderForGradesDetails();
                            }     

                            if (doc.data().grado == "Primer Año Bachillerato" || doc.data().grado == "Segundo Año Bachillerato") {
                                console.log("bchilleato");
                                tableRegistroNotas.innerHTML += cTheader.GetNotasFourPeriodos(doc);
                            } else {
                                console.log("3 ciclo");
                                tableRegistroNotas.innerHTML += cTheader.GetNotasThreePeriodos(doc);
                            }
                                   
                        });
                    })
            });

        }).catch((er) => {
            console.log("erroo ", er);
        })
        function GetColorNotaPasONo(trunCnot) {
            let valor=``;
            if (trunCnot >= 5) {
                valor =`<span class="text-success">${truncNota(trunCnot,2)}</span>`;
            }else{
                valor =`<span class="text-warning">${truncNota(trunCnot,2)}</span>`;
            }
            return valor;
        }


});

function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}


$(document).ready(function () {
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
    //SEARCH IN SOCIALES
    $("#buscarInMaterisS").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasAlumnoUser tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasAlumnoUser th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
});