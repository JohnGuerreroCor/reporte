import { Component } from '@angular/core';
import { ReporteService } from './services/reporte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reportenotas';
  data: any = [
    {
      id: 1,
      codigo: '20231211942',
      apellido_paterno: 'ALVAREZ',
      apellido_materno: 'TIERRADENTRO',
      nombre: 'LIANG CAMILO',
      nota1: 4.5,
      nota2: 0,
      nota3: 4.5,
      nota4: 0,
      nota5: 5.0,
      nota6: 2,
      promedio: 4.7,
    },
    {
      id: 1,
      codigo: '20231211942',
      apellido_paterno: 'ALVAREZ',
      apellido_materno: 'TIERRADENTRO',
      nombre: 'LIANG CAMILO',
      nota1: 4.5,
      nota2: 0,
      nota3: 4.5,
      nota4: 0,
      nota5: 5.0,
      nota6: 2,
      promedio: 4.7,
    },
    {
      id: 1,
      codigo: '20231211942',
      apellido_paterno: 'ALVAREZ',
      apellido_materno: 'TIERRADENTRO',
      nombre: 'LIANG CAMILO',
      nota1: 4.5,
      nota2: 0,
      nota3: 4.5,
      nota4: 0,
      nota5: 5.0,
      nota6: 2,
      promedio: 4.7,
    },
    {
      id: 1,
      codigo: '20231211942',
      apellido_paterno: 'ALVAREZ',
      apellido_materno: 'TIERRADENTRO',
      nombre: 'LIANG CAMILO',
      nota1: 4.5,
      nota2: 0,
      nota3: 4.5,
      nota4: 0,
      nota5: 5.0,
      nota6: 2,
      promedio: 4.7,
    },
    {
      id: 1,
      codigo: '20231211942',
      apellido_paterno: 'ALVAREZ',
      apellido_materno: 'TIERRADENTRO',
      nombre: 'LIANG CAMILO',
      nota1: 4.5,
      nota2: 0,
      nota3: 4.5,
      nota4: 0,
      nota5: 5.0,
      nota6: 2,
      promedio: 4.7,
    },
  ];

  constructor(public reporteService: ReporteService) {}

  generarPdf() {
    this.reporteService.export(this.data);
  }
}
