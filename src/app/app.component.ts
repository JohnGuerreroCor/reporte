import { Component } from '@angular/core';
import { ReporteService } from './services/reporte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reportenotas';
  data: any;

  constructor(public reporteService: ReporteService) {}

  generarPdf() {
    this.reporteService.export(this.data);
  }
}
