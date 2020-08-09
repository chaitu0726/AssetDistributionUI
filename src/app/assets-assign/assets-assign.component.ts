import { Component, OnInit, Inject } from '@angular/core';
import { AssetDetails } from './assetDetails';
import {MatDialog,MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { AssetsDropDown, UserAssignAssset,AssetsDistribute, AssetAssign} from '../model/Assets';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-assets-assign',
  templateUrl: './assets-assign.component.html',
  styleUrls: ['./assets-assign.component.css']
})
export class AssetsAssignComponent implements OnInit {

  public assetAssign: any[] = [{ 
    id: 1,
    key: '',
    count: '',
    name: ''
  }];

 constructor(private dialog :MatDialog,
    private dialogRef : MatDialogRef<AssetsAssignComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private adminService:AdminService
    ) {}
    
   //constructor(){}
  
  public assetTypes:string[]=[];
  public assetForType:UserAssignAssset[]=[];
  public Assets:AssetsDropDown[];
  public i:number=1;
  public dd:any[]=[];
  public AssetAssignToUser:UserAssignAssset[]=[];
  public userId:number;
  ngOnInit() {
    this.userId= this.data;
    this.getDropDown();
  }
  getDropDown()
  {
    let progressBarRef = this.progressBar();
    this.adminService.getAssetsDropDown().subscribe(data=>{
        this.Assets = data;
      for(let i=0;i<this.Assets.length;i++)
      {
        this.assetTypes.push(this.Assets[i].assetName);
      }
      progressBarRef.close();
    });
  }
  addAddress() {
    this.assetAssign.push({
      id: this.assetAssign.length + 1,
      key: '',
      count: '',
      name: ''
    });
  }

  removeAddress(i: number) {
    this.assetAssign.splice(i, 1);
    this.dd.splice(i,1);
  }

  logValue() {
   // console.log(this.assetAssign);
   let progressBarRef = this.progressBar();
   this.AssetAssignToUser =[];
    for(let i=0;i<this.assetAssign.length;i++)
    {
        let temp = new UserAssignAssset(this.assetAssign[i].key,this.assetAssign[i].name,this.assetAssign[i].count);
        this.AssetAssignToUser.push(temp);
    }
    let assignAssets = new AssetAssign(this.AssetAssignToUser,this.data);
    console.log(assignAssets);
     
    this.adminService.updateUser(assignAssets).subscribe(data=>{
      progressBarRef.close();
      //snackbar event
      this.close();
      });
  }
  public close()
  {
    this.dialogRef.close();
    console.log("close");
  }
  public changeFunction(data:string,no:number)
  {
    //console.log(data); 
    for(let i=0;i<this.Assets.length;i++)
    {
      if(data == this.Assets[i].assetName)
      {
        this.assetForType = this.Assets[i].assetTypes;
      }
    }
    this.dd[no]=this.assetForType;
    //console.log(this.dd);
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
 