import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ListDataService } from '../../services/list-data.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements  OnInit,OnChanges,AfterViewInit {
  bubbleChart: Chart | undefined;

  @Input() bubbleData: Array<any> = [];

  constructor(private listDataService: ListDataService){}


  ngOnInit(): void {
    this.bubbleData = this.listDataService.getDefaultBubbleData();
    this.RenderBubbleChart();
  }

  ngOnChanges() {
    this.RenderBubbleChart();
  }

  ngAfterViewInit() {
    this.RenderBubbleChart();
  }

  RenderBubbleChart() {
    const data = {
      datasets: this.bubbleData
    };

    this.RenderChart(data, 'bubblechart', 'bubble');
  }
  RenderChart(data: any, chartid: string, charttype: any) {
    if(this.bubbleChart){
      this.bubbleChart.destroy()
    }

    this.bubbleChart = new Chart(chartid, {
      type: charttype,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Maintain aspect ratio
        scales: {
          x: {
            beginAtZero: true,
            min: -1,
            max: 650, // Adjust as needed to prevent overflow
            grid: {
              display: false // Remove grid lines
            },
            ticks: {
              callback: function(value: any) {
                return `$${value}`;
              }
            }
          },
          y: {
            beginAtZero: true,
            min: -2,
            max: 15, // Adjust as needed to prevent overflow
            grid: {
              display: false // Remove grid lines
            },
            ticks: {
              callback: function(value: any) {
                return `$${value}`;
              }
            }
          }
        },
        plugins: {
          datalabels: {
            display: false // Remove data labels from bubbles
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.dataset.label || '';
                return `${label}: ($${context.raw.x}, $${context.raw.y}, ${context.raw.r})`;
              }
            }
          }
        }
      }
    });
  }
  
}
