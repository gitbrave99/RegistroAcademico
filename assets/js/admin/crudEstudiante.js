const db = firebase.firestore();

let editStatus = false;
let id = '';
const fingresarEstudiante = (nombre, fechNacimiento, sexo, user, password, grado, responsable, telefono, email, dui, direccion) =>
    db.collection('estudiante').doc().set({
        nombre, fechNacimiento, sexo, user, password, grado, responsable, telefono, email, dui, direccion
    });


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
                document.getElementById('btnModalDeleteUsuario').dataset.id=e.target.dataset.id;
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
    });
});


document.getElementById('btnModalDeleteUsuario').addEventListener('click', async (e) => {
    try {
        await delEstudiante(e.target.dataset.id);
    } catch (error) {
        console.log(error);
    }
});



frmNewEstudiante.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = frmNewEstudiante['inNombreEstudiante'].value;
    const fechNacimiento = frmNewEstudiante['inFechNacEstudiante'].value;
    const sexo = frmNewEstudiante['tipesexEstudianteingreso'].value;
    const user = frmNewEstudiante['inUserEstudiante'].value;
    const password = frmNewEstudiante['inPassEstudiante'].value;
    const grado = frmNewEstudiante['selectGradoEstudiante'].value;
    //responsable
    const responsable = frmNewEstudiante['inNombreEstuRespon'].value;
    const telefono = frmNewEstudiante['inTelEstuRespon'].value;
    const email = frmNewEstudiante['inEmailEstuRespon'].value;
    const dui = frmNewEstudiante['inDUIEstuRspon'].value;
    const direccion = frmNewEstudiante['inDireccEstuRespon'].value;

    try {
        if (!editStatus) {
            await fingresarEstudiante(nombre, fechNacimiento, sexo, user, password, grado, responsable, telefono, email, dui, direccion);
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
    document.getElementById('tabbStudent').className="nav-link active show";
    document.getElementById('tabbAdmin').className="nav-link";
    document.getElementById('tabbTeache').className="nav-link";
    document.getElementById('mAdminreg').className="tab-pane";
    document.getElementById('mdDocentReg').classList="tab-pane";
    document.getElementById('mdEstudentReg').classList="tab-pane active show";
}

$(document).ready(function(){
    $("#buscarEstudentRg").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#tableStudentsReg tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });