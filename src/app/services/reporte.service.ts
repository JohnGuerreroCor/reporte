import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  arreglo20: any = [];
  arreglo40: any = [];
  arreglo60: any = [];
  fase1: boolean = false;
  fase2: boolean = false;
  fase3: boolean = false;

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

  public export(element: any, data: any[]): void {
    for (let index = 0; index < data.length; index++) {
      if (index < 21) {
        this.arreglo20.push([
          { text: index + 1 },
          { text: data[index].est_codigo },
          { text: data[index].per_apellido + ' ' + data[index].per_apellido },
          { text: data[index].cursoNota.cun_nota },
          { text: data[index].cursoNota.cun_fallas },
          { text: data[index].cursoNota.cun_observacion },
        ]);
      } else if (index >= 21 && index < 45) {
        this.arreglo40.push([
          { text: index + 1 },
          { text: data[index].est_codigo },
          { text: data[index].per_apellido + ' ' + data[index].per_apellido },
          { text: data[index].cursoNota.cun_nota },
          { text: data[index].cursoNota.cun_fallas },
          { text: data[index].cursoNota.cun_observacion },
        ]);
      } else {
        this.arreglo60.push([
          { text: index + 1 },
          { text: data[index].est_codigo },
          { text: data[index].per_apellido + ' ' + data[index].per_apellido },
          { text: data[index].cursoNota.cun_nota },
          { text: data[index].cursoNota.cun_fallas },
          { text: data[index].cursoNota.cun_observacion },
        ]);
      }
    }
    console.log('Arreglo: ', this.arreglo20);
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
                text: 'Notas Parciales',
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

      content: [
        {
          margin: [50, 10, 50, 10],
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Docente: ' + element.docente,
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'Grupo: ' + element.grupo,
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
              text:
                'Curso: ' +
                element.curso +
                '\n\n' +
                'Evaluacion: ' +
                element.evaluacion,
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text:
                'Calendario: ' +
                element.calendario +
                '\n\n' +
                'Sede: ' +
                element.sede,
              margin: [110, 0, 0, 0],
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
            widths: [20, 70, '*', 30, 30, '*'],
            heights: 20,
            headerRows: 2,
            body: [
              [
                {
                  text: '#',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 10],
                },
                {
                  text: 'Código',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
                {
                  text: 'Nombre',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
                {
                  text: 'Nota',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
                {
                  text: 'Fallas',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
                {
                  text: 'Observación',
                  fillColor: '#8F141B',
                  color: 'white',
                  bold: true,
                  margin: [0, 10, 0, 0],
                },
              ],
              ...this.arreglo20.map((row: any[]) =>
                row.map((cell: { text: any }) => ({
                  text: cell.text,
                  margin: 4,
                }))
              ),
            ],
          },
        },
        this.arreglo40.length > 0
          ? {
              style: 'tableSecond',
              table: {
                dontBreakRows: true,
                unbreakable: true,
                widths: [20, 70, '*', 30, 30, '*'],
                heights: 20,
                headerRows: 2,
                body: [
                  [
                    {
                      text: '#',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 10],
                    },
                    {
                      text: 'Código',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Nombre',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Nota',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Fallas',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Observación',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                  ],
                  ...this.arreglo40.map((row: any[]) =>
                    row.map((cell: { text: any }) => ({
                      text: cell.text,
                      margin: 4,
                    }))
                  ),
                ],
              },
            }
          : null, // No agregar la segunda tabla si this.arreglo40 está vacío
          this.arreglo60.length > 0
          ? {
              style: 'tableThird',
              table: {
                dontBreakRows: true,
                unbreakable: true,
                widths: [20, 70, '*', 30, 30, '*'],
                heights: 20,
                headerRows: 2,
                body: [
                  [
                    {
                      text: '#',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 10],
                    },
                    {
                      text: 'Código',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Nombre',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Nota',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Fallas',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                    {
                      text: 'Observación',
                      fillColor: '#8F141B',
                      color: 'white',
                      bold: true,
                      margin: [0, 10, 0, 0],
                    },
                  ],
                  ...this.arreglo60.map((row: any[]) =>
                    row.map((cell: { text: any }) => ({
                      text: cell.text,
                      margin: 4,
                    }))
                  ),
                ],
              },
            }
          : null, // No agregar la segunda tabla si this.arreglo40 está vacío
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
          margin: [0, 0, 0, 10],
          fontSize: 8,
          alignment: 'center',
        },
        tableSecond: {
          margin: [0, 40, 0, 10],
          fontSize: 8,
          alignment: 'center',
        },
        tableThird: {
          margin: [0, 80, 0, 10],
          fontSize: 8,
          alignment: 'center',
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download('Reporte Notas ' + element.evaluacion + '.pdf');
  }
}
