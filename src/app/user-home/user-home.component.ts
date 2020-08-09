import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {ViewAssetsComponent} from 'src/app/view-assets/view-assets.component'
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import {UserService} from '../services/user.service';
import { TableData } from '../model/TableData';
import { CommonService } from '../services/common.service';
import { UserDetail } from '../model/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  
  public isUserSelected=false;
  public userId:number=0;
  public first:string="Joan";
  public last:string="Stark";
  public name:string=this.first+" "+this.last;
  public email:string="joan@example.com";
  public mobile:string="7856324190";
  public doj:string="04/15/2020";
  public role:string="Developer";
  public mode:string='view';
  public message:string='';
  public assetStatus:string='NO';
  public user:UserDetail;
  public viewHeaders =["","#","Specification","Qty.",""];
  public valueHeaders =["","#","assetName","assetCount",""];

  constructor(private dialog :MatDialog,
              private userService: UserService,
              private commonService: CommonService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    let progressBarRef = this.progressBar();
    this.userService.getUserDetail().subscribe(data=>{
      console.log(data);
      this.user = data;
      this.first = data.firstName;
      this.last  = data.lastName;
      this.name = this.first+" "+this.last;
      this.mobile = data.mobileNo;
      this.email  = data.emailId;
      this.role = data.department;
      this.doj = data.dateOfJoining;
      this.userId = data.userId;
      this.assetStatus=data.isAssetsAssign;
      progressBarRef.close();
  
    });
  }

  
  public personalInfo()
  {
    console.log("personal Info");
    this.isUserSelected = !this.isUserSelected;
  }

  public assetsInfo()
  {
   this.userService.getUserDetail().subscribe(data=>{
    let progressBarRef = this.progressBar();
    if(data.isAssetsAssign == 'LEFT')
    {
      progressBarRef.close();
      this.message="You have left your Assign Assets";
    }
    else if(data.isAssetsAssign == 'NO')
    {
      progressBarRef.close();
      this.message="Assets not assign yet!";
      
    }
    else{
    
   
    this.userService.getUserAssignAssets().subscribe(data=>{
    let showAsset = new TableData(this.viewHeaders,this.valueHeaders,data,this.mode,0);
    progressBarRef.close();
    this.dialogForOperations(showAsset);
      });
    
    }
  });
  }

  public logout()
  {
    this.commonService.logout().subscribe(data=>{
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  dos()
  {
    console.log("Hii");
  }
  
  public dialogForOperations(data:TableData)
  {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.height = "70%";
   dialogConfig.width = "70%";
   dialogConfig.panelClass='custom-dialog';
   dialogConfig.data = data;
   this.dialog.open(ViewAssetsComponent,dialogConfig);
  }

  public progressBar()
  {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.width = "50%";
   let dialogRef =  this.dialog.open(ProgressBarComponent,dialogConfig);
   return dialogRef;
  }
}
