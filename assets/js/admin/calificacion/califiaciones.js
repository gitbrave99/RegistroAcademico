const db = firebase.firestore();
const tbleListGrados = document.querySelector("#tbListGradosDocentes tbody");
const titleGradeSelected = document.getElementById("titleGradeSelected");
//tables materias
// const tbMateriaSociales = document.querySelector("#tbMatSociales tbody");
const frmGuardarNotas = document.getElementById("frmCrudNotaStudenadm");
window.addEventListener("DOMContentLoaded", async (e) => {
    //MOSTRAR LISTA DE DOCENTES Y GRADOS
    db.collection("profesor")
        .get().then((querySnapshot) => {
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
                    let Materi = e.target.dataset.teacher;
                    MostrarAllNotasMaterias(teacher, "Sociales", "tbLiEstuMatSociales", "btnCrudNotaSociales");
                    MostrarAllNotasMaterias(teacher, "Lenguaje", "tbLiEstuMatLenguaje", "btnCrudNotaLenguaje");
                    MostrarAllNotasMaterias(teacher, "Matemáticas", "tbLiEstuMatMatematica", "btnCrudNotaMatematica");
                    MostrarAllNotasMaterias(teacher, "Ciencias", "tbLiEstuMatCiencias", "btnCrudNotaCiencias");
                    MostrarAllNotasMaterias(teacher, "Inglés", "tbLiEstuMatIngles", "btnCrudNotaIngles");
                    titleGradeSelected.innerHTML = grade;
                });
            });

        });

});


const UpdateNotasMateria =
    (id, UpdateNotasMateria) => db.collection('materia').doc(id).update(UpdateNotasMateria);
// Id de documento con notas de materia.
var idMateToguardar = '', materia = '', estudiante = '', nmprofesor = '';
frmGuardarNotas.addEventListener("submit", async (e) => {
    e.preventDefault();
    const periodo = parseInt(document.getElementById('selectForPeriodos').value);
    idMateToguardar = frmGuardarNotas['btnGuardarNotaSt'].dataset.idmaterissld;
    if (!isNaN(periodo)) {
        console.log(" no nan idm=",idMateToguardar);

        if (periodo === 1) {

            const p1nota1 = frmGuardarNotas['inNota1'].value;
            const p1nota2 = frmGuardarNotas['inNota2'].value;
            const p1nota3 = frmGuardarNotas['inNota3'].value;

            console.log("target nmte", e.target.dataset.nmteacher);
            await UpdateNotasMateria(idMateToguardar, {
                p1nota1: p1nota1,
                p1nota2: p1nota2,
                p1nota3: p1nota3,
            });
        }
        // Notas del período 2.
        else if (periodo === 2) {
            const p2nota1 = frmGuardarNotas['inNota1'].value;
            const p2nota2 = frmGuardarNotas['inNota2'].value;
            const p2nota3 = frmGuardarNotas['inNota3'].value;

            await UpdateNotasMateria(idMateToguardar, {
                p2nota1: p2nota1,
                p2nota2: p2nota2,
                p2nota3: p2nota3,
            });
        }
        else if (periodo === 3) {
            const p3nota1 = frmGuardarNotas['inNota1'].value;
            const p3nota2 = frmGuardarNotas['inNota2'].value;
            const p3nota3 = frmGuardarNotas['inNota3'].value;

            await UpdateNotasMateria(idMateToguardar, {
                p3nota1: p3nota1,
                p3nota2: p3nota2,
                p3nota3: p3nota3,
            });
        }
        frmGuardarNotas.reset();
        location.reload();
    }else{
        console.log("selecione= ",periodo);
    }
    console.log("en funcion");
});



function MostrarAllNotasMaterias(pDocente, pMateria, pTbliMate, pBtnClassByMatAddNCrud) {
    let tbleMatSel = document.querySelector(`#${pTbliMate} tbody`);
    db.collection("materia").where("profesor", "==", pDocente).where("materia", "==", pMateria).get()
        .then((querySnapshot) => {
            tbleMatSel.innerHTML = "";
            querySnapshot.forEach((doc) => {
                let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
                //PERIODO I
                totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                totFinal = (totP1 + totP2 + totP3) / 3;
                tbleMatSel.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().estudiante}</td>
                    <td class="text-center">${doc.data().p1nota1}</td>
                    <td class="text-center">${doc.data().p1nota2}</td>
                    <td class="text-center">${doc.data().p1nota3}</td>
                    <td class="text-primary text-center">${truncNota(totP1, 2)}</td>
                    <td class="text-center">${doc.data().p2nota1}</td>
                    <td class="text-center">${doc.data().p2nota2}</td>
                    <td class="text-center">${doc.data().p2nota2}</td>
                    <td class="text-primary text-center">${truncNota(totP2, 2)}</td>
                    <td class="text-center">${doc.data().p3nota1}</td>
                    <td class="text-center">${doc.data().p3nota2}</td>
                    <td class="text-center">${doc.data().p3nota3}</td>
                    <td class="text-primary text-center">${truncNota(totP3, 2)}</td>
                    <td class="text-success text-center">${truncNota(totFinal, 2)}</td>
                    <td>
                    <button class="btn btn-info green accent-4 ${pBtnClassByMatAddNCrud}" data-idmatselected="${doc.id}" data-toggle="modal"
                    data-target="#mdlAddNotaCrudAdmin">
                       Nota
                  </button>
                    </td>
                </tr>`;
            });
            const btnModalCrudNotaMateria = document.querySelectorAll(`.${pBtnClassByMatAddNCrud}`);
            btnModalCrudNotaMateria.forEach((btn) => {
                console.log("for");
                btn.addEventListener("click", async (e) => {
                    let idMatSe = e.target.dataset.idmatselected;
                    let materia = e.target.dataset.materia;
                    let nmTeacherse = e.target.dataset.nmteacher;
                    let nmStudent = e.target.dataset.nmstudent;
                    // ShowAllStudentsByGradeTeacher(dtgrade);
                    // titleGradSelected.innerHTML = dtgrade;
                    document.getElementById('btnGuardarNotaSt').dataset.idmaterissld = idMatSe;
                    // document.getElementById('btnGuardarNotas').dataset.nmmateria = materia;
                    // document.getElementById('btnGuardarNotas').dataset.nmteacher = nmTeacherse;
                    // document.getElementById('btnGuardarNotas').dataset.nmstudent = nmStudent;
                    console.log("clicke id selmateria", idMatSe);
                });
            });

        }).catch((er) => {
            console.log("err ", er);
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
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
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

    //FOR TBSOCIALES
    $("#buscarEstInSociales").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbLiEstuMatSociales tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbLiEstuMatSociales th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    // FOR TBLENGUAJE
    $("#buscarEstInLenguaje").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbLiEstuMatLenguaje tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbLiEstuMatLenguaje th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    // FOR TBMATEMATICA
    $("#buscarEstInMatematica").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbLiEstuMatMatematica tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbLiEstuMatMatematica th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    // FOR TBCIENCIAS
    $("#buscarEstInCiencias").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbLiEstuMatCiencias tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbLiEstuMatCiencias th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    // FOR TBINGLES
    $("#buscarEstInIngles").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbLiEstuMatIngles tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbLiEstuMatIngles th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })

});


