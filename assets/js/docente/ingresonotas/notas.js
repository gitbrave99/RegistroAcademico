const db = firebase.firestore();

// Formulario de Ingreso de notas.
const frmGuardarNotas = document.getElementById('frmIngresoNotas');

// Update notas de materia.
const UpdateNotasMateria = 
(id, UpdateNotasMateria) => db.collection('materia').doc(id).update(UpdateNotasMateria)

// Id de documento con notas de materia.
var idNotasMateria = '', materia = '', estudiante = '';

frmGuardarNotas.addEventListener('submit', async (e) => { e.preventDefault();

    // Obtener número de período.
    const periodo = document.getElementById('selectForPeriodos').value;
    console.log(periodo);

    // 1. Obtener materia.


    // 2. Obtener nombre de estudiante.


    // 3. Obtener id de notas de materia.


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
            p2nota1: p1nota1,
            p2nota2: p1nota2,
            p2nota3: p1nota3,
        });
    } 
    
    // Notas del período 3.
    else {
        const p3nota1 = frmGuardarNotas['inNota1'].value;
        const p3nota2 = frmGuardarNotas['inNota2'].value;
        const p3nota3 = frmGuardarNotas['inNota3'].value;

        await UpdateNotasMateria(idNotasMateria, {
            p3nota1: p1nota1,
            p3nota2: p1nota2,
            p3nota3: p1nota3,
        });
    }
    frmGuardarNotas.reset();
});
