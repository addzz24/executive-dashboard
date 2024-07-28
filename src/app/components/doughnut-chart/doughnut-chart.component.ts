import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ListDataService } from '../../services/list-data.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnChanges, OnInit ,AfterViewInit {


  doughChart : Chart | undefined;
  @Input() doughData :any = [];


  constructor(private lisDataService: ListDataService){}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.doughData)
    this.Renderdoughnutchart();
  }
  ngOnInit() {
    this.doughData = this.lisDataService.getDoughDefaultData();
    this.Renderdoughnutchart();
  }

  ngAfterViewInit() {
    this.Renderdoughnutchart();
  }

  Renderdoughnutchart() {
    this.Renderchart(
      ['Organic Search', 'Direct', 'Referral'],
      this.doughData,
      ['#4CAF50', '#2196F3', '#FFC107'],
      'doughnutchart',
      'doughnut'
    );
  }
  
  Renderchart(labeldata: any, valuedata: any, colordata: any, chartid: string, charttype: any) {

    if(this.doughChart){
      this.doughChart.destroy();
    }

    this.doughChart = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Traffic Sources',
            data: valuedata,
            backgroundColor: colordata
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
            color: '#000',
            formatter: (value:any, context:any) => {
              return context.chart.data.labels[context.dataIndex];
            },
            anchor: 'end',
            align: 'end',
            offset: 10,  // Ensure this offset positions the labels correctly outside the chart
            padding: {
              top: 20,
              bottom: 20,
              left: 20,
              right: 20
            }
          }
        },
        cutout: '50%',
        layout: {
          padding: {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30
          }
        }
      }
    });
  }

}
