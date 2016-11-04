import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ApplicationRouteGuardService } from './shared/security/application-route-guard.service';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [ApplicationRouteGuardService]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [ApplicationRouteGuardService]},
];

export const routing = RouterModule.forRoot(appRoutes);
