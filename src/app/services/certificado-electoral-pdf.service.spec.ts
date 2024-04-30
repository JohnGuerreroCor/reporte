import { TestBed } from '@angular/core/testing';

import { CertificadoElectoralPdfService } from './certificado-electoral-pdf.service';

describe('CertificadoElectoralPdfService', () => {
  let service: CertificadoElectoralPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificadoElectoralPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
