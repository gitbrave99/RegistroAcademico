// const db = firebase.firestore();
let editStatusTeacher = false;
let idTeacher = '';
const ingresarAdministrador = (nombre, email, sexo, fechNacimiento, dui , telefono, user, password) =>
    db.collection('administrador').doc().set({
        nombre, email, sexo, fechNacimiento, dui , telefono, user, password
    });


//TABLA PARA MOSTRAR LOS DATOS DE LOS ESTUDIANTES REGISTRADOS
const tableshowAdmins = document.querySelector('#tableAdminRegs tbody');
// FORMULARIO DE INGRESO DE ESTUDIANTES
const frmNewTeacher = document.getElementById('frmIngresoDocente');
//DATOS FIREBASE
const getAllAmin = () => db.collection('administrador').get();
const onGetAdmins = (callback) => db.collection("administrador").onSnapshot(callback);
//elininar estudiate
const delAdmin = (id) => db.collection('administrador').doc(id).delete();
const getAdmin = (id) => db.collection('administrador').doc(id).get();
const updateAdmin = (id, updateAdmin) => db.collection('administrador').doc(id).update(updateAdmin)

window.addEventListener('DOMContentLoaded', async (e) => {
    onGetAdmins((querySnapshot) => {
        tableshowAdmins.innerHTML = '';

        querySnapshot.forEach(doc => {

            const admindoc = doc.data();
            admindoc.id = doc.id;

            tableshowAdmins.innerHTML += `<tr>
                <td>1</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().email}</td>
                <td>${doc.data().fechNacimiento}</td>
                <td>${doc.data().sexo}</td>
                <td>${doc.data().dui}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().user}</td>
                <td>${doc.data().password}</td>
                <td>
                     <button class="btn btn-info btn-sm btnEditAdmin" data-id="${admindoc.id}">
                        <i class="material-icons">mode_edit</i>
                    </button>
                    <button class="btn btn-danger btn-sm btnDelAdmin" data-id="${admindoc.id}">
                        <i class="material-icons">delete_forever</i>
                    </button>
                </td>
            </tr>
            `;
        });
        const btnsDelAdmin = document.querySelectorAll('.btnDelAdmin');
        btnsDelAdmin.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                console.log(e.target.dataset.id);
                try {
                    await delAdmin(e.target.dataset.id);
                } catch (error) {
                    console.log(error);
                }

            })
        });


        const btnsEditAdmin = document.querySelectorAll('.btnEditAdmin');
        btnsEditAdmin.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getAdmin(e.target.dataset.id);
                    const admin = doc.data();

                    frmNewTeacher['inNombreAdmin'].value = admin.nombre;
                    frmNewTeacher['inEmailAdmin'].value = admin.email;
                    frmNewTeacher['inNaciAdmin'].value = admin.fechNacimiento;
                    frmNewTeacher['selSexAdmin'].value = admin.sexo;
                    frmNewTeacher['inDuiAdmin'].value = admin.dui;
                    frmNewTeacher['inTelAdmin'].value = admin.telefono;
                    frmNewTeacher['inUserAdmin'].value = admin.user;
                    frmNewTeacher['inContraAdmin'].value = admin.password;

                    editStatusTeacher = true;
                    idTeacher = doc.id;
                    frmNewTeacher['btnRegisAdmin'].innerHTML = "Actualizar";

                } catch (error) {
                    console.log(error);
                }
            });
        });




    });

});




frmNewTeacher.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = frmNewTeacher['inNombreAdmin'].value;
    const email = frmNewTeacher['inEmailAdmin'].value;
    const fechNacimiento = frmNewTeacher['inNaciAdmin'].value;
    const sexo = frmNewTeacher['selSexAdmin'].value;
    const dui = frmNewTeacher['inDuiAdmin'].value;
    const telefono = frmNewTeacher['inTelAdmin'].value;
    const user = frmNewTeacher['inUserAdmin'].value;
    const password = frmNewTeacher['inContraAdmin'].value;


    try {
        if (!editStatusTeacher) {
            await ingresarAdministrador(nombre, email, sexo, fechNacimiento, dui , telefono, user, password);
        } else {
            await updateAdmin(id, {
                nombre: nombre,
                email:email,
                fechNacimiento: fechNacimiento,
                sexo:sexo,
                dui:dui,
                telefono:telefono,
                user:user,
                password:password
            });
            editStatusTeacher = false;
            id = '';
            frmNewEstudiante['btnStudenForm'].innerHTML = 'save';
        }
        frmNewEstudiante.reset();
    } catch (error) {
        console.log(error);
    }
});


