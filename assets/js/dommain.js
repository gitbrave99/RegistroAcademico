//array list manu b
let libadgesm = document.getElementsByClassName('bdgitemcolr');
// badges menu 
document.querySelectorAll('.bdgitemcolr').forEach((el) => {
    el.addEventListener("click", (ev) => {
        document.getElementById('menushowdrpdwn').setAttribute('aria-expanded', 'false');
        document.getElementById('menushowdrpdwn').classList.remove('show');
        document.getElementById('dpmenuUsuariosats').classList.remove('show');
        // containerTbUsers

        if (el.classList.contains('bgAdmini')) {
            document.getElementById('tblistAdmisRegistered').style.display = "block";
            document.getElementById('tblisTeacherRegistered').style.display = "none";
            document.getElementById('tblistStudentsRegistered').style.display = "none";
            document.getElementById('containerTbUsers').scrollIntoView();
        }
        if (el.classList.contains('bgTeacheri')) {
            document.getElementById('tblistAdmisRegistered').style.display = "none";
            document.getElementById('tblisTeacherRegistered').style.display = "block";
            document.getElementById('tblistStudentsRegistered').style.display = "none";
            document.getElementById('containerTbUsers').scrollIntoView();
        }
        if (el.classList.contains('bgStudenti')) {
            document.getElementById('tblistAdmisRegistered').style.display = "none";
            document.getElementById('tblisTeacherRegistered').style.display = "none";
            document.getElementById('tblistStudentsRegistered').style.display = "block";
            document.getElementById('containerTbUsers').scrollIntoView();
        }
    });
});



document.querySelectorAll('.tuserc').forEach((el) => {
    el.addEventListener("click", (event) => {
        if (event.target.classList.contains('linkadmin')) {
            document.getElementById('tblistAdmisRegistered').style.display = "block";
            document.getElementById('tblisTeacherRegistered').style.display = "none";
            document.getElementById('tblistStudentsRegistered').style.display = "none";
            libadgesm[0].classList.add('active');
            libadgesm[1].classList.remove('active');
            libadgesm[2].classList.remove('active');
            document.getElementById('sidbrColor').setAttribute('data-color', 'purple');
        }
        if (event.target.classList.contains('linkteacher')) {
            document.getElementById('tblistAdmisRegistered').style.display = "none";
            document.getElementById('tblisTeacherRegistered').style.display = "block";
            document.getElementById('tblistStudentsRegistered').style.display = "none";
            libadgesm[1].classList.add('active');
            libadgesm[0].classList.remove('active');
            libadgesm[2].classList.remove('active');
            document.getElementById('sidbrColor').setAttribute('data-color', 'azure');
        }
        if (event.target.classList.contains('linkstudent')) {
            document.getElementById('tblistAdmisRegistered').style.display = "none";
            document.getElementById('tblisTeacherRegistered').style.display = "none";
            document.getElementById('tblistStudentsRegistered').style.display = "block";
            libadgesm[2].classList.add('active')
            libadgesm[1].classList.remove('active');
            libadgesm[0].classList.remove('active');
            document.getElementById('sidbrColor').setAttribute('data-color', 'green');
        }
    });
});


// capturar datos de tabla y colocarlos en el form admin  #tableAdminRegs
// let tblistAdmins = document.getElementById('tableAdminRegs');
// let formAdminReg = document.querySelector('#formAdmin');
// let listBtnAdminstable = document.querySelectorAll('.btnEditAdmin');
// listBtnAdminstable.forEach((el, index) => {
//     el.addEventListener("click", (evt) => {
//         GetSetAdminDatainFormEdit(index + 1);
//     });
// });



function GetSetAdminDatainFormEdit(index) {
    document.querySelectorAll('#formAdmin div.grlbin').forEach((el) => {
        el.classList.remove('is-focused');
        el.classList.add('is-filled');
    });

    //nombre
    let nombrea = tblistAdmins.rows[index].cells.item(1).innerHTML;
    formAdminReg.elements[0].value = DelSpaceInputs(nombrea);

    // correo
    let coreoa = tblistAdmins.rows[index].cells.item(2).innerHTML;
    formAdminReg.elements[1].value = DelSpaceInputs(coreoa);

    // fecha nacimiento 
    let feNac = tblistAdmins.rows[index].cells.item(3).innerHTML;
    formAdminReg.elements[2].value = DelSpaceInputs(feNac);

    // sexo 
    let sexa = tblistAdmins.rows[index].cells.item(4).innerHTML;
    formAdminReg.elements[3].value = DelSpaceInputs(sexa);

    //DUI
    let duia = tblistAdmins.rows[index].cells.item(5).innerHTML;
    formAdminReg.elements[4].value = DelSpaceInputs(duia);

    //telefono
    let tela = tblistAdmins.rows[index].cells.item(6).innerHTML;
    formAdminReg.elements[5].value = DelSpaceInputs(tela);

    // usuario
    let usera = tblistAdmins.rows[index].cells.item(7).innerHTML;
    formAdminReg.elements[6].value = DelSpaceInputs(usera);

    // contraseña
    let contra = tblistAdmins.rows[index].cells.item(8).innerHTML;
    formAdminReg.elements[7].value = DelSpaceInputs(contra);


}

function DelSpaceInputs(text) {
    return text.replace(/^\s+|\s+$/gm, '');
}




//agregado de table filters 
// $(document).ready(function () {
    // $('#tableAdminRegs').DataTable({
    //     "language": {
    //         "lengthMenu": "Mostrar _MENU_ registros por página",
    //         "zeroRecords": "No se encontraron registros",
    //         "info": "Página _PAGE_ of _PAGES_",
    //         "infoEmpty": "No records available",
    //         "infoFiltered": "(filtered from _MAX_ total records)"
    //     }
    // });


    // table teachaer 
    // $('#tableTeachersReg').DataTable({
    //     "language": {
    //         "lengthMenu": "Mostrar _MENU_ registros por página",
    //         "zeroRecords": "No se encontraron registros",
    //         "info": "Página _PAGE_ of _PAGES_",
    //         "infoEmpty": "No records available",
    //         "infoFiltered": "(filtered from _MAX_ total records)"
    //     }
    // });
    // $('#tableStudentsReg').DataTable({
    //     "language": {
    //         "lengthMenu": "Mostrar _MENU_ registros por página",
    //         "zeroRecords": "No se encontraron registros",
    //         "info": "Página _PAGE_ of _PAGES_",
    //         "infoEmpty": "No records available",
    //         "infoFiltered": "(filtered from _MAX_ total records)"
    //     }
    // });

    //   table estudents

// });

