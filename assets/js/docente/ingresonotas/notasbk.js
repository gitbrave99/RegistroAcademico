const db = firebase.firestore();

//BTN ADD NOTAS
const btnAddNotSociales=document.querySelectorAll(".btnAddNotSociales");
const btnAddNotLenguaje=document.querySelectorAll(".btnAddNotLenguaje");
const btnAddNotMatematicas=document.querySelectorAll(".btnAddNotMatematicas");
const btnAddNotCiencias=document.querySelectorAll(".btnAddNotCiencias");
const btnAddNotIngles=document.querySelectorAll(".btnAddNotIngles");
//TABLE FOR EACH SUBJECT
const tbListEstNotasSociales=document.querySelector("#tbListEstNotasSociales tbody");
const tbListEstNotasSociales=document.querySelector("#tbListEstNotasLenguaje tbody");
const tbListEstNotasSociales=document.querySelector("#tbListEstNotasMatematica tbody");
const tbListEstNotasSociales=document.querySelector("#tbListEstNotasCiencia tbody");
const tbListEstNotasSociales=document.querySelector("#tbListEstNotasIngles tbody");

btnAddNotSociales.forEach((btn)=>{
    btn.addEventListener("click",(ev)=>{
        
    });

});






// Formulario de Ingreso de notas.
const frmGuardarNotas = document.getElementById('frmIngresoNotas');

// Update notas de materia.
const UpdateNotasMateria =
    (id, UpdateNotasMateria) => db.collection('materia').doc(id).update(UpdateNotasMateria)

// Id de documento con notas de materia.
var idNotasMateria = '', materia = '', estudiante = '';

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

    // Obtener número de período.
    const periodo = document.getElementById('selectForPeriodos').value;

    // 1. Obtener materia.
    materia = '';

    // 2. Obtener nombre de estudiante.
    estudiante = '';

    // 3. Obtener id de notas de materia.
    //idNotasMateria = await GetNotasDeMateriaId(estudiante, materia);

    // Notas del período 1.
    if (periodo == 1) {

        const p1nota1 = frmGuardarNotas['inNota1'].value;
        const p1nota2 = frmGuardarNotas['inNota2'].value;
        const p1nota3 = frmGuardarNotas['inNota3'].value;

        await UpdateNotasMateria(idNotasMateria, {
            p1nota1: p1nota1,
            p1nota2: p1nota2,
            p1nota3: p1nota3,
        });
    }

    // Notas del período 2.
    else if (periodo == 2) {
        const p2nota1 = frmGuardarNotas['inNota1'].value;
        const p2nota2 = frmGuardarNotas['inNota2'].value;
        const p2nota3 = frmGuardarNotas['inNota3'].value;

        await UpdateNotasMateria(idNotasMateria, {
            p2nota1: p2nota1,
            p2nota2: p2nota2,
            p2nota3: p2nota3,
        });
    }

    // Notas del período 3.
    else {
        const p3nota1 = frmGuardarNotas['inNota1'].value;
        const p3nota2 = frmGuardarNotas['inNota2'].value;
        const p3nota3 = frmGuardarNotas['inNota3'].value;

        await UpdateNotasMateria(idNotasMateria, {
            p3nota1: p3nota1,
            p3nota2: p3nota2,
            p3nota3: p3nota3,
        });
    }
    frmGuardarNotas.reset();
});
