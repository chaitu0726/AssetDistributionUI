import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetsAssignComponent } from './assets-assign/assets-assign.component';
import {FormsModule} from "@angular/forms";
import { ViewAssetsComponent } from './view-assets/view-assets.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from'@angular/common/http';
import { AddAssetsComponent } from './add-assets/add-assets.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [
    AppComponent,
    AssetsAssignComponent,
    ViewAssetsComponent,
    UserHomeComponent,
    AdminHomeComponent,
    LoginComponent,
    DialogBoxComponent,
    ProgressBarComponent,
    AddAssetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ViewAssetsComponent,AssetsAssignComponent,ProgressBarComponent,DialogBoxComponent,AddAssetsComponent]
})
export class AppModule { }
