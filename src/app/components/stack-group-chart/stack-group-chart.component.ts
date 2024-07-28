import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StackChartModel } from '../../models/common.model';
import { ListDataService } from '../../services/list-data.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-stack-group-chart',
  standalone: true,
  templateUrl: './stack-group-chart.component.html',
  styleUrl: './stack-group-chart.component.scss'
})
export class StackGroupChartComponent implements OnInit, OnChanges, AfterViewInit {

  private chartInstance: Chart | undefined;

  @Input() stackData: Array<StackChartModel> =  [];

  constructor(private listDataService: ListDataService){}

  ngOnInit(): void {
    this.stackData = this.listDataService.getDefaultStackData();
  }

  ngOnChanges() {
    this.RenderStackGroupChart();
  }

  ngAfterViewInit() {
    this.RenderStackGroupChart();
  }

  RenderStackGroupChart() {
    const labels = ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec'];
    const data = {
      labels: labels,
      datasets: this.stackData
    };

    this.RenderChart(data, 'stackedbarchart', 'bar');
  }
  

  RenderChart(data: any, chartid: string, charttype: any) {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.chartInstance = new Chart(chartid, {
      type: charttype,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensure the aspect ratio is maintained
        scales: {
          x: {
            stacked: true,
            border: {
              display: false
            },
            grid: {
              display: false,
              drawOnChartArea: true,
              drawTicks: true,
            }
          },
          y: {
            stacked: true,
            border: {
              display: false
            },
            ticks: {
              callback: function(value: number) {
                return '$' + value / 1000 + 'K'; // Formatting the ticks to display in K
              }
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false // Remove data labels from bubbles
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context:any) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString(); // Formatting the tooltip values with $
                }
                return label;
              }
            }
          }
        }
      }
    });
  }


}
