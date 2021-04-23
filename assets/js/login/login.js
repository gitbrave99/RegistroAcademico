const dbGetUserForLogin = firebase.firestore();
const formLogin = document.getElementById("frmLoginUsers");
const mensajesToForm = document.getElementById("mensajeLogin");


formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    //OBTENCIO DE EMAIL CON USER, PASS DEL ESTUDIANTE   
    const user = document.getElementById('nmUser').value;
    const password = document.getElementById('password').value;

    dbGetUserForLogin.collection("estudiante").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseStu, passResponseStu;
            querySnapshot.forEach((doc) => {
                userResponseStu = doc.data().user;
                passResponseStu = doc.data().password;
            });
            if (userResponseStu == undefined) {
                mensajesToForm.innerHTML = "estudiante usuairo no existe";
            } else {
                console.log("estudiante user loging");
                mensajesToForm.innerHTML = "Loging";
                RutaDeAccesoPerfilUser("estudiante/perfil");
                SetLSSesion(userResponseStu,"estudiante");
            }
        }).catch((error) => {
            console.log("sino exite student error=", error);
        });
    // OBTENCION DE DATOS ADMINISTRADOR
    dbGetUserForLogin.collection("admninistrador").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdmin, passResponseAdmmin;
            querySnapshot.forEach((doc) => {
                userResponseAdmin = doc.data().user;
                passResponseAdmmin = doc.data().password;
            });
            if (userResponseAdmin == undefined) {
                mensajesToForm.innerHTML = "administrador usuairo no existe";
            } else {
                console.log("administrador user loging");
                mensajesToForm.innerHTML = "Loging";
                RutaDeAccesoPerfilUser("administrado/gestionusuario");
                SetLSSesion(userResponseAdmin,"administrador");
            }
        }).catch((error) => {
            console.log("sino exite admin error=", error);
        });

    // OBTENCION DE DATOS TEACHER
    dbGetUserForLogin.collection("profesor").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdminTeacher, passResponseTeacher;
            querySnapshot.forEach((doc) => {
                userResponseAdminTeacher = doc.data().user;
                passResponseTeacher = doc.data().password;
            });
            if (userResponseAdminTeacher == undefined) {
                mensajesToForm.innerHTML = "teacher usuairo no existe";
            } else {
                console.log("teacher user loging");
                mensajesToForm.innerHTML = "Loging";
                RutaDeAccesoPerfilUser("docente/perfil");
                SetLSSesion(userResponseAdminTeacher,"docente");
            }
        }).catch((error) => {
            console.log("sino exite techer error=", error);
        });


});

function SetLSSesion(pUser, pTipo) {
    localStorage.setItem('sesionUser', pUser);
    localStorage.setItem('sesesionTipoUser', pTipo);
}


