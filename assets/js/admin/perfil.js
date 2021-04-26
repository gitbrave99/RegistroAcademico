const db = firebase.firestore();
const formPerfilAdministrador= document.getElementById('frmPerfilAdministrador');
window.addEventListener("DOMContentLoaded", (e)=>{
    //mostrar perfil
    MostrarDatosUsuario();
});


function MostrarDatosUsuario() {
    db.collection("administrador").where("user","==",GetLSSesionUser()).get()
    .then((querySnapshot)=>{
        
        querySnapshot.forEach((doc)=>{
            formPerfilAdministrador["nombreAdmin"].value=doc.data().nombre;
            formPerfilAdministrador["fechanacAdmin"].value=doc.data().fechNacimiento;
            formPerfilAdministrador["sexoAdmin"].value=doc.data().sexo;
            formPerfilAdministrador["duiAdmin"].value=doc.data().dui;
            formPerfilAdministrador["telAdmin"].value=doc.data().telefono;
            formPerfilAdministrador["emailAdmin"].value=doc.data().email;
            formPerfilAdministrador["userAdmin"].value=doc.data().user;
            formPerfilAdministrador["passAdmin"].value=doc.data().password;
            //responsable
            document.querySelectorAll("#frmPerfilAdministrador .form-group").forEach(el=>{
                el.classList.add("is-filled");
                el.classList.add("bmd-form-group");
            });    
        });
    });
}