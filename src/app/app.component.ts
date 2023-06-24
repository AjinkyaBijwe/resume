import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as resumeDate from 'src/assets/data/data.json';
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

  setDarkMode() {
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      this.darkMode = false;
    }
    else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      this.darkMode = true;
    }
  }
}


