const dbGetUserForLogin = firebase.firestore();
const formLogin = document.getElementById("frmLoginUsers");
const mensajesToForm = document.getElementById("mensajeLogin");


formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    //OBTENCIO DE EMAIL CON USER, PASS DEL ESTUDIANTE   
    const user = formLogin["nmUser"].value;
    const password = formLogin["password"].value;
    dbGetUserForLogin.collection("estudiante").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseStu, nmUserStud, passResponseStu;
            querySnapshot.forEach((doc) => {
                userResponseStu = doc.data().user;
                nmUserStud=doc.data().nombre;
                passResponseStu = doc.data().password;
            });
            if (userResponseStu == undefined) {
                // mensajesToForm.classList.add("text-warning");
                // mensajesToForm.innerHTML = "Usuario no existe";
                console.log("no existe estudiante");
            } else {
                mensajesToForm.classList.add("text-success");
                mensajesToForm.innerHTML = "";
                console.log("estudiante user loging");
                // mensajesToForm.innerHTML = "Loging";
                RutaDeAccesoPerfilUser("estudiante/perfil");
                SetLSSesion(userResponseStu, "estudiante",nmUserStud);
            }
        }).catch((error) => {
            console.log("sino exite student error=", error);
        });
    // OBTENCION DE DATOS ADMINISTRADOR
    dbGetUserForLogin.collection("administrador").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdmin, nmUserLogAdmin, passResponseAdmmin;
            querySnapshot.forEach((doc) => {
                userResponseAdmin = doc.data().user;
                nmUserLogAdmin=doc.data().nombre;
                passResponseAdmmin = doc.data().password;
            });
            if (userResponseAdmin == undefined) {
                // mensajesToForm.classList.add("text-warning");
                // mensajesToForm.innerHTML = "Usuario no existe";
                console.log("no existe admin");
            } else {
                console.log("administrador user loging");
                mensajesToForm.classList.add("text-success");
                mensajesToForm.innerHTML = "";
                RutaDeAccesoPerfilUser("admin/perfil");
                SetLSSesion(userResponseAdmin, "administrador",nmUserLogAdmin);
            }
        }).catch((error) => {
            console.log("sino exite admin error=", error);
        });

    // OBTENCION DE DATOS TEACHER
    dbGetUserForLogin.collection("profesor").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdminTeacher, nmUserlogteacher, passResponseTeacher;
            querySnapshot.forEach((doc) => {
                userResponseAdminTeacher = doc.data().user;
                nmUserlogteacher=doc.data().nombre;
                passResponseTeacher = doc.data().password;
            });
            if (userResponseAdminTeacher == undefined) {
                // mensajesToForm.classList.add("text-warning");
                // mensajesToForm.innerHTML = "Usuario no existe";
                console.log("no existe profesor");
            } else {
                console.log("teacher user loging");
                mensajesToForm.classList.add("text-success");
                mensajesToForm.innerHTML = "";
                RutaDeAccesoPerfilUser("docente/perfil");
                SetLSSesion(userResponseAdminTeacher, "docente",nmUserlogteacher);
            }
        }).catch((error) => {
            console.log("sino exite techer error=", error);
        });


});

function SetLSSesion(pUser, pTipo,pNmU) {
    localStorage.setItem('sesionUser', pUser);
    localStorage.setItem('seNombreuserlog', pNmU);
    localStorage.setItem('sesesionTipoUser', pTipo);
}


