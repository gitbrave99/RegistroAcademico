// const db = firebase.firestore();
let editStatusTeacher = false;
let idTeacher = '';
const ingresarTeacher = (nombre, email, sexo, fechNacimiento, dui, telefono, user, password, gradoEncargado) =>
    db.collection('profesor').doc().set({
        nombre, email, sexo, fechNacimiento, dui, telefono, user, password, gradoEncargado
    });


//TABLA PARA MOSTRAR LOS DATOS DE LOS ESTUDIANTES REGISTRADOS
const tableshowTeacher = document.querySelector('#tableTeachersReg tbody');
// FORMULARIO DE INGRESO DE ESTUDIANTES
const frmNewTeacher = document.getElementById('frmIngresoDocente');
//DATOS FIREBASE
const getAllTeachers = () => db.collection('profesor').get();
const onGetTeacher = (callback) => db.collection("profesor").onSnapshot(callback);
//elininar estudiate
const detTeacher = (id) => db.collection('profesor').doc(id).delete();
const getTeacher = (id) => db.collection('profesor').doc(id).get();
const updateTeacher = (id, updateTeacher) => db.collection('profesor').doc(id).update(updateTeacher)

window.addEventListener('DOMContentLoaded', async (e) => {
    onGetTeacher((querySnapshot) => {
        tableshowTeacher.innerHTML = '';
        querySnapshot.forEach(doc => {
            const teacherdoc = doc.data();
            teacherdoc.id = doc.id;

            tableshowTeacher.innerHTML += `<tr>
                <td>1</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().email}</td>
                <td>${doc.data().fechNacimiento}</td>
                <td>${doc.data().sexo}</td>
                <td>${doc.data().dui}</td>
                <td>${doc.data().telefono}</td>
                <td>${doc.data().user}</td>
                <td>${doc.data().password}</td>
                <td>${doc.data().gradoEncargado}</td>
                <td>
                     <button class="btn btn-info btn-sm btnEditAdmin" data-id="${teacherdoc.id}">
                        <i class="material-icons">mode_edit</i>
                    </button>
                    <button class="btn btn-danger btn-sm btndelTeacher" data-id="${teacherdoc.id}">
                        <i class="material-icons">delete_forever</i>
                    </button>
                </td>
            </tr>
            `;
        });
        const btnsdetTeacher = document.querySelectorAll('.btndelTeacher');
        btnsdetTeacher.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                console.log(e.target.dataset.id);
                try {
                    await detTeacher(e.target.dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        });


        const btnsEditAdmin = document.querySelectorAll('.btnEditAdmin');
        btnsEditAdmin.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getTeacher(e.target.dataset.id);
                    const teach = doc.data();
                    frmNewTeacher['inNombreTeacher'].value = teach.nombre;
                    frmNewTeacher['inEmailTeacher'].value = teach.email;
                    frmNewTeacher['inNaciTeacher'].value = teach.fechNacimiento;
                    frmNewTeacher['selsexTeacher'].value = teach.sexo;
                    frmNewTeacher['inDuiTeacher'].value = teach.dui;
                    frmNewTeacher['inTelTeacher'].value = teach.telefono;
                    frmNewTeacher['inUserTeacher'].value = teach.user;
                    frmNewTeacher['inPassTeacher'].value = teach.password;
                    frmNewTeacher['selgradoforesTeacher'].value = teach.gradoEncargado;
                    editStatusTeacher = true;
                    idTeacher = doc.id;
                    frmNewTeacher['btnRegisTeacher'].innerHTML = "Actualizar";

                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

});


frmNewTeacher.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = frmNewTeacher['inNombreTeacher'].value;
    const email = frmNewTeacher['inEmailTeacher'].value;
    const fechNacimiento = frmNewTeacher['inNaciTeacher'].value;
    const sexo = frmNewTeacher['selsexTeacher'].value;
    const dui = frmNewTeacher['inDuiTeacher'].value;
    const telefono = frmNewTeacher['inTelTeacher'].value;
    const user = frmNewTeacher['inUserTeacher'].value;
    const password = frmNewTeacher['inPassTeacher'].value;
    const gradoEncargado = frmNewTeacher['selgradoforesTeacher'].value;

    try {
        if (!editStatusTeacher) {
            await ingresarTeacher(nombre, email, sexo, fechNacimiento, dui, telefono, user, password, gradoEncargado);
        } else {
            await updateTeacher(id, {
                nombre: nombre,
                email: email,
                fechNacimiento: fechNacimiento,
                sexo: sexo,
                dui: dui,
                telefono: telefono,
                user: user,
                password: password,
                gradoEncargado: gradoEncargado
            });
            editStatusTeacher = false;
            idTeacher = '';
            frmNewTeacher['btnRegisTeacher'].innerHTML = 'save';
        }
        frmNewTeacher.reset();
    } catch (error) {
        console.log(error);
    }
});


