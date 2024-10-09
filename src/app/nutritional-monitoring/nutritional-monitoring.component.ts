import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nutritional-monitoring',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './nutritional-monitoring.component.html',
  styles: []
})

export class NutritionalMonitoringComponent implements OnInit {

  ngOnInit() {
    
  }


}
