import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsAssignComponent } from './assets-assign/assets-assign.component';
import { ViewAssetsComponent } from './view-assets/view-assets.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path:"", pathMatch:'full', component: LoginComponent},
  {path: 'asset', component: AssetsAssignComponent},
  {path:'viewassets',component: ViewAssetsComponent},
  {path:'user',component: UserHomeComponent},
  {path:'admin',component: AdminHomeComponent},
  {path:'login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
