var mdImpresionPeriodosF = document.getElementById("mdPrevImpresion");
var tblistar = document.querySelector("#tbToPrintNtStudent");
var btnImprimirNotas = document.querySelector("#printBoletNotasEstudiantex");
var nombreUser = GetNameUserLog();
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
            case 'Finales':
                console.log("funco");
                ShowSubjectForPeriPrint('Finales', nombreUser);
                break;

            default:
                console.log("funco");
                ShowSubjectForPeriPrint('Finales', nombreUser);
                break;
        }
    });

});


function ShowSubjectForPeriPrint(pNperiodo, pnmStu) {
    let totPrdo = 0, totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
    let tblistar = document.querySelector("#tbToPrintNtStudent");
    db.collection("materia").where("estudiante", "==", nombreUser)
        .get()
        .then((querySnapshot) => {
            tblistar.innerHTML = "";
            querySnapshot.forEach((doc) => {
                switch (pNperiodo) {
                    case 'I Periodo':
                        totPrdo = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        break;
                    case 'II Periodo':
                        totPrdo = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        break;
                    case 'III Periodo':
                        totPrdo = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        break;
                    case 'Finales':
                        totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
                        totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
                        totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
                        totFinal = (totP1 + totP2 + totP3) / 3;
                        totPrdo = totFinal
                        break;
                    default:
                        break;
                }
                totFinal = totPrdo;
                tblistar.innerHTML += `
                <tr>
                    <td class="text-center">${doc.data().materia}</td>
                    <td class="text-center">${GetColorNotaPasONo(totFinal)}</td>
                </tr>`;
            });
        });
}

function GetColorNotaPasONo(trunCnot) {
    let valor = ``;
    if (trunCnot >= 5) {
        valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
    } else {
        valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
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


