const db = firebase.firestore();
//instancia de onlytable
const cTheader = new TableHeader();
const nombreUserTeacher = GetLSSesionUser();
//BTN ADD NOTAS
let userNm = "";
const tbListEstNotasSociales = document.querySelector("#tbListEstNotasSociales tbody");
const btnAddNotMatematicas = document.querySelectorAll(".btnAddNotMatematicas");
const btnAddNotCiencias = document.querySelectorAll(".btnAddNotCiencias");
const btnAddNotIngles = document.querySelectorAll(".btnAddNotIngles");
const fillgrForTielgrR = document.getElementById("frmgrpGrRespon");

//------TABLE HEADER SEGUN GRDO VARS

//carga tabla para docente bachillerato
const tbSocialTeacher = document.querySelector("#tbListEstNotasSociales thead");
const tbLenguajTeacher = document.querySelector("#tbListEstNotasLenguaje thead");
const tbMatemaTeacher = document.querySelector("#tbListEstNotasMatematica thead");
const tbCienciaTeacher = document.querySelector("#tbListEstNotasCiencia thead");
const tbInglesTeacher = document.querySelector("#tbListEstNotasIngles thead");

const tbInformaticaTeacher = document.querySelector("#tbListEstNotasInformatica thead");
const tbOpvTeacher = document.querySelector("#tbListEstNotasOpv thead");
const tbSeminarioTeacher = document.querySelector("#tbListEstNotasSeminario thead");
const tbOptativaTeacher = document.querySelector("#tbListEstNotasOptativa thead");

// Pestañas de materias para bachillerato
var tabInf = document.getElementById("tabInformatica");
var tabOpv = document.getElementById("tabOpv");
var tabSem = document.getElementById("tabSeminario");
var tabElec = document.getElementById("tabElectricidad");
var tabOptativa = document.getElementById("tabOptativa");

//const for slec options trimestres 3 0 4
const selectPeriod= document.getElementById("selectForPeriodos");
//const radioList materia par imprimirt¿r
const listRadiosToprint= document.getElementById("radiosToPrintM");

window.addEventListener("DOMContentLoaded", async (e) => {
    const titleGradeResponsable = document.getElementById("gradoResponsable");
    db.collection("profesor").where("user", "==", nombreUserTeacher)
        .get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                nmTechComP = doc.data().nombre;

                if (GetGradoResponsable() == "Primer Año Bachillerato" || GetGradoResponsable() == "Segundo Año Bachillerato") {
                    // Mostrar pestañas de materias
                    selectPeriod.innerHTML=cTheader.GetSelectForFourPeriodos();
                    //print materias 8
                    listRadiosToprint.innerHTML=cTheader.GetRadiosToPrinSubjectsFourPeriodos();
                    
                    tabInf.style.display = "block"; tabOpv.style.display = "block";
                    tabSem.style.display = "block"; tabOptativa.style.display = "block";

                    // Formato de tabla para Bachillerato
                    tbSocialTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Sociales");
                    tbLenguajTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Lenguaje");
                    tbMatemaTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Matemática");
                    tbCienciaTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Ciencias");
                    tbInglesTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Inglés");

                    tbInformaticaTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Informática");
                    tbOpvTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("OPV");
                    tbSeminarioTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Seminario");
                    tbOptativaTeacher.innerHTML = cTheader.fTbHeaderForTecBachelor("Optativa");

                } else {
                    // Formato de tabla para otros grados
                    tbSocialTeacher.innerHTML = cTheader.fTbHeaderForGrades("Sociales");
                    tbLenguajTeacher.innerHTML = cTheader.fTbHeaderForGrades("Lenguaje");
                    tbMatemaTeacher.innerHTML = cTheader.fTbHeaderForGrades("Matemática");
                    tbCienciaTeacher.innerHTML = cTheader.fTbHeaderForGrades("Ciencias");
                    tbInglesTeacher.innerHTML = cTheader.fTbHeaderForGrades("Inglés");

                    //select periodos para imprimir
                    selectPeriod.innerHTML=cTheader.GetSelectForThreePeriodos();
                    // //for radios to print materiaa individual an all
                    listRadiosToprint.innerHTML=cTheader.GetRadiosToPrinSubjectsThreePeriodos();
                }

                titleGradeResponsable.value = doc.data().gradoEncargado;
                let grdRespn = doc.data().gradoEncargado;
                ShowNotasStudentByMateriaAll(nmTechComP, "Sociales", "tbListEstNotasSociales", "btnAddNotSociales", grdRespn);
                ShowNotasStudentByMateriaAll(nmTechComP, "Lenguaje", "tbListEstNotasLenguaje", "btnAddNotLenguaje", grdRespn);
                ShowNotasStudentByMateriaAll(nmTechComP, "Matemáticas", "tbListEstNotasMatematica", "btnAddNotMatematicas", grdRespn);
                ShowNotasStudentByMateriaAll(nmTechComP, "Ciencias", "tbListEstNotasCiencia", "btnAddNotCiencias", grdRespn);
                ShowNotasStudentByMateriaAll(nmTechComP, "Inglés", "tbListEstNotasIngles", "btnAddNotIngles", grdRespn);

                if (GetGradoResponsable() == "Primer Año Bachillerato" || GetGradoResponsable() == "Segundo Año Bachillerato") {

                    ShowNotasStudentByMateriaAll(nmTechComP, "Informática", "tbListEstNotasInformatica", "btnAddNotInformática", grdRespn);
                    ShowNotasStudentByMateriaAll(nmTechComP, "OPV", "tbListEstNotasOpv", "btnAddNotOpv", grdRespn);
                    ShowNotasStudentByMateriaAll(nmTechComP, "Seminario", "tbListEstNotasSeminario", "btnAddNotSeminario", grdRespn);
                    ShowNotasStudentByMateriaAll(nmTechComP, "Optativa", "tbListEstNotasOptativa", "btnAddNotOptativa", grdRespn);
                }
            });
        })
});

function GetNombreCTeacher(pUsernm) {
    console.log("parametro ", pUsernm);
    db.collection("profesor").where("user", "==", nombreUserTeacher)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userNm = doc.data().nombre;

                // console.log("nmUse", userNm);
            });
            //snapshop
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


// Formulario de Ingreso de notas.
const frmGuardarNotas = document.getElementById('frmIngresoNotas');

// Update notas de materia.
const UpdateNotasMateria =
    (id, UpdateNotasMateria) => db.collection('materia').doc(id).update(UpdateNotasMateria);

// Id de documento con notas de materia.
var idMateToguardar = '', materia = '', estudiante = '', nmprofesor = '';

// Recuperar Id de documento con notas de materia.
async function GetNotasDeMateriaId(estudiante, materia) {
    return db.collection('materia').where('estudiante', '==', estudiante)
        .where('materia', '==', materia).get().then(snapshot => {
            return snapshot.docs.map(doc => doc.data().id);
        })
}

// Btn - Guardar notas.
frmGuardarNotas.addEventListener('submit', async (e) => {
    e.preventDefault();
    const periodo = parseInt(document.getElementById('selectForPeriodos').value);
    if (!isNaN(periodo)) {
        console.log("selecte idma",frmGuardarNotas['btnGuardarNotas'].dataset.idmaterysel);
        idMateToguardar = frmGuardarNotas['btnGuardarNotas'].dataset.idmaterysel;
        materia = frmGuardarNotas['btnGuardarNotas'].dataset.nmmateria;
        estudiante = frmGuardarNotas['btnGuardarNotas'].dataset.nmstudent;
        nmprofesor = frmGuardarNotas['btnGuardarNotas'].dataset.nmteacher;

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
    }
});

function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}



function OnlyShowSubjects(doc, tbliMate) {
    let tblistar = document.querySelectorAll(`#${tbliMate} tbody`)
    let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
    //PERIODO I
    totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
    totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
    totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
    totFinal = (totP1 + totP2 + totP3) / 3;
    tblistar.innerHTML += `
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
        <td class="text-primary text-success">${totP3}</td>
        <td>
                <button type="button" class="btn btn-info green accent-4 btnAddNotSociales" data-nmTeacher="${doc.data().profesor}" data-materia="${doc.data().materia}" data-toggle="modal" data-target="#exampleModal">
                    Agregar Nota
                </button>
                <a href="#"  type="button" class="btn btn-danger btn-sm btnDelStudent">clic</a>
        </td>
    </tr>`;
}

// FUNCION FOR SHOW SOCIALES 
function ShowNotasStudentByMateriaAll(pTeacher, pMateria, pTableMat, pBtnclassByMateria, pGrdRespn) {
    let tableMateriaSel = document.querySelector(`#${pTableMat} tbody`);

    db.collection("materia").where("materia", "==", pMateria).where("profesor", "==", pTeacher)
        .get()
        .then((querySnapshot) => {

            tableMateriaSel.innerHTML = "";
            querySnapshot.forEach((doc) => {
                // console.log("en foreach", doc.data());

                if (pGrdRespn == "Primer Año Bachillerato" || pGrdRespn == "Segundo Año Bachillerato") {
                    tableMateriaSel.innerHTML += cTheader.GetNotasFourPeriodos(doc, pBtnclassByMateria);
                } else {
                    tableMateriaSel.innerHTML += cTheader.GetNotasThreePeriodos(doc, pBtnclassByMateria);
                }

            });

            const btnstoShowStudbytg = document.querySelectorAll(`.${pBtnclassByMateria}`);
            btnstoShowStudbytg.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    let materia = e.target.dataset.materia;
                    let nmTeacherse = e.target.dataset.nmteacher;
                    let nmStudent = e.target.dataset.nmstudent;
                    let idMatSe = e.target.dataset.idmatselected;
                    // ShowAllStudentsByGradeTeacher(dtgrade);
                    // titleGradSelected.innerHTML = dtgrade;
                    document.getElementById('btnGuardarNotas').dataset.nmmateria = materia;
                    document.getElementById('btnGuardarNotas').dataset.nmteacher = nmTeacherse;
                    document.getElementById('btnGuardarNotas').dataset.nmstudent = nmStudent;
                    document.getElementById('btnGuardarNotas').dataset.idmaterysel = idMatSe;
                    console.log("clicke teacher=", nmTeacherse, "materia= ", materia, " student= ", nmStudent, "id selmat", idMatSe);
                });
            });
        }).catch((error) => {
            console.log(error);
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




















$(document).ready(function () {
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
    //SEARCH IN SOCIALES
    $("#buscarEstInSociales").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasSociales tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasSociales th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    //SEARCH IN LENGUAJE
    $("#buscarEstInLenguaje").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasLenguaje tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasLenguaje th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    //SEARCH IN MATEMÁTICAS
    $("#buscarEstInMatematica").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasMatematica tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasMatematica th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    //SEARCH IN CIENCIAS
    $("#buscarEstInCiencias").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasCiencia tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasCiencia th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });
    //SEARCH IN INGLÉS
    $("#buscarEstInIngles").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tbListEstNotasIngles tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tbListEstNotasIngles th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(1)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    });


});