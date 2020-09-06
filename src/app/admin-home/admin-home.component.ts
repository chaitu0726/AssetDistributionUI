import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {ViewAssetsComponent} from 'src/app/view-assets/view-assets.component'
import {AssetsAssignComponent} from 'src/app/assets-assign/assets-assign.component'
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import {AdminService} from '../services/admin.service';
import { UserShortDetails, UserDetail } from '../model/User';
import { AssetInfo, AssetAssign } from '../model/Assets';
import { TableData } from '../model/TableData';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
 
  public name:string='Chaitu';
  public isUserSelected=false;
  public ViewHeaders =["#","First","Last"];
  public ValueHeaders=["","firstName","lastName"];
  public mode:string='';
  public department:string='';
  public userId:number=0;

  public rows:UserShortDetails[];
  public user:UserDetail;
  public assetInfo:AssetInfo[];
  public tableData: TableData;
  constructor(private dialog :MatDialog,
              private adminService: AdminService,
              private commonService: CommonService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.getUsersShortDetails();
  }

  getUsersShortDetails() {
    let progressBarRef = this.progressBar();
    this.adminService.getShortUsersDetails().subscribe(data=>{
      this.rows = data;
      console.log(this.rows);
      progressBarRef.close();
    });
  }
 

  rowClick(rowData:UserShortDetails)
  {
    let progressBarRef = this.progressBar();
   
    this.adminService.getUserDetail(rowData.userId).subscribe(data=>{
        this.user = data;
         this.isUserSelected = true;
        this.department = data.department;
        this.userId = data.userId;
        progressBarRef.close();

    });
      console.log(rowData);
  }

  public viewAssetsDetails()
  {
      let progressBarRef = this.progressBar();
      this.adminService.getAssetsDetails().subscribe(data=>{
      this.assetInfo = data;
      progressBarRef.close();
      let viewHeaders =["","#","Specification","Assigned","Available","",""];
      let valueHeaders = ["","#","assetName","assignedAssets","availableAssets"];
      this.mode = "asset";
      this.tableData = new TableData(viewHeaders,valueHeaders,this.assetInfo,this.mode,0);
      this.dialogForOperations(this.tableData);
      });
      //this.dialogForOperations();
  }
  public recommondedAssets()
  {
    let progressBarRef = this.progressBar();
    this.adminService.getRecommandedAssets(this.department).subscribe(data=>{
      let viewHeaders =["","#","Specification","Qty..","",""];
      let valueHeaders = ["","#","assetName","assetCount","",""];
      this.mode = "recommonded";
      this.tableData = new TableData(viewHeaders,valueHeaders,data,this.mode,this.userId);
      progressBarRef.close();
      this.dialogForOperations(this.tableData);
      
    });
    //this.dialogForOperations(this.tableData); 
    /*
    this.isUserSelected = false;
    this.getUsersShortDetails();
    */
  }
  public manualAssign()
  {
    this.dialogForManual(this.userId);
      /*
    this.isUserSelected = false;
    this.getUsersShortDetails();
    */
  }

  public logout()
  {
    this.commonService.logout().subscribe(data=>{
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
    
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

 public dialogForManual(data:number)
 {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.height = "75%";
  dialogConfig.width = "70%";
  dialogConfig.panelClass='custom-dialog';
  dialogConfig.data = data;
  this.dialog.open(AssetsAssignComponent,dialogConfig);
 }

 public progressBar()
 {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.width = "50%";
  let dialogRef =  this.dialog.open(ProgressBarComponent,dialogConfig);
  return dialogRef;
 }
 //Sample push11 to V2.0
}
