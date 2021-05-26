const db = firebase.firestore();
const tblistGradesTeacher = document.querySelector("#tblistGrados tbody");
const tblistAllStudensInTeachergrade = document.querySelector("#tblistStudents tbody");
const titleGradSelected=document.querySelector("#titleGradeSel");
window.addEventListener("DOMContentLoaded", async (e) => {
    db.collection("profesor").get()
        .then((querySnapshot) => {
            tblistGradesTeacher.innerHTML = "";
            querySnapshot.forEach((doc) => {
                tblistGradesTeacher.innerHTML += `
                    <tr>
                        <td class="text-center">${doc.data().gradoEncargado}</td>
                        <td class="text-center">${doc.data().nombre}</td>
                        <td class="text-center">
                            <a class="btn btn-info btn-sm btnShowAllStudentsByGradeTeacher" href="#pnllisStudents" data-grade="${doc.data().gradoEncargado}">
                               Mostrar
                            </a>
                        </td>
                    </tr>`;
            });
            const btnstoShowStudbytg = document.querySelectorAll(".btnShowAllStudentsByGradeTeacher");
            btnstoShowStudbytg.forEach((btn) => {
                btn.addEventListener("click",  (evt) => {
                    const dtgrade = evt.target.dataset.grade;
                    ShowAllStudentsByGradeTeacher(dtgrade);
                    titleGradSelected.innerHTML=dtgrade;
                });
            });

        }).catch((error) => {
            console.log(error);
        });

});

function ShowAllStudentsByGradeTeacher(pGrade) {
    db.collection("estudiante").where("grado", "==", pGrade)
    .get()
    .then((querySnapshot) => {
        tblistAllStudensInTeachergrade.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(doc.data().nombre);
                tblistAllStudensInTeachergrade.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().nombre}</td>
                    <td class="text-center">${doc.data().fechNacimiento}</td>
                    <td class="text-center">${doc.data().sexo}</td>
                    <td class="text-center">${doc.data().responsable}</td>
                    <td class="text-center">${doc.data().telefono}</td>
                    <td class="text-center">${doc.data().email}</td>
                    <td class="text-center">${doc.data().dui}</td>
                    <td class="text-center">${doc.data().direccion}</td>
                    <td class="text-center">${doc.data().user}</td>
                    <td class="text-center">${doc.data().password}</td>
                </tr>`;
            });

        }).catch((error) => {
            console.log("erros: show students",error);
        });
}


$(document).ready(function () {
    //FOR TECHER GRADE
    $("#buscarTeacher").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblistGrados tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tblistGrados th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

    //FOR STUDENTS
    $("#buscarStudent").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tblistStudents tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#tblistStudents th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

});