import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class CertificadoElectoralPdfService {
  header: any;
  footer: any;
  background: any;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.hedaerBase64();
    this.footerBase64();
    this.backGroundBase64();
  }

  hedaerBase64() {
    // Ruta de la imagen en "assets"
    const imagePath = 'assets/header.jpg';

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
    const docDefinition: any = {
      background: [
        {
          image: this.background,
          width: 500,
          alignment: 'center',
          opacity: 0.8,
          margin: [0, 100, 0, 0],
        },
      ],
      pageMargins: [60, 110, 60, 140],
      header: {
        margin: [, 0, 0, 0],
        image: this.header,
        width: 550,
        height: 90,
        alignment: 'center',
      },
      footer: {
        image: this.footer,
        width: 550,
        height: 120,
        alignment: 'center',
        margin: [0, 0, 0, 0],
      },
      content: [
        {
          text: 'CERTIFICADO ELECTORAL: PRUEBA CONVIVENCIA',
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Nombre(s):',
              alignment: 'right',
              margin: [0, 40, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'LUDGERIO',
              alignment: 'left',
              margin: [20, 40, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Apellido(s):',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'AROCA TRUJILLO',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Tipo Identificación:',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'CEDULA DE CIUDADANIA',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Sede:',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'NEIVA',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Facultad / Oficina/ Programa :',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'VICERRECTORIA DE INVESTIGACION',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Estamento:',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: 'ADMINISTRATIVO CARRERA',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: '*',
              text: 'Fecha y hora:',
              alignment: 'right',
              margin: [0, 10, 30, 0],
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: '2023/08/16 11:14AM',
              alignment: 'left',
              margin: [20, 10, 0, 0],
            },
          ],
        },
        {
          text: 'NOTA: La validez de su certificado esta sujeto a la verificación de la información suministrados en el sistema.',
          alignment: 'justify',
          margin: [0, 40, 0, 0],
        },
        {
          text: 'Cualquier inconveniente con respecto a su voto le será informado a su correo electrónico Si considera necesario imprima el Certificado Electoral.',
          alignment: 'justify',
          margin: [0, 20, 0, 0],
        },
        {
          text: 'Fecha de generación: 2023/8/16 11:14 AM',
          alignment: 'justify',
          margin: [0, 20, 0, 0],
        },
        {
          text: '___________________________________ \n Responsable.',
          alignment: 'left',
          margin: [0, 90, 0, 0],
        },
      ],
      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        tableExample: {
          margin: [0, 5, 0, 5],
          fontSize: 10,
          alignment: 'center',
        },
        tableInit: {
          margin: [0, 10, 0, 5],
          fontSize: 10,
          alignment: 'center',
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(
        'Certificado electoral ' +
          this.datePipe.transform(new Date(), 'dd-MM-yyyy h:mm a') +
          ' .pdf'
      );
  }
}
