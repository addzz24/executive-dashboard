import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
