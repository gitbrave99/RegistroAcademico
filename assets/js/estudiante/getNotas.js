//BTN ADD NOTAS
const db = firebase.firestore();
const nombreUserStudent = GetLSSesionUser();
const tableRegistroNotas = document.querySelector("#tbListEstNotasAlumnoUser tbody");

window.addEventListener("DOMContentLoaded", async (e) => {
    
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
                        querySnapShotm.forEach((docm) => {
                            let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
                            //PERIODO I
                            totP1 = ((docm.data().p1nota1 * 0.35) + (docm.data().p1nota2 * 0.35) + (docm.data().p1nota3 * 0.30));
                            totP2 = ((docm.data().p2nota1 * 0.35) + (docm.data().p2nota2 * 0.35) + (docm.data().p2nota3 * 0.30));
                            totP3 = ((docm.data().p3nota1 * 0.35) + (docm.data().p3nota2 * 0.35) + (docm.data().p3nota3 * 0.30));
                            totFinal = (totP1 + totP2 + totP3) / 3;
                            tableRegistroNotas.innerHTML += `
                                <tr>
                                    <td class="text-center">${docm.data().materia}</td>
                                    <td class="text-center">${docm.data().p1nota1}</td>
                                    <td class="text-center">${docm.data().p1nota2}</td>
                                    <td class="text-center">${docm.data().p1nota3}</td>
                                    <td class="text-primary text-center">${truncNota(totP1, 2)}</td>
                                    <td class="text-center">${docm.data().p2nota1}</td>
                                    <td class="text-center">${docm.data().p2nota2}</td>
                                    <td class="text-center">${docm.data().p2nota3}</td>
                                    <td class="text-primary text-center">${truncNota(totP2, 2)}</td>
                                    <td class="text-center">${docm.data().p3nota1}</td>
                                    <td class="text-center">${docm.data().p3nota2}</td>
                                    <td class="text-center">${docm.data().p3nota3}</td>
                                    <td class="text-center text-primary">${truncNota(totP3, 2)}</td>
                                    <td class="text-center text-success">${GetColorNotaPasONo(totFinal)}</td>
                                </tr>`;
                                   
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