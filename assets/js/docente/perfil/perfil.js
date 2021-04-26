const db = firebase.firestore();
const frmPerfilDocente= document.getElementById('frmPerfilDocente');
const card = document.getElementById('name');
window.addEventListener("DOMContentLoaded", (e)=>{
    
    //mostrar perfil
    MostrarDatosUsuario();

});


function MostrarDatosUsuario() {
    db.collection("profesor").where("user","==",GetLSSesionUser())
    .get()
    .then((querySnapshot)=>{
        
        querySnapshot.forEach((doc)=>{
            frmPerfilDocente["nombreDocente"].value=doc.data().nombre;
            frmPerfilDocente["userDocente"].value=doc.data().user;
            frmPerfilDocente["birthDocente"].value=doc.data().fechNacimiento;
            frmPerfilDocente["emailDocente"].value=doc.data().emailDocente;
            frmPerfilDocente["expDocente"].value=doc.data().gradoEncargado;
            frmPerfilDocente["telDocente"].value=doc.data().telefono;
            card["name"].value=doc.data().nombre;
            
            document.querySelectorAll("#frmPerfilDocente .form-group").forEach(el=>{
                el.classList.add("is-filled");
                el.classList.add("bmd-form-group");
            });  
        });  
    }); 
}