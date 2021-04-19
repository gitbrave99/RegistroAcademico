// const db = firebase.firestore();
let editStatusAdmin = false;
let idadmin = '';
const ingresarAdministrador = (nombre, email, sexo, fechNacimiento, dui , telefono, user, password) =>
    db.collection('administrador').doc().set({
        nombre, email, sexo, fechNacimiento, dui , telefono, user, password
    });


//TABLA PARA MOSTRAR LOS DATOS DE LOS ESTUDIANTES REGISTRADOS
const tableshowAdmins = document.querySelector('#tableAdminRegs tbody');
// FORMULARIO DE INGRESO DE ESTUDIANTES
const frmNewAdmin = document.getElementById('formIngresoAdmin');
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

                    frmNewAdmin['inNombreAdmin'].value = admin.nombre;
                    frmNewAdmin['inEmailAdmin'].value = admin.email;
                    frmNewAdmin['inNaciAdmin'].value = admin.fechNacimiento;
                    frmNewAdmin['selSexAdmin'].value = admin.sexo;
                    frmNewAdmin['inDuiAdmin'].value = admin.dui;
                    frmNewAdmin['inTelAdmin'].value = admin.telefono;
                    frmNewAdmin['inUserAdmin'].value = admin.user;
                    frmNewAdmin['inContraAdmin'].value = admin.password;

                    editStatusAdmin = true;
                    idadmin = doc.id;
                    frmNewAdmin['btnRegisAdmin'].innerHTML = "Actualizar";

                } catch (error) {
                    console.log(error);
                }
            });
        });




    });

});




frmNewAdmin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = frmNewAdmin['inNombreAdmin'].value;
    const email = frmNewAdmin['inEmailAdmin'].value;
    const fechNacimiento = frmNewAdmin['inNaciAdmin'].value;
    const sexo = frmNewAdmin['selSexAdmin'].value;
    const dui = frmNewAdmin['inDuiAdmin'].value;
    const telefono = frmNewAdmin['inTelAdmin'].value;
    const user = frmNewAdmin['inUserAdmin'].value;
    const password = frmNewAdmin['inContraAdmin'].value;


    try {
        if (!editStatusAdmin) {
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
            editStatusAdmin = false;
            id = '';
            frmNewEstudiante['btnStudenForm'].innerHTML = 'save';
        }
        frmNewEstudiante.reset();
    } catch (error) {
        console.log(error);
    }
});


