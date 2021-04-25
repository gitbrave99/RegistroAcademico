const db = firebase.firestore();

// Formulario de Ingreso de notas
const frmGuardarNotas = document.getElementById('frmIngresoNotas');

const updateStudent = (id, updateStudent) => db.collection('materia').doc(id).update(updateStudent)
let idEstudiante = '';

frmGuardarNotas.addEventListener('submit', async (e) => {
    e.preventDefault();
    const estudiante = document.getElementById('').value;
    const grado = document.getElementById('').value;
    const materia = document.getElementById('gradoResponsable').value;
    
    const p1nota1 = frmGuardarNotas['inNota1'].value;
    const p1nota2 = frmGuardarNotas['inNota2'].value;
    const p1nota3 = frmGuardarNotas['inNota3'].value;

    const p2nota1 = frmGuardarNotas['inNota1'].value;
    const p2nota2 = frmGuardarNotas['inNota2'].value;
    const p2nota3 = frmGuardarNotas['inNota3'].value;

    const p3nota1 = frmGuardarNotas['inNota1'].value;
    const p3nota2 = frmGuardarNotas['inNota2'].value;
    const p3nota3 = frmGuardarNotas['inNota3'].value;

    const profesor = document.getElementById('').value;

    try {
        
        await updateStudent(idEstudiante, {
            estudiante: estudiante,
            grado: grado,
            materia: materia,
            p1nota1: p1nota1,
            p1nota2: p1nota2,
            p1nota3: p1nota3,
            p1nota1: p2nota1,
            p1nota2: p2nota2,
            p1nota3: p2nota3,
            p1nota1: p3nota1,
            p1nota2: p3nota2,
            p1nota3: p3nota3,
            profesor: profesor
        });
    
        frmGuardarNotas.reset();

    } catch (error) {
        console.log(error);
    }
});
