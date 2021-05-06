function GetLSSesionUser() {
  let sesi = localStorage.getItem('sesionUser');
  return sesi;
}
function GetLSSesionTipoU() {
  let tipo = localStorage.getItem('sesesionTipoUser');
  return tipo;
}
function GetNameUserLog() {
  let nmUser= localStorage.getItem('seNombreuserlog');
  return nmUser;
}


function LogOut() {
  localStorage.clear();
  RutaDeAccesoPerfilUser("../login");
}
function RutaDeAccesoPerfilUser(ruta) {
  window.location = `${ruta}.html`;
}
