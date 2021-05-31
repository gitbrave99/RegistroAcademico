const db = firebase.firestore();
const tbleListGrados = document.querySelector("#tbListGradosDocentes tbody");
const titleGradeSelected = document.getElementById("titleGradeSelected");
//tables materias
// const tbMateriaSociales = document.querySelector("#tbMatSociales tbody");
const frmGuardarNotas = document.getElementById("frmCrudNotaStudenadm");
//table headers
const cTheader = new TableHeader();

//list tables 
const tbMtSocialesStu = document.querySelector("#tbLiEstuMatSociales thead");
const tbMtLenguajeStu = document.querySelector("#tbLiEstuMatLenguaje thead");
const tbMtMatematicaStu = document.querySelector("#tbLiEstuMatMatematica thead");
const tbMtCienciasStu = document.querySelector("#tbLiEstuMatCiencias thead");
const tbMtInglesStu = document.querySelector("#tbLiEstuMatIngles thead");

const tbMtInformaticaStu = document.querySelector("#tbListEstNotasInformatica thead");
const tbMtOPVStu = document.querySelector("#tbListEstNotasOpv thead");
const tbMtSeminarioStu = document.querySelector("#tbListEstNotasSeminario thead");
const tbMtOptativaStu = document.querySelector("#tbListEstNotasOptativa thead");
//---------------------------
var tabInf = document.getElementById("tabInformatica");
var tabOpv = document.getElementById("tabOpv");
var tabSem = document.getElementById("tabSeminario");
var tabOptativa = document.getElementById("tabOptativa");

// slect option para agregar nota 
const selectPeriod = document.getElementById("selectForPeriodos");
const listRadiosToprint = document.getElementById("radiosToPrintM");


window.addEventListener("DOMContentLoaded", async (e) => {
    //cargar header cuanodo carge
    tbMtSocialesStu.innerHTML = cTheader.fTbHeaderForGrades();
    tbMtLenguajeStu.innerHTML = cTheader.fTbHeaderForGrades("Lenguaje");
    tbMtMatematicaStu.innerHTML = cTheader.fTbHeaderForGrades("Matemática");
    tbMtCienciasStu.innerHTML = cTheader.fTbHeaderForGrades("Ciencias");
    tbMtInglesStu.innerHTML = cTheader.fTbHeaderForGrades("Inglés");

    tbMtInformaticaStu.innerHTML = cTheader.fTbHeaderForGrades("Informática");
    tbMtOPVStu.innerHTML = cTheader.fTbHeaderForGrades("OPV");
    tbMtSeminarioStu.innerHTML = cTheader.fTbHeaderForGrades("Seminario");
    tbMtOptativaStu.innerHTML = cTheader.fTbHeaderForGrades("Optativa");

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
                    console.log("clicked");
                    //variables for targe button
                    let grade = e.target.dataset.grade;
                    let teacher = e.target.dataset.teacher;
                    let Materi = e.target.dataset.teacher;
                    console.log("envio  agrade", grade);

                    if (grade === "Primer Año Bachillerato" || grade === "Segundo Año Bachillerato") {
                        // console.log("select",grade);
                        MostrarAllNotasMaterias(teacher, "Sociales", "tbLiEstuMatSociales", "btnCrudNotaSociales", grade);
                        MostrarAllNotasMaterias(teacher, "Lenguaje", "tbLiEstuMatLenguaje", "btnCrudNotaLenguaje", grade);
                        MostrarAllNotasMaterias(teacher, "Matemáticas", "tbLiEstuMatMatematica", "btnCrudNotaMatematica", grade);
                        MostrarAllNotasMaterias(teacher, "Ciencias", "tbLiEstuMatCiencias", "btnCrudNotaCiencias", grade);
                        MostrarAllNotasMaterias(teacher, "Inglés", "tbLiEstuMatIngles", "btnCrudNotaIngles", grade);
                        MostrarAllNotasMaterias(teacher, "Informática", "tbListEstNotasInformatica", "btnAddNotInformática", grade);
                        MostrarAllNotasMaterias(teacher, "OPV", "tbListEstNotasOpv", "btnAddNotOpv", grade);
                        MostrarAllNotasMaterias(teacher, "Seminario", "tbListEstNotasSeminario", "btnAddNotSeminario", grade);
                        MostrarAllNotasMaterias(teacher, "Optativa", "tbListEstNotasOptativa", "btnAddNotOptativa", grade);
                    }else{
                        MostrarAllNotasMaterias(teacher, "Sociales", "tbLiEstuMatSociales", "btnCrudNotaSociales", grade);
                        MostrarAllNotasMaterias(teacher, "Lenguaje", "tbLiEstuMatLenguaje", "btnCrudNotaLenguaje", grade);
                        MostrarAllNotasMaterias(teacher, "Matemáticas", "tbLiEstuMatMatematica", "btnCrudNotaMatematica", grade);
                        MostrarAllNotasMaterias(teacher, "Ciencias", "tbLiEstuMatCiencias", "btnCrudNotaCiencias", grade);
                        MostrarAllNotasMaterias(teacher, "Inglés", "tbLiEstuMatIngles", "btnCrudNotaIngles", grade);
                    }

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
        console.log(" no nan idm=", idMateToguardar);

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
        else if (periodo === 4) {
            console.log("en el cuarto");
            const p4nota1 = frmGuardarNotas['inNota1'].value;
            const p4nota2 = frmGuardarNotas['inNota2'].value;
            const p4nota3 = frmGuardarNotas['inNota3'].value;

            await UpdateNotasMateria(idMateToguardar, {
                p4nota1: p4nota1,
                p4nota2: p4nota2,
                p4nota3: p4nota3,
            });
        }
        frmGuardarNotas.reset();
        location.reload();
    } else {
        console.log("selecione= ", periodo);
    }
    console.log("en funcion");
});



function MostrarAllNotasMaterias(pDocente, pMateria, pTbliMate, pBtnClassByMatAddNCrud, pGrdResp) {
    let tbleMatSel = document.querySelector(`#${pTbliMate} tbody`);
    db.collection("materia").where("profesor", "==", pDocente).where("materia", "==", pMateria).get()
        .then((querySnapshot) => {
            tbleMatSel.innerHTML = "";
            querySnapshot.forEach((doc) => {
                console.log("showing", doc.data().materia);
                if (pGrdResp === "Primer Año Bachillerato" || pGrdResp === "Segundo Año Bachillerato") {

                    // Mostrar pestañas de materias
                    selectPeriod.innerHTML = cTheader.GetSelectForFourPeriodos();
                    //print materias 8
                    listRadiosToprint.innerHTML = cTheader.GetRadiosToPrinSubjectsFourPeriodos();

                    tabInf.style.display = "block"; tabOpv.style.display = "block";
                    tabSem.style.display = "block"; tabOptativa.style.display = "block";

                    // Formato de tabla para Bachillerato
                    tbMtSocialesStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Sociales");
                    tbMtLenguajeStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Lenguaje");
                    tbMtMatematicaStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Matemática");
                    tbMtCienciasStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Ciencias");
                    tbMtInglesStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Inglés");

                    tbMtInformaticaStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Informática");
                    tbMtOPVStu.innerHTML = cTheader.fTbHeaderForTecBachelor("OPV");
                    tbMtSeminarioStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Seminario");
                    tbMtOptativaStu.innerHTML = cTheader.fTbHeaderForTecBachelor("Optativa");
                } else {
                    tabInf.style.display = "none"; tabOpv.style.display = "none";
                    tabSem.style.display = "none"; tabOptativa.style.display = "none";

                    // Formato de tabla para otros grados
                    tbMtSocialesStu.innerHTML = cTheader.fTbHeaderForGrades("Sociales");
                    tbMtLenguajeStu.innerHTML = cTheader.fTbHeaderForGrades("Lenguaje");
                    tbMtMatematicaStu.innerHTML = cTheader.fTbHeaderForGrades("Matemática");
                    tbMtCienciasStu.innerHTML = cTheader.fTbHeaderForGrades("Ciencias");
                    tbMtInglesStu.innerHTML = cTheader.fTbHeaderForGrades("Inglés");
                    //select periodos para imprimir
                    selectPeriod.innerHTML = cTheader.GetSelectForThreePeriodos();
                    // //for radios to print materiaa individual an all
                    listRadiosToprint.innerHTML = cTheader.GetRadiosToPrinSubjectsThreePeriodos();
                }
                if (pGrdResp === "Primer Año Bachillerato" || pGrdResp === "Segundo Año Bachillerato") {
                    tbleMatSel.innerHTML += cTheader.GetNotasFourPeriodos(doc, pBtnClassByMatAddNCrud);
                } else {
                    tbleMatSel.innerHTML += cTheader.GetNotasThreePeriodos(doc, pBtnClassByMatAddNCrud);
                }
            });
            const btnModalCrudNotaMateria = document.querySelectorAll(`.${pBtnClassByMatAddNCrud}`);
            btnModalCrudNotaMateria.forEach((btn) => {
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
        });
    function GetColorNotaPasONo(trunCnot) {
        let valor = ``;
        if (trunCnot >= 5) {
            valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
        } else {
            valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
        }
        return valor;
    }

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


