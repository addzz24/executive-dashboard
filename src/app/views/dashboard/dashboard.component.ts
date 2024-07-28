import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';
import { BubbleData, StackChartModel } from '../../models/common.model';
import { DoughnutChartComponent } from "../../components/doughnut-chart/doughnut-chart.component";
import { StackGroupChartComponent } from "../../components/stack-group-chart/stack-group-chart.component";
import { BubbleChartComponent } from "../../components/bubble-chart/bubble-chart.component";
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DoughnutChartComponent, StackGroupChartComponent, BubbleChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  bsModalRef!: BsModalRef;
  startDate!: string;
  endDate!: string;
  stackData: Array<any> = []
  bubbleData: Array<any> = [];
  doughData: Array<any> = [];
  constructor(private modalService: BsModalService, private dataService: DataService){}

  ngOnInit(): void {}

  /** For Opening the date rane popup */
  openSelectDateRange(){
    const modalSettings: ModalOptions = {
        backdrop: 'static',
        keyboard: false,
        animated: true,
        ignoreBackdropClick: true,
        initialState: {
            commonData: {
              startDate : this.startDate,
              endDate : this.endDate
            },
        },
    };
    this.bsModalRef = this.modalService.show(DateRangePickerComponent, { ...modalSettings });
    this.bsModalRef.content.setDateRange = this.setDateRange.bind(this);
  }


  async setDateRange(selectedDateRange:any) {

    if(selectedDateRange ){
      //Maintaining selected date range
      this.startDate = selectedDateRange?.startDate ? selectedDateRange.startDate : '';
      this.endDate = selectedDateRange?.endDate ? selectedDateRange.endDate : '';

      // Random data for charts on every date range change
      this.stackData = this.dataService.generateStackData();
      this.bubbleData = this.dataService.generateBubbleData();
      this.doughData = this.dataService.generateDoughData();
    }
  }

}
