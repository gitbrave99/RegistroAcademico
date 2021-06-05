var mdImpresionPeriodosF = document.getElementById("mdPrevImpresion");
var tblistar = document.querySelector("#tbToPrintNtStudent");
var btnImprimirNotas = document.querySelector("#printBoletNotasEstudiantex");
var nombreUser = GetNameUserLog();
var txtGrado = document.getElementById('shwGradeStToPrint').value;


window.addEventListener("DOMContentLoaded", async (e) => {

    
    ShowSubjectForPeriPrint('I Periodo', nombreUser);
    document.getElementById("selPerFnNotas").addEventListener("change", (e) => {
        let opSelted = e.target.value;
        switch (opSelted) {
            case 'I Periodo':
                console.log("funco");
                ShowSubjectForPeriPrint('I Periodo', nombreUser);
                break;
            case 'II Periodo':
                console.log("funco");
                ShowSubjectForPeriPrint('II Periodo', nombreUser);
                break;
            case 'III Periodo':
                console.log("funco");
                ShowSubjectForPeriPrint('III Periodo', nombreUser);
                break;
            case 'IIII Periodo':
                console.log("funco");
                ShowSubjectForPeriPrint('IIII Periodo', nombreUser);
                break;
            case 'Finales':
                console.log("funco");
                ShowSubjectForPeriPrint('Finales', nombreUser);
                break;

            default:
                console.log("funco");
                ShowSubjectForPeriPrint('I Periodo', nombreUser);
                break;
        }
    });

});


function ShowSubjectForPeriPrint(pNperiodo, pnmStu) {
    let totPrdo = 0, totP1 = 0, totP2 = 0, totP3 = 0, totP4 = 0, totFinal = 0;
    let not1 = 0, not2 = 0, not3 = 0;
    let tblistar = document.querySelector("#tbToPrintNtStudent");
    const cTheader = new TableHeader();
    const tbNotasDetalle = document.querySelector("#tbToPrintNtStudent thead#theadGrades");
    const tbNotasFinalDetalle = document.querySelector("#tbToPrintNtStudent thead#theadGrades");
    const tbNotasDetalleCompleto = document.querySelector("#tbToPrintNtStudent tbody#theadGrades");
    db.collection("materia").where("estudiante", "==", nombreUser)
        .get()
        .then((querySnapshot) => {
            tbNotasDetalle.innerHTML = "";
            tbNotasFinalDetalle.innerHTML = "";
            tbNotasDetalleCompleto.innerHTML = "";
            tbNotasDetalle.innerHTML=cTheader.fTbHeaderForGradesDetails();
            
            querySnapshot.forEach((doc) => {
                switch (pNperiodo) {
                    case 'I Periodo':
                        totPrdo = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        not1 = doc.data().p1nota1;
                        not2 = doc.data().p1nota2;
                        not3 = doc.data().p1nota3;
                        break;
                    case 'II Periodo':
                        totPrdo = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        not1 = doc.data().p2nota1;
                        not2 = doc.data().p2nota2;
                        not3 = doc.data().p2nota3;
                        break;
                    case 'III Periodo':
                        totPrdo = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        not1 = doc.data().p3nota1;
                        not2 = doc.data().p3nota2;
                        not3 = doc.data().p3nota3;
                        break;
                    case 'IIII Periodo':
                        totPrdo = ((doc.data().p4nota1 * 0.45) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));
                        not1 = doc.data().p4nota1;
                        not2 = doc.data().p4nota2;
                        not3 = doc.data().p4nota3;
                        break;
                    case 'Finales':
                        totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        //para cuatro periodos
                        if (doc.data().p4nota1 != null || doc.data().p4nota1 != undefined) {
                            totP4 = ((doc.data().p4nota1 * 0.35) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));
                            totFinal = (totP1 + totP2 + totP3 + totP4) / 4;
                        } else {
                            //para 3 periodos
                            totFinal = (totP1 + totP2 + totP3) / 3;
                        }
                        totPrdo = totFinal
                        break;
                    default:
                        break;
                }
                totFinal = totPrdo;
                
                let matnota = "";
                matnota += `<tr><td class="text-center">${doc.data().materia}</td>`;

                if(pNperiodo == 'Finales'){
                    matnota += `<td class="text-center">${GetColorNotaPasONo(truncNota(totFinal, 2).toFixed(1))}</td></tr>`;
                }else if (totP4 == 0) {
                    matnota += `<td class="text-center">${GetColorNotaPasONo(not1)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not2)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not3)}</td>
                    <td class="text-center">${GetColorNotaPasONo(totFinal)}</td></tr>`;
                } else {
                    matnota += `<td class="text-center">${GetColorNotaPasONo(not1)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not2)}</td>
                    <td class="text-center">${GetColorNotaPasONo(not3)}</td>
                    <td class="text-center">${GetColorNotaPasONo(totFinal)}</td></tr>`;
                }

                if(pNperiodo == 'I Periodo' || pNperiodo == 'II Periodo' || pNperiodo == 'III Periodo' || pNperiodo == 'IIII Periodo'){
                    console.log("yamete");
                    tbNotasDetalle.innerHTML;
                    tbNotasDetalleCompleto.innerHTML += matnota;
                }
                else if(pNperiodo == 'Finales'){
                    console.log("onichan");
                    tbNotasFinalDetalle.innerHTML = cTheader.fTbHeaderForGradesDetailsFinalNotes();
                    tbNotasFinalDetalle.innerHTML;
                    tbNotasDetalleCompleto.innerHTML += matnota;
                }
                
            });
        });
}

function GetColorNotaPasONo(trunCnot) {
    let valor = ``;
    if (GetGradoResponsable() === "Primer Año Bachillerato" || GetGradoResponsable() == "Segundo Año Bachillerato"){
        console.log("es toda wey");
        if (trunCnot >= 6) {
            valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
        } else {
            valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
        }
    }
    else {
        console.log("no es toda wey")
        if (trunCnot >= 5) {
            valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
        } else {
            valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
        }
    }
    return valor;
}
function GetColorNotaPasONoBachiller(trunCnot) {
    let valor = ``;
    if (GetGradoResponsable() === "Primer Año Bachillerato" || GetGradoResponsable() == "Segundo Año Bachillerato"){
        console.log("es toda wey");
        if (trunCnot >= 7) {
            valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
        } else {
            valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
        }
    }
    else {
        console.log("no es toda wey")
        if (trunCnot >= 5) {
            valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
        } else {
            valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
        }
    }
    return valor;
}

function truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}


