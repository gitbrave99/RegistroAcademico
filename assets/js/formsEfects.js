class Formefects {

    GetSetAdminDatainFormEdit(index,pTbUser,pFromUser, pFormDInp) {
        let tblistAdmins = document.getElementById(pTbUser);
        let formAdminReg = document.querySelector(pFromUser);
        document.querySelectorAll(pFormDInp).forEach((el) => {
            el.classList.remove('is-focused');
            el.classList.add('is-filled');
        });
        
        console.log("cargando");
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

    DelSpaceInputs(text) {
        return text.replace(/^\s+|\s+$/gm, '');
    }



}