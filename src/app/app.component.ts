import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as resumeDate from 'src/assets/data/data.json';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('resume') resume!: ElementRef;

  title = 'resume';

  darkMode = false;

  resumeData = resumeDate;

  hideInDowload = false;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.hideInDowload = params?.download === 'true' ? true : false;;
    });
  }

  downloadPDF() {
    this.hideInDowload = true;

    setTimeout(() => {
      const resume = this.resume.nativeElement;
      html2canvas(resume, { scrollY: 0 }).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  
        const doc = new jsPDF('p', 'mm', 'a4');
        const bufferX = 0;
        const bufferY = 0;
        const imgProps = (<any>doc).getImageProperties(contentDataURL);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(contentDataURL, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'MEDIUM');
        doc.save('Ajinkya_Bijwe_Resume'); 
        this.hideInDowload = false;
      }); 
    }, 100);
  }
}


