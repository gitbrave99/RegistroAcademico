class TableHeader {

    fTbHeaderForTecBachelor() {
  
      const theadForTebachelor = `
      <tr>
        <th scope="col" colspan="1"><b>Materia</b></th>
        <th scope="col" colspan="4" class="text-center">
          1° Periodo
        </th>
        <th scope="col" colspan="4" class="text-center">
          2° Periodo
        </th>
        <th scope="col" colspan="4" class="text-center">
          3° Periodo
        </th>
        <th scope="col" colspan="4" class="text-center">
          4° Periodo
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
          Total Periodo
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
          Total Periodo
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
          Total Periodo
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
          Total Periodo
        </th>
        <th scope="col" class="text-center">
          Nota Final
        </th>
      </tr>`;
  
      return theadForTebachelor;
    }
  
    fTbHeaderForGrades() {
  
      const theadForTebachelor = `<tr>
          <th scope="col" colspan="1"><b>Materia</b></th>
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
        </tr>`;
  
      return theadForTebachelor;
    }
  
    fTbHeaderForGradesDetails() {
  
      const theadForTebachelor = `
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
            Total
          </th>
        </tr>`;
  
      return theadForTebachelor;
    }

    GetNotasFourPeriodos(doc) {
      let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
      let totalP4;
      //PERIODO I
      totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
      totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
      totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
      totalP4 = ((doc.data().p4nota1 * 0.35) + (doc.data().p4nota2 * 0.35) + (doc.data().p4nota3 * 0.30));
  
  
      totFinal = (totP1 + totP2 + totP3 + totalP4) / 4;
      const notes = `  <tr>
          <td class="text-center">${doc.data().materia}</td>
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
          <td class="text-primary text-success">${this.GetColorNotaPasONoBachiller(totFinal)}</td>
         
      </tr>`;
      return notes;
    }
  
    GetNotasThreePeriodos(doc) {
      let totP1 = 0, totP2 = 0, totP3 = 0, totFinal = 0;
      //PERIODO I
      totP1 = ((doc.data().p1nota1 * 0.35) + (doc.data().p1nota2 * 0.35) + (doc.data().p1nota3 * 0.30));
      totP2 = ((doc.data().p2nota1 * 0.35) + (doc.data().p2nota2 * 0.35) + (doc.data().p2nota3 * 0.30));
      totP3 = ((doc.data().p3nota1 * 0.35) + (doc.data().p3nota2 * 0.35) + (doc.data().p3nota3 * 0.30));
  
  
      totFinal = (totP1 + totP2 + totP3) / 3;
      const notes = `  <tr>
          <td class="text-center">${doc.data().materia}</td>
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
        valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
      } else {
        valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
      }
      return valor;
    }
    //bachiillerato
    GetColorNotaPasONoBachiller(trunCnot) {
      let valor = ``;
      if (trunCnot >= 6) {
        valor = `<span class="text-success">${truncNota(trunCnot, 2)}</span>`;
      } else {
        valor = `<span class="text-warning">${truncNota(trunCnot, 2)}</span>`;
      }
      return valor;
    }
    //select de periodos para IMPRIMIR #selectForPeriodos
    GetSelectForFourPeriodosToPrint() {
      const options = `
      <option value="I Periodo">I Periodo</option>
      <option value="II Periodo">II Periodo</option>
      <option value="III Periodo">III Periodo</option>
      <option value="IIII Periodo">IV Periodo</option>
      <option value="Finales">Finales</option>`;
      return options;
    }
    //select de periodos para IMPRIMIR #selectForPeriodos
    GetSelectForThreePeriodosToPrint() {
      const options = `<option selected disabled value="Elegir">Elegir</option>
      <option value="I Periodo">I Trimestre</option>
      <option value="II Periodo">II Trimestre</option>
      <option value="III Periodo">III Trimestre</option>
      <option value="Finales">Finales</option>`;
      return options;
    }
  
    
}