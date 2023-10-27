import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  header: any;
  footer: any;
  background: any;
  pagina: any;
  paginas: any;
  fechaRegistro = this.datePipe.transform(Date.now(), 'dd-MM-yyyy h:mm a');
  arreglo: any = [];

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.hedaerBase64();
    this.footerBase64();
    this.backGroundBase64();
  }

  hedaerBase64() {
    // Ruta de la imagen en "assets"
    const imagePath = 'assets/universidad-surcolombiana-ocre.png';

    // Realiza una solicitud HTTP GET para cargar la imagen como un blob
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      // Lee el blob como un ArrayBuffer
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        // La imagen se ha cargado y convertido a base64
        const base64data = reader.result as string;
        this.header = base64data;

        // Puedes utilizar base64data como necesites
      };
    });
  }

  footerBase64() {
    // Ruta de la imagen en "assets"
    const imagePath = 'assets/footer.jpg';

    // Realiza una solicitud HTTP GET para cargar la imagen como un blob
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      // Lee el blob como un ArrayBuffer
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        // La imagen se ha cargado y convertido a base64
        const base64data = reader.result as string;
        this.footer = base64data;

        // Puedes utilizar base64data como necesites
      };
    });
  }

  backGroundBase64() {
    // Ruta de la imagen en "assets"
    const imagePath = 'assets/marca-agua.png';

    // Realiza una solicitud HTTP GET para cargar la imagen como un blob
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      // Lee el blob como un ArrayBuffer
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        // La imagen se ha cargado y convertido a base64
        const base64data = reader.result as string;
        this.background = base64data;

        // Puedes utilizar base64data como necesites
      };
    });
  }

  public export(element: any): void {
    let count: number = 1;
    for (let index = 0; index < element.length + 1; index++) {
      if (index == 20) {
        this.arreglo.push([
          { margin: 25, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
          { margin: 0, border: [false, false, false, false] },
        ]);
      } else {
        this.arreglo.push([
          { text: count, margin: 4, border: [true, true, true, true] },
          { text: '20231211942 ', margin: 4, border: [true, true, true, true] },
          {
            text: 'ALVAREZ TIERRADENTRO LIANG CAMILO  ',
            margin: 4,
            border: [true, true, true, true],
          },
          { text: '4.5 ', margin: 4, border: [true, true, true, true] },
          { text: '0 ', margin: 4, border: [true, true, true, true] },
          { text: '4.5 ', margin: 4, border: [true, true, true, true] },
          { text: '0 ', margin: 4, border: [true, true, true, true] },
          { text: '5.0 ', margin: 4, border: [true, true, true, true] },
          { text: '2 ', margin: 4, border: [true, true, true, true] },
          { text: ' ', margin: 4, border: [true, true, true, true] },
          { text: '4.7 ', margin: 4, border: [true, true, true, true] },
        ]);
        count = count +1
      }
    }

    const docDefinition: any = {
      background: [
        {
          image: this.background,
          width: 550,
          alignment: 'center',
          opacity: 0.8,
          margin: [0, 20, 0, 0],
        },
      ],
      pageMargins: [10, 100, 10, 40],
      /*  watermark: {
        text: 'test watermark',
        color: 'blue',
        opacity: 0.3,
        bold: true,
        italics: false,
      }, */
      header: {
        margin: [10, 10, 10, 10],
        style: 'header',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                border: [false, false, false, false],
                image: this.header,
                width: 200,
                fillColor: '#8F141B',
                bold: true,
                margin: 5,
                alignment: 'left',
              },
              {
                border: [false, false, false, false],
                text: 'Reporte Notas',
                fillColor: '#8F141B',
                width: 200,
                bold: true,
                margin: 20,
                alignment: 'center',
              },
            ],
          ],
        },
      },
      footer: function (
        currentPage: { toString: () => string },
        pageCount: string
      ) {
        let dia = [
          'lunes',
          'martes',
          'miércoles',
          'jueves',
          'viernes',
          'sábado',
          'domingo',
        ];
        let mes = [
          'enero',
          'febrero',
          'marzo',
          'abril',
          'mayo',
          'junio',
          'julio',
          'agosto',
          'septiembre',
          'octubre',
          'noviembre',
          'diciembre',
        ];
        let d = new Date();
        let date =
          ' ' +
          dia[d.getDay() - 1] +
          ' ' +
          d.getDate() +
          ' ' +
          mes[d.getMonth()] +
          ' ' +
          d.getFullYear();
        return {
          margin: [10, 10, 10, 10],
          style: 'footer',
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: 'Fecha de impresión:  ' + date,
                  fillColor: '#8F141B',
                  bold: true,
                  alignment: 'left',
                },
                {
                  border: [false, false, false, false],
                  text:
                    'Pagina: ' + currentPage.toString() + ' de ' + pageCount,
                  fillColor: '#8F141B',
                  bold: true,
                  alignment: 'right',
                },
              ],
            ],
          },
        };
      },
      //currentPage.toString() + ' de ' + pageCount;
      /* footer: {
        margin: [10, 10, 10, 10],
        style: 'footer',
      },
 */
      content: [
        {
          margin: [50, 0, 50, 10],
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Docente: ' + 'SOTO FLECHAS JUAN LISANDRO',
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Grupo: ' + '01',
              margin: [110, 0, 0, 0],
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          margin: [50, 0, 50, 10],
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Curso: ' + 'TEORIA SOCIAL I-176201',
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Calendario: ' + '20231A',
              margin: [110, 0, 0, 0],
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          margin: [50, 0, 50, 0],
          columns: [
            {
              columns: [
                { text: 'Evaluaciones: ' },
                { text: 'Corte 01 [30.0%]', alignment: 'center', fontSize: 11 },
                { text: 'Corte 02 [30.0%]', alignment: 'center', fontSize: 11 },
                { text: 'Corte 03 [40.0%]', alignment: 'center', fontSize: 11 },
              ],
              // auto-sized columns have their widths based on their content
              /* width: '*',
              text: 'Programa: ' + 'ANTROPOLOGIA', */
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Sede: ' + 'NEIVA',
              margin: [20, 0, 0, 0],
            },
          ],
          // optional space between columns
          columnGap: 10,
        },
        {
          text: '',
          style: 'subheader',
        },
        {
          style: 'tableInit',
          table: {
            dontBreakRows: true,
            unbreakable: true,
            widths: [20, 60, 160, 30, 30, 30, 30, 30, 30, 25, 'auto'],
            heights: 20,
            headerRows: 2,
            body: [
              [
                {
                  rowSpan: 2,
                  text: '#',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 15, 0, 0],
                },
                {
                  rowSpan: 2,
                  text: 'Código',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 15, 0, 0],
                },
                {
                  rowSpan: 2,
                  text: 'Nombre',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 15, 0, 0],
                },
                {
                  colSpan: 2,
                  text: 'Corte 01 [30.0%]',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 3, 0, 3],
                },
                {},
                {
                  colSpan: 2,
                  text: 'Corte 02 [30.0%]',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 3, 0, 3],
                },
                {},
                {
                  colSpan: 2,
                  text: 'Corte 03 [40.0%]',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 3, 0, 3],
                },
                {},
                {
                  rowSpan: 2,
                  text: 'Perdio Fallas',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
                {
                  rowSpan: 2,
                  text: 'Definitiva',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 15, 0, 0],
                },
              ],
              [
                '',
                '',
                '',
                {
                  text: 'Nota',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                {
                  text: 'Fallas',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                {
                  text: 'Nota',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                {
                  text: 'Fallas',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                {
                  text: 'Nota',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                {
                  text: 'Fallas',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: 3,
                },
                '',
                '',
              ],
              /* this.arreglo[0],
              this.arreglo[1], */
              /* this.arreglo.forEach((element: any) => {
                console.log(element);
                
              }), */
              /* this.arreglo.array.forEach(element => {
                
              }) */
              //console.log(JSON.stringify(this.arreglo)),
              /* this.arreglo.map((x: any) => console.log(JSON.stringify(x))), */
              ...this.arreglo.map((row: any[]) =>
                row.map((cell: { text: any; border: any; margin: any }) => ({
                  text: cell.text,
                  margin: cell.margin,
                  border: cell.border,
                }))
              ),
            ],
          },
        },
        {
          absolutePosition: { x: 40, y: 675 },
          table: {
            widths: ['*', '*'],
            heights: [100],
            body: [
              [
                {
                  text: '___________________________________ \n Docente:',
                  alignment: 'left',
                  margin: [0, 90, 0, 0],
                  border: [false, false, false, false],
                },
                {
                  text: '___________________________________ \n V. Bo:',
                  alignment: 'left',
                  margin: [0, 90, 0, 0],
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          color: '#DFD4A6',
          fontSize: 16,
          bold: true,
        },
        footer: {
          color: '#FFFFFF',
          fontSize: 10,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        tableExample: {
          margin: [0, 10, 0, 10],
          fontSize: 9,
          alignment: 'center',
        },
        tableInit: {
          margin: [0, 20, 0, 10],
          fontSize: 8,
          alignment: 'center',
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('Reporte Notas.pdf');
  }
}
