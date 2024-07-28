import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ContainerComponent } from './views/container/container.component';

export const routes: Routes = [
    {
        path:'',
        component: ContainerComponent
    }
];
