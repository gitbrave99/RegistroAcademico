const db = firebase.firestore();
const cTheader = new TableHeader();
const nombreUserTeacher = GetLSSesionUser();
const nmUserLog = GetNameUserLog();
//BTN ADD NOTAS
let userNm = "";
const tbListEstNotasSociales = document.querySelector("#tbListEstNotasSociales tbody");
const btnAddNotMatematicas = document.querySelectorAll(".btnAddNotMatematicas");
const btnAddNotCiencias = document.querySelectorAll(".btnAddNotCiencias");
const btnAddNotIngles = document.querySelectorAll(".btnAddNotIngles");
const fillgrForTielgrR = document.getElementById("frmgrpGrRespon");

const sOptionsToPrimNotasPeriodo = document.getElementById("selPerFnNotas");
window.addEventListener("DOMContentLoaded", async (e) => {
    const titleGradeResponsable = document.getElementById("gradoResponsable");

    let nmTechComP = "";
    db.collection("profesor").where("user", "==", nombreUserTeacher)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                nmTechComP = doc.data().nombre;
                titleGradeResponsable.value = doc.data().gradoEncargado;

                if (doc.data().gradoEncargado === "Primer Año Bachillerato" || doc.data().gradoEncargado == "Segundo Año Bachillerato") {
                    sOptionsToPrimNotasPeriodo.innerHTML = cTheader.GetSelectForFourPeriodosToPrint();
                } else {
                    sOptionsToPrimNotasPeriodo.innerHTML = cTheader.GetSelectForThreePeriodosToPrint();
                }

                ShowNotasStudentByMateriaAll(nmTechComP, "Sociales", "tbListEstNotasSociales", "btnPrevImprsion");
            });
        })

    // document.getElementById("btnGuardarNotas").addEventListener("click",(e)=>{
    //     console.log("target nmte",e.target.dataset.nmteacher);
    // });

    //MOSTRAR NOTAS POR PERIODO PARA BOLETA DE NOTAS, POR PERIODO Y FINALES
    document.getElementById("selPerFnNotas").addEventListener("change", (e) => {
        let opSelted = e.target.value;
        console.log("clicke", opSelted);
        let nmStusleted = document.getElementById("nmStudente").innerHTML;
        switch (opSelted) {
            case 'I Periodo':
                ShowSubjectForPeriPrint('I Periodo', nmStusleted);
                break;
            case 'II Periodo':
                ShowSubjectForPeriPrint('II Periodo', nmStusleted);
                break;
            case 'III Periodo':
                ShowSubjectForPeriPrint('III Periodo', nmStusleted);
                break;
            case 'IIII Periodo':
                ShowSubjectForPeriPrint('IIII Periodo', nmStusleted);
                break;
            case 'Finales':
                ShowSubjectForPeriPrint('Finales', nmStusleted);
                break;
            default:
                break;
        }
    });
});

function ShowSubjectForPeriPrint(pNperiodo, pnmStu) {
    let totPrdo = 0, totP1 = 0, totP2 = 0, totP3 = 0, totP4 = 0, totFinal = 0;
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



function GetColorNotaPasONo(trunCnot) {
    let valor = ``;
    if (trunCnot >= 5) {
        valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
    } else {
        valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
    }
    return valor;
}

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
function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}



function OnlyShowSubjects(pNmesudin) {
    let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
    let tblistar = document.querySelector("#tbToPrintNtStudent");
    let nmstutoprintn = document.getElementById("nmStudentToPrintNotas");
    nmstutoprintn.innerHTML = pNmesudin;
    db.collection("materia").where("estudiante", "==", pNmesudin)
        .get()
        .then((querySnapshot) => {
            tblistar.innerHTML = "";
            querySnapshot.forEach((doc) => {
                console.log(doc.data().materia);
                totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                totFinal = totP1;
                tblistar.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().materia}</td>
                    <td class="text-center">${truncNota(totFinal, 2)}</td>
                </tr>`;
            });
        });
}

// FUNCION FOR SHOW SOCIALES 
function ShowNotasStudentByMateriaAll(pTeacher, pMateria, pTableMat, pBtnclassByMateria) {
    let tableMateriaSel = document.querySelector(`#${pTableMat} tbody`);
    db.collection("materia").where("profesor", "==", pTeacher).where("materia", "==", pMateria)
        .get()
        .then((querySnapshot) => {
            tableMateriaSel.innerHTML = "";
            querySnapshot.forEach((doc) => {
                console.log(doc.data().estudiante);
                db.collection("estudiante").where("nombre", "==", doc.data().estudiante)
                    .get()
                    .then((querySnapshotes) => {
                        querySnapshotes.forEach((docet) => {
                            tableMateriaSel.innerHTML += `
                        <td class="text-center">${docet.data().nombre}</td>
                        <td class="text-center">${docet.data().responsable}</td>
                        <td class="text-center">${docet.data().telefono}</td>
                        <td class="text-center">${docet.data().email}</td>
                        <td class="text-center">${docet.data().direccion}</td>
                        <td>
                            <button type="button" class="btn btn-info green accent-4 ${pBtnclassByMateria}" data-nmstudent="${docet.data().nombre}" data-nmteacher="${doc.data().profesor}" data-toggle="modal" data-target="#mdPrevImpresion">
                                Boleta
                            </button>
                        </td>`;
                        });

                        const allbtnpreimp = document.querySelectorAll(".btnPrevImprsion");
                        allbtnpreimp.forEach((btn) => {
                            btn.addEventListener("click", (e) => {
                                ShowSubjectForPeriPrint("I Periodo", (e.target.dataset.nmstudent));
                                // console.log("clicked imprei");
                                // OnlyShowSubjects(e.target.dataset.nmstudent);
                                document.getElementById('nmStudente').innerHTML = e.target.dataset.nmstudent;
                            });
                        });
                    });

                // let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
                // //PERIODO I
                // totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                // totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                // totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                // totFinal = (totP1 + totP2 + totP3) / 3;
                // tableMateriaSel.innerHTML += `
                // <tr>
                //     <td class="text-center">${doc.data().estudiante}</td>
                //     <td class="text-center">${doc.data().materia}</td>
                //     <td class="text-center">${doc.data().p1nota2}</td>
                //     <td class="text-center">${doc.data().p1nota2}</td>
                //     <td class="text-center">${doc.data().p1nota3}</td>
                //     <td class="text-primary text-center">${truncNota(totP1,2)}</td>
                //     <td class="text-center">${doc.data().p2nota1}</td>
                //     <td class="text-center">${doc.data().p2nota2}</td>
                //     <td class="text-center">${doc.data().p2nota3}</td>
                //     <td class="text-primary text-center">${truncNota(totP2,2)}</td>
                //     <td class="text-center">${doc.data().p3nota1}</td>
                //     <td class="text-center">${doc.data().p3nota2}</td>
                //     <td class="text-center">${doc.data().p3nota3}</td>
                //     <td class="text-primary text-center">${truncNota(totP3,2)}</td>
                //     <td class="text-primary text-success">${truncNota(totFinal,2)}</td>
                //     <td>
                //             <button type="button" class="btn btn-info green accent-4 ${pBtnclassByMateria}" data-idmatselected="${doc.id}" data-nmstudent="${doc.data().estudiante}" data-nmteacher="${doc.data().profesor}" data-materia="${doc.data().materia}" data-toggle="modal" data-target="#mdAgregarNota">
                //                 Imprimir
                //             </button>
                //     </td>
                // </tr>`;

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