function GetLSSesionUser() {
  var sesi = localStorage.getItem('sesionUser');
  return sesi;
}
function GetLSSesionTipoU() {
  var tipo = localStorage.getItem('sesesionTipoUser');
  return tipo;
}
function LogOut() {
  localStorage.clear();
  RutaDeAccesoPerfilUser("../login");
}
function RutaDeAccesoPerfilUser(ruta) {
  window.location = `${ruta}.html`;
}
