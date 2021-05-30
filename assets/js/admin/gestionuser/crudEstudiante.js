const db = firebase.firestore();

let editStatus = false;
let id = '';

const fingresarEstudiante = (nombre, fechNacimiento, sexo, user, password, grado, responsable, telefono, email, dui, direccion) =>
    db.collection('estudiante').doc().set({
        nombre, fechNacimiento, sexo, user, password, grado, responsable, telefono, email, dui, direccion
    });

const registrarMaterias = (estudiante, grado, materia, p1nota1, p1nota2, p1nota3,
    p2nota1, p2nota2, p2nota3, p3nota1, p3nota2, p3nota3, profesor) => {
        db.collection('materia').doc().set({
           estudiante, grado, materia, p1nota1, p1nota2, p1nota3,
           p2nota1, p2nota2, p2nota3, p3nota1, p3nota2, p3nota3, profesor
        });
    };

const registrarMateriasBachillerato = (estudiante, grado, materia, 
    p1nota1, p1nota2, p1nota3,
    p2nota1, p2nota2, p2nota3, 
    p3nota1, p3nota2, p3nota3,
    p4nota1, p4nota2, p4nota3, 
    profesor) => {
        db.collection('materia').doc().set({
            estudiante, grado, materia, p1nota1, p1nota2, p1nota3,
            p2nota1, p2nota2, p2nota3, p3nota1, p3nota2, p3nota3, p4nota1, 
            p4nota2, p4nota3, profesor
        });
    };
    
    //al momento de regisra studen que tome el nombre completo del teacher del grade para crear las 5 materias 
//del studiante
    //SELECT FOR CARGAR GRADES REGISTRADOS PARA INGRESAR STUDIANTE
const sltListGradeRegForStudents = document.getElementById("selectGradoEstudiante");


//TABLA PARA MOSTRAR LOS DATOS DE LOS ESTUDIANTES REGISTRADOS
const tableEstudiantes = document.querySelector('#tableStudentsReg tbody');
// FORMULARIO DE INGRESO DE ESTUDIANTES
const frmNewEstudiante = document.getElementById('frmIngresoEstudiante');
//DATOS FIREBASE
const getAllEstudiantes = () => db.collection('estudiante').get();
const onGetEstudiantes = (callback) => db.collection("estudiante").onSnapshot(callback);
//elininar estudiate
const delEstudiante = (id) => db.collection('estudiante').doc(id).delete();
const getEstudiante = (id) => db.collection('estudiante').doc(id).get();
const updateEstudiante = (id, updatedEstudiante) => db.collection('estudiante').doc(id).update(updatedEstudiante)

window.addEventListener('DOMContentLoaded', async (e) => {
    onGetEstudiantes((querySnapshot) => {
        tableEstudiantes.innerHTML = '';
        querySnapshot.forEach(doc => {
            const estudoc = doc.data();
            estudoc.id = doc.id;
            tableEstudiantes.innerHTML += `<tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().fechNacimiento}</td>
                <td>${doc.data().sexo}</td>
                <td>${doc.data().grado}</td>
                <td>${doc.data().responsable}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().email}</td>
                <td>${doc.data().dui}</td>
                <td>${doc.data().user}</td>
                <td>${doc.data().password}</td>
                <td>
                     <a class="btn btn-info btn-sm btnEditStudent" href="#panelsUsers" data-id="${estudoc.id}">
                        Editar
                    </a>
                    <button type="button" class="btn btn-danger btn-sm btnDelStudent" data-id="${estudoc.id}" data-toggle="modal" data-target="#mdDeleteUsuario">
                        Borrar
                    </button>
                </td>
            </tr>
            `;
        });
        const btnsDelEstu = document.querySelectorAll('.btnDelStudent');
        btnsDelEstu.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                console.log(e.target.dataset.id);
                document.getElementById('btnModalDeleteUsuario').dataset.id = e.target.dataset.id;
            })
        });


        const btsEditEstu = document.querySelectorAll('.btnEditStudent');
        btsEditEstu.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                selectForEditStudent();
                try {
                    const doc = await getEstudiante(e.target.dataset.id);
                    const student = doc.data();

                    frmNewEstudiante['inNombreEstudiante'].value = student.nombre;
                    frmNewEstudiante['inFechNacEstudiante'].value = student.fechNacimiento;
                    frmNewEstudiante['tipesexEstudianteingreso'].value = student.sexo;
                    frmNewEstudiante['inUserEstudiante'].value = student.user;
                    frmNewEstudiante['inPassEstudiante'].value = student.password;
                    frmNewEstudiante['selectGradoEstudiante'].value = student.grado;
                    //responsable
                    frmNewEstudiante['inNombreEstuRespon'].value = student.responsable;
                    frmNewEstudiante['inTelEstuRespon'].value = student.telefono;
                    frmNewEstudiante['inEmailEstuRespon'].value = student.email;
                    frmNewEstudiante['inDUIEstuRspon'].value = student.dui;
                    frmNewEstudiante['inDireccEstuRespon'].value = student.direccion;

                    editStatus = true;
                    id = doc.id;
                    frmNewEstudiante['btnStudenForm'].innerHTML = "update";

                } catch (error) {
                    console.log(error);
                }
            });
        });
        //finsnap
        ShowGradesREgisterForStudent();
    });
});

function ShowGradesREgisterForStudent() {
    db.collection("profesor")
        .get()
        .then((querySnapshot) => {
            sltLisTeacherGradesDisp.innerHTML = "";
            querySnapshot.forEach((doc) => {
                for (let index = 0; index < arrAllGradeslc.length; index++) {
                    if (doc.data().gradoEncargado == arrAllGradeslc[index]) {
                        sltListGradeRegForStudents.innerHTML += `                        
                                    <option value="${doc.data().gradoEncargado}">${doc.data().gradoEncargado}</option>`;
                    } else {
                    }
                }
            });
            
        }).catch((error) => {
            console.log("eroro fordiponible grdteacher", error);
        });
}

document.getElementById('btnModalDeleteUsuario').addEventListener('click', async (e) => {
    try {
        await delEstudiante(e.target.dataset.id);
    } catch (error) {
        console.log(error);
    }
});

// Recuperar Nombre de Profesor encargado de grado.
async function GetProfesor(grado) {
    return db.collection('profesor').where('gradoEncargado', '==', grado).get().then(snapshot => {
        return snapshot.docs.map(doc => doc.data().nombre);
    })
}

frmNewEstudiante.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Estudiante
    const nombre = frmNewEstudiante['inNombreEstudiante'].value;
    const fechNacimiento = frmNewEstudiante['inFechNacEstudiante'].value;
    const sexo = frmNewEstudiante['tipesexEstudianteingreso'].value;
    const user = frmNewEstudiante['inUserEstudiante'].value;
    const password = frmNewEstudiante['inPassEstudiante'].value;
    const grado = frmNewEstudiante['selectGradoEstudiante'].value;
    
    // Responsable
    const responsable = frmNewEstudiante['inNombreEstuRespon'].value;
    const telefono = frmNewEstudiante['inTelEstuRespon'].value;
    const email = frmNewEstudiante['inEmailEstuRespon'].value;
    const dui = frmNewEstudiante['inDUIEstuRspon'].value;
    const direccion = frmNewEstudiante['inDireccEstuRespon'].value;

    try {
        if (!editStatus) {
            
            // 1. Creando registro de estudiante.
            // db.collection("estudiante").where("user")

            await fingresarEstudiante(nombre, fechNacimiento, sexo, user, 
                password, grado, responsable, telefono, email, dui, direccion);
   
            // 2. Creando registro default de notas por materia.
            
            // a) Para bachillerato
            if (grado == "Primer Año Bachillerato" || grado == "Segundo Año Bachillerato") {
                
                const profesor = await GetProfesor(grado);
                registrarMateriasBachillerato(nombre, grado, 'Sociales', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Lenguaje', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Matemáticas', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Ciencias', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Inglés', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Informática', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'OPV', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Seminario', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Electricidad', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMateriasBachillerato(nombre, grado, 'Dibujo Técnico', 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, profesor[0]);
            } 

            // b) Para otros grados
            else {
                const profesor = await GetProfesor(grado);
                registrarMaterias(nombre, grado, 'Sociales', 0, 0, 0, 0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMaterias(nombre, grado, 'Lenguaje', 0, 0, 0, 0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMaterias(nombre, grado, 'Matemáticas', 0, 0, 0, 0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMaterias(nombre, grado, 'Ciencias', 0, 0, 0, 0, 0, 0, 0, 0, 0, profesor[0]);
                registrarMaterias(nombre, grado, 'Inglés', 0, 0, 0, 0, 0, 0, 0, 0, 0, profesor[0]);
            }
        } else {
            await updateEstudiante(id, {
                nombre: nombre,
                fechNacimiento: fechNacimiento,
                sexo: sexo,
                user: user,
                password: password,
                grado: grado,
                responsable: responsable,
                telefono: telefono,
                email: email,
                dui: dui,
                direccion: direccion
            });
            editStatus = false;
            id = '';
            frmNewEstudiante['btnStudenForm'].innerHTML = 'Registrar';
        }
        frmNewEstudiante.reset();
    } catch (error) {
        console.log(error);
    }
});

function selectForEditStudent() {
    document.getElementById('tabbStudent').className = "nav-link active show";
    document.getElementById('tabbAdmin').className = "nav-link";
    document.getElementById('tabbTeache').className = "nav-link";
    document.getElementById('mAdminreg').className = "tab-pane";
    document.getElementById('mdDocentReg').classList = "tab-pane";
    document.getElementById('mdEstudentReg').classList = "tab-pane active show";
}

$(document).ready(function () {
    $("#buscarEstudentRg").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableStudentsReg tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tableStudentsReg th').click(function () {
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