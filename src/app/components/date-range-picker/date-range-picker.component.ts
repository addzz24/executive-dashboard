import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  dateRangeForm!: FormGroup;
  commonData!:any;
  @Output() saveCallBack: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.dateRangeForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: this.dateRangeValidator });

    if(this.commonData.startDate && this.commonData.endDate){
      this.dateRangeForm.patchValue(this.commonData)
    }
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return { dateInvalid: true };
      }
    }
    return null;
  }

  save() {
    if (this.dateRangeForm.valid) {
      this.bsModalRef.content.setDateRange(this.dateRangeForm.value);
      this.bsModalRef.hide();
    }
  }
  
}
