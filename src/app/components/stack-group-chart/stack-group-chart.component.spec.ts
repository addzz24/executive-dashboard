import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackGroupChartComponent } from './stack-group-chart.component';

describe('StackGroupChartComponent', () => {
  let component: StackGroupChartComponent;
  let fixture: ComponentFixture<StackGroupChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackGroupChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackGroupChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
