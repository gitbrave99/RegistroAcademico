const db = firebase.firestore();
const tbleListGrados = document.querySelector("#tbListGradosDocentes tbody");
const titleGradeSelected = document.getElementById("titleGradeSelected");
//tables materias
const tbMateriaSociales = document.querySelector("#tbMatSociales tbody");

window.addEventListener("DOMContentLoaded", async (e) => {
    //MOSTRAR LISTA DE DOCENTES Y GRADOS
    db.collection("profesor")
        .get().then((querySnapshot) => {
            tbleListGrados.innerHTML = "";
            querySnapshot.forEach((doc) => {
                tbleListGrados.innerHTML += `<tr>
                    <td  class="text-center">${doc.data().gradoEncargado}</td>
                    <td  class="text-center">${doc.data().nombre}</td>
                    <td  class="text-center">
                        <a href="#materiasNotasEstu" class="btn btn-info btn-sm btnShowStudensNotes" data-teacher="${doc.data().nombre}" data-grade="${doc.data().gradoEncargado}">
                            Mostrar
                        </a>
                    </td>
                </tr>`;
            });
            const btnToShowGrades = document.querySelectorAll(".btnShowStudensNotes");
            btnToShowGrades.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    let grade = e.target.dataset.grade;
                    let teacher = e.target.dataset.teacher;
                    MostrarAllNotasMaterias(grade, teacher);
                    titleGradeSelected.innerHTML = grade;
                });

            });

        });

});

function MostrarAllNotasMaterias(pGrade, pDocente) {
    console.log("clicked grade= ", pGrade, " techer ", pDocente);
    db.collection("materia").where("profesor", "==", "Elena Nito").where("grado", "==", "9° Grado").get()
        .then((querySnapshot) => {
            tbMateriaSociales.innerHTML = "";
            console.log("en snap");
            querySnapshot.forEach((doc) => {
                console.log("en foreach",doc.data());
                let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
                //PERIODO I
                totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                totFinal = (totP1 + totP2 + totP3) / 3;
                tbMateriaSociales.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().estudiante}</td>
                    <td class="text-center">${doc.data().p1nota1}</td>
                    <td class="text-center">${doc.data().p1nota2}</td>
                    <td class="text-center">${doc.data().p1nota3}</td>
                    <td class="text-primary text-center">${totP1}</td>
                    <td class="text-center">${doc.data().p2nota1}</td>
                    <td class="text-center">${doc.data().p2nota2}</td>
                    <td class="text-center">${doc.data().p2nota2}</td>
                    <td class="text-primary text-center">${totP2}</td>
                    <td class="text-center">${doc.data().p3nota1}</td>
                    <td class="text-center">${doc.data().p3nota2}</td>
                    <td class="text-center">${doc.data().p3nota3}</td>
                    <td class="text-primary text-center">${totP3}</td>
                    <td class="text-success text-center">${truncNota(totFinal)}</td>
                    <td>
                    <button class="btn btn-info green accent-4 btnMdAddModNota" data-toggle="modal"
                    data-target="#exampleModal">
                        <i class="material-icons" data-toggle="tooltip" data-placement="left"
                        title="Enviar notas">library_add</i>
                  </button>
                    </td>
                </tr>`;
            });
        })
}



function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}


$(document).ready(function () {
    //FOR TECHER GRADE
    $("#buscarTeacherRespondlGrade").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListGradosDocentes tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListGradosDocentes th').click(function () {
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