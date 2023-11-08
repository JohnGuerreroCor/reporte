import { TestBed } from '@angular/core/testing';

import { ReporteGeneralService } from './reporte-general.service';

describe('ReporteGeneralService', () => {
  let service: ReporteGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
