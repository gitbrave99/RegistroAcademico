class TableHeader {

  fTbHeaderForTecBachelor(pMateria = "Sociales") {

    const theadForTebachelor = `
      <tr>
        <th scope="col" colspan="1"><b>${pMateria}</b></th>
        <th scope="col" colspan="4" class="text-center">
          1° Trimestre
        </th>
        <th scope="col" colspan="4" class="text-center">
          2° Trimestre
        </th>
        <th scope="col" colspan="4" class="text-center">
          3° Trimestre
        </th>
        <th scope="col" colspan="4" class="text-center">
          4° Trimestre
        </th>
        <th scope="col" colspan="2" class="text-center">
        </th>
      </tr>
      <tr>
        <th scope="col" class="text-center">
          Estudiante
        </th>
        <th scope="col" class="text-center">
          Nota 1 35%
        </th>
        <th scope="col" class="text-center">
          Nota 2 35%
        </th>
        <th scope="col" class="text-center">
          Nota 3 30%
        </th>
        <th scope="col" class="text-center">
          Total Trimestre
        </th>
        <th scope="col" class="text-center">
          Nota 1 35%
        </th>
        <th scope="col" class="text-center">
          Nota 2 35%
        </th>
        <th scope="col" class="text-center">
          Nota 3 30%
        </th>
        <th scope="col" class="text-center">
          Total Trimestre
        </th>
        <th scope="col" class="text-center">
          Nota 1 35%
        </th>
        <th scope="col" class="text-center">
          Nota 2 35%
        </th>
        <th scope="col" class="text-center">
          Nota 3 30%
        </th>
        <th scope="col" class="text-center">
          Total Trimestre
        </th>
        <th scope="col" class="text-center">
          Nota 1 35%
        </th>
        <th scope="col" class="text-center">
          Nota 2 35%
        </th>
        <th scope="col" class="text-center">
          Nota 3 30%
        </th>
        <th scope="col" class="text-center">
          Total Trimestre
        </th>
        <th scope="col" class="text-center">
          Nota Final
        </th>
        <th scope="col" class="text-center">
          Acción
        </th>
      </tr>`;

    return theadForTebachelor;
  }

  fTbHeaderForGrades(pMateria = "Sociales") {

    const theadForTebachelor = `<tr>
          <th scope="col" colspan="1"><b>${pMateria}</b></th>
          <th scope="col" colspan="4" class="text-center">
            1° Trimestre
          </th>
          <th scope="col" colspan="4" class="text-center">
            2° Trimestre
          </th>
          <th scope="col" colspan="4" class="text-center">
            3° Trimestre
          </th>
          <th scope="col" colspan="2" class="text-center">
          </th>
        </tr>
        <tr>
          <th scope="col" class="text-center">
            Estudiante
          </th>
          <th scope="col" class="text-center">
            Nota 1 35%
          </th>
          <th scope="col" class="text-center">
            Nota 2 35%
          </th>
          <th scope="col" class="text-center">
            Nota 3 30%
          </th>
          <th scope="col" class="text-center">
            Total Trimestre
          </th>
          <th scope="col" class="text-center">
            Nota 1 35%
          </th>
          <th scope="col" class="text-center">
            Nota 2 35%
          </th>
          <th scope="col" class="text-center">
            Nota 3 30%
          </th>
          <th scope="col" class="text-center">
            Total Trimestre
          </th>
          <th scope="col" class="text-center">
            Nota 1 35%
          </th>
          <th scope="col" class="text-center">
            Nota 2 35%
          </th>
          <th scope="col" class="text-center">
            Nota 3 30%
          </th>
          <th scope="col" class="text-center">
            Total Trimestre
          </th>
          <th scope="col" class="text-center">
            Nota Final
          </th>
          <th scope="col" class="text-center">
            Acción
          </th>
        </tr>`;

    return theadForTebachelor;
  }

  GetNotasFourPeriodos(doc, pBtnclassByMateria) {
    let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
    let totalP4;
    //PERIODO I
    totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
    totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
    totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
    totalP4 = ((doc.data().p4nota1 * 0.35) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));

    totFinal = (totP1 + totP2 + totP3 + totalP4) / 4;
    const notes = `  <tr>
          <td class="text-center">${doc.data().estudiante}</td>
          <td class="text-center">${doc.data().p1nota1}</td>
          <td class="text-center">${doc.data().p1nota2}</td>
          <td class="text-center">${doc.data().p1nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP1, 2)}</td>
          <td class="text-center">${doc.data().p2nota1}</td>
          <td class="text-center">${doc.data().p2nota2}</td>
          <td class="text-center">${doc.data().p2nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP2, 2)}</td>
          <td class="text-center">${doc.data().p3nota1}</td>
          <td class="text-center">${doc.data().p3nota2}</td>
          <td class="text-center">${doc.data().p3nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP3, 2)}</td>
          <td class="text-center">${doc.data().p4nota1}</td>
          <td class="text-center">${doc.data().p4nota2}</td>
          <td class="text-center">${doc.data().p4nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totalP4, 2)}</td>
          <td class="text-primary text-success">${this.GetColorNotaPasONo(totFinal)}</td>
          <td>
                  <button type="button" class="btn btn-info green accent-4 ${pBtnclassByMateria}" data-idmatselected="${doc.id}" data-nmstudent="${doc.data().estudiante}" data-nmteacher="${doc.data().profesor}" data-materia="${doc.data().materia}" data-toggle="modal" data-target="#mdlAddNotaCrudAdmin">
                      Agregar Nota
                  </button>
          </td>
      </tr>`;
    return notes;
  }

  GetNotasThreePeriodos(doc, pBtnclassByMateria) {
    let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
    //PERIODO I
    totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
    totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
    totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));


    totFinal = (totP1 + totP2 + totP3) / 3;
    const notes = `  <tr>
          <td class="text-center">${doc.data().estudiante}</td>
          <td class="text-center">${doc.data().p1nota1}</td>
          <td class="text-center">${doc.data().p1nota2}</td>
          <td class="text-center">${doc.data().p1nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP1, 2)}</td>
          <td class="text-center">${doc.data().p2nota1}</td>
          <td class="text-center">${doc.data().p2nota2}</td>
          <td class="text-center">${doc.data().p2nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP2, 2)}</td>
          <td class="text-center">${doc.data().p3nota1}</td>
          <td class="text-center">${doc.data().p3nota2}</td>
          <td class="text-center">${doc.data().p3nota3}</td>
          <td class="text-primary text-center">${this.truncNota(totP3, 2)}</td>
          <td class="text-primary text-success">${this.GetColorNotaPasONo(totFinal)}</td>
          <td>
                  <button type="button" class="btn btn-info green accent-4 ${pBtnclassByMateria}" data-idmatselected="${doc.id}" data-nmstudent="${doc.data().estudiante}" data-nmteacher="${doc.data().profesor}" data-materia="${doc.data().materia}" data-toggle="modal" data-target="#mdlAddNotaCrudAdmin">
                      Agregar Nota
                  </button>
          </td>
      </tr>`;
    return notes;
  }

  truncNota(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }
  GetColorNotaPasONo(trunCnot) {
    let valor = ``;
    if (trunCnot >= 5) {
      valor = `<span class="text-success">${this.truncNota(trunCnot, 2)}</span>`;
    } else {
      valor = `<span class="text-warning">${this.truncNota(trunCnot, 2)}</span>`;
    }
    return valor;
  }
  //select for calificaion elegir 3
  GetSelectForThreePeriodosAddNota() {
    const options = `<option selected disabled value="Elegir">Elegir</option>
    <option value="1">I Periodo</option>
    <option value="2">II Periodo</option>
    <option value="3">III Periodo</option>
    <option value="11">Finales</option>`;
    return options;
  }
  //select for calificaion elegir 4
  GetSelectForFourPeriodosAddNota() {
    const options = `<option selected disabled value="Elegir">Elegir</option>
    <option value="1">I Periodo</option>
    <option value="2">II Periodo</option>
    <option value="3">III Periodo</option>
    <option value="4  ">IIII Periodo</option>
    <option value="11">Finales</option>`;
    return options;
  }


  //select de periodos #selectForPeriodos
  GetSelectForThreePeriodos() {
    const options = `<option selected disabled value="Elegir">Elegir</option>
    <option value="1">I Periodo</option>
    <option value="2">II Periodo</option>
    <option value="3">III Periodo</option>`;
    return options;
  }
  GetSelectForFourPeriodos() {
    const options = `<option selected disabled value="Elegir">Elegir</option>
    <option value="1">I Periodo</option>
    <option value="2">II Periodo</option>
    <option value="3">III Periodo</option>
    <option value="4">IIII Periodo</option>`;
    return options;
  }

  GetRadiosToPrinSubjectsThreePeriodos() {
    const lisRadios = `<div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rsociales" name="opremaa" value="option1">Sociales
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rlenguaje" name="opremaa" value="option2">Lenguaje
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rmatematicas" name="opremaa"
              value="option3">Matemáticas
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rciencias" name="opremaa" value="option3">Ciencias
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Inglés
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" checked id="rtodos" name="opremaa">Todas
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>`;
    return lisRadios;
  }
  GetRadiosToPrinSubjectsFourPeriodos() {
    const lisRadios = `<div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rsociales" name="opremaa" value="option1">Sociales
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rlenguaje" name="opremaa" value="option2">Lenguaje
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rmatematicas" name="opremaa"
              value="option3">Matemáticas
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="rciencias" name="opremaa" value="option3">Ciencias
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Inglés
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
        <div class="form-check form-check-inline">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Informática
          <span class="form-check-sign">
            <span class="check"></span>
          </span>
        </label>
      </div>
      <div class="form-check form-check-inline">
      <label class="form-check-label">
        <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Seminario
        <span class="form-check-sign">
          <span class="check"></span>
        </span>
      </label>
    </div>
    <div class="form-check form-check-inline">
    <label class="form-check-label">
      <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Electricidad
      <span class="form-check-sign">
        <span class="check"></span>
      </span>
    </label>
  </div>
  <div class="form-check form-check-inline">
  <label class="form-check-label">
    <input class="form-check-input" type="radio" id="ringles" name="opremaa" value="option3">Dibujo Técnico
    <span class="form-check-sign">
      <span class="check"></span>
    </span>
  </label>
  </div>
        <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input class="form-check-input" type="radio" checked id="rtodos" name="opremaa">Todas
            <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>`;
    return lisRadios;
  }

}