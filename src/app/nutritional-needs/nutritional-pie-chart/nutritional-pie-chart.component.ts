import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // Gardez ceci pour la directive

@Component({
  selector: 'app-nutritional-pie-chart',
  standalone: true,
  imports: [BaseChartDirective], // Gardez seulement BaseChartDirective
  templateUrl: './nutritional-pie-chart.component.html',
  styles: []
})
export class NutritionalPieChartComponent implements OnInit {
  @Input() proteins: number = 0;
  @Input() carbohydrates: number = 0;
  @Input() lipids: number = 0;

  public pieChartData!: ChartData<'pie'>;

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData(): void {
    this.pieChartData = {
      labels: ['Protéines', 'Glucides', 'Lipides'],
      datasets: [{
        data: [this.proteins, this.carbohydrates, this.lipids],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }]
    };
  }
}