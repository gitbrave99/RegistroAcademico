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
            let userResponseStu, nmUserStud, passResponseStu, gradElegidoEst;
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    userResponseStu = doc.data().user;
                    nmUserStud = doc.data().nombre;
                    passResponseStu = doc.data().password;
                    grdResponseTeac = doc.data().grado;
                });
                if (userResponseStu == undefined) {
                    console.log("no existe estudiante");
                } else {
                    console.log("estudiante user loging");
                    // mensajesToForm.innerHTML = "Loging";
                    RutaDeAccesoPerfilUser("estudiante/perfil");
                    SetLSSesion(userResponseStu, "estudiante", nmUserStud);
                    //setea grado de estudiatne
                    SetGradoRespable(grdResponseTeac);
                    mensajesToForm.classList.add("text-success");
                    mensajesToForm.innerHTML = "";
                }
            } else {
                mensajesToForm.classList.add("text-danger");
                mensajesToForm.innerHTML = UserNoExiste();
            }

        }).catch((error) => {
            console.log("sino exite student error=", error);
        });
    // OBTENCION DE DATOS ADMINISTRADOR
    dbGetUserForLogin.collection("administrador").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdmin, nmUserLogAdmin, passResponseAdmmin;
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    userResponseAdmin = doc.data().user;
                    nmUserLogAdmin = doc.data().nombre;
                    passResponseAdmmin = doc.data().password;
                });
                if (userResponseAdmin == undefined) {
                    console.log("no existe admin");
                } else {
                    console.log("administrador user loging");
                    RutaDeAccesoPerfilUser("admin/perfil");
                    SetLSSesion(userResponseAdmin, "administrador", nmUserLogAdmin);
                    mensajesToForm.classList.add("text-success");
                    mensajesToForm.innerHTML = "";
                }
            } else {
                mensajesToForm.classList.add("text-danger");
                mensajesToForm.innerHTML = UserNoExiste();
            }

        }).catch((error) => {
            console.log("sino exite admin error=", error);
        });

    // OBTENCION DE DATOS TEACHER
    dbGetUserForLogin.collection("profesor").where("user", "==", user).where("password", "==", password)
        .get().then((querySnapshot) => {
            let userResponseAdminTeacher, nmUserlogteacher, passResponseTeacher, grdResponseTeac;
            if (querySnapshot.size > 0) {
                querySnapshot.forEach((doc) => {
                    userResponseAdminTeacher = doc.data().user;
                    nmUserlogteacher = doc.data().nombre;
                    passResponseTeacher = doc.data().password;
                    grdResponseTeac = doc.data().gradoEncargado;
                });
                if (userResponseAdminTeacher == undefined) {
                    console.log("no existe profesor");
                } else {
                    console.log("teacher user loging");
                    RutaDeAccesoPerfilUser("docente/perfil");
                    //obtiene grado responsabel
                    SetGradoRespable(grdResponseTeac);
                    SetLSSesion(userResponseAdminTeacher, "docente", nmUserlogteacher);
                }
            } else {
                mensajesToForm.classList.add("text-danger");
                mensajesToForm.innerHTML = UserNoExiste();
            }
        }).catch((error) => {
            console.log("sino exite techer error=", error);
        });


});

function SetLSSesion(pUser, pTipo, pNmU) {
    localStorage.setItem('sesionUser', pUser);
    localStorage.setItem('seNombreuserlog', pNmU);
    localStorage.setItem('sesesionTipoUser', pTipo);
}

function SetGradoRespable(pGradeR) {
    localStorage.setItem('seGradoResponsable', pGradeR)
}

function UserNoExiste() {
    return "Credenciales incorrectas";
}

