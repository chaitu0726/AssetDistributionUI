import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { TableData } from '../model/TableData';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AssetAssign, AssetsDistribute, UserAssignAssset } from '../model/Assets';

@Component({
  selector: 'app-view-assets',
  templateUrl: './view-assets.component.html',
  styleUrls: ['./view-assets.component.css']
})
export class ViewAssetsComponent implements OnInit {

  public viewHeaders:string[]=[];
  public valueHeaders:string[]=[];
  public rows:any;
  public mode:string='';
  public userId:number=0;
  public userAssignAssets:UserAssignAssset[]=[];
  //public assetDistribute:AssetsDistribute[]=[]; 
  public 
  constructor(
              private dialog :MatDialog,
              private dialogRef : MatDialogRef<ViewAssetsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TableData,
              private userService : UserService,
              private adminService :AdminService
  ) { }

  ngOnInit(): void {
    this.setTableData();
  }
  setTableData() {
    this.mode = this.data.mode;
    this.viewHeaders = this.data.viewHeaders;
    this.valueHeaders = this.data.valueHeaders;
    this.rows = this.data.rows;
    this.userId = this.data.userId;
  }
  /*
  public headers =["","","#","Specification","Qty.","",""];
  public headers1 =["","#","Specification","Assigned","Available","",""];
  
  public rows1=[
    {
      "Specification":"HP/21.5 Inch/Full HD",
      "Assigned":100,
      "Available":500
    },
    {
      "Specification":"ASUS/AMD Ryzen/8GB+512GB SSD+4GB NVIDIA Graphics/Windows 10",
      "Assigned":150,
      "Available":275
    }
];
  public  rows2 =[
   {
     "Key":"MN01",
     "Specification":"HP/21.5 Inch/Full HD",
     "Qty.":2
   },
   {
    "Key":"CPU01",
    "Specification":"ASUS/AMD Ryzen/8GB+512GB SSD+4GB NVIDIA Graphics/Windows 10",
    "Qty.":1
  }
  ];
*/
  public assignToUser()
  {
    let progressBarRef = this.progressBar();
    this.userAssignAssets = this.data.rows;
    let assetAssign = new AssetAssign(this.userAssignAssets,this.userId);
    console.log(assetAssign);
    
    this.adminService.updateUser(assetAssign).subscribe(data=>{
    progressBarRef.close();
    //snackbar event
    this.close();
    });
  }
  public leaveFromUser()
  {
    let progressBarRef = this.progressBar();
    this.userAssignAssets = this.data.rows;
    this.userService.leaveAssets(this.userAssignAssets).subscribe(data=>{
    progressBarRef.close();
    //snackbar event
      this.close();
    });
      //dialog box for confirmation

  }
  public close()
  {
    this.dialogRef.close();
    console.log("close");
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
