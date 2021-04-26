const db = firebase.firestore();
const nombreUserTeacher = GetLSSesionUser();
//BTN ADD NOTAS
let userNm = "";
const tbListEstNotasSociales = document.querySelector("#tbListEstNotasSociales tbody");
const btnAddNotMatematicas = document.querySelectorAll(".btnAddNotMatematicas");
const btnAddNotCiencias = document.querySelectorAll(".btnAddNotCiencias");
const btnAddNotIngles = document.querySelectorAll(".btnAddNotIngles");
const fillgrForTielgrR=document.getElementById("frmgrpGrRespon");

window.addEventListener("DOMContentLoaded", async (e) => {
const titleGradeResponsable=document.getElementById("gradoResponsable");

    let nmTechComP = "";
    db.collection("profesor").where("user", "==", nombreUserTeacher)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                nmTechComP = doc.data().nombre;
                titleGradeResponsable.value=doc.data().gradoEncargado;
                ShowNotasStudentByMateriaAll(nmTechComP, "Sociales", "tbListEstNotasSociales", "btnAddNotSociales");
                ShowNotasStudentByMateriaAll(nmTechComP, "Lenguaje", "tbListEstNotasLenguaje", "btnAddNotLenguaje");
                ShowNotasStudentByMateriaAll(nmTechComP, "Matemáticas", "tbListEstNotasMatematica", "btnAddNotMatematicas");
                ShowNotasStudentByMateriaAll(nmTechComP, "Ciencias", "tbListEstNotasCiencia", "btnAddNotCiencias");
                ShowNotasStudentByMateriaAll(nmTechComP, "Inglés", "tbListEstNotasIngles", "btnAddNotIngles");
            });

        })

    // document.getElementById("btnGuardarNotas").addEventListener("click",(e)=>{
    //     console.log("target nmte",e.target.dataset.nmteacher);
    // });


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
function ShowNotasStudentByMateriaAll(pTeacher, pMateria, pTableMat, pBtnclassByMateria) {
    let tableMateriaSel = document.querySelector(`#${pTableMat} tbody`);
    db.collection("materia").where("materia", "==", pMateria).where("profesor", "==", pTeacher)
        .get()
        .then((querySnapshot) => {
            tableMateriaSel.innerHTML = "";
            querySnapshot.forEach((doc) => {
                // console.log("en foreach", doc.data());
                let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
                //PERIODO I
                totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                totFinal = (totP1 + totP2 + totP3) / 3;
                tableMateriaSel.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().estudiante}</td>
                    <td class="text-center">${doc.data().p1nota1}</td>
                    <td class="text-center">${doc.data().p1nota2}</td>
                    <td class="text-center">${doc.data().p1nota3}</td>
                    <td class="text-primary text-center">${truncNota(totP1,2)}</td>
                    <td class="text-center">${doc.data().p2nota1}</td>
                    <td class="text-center">${doc.data().p2nota2}</td>
                    <td class="text-center">${doc.data().p2nota3}</td>
                    <td class="text-primary text-center">${truncNota(totP2,2)}</td>
                    <td class="text-center">${doc.data().p3nota1}</td>
                    <td class="text-center">${doc.data().p3nota2}</td>
                    <td class="text-center">${doc.data().p3nota3}</td>
                    <td class="text-primary text-center">${truncNota(totP3,2)}</td>
                    <td class="text-primary text-success">${truncNota(totFinal,2)}</td>
                    <td>
                            <button type="button" class="btn btn-info green accent-4 ${pBtnclassByMateria}" data-idmatselected="${doc.id}" data-nmstudent="${doc.data().estudiante}" data-nmteacher="${doc.data().profesor}" data-materia="${doc.data().materia}" data-toggle="modal" data-target="#mdAgregarNota">
                                Agregar Nota
                            </button>
                    </td>
                </tr>`;

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
