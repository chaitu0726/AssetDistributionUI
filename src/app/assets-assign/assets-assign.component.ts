import { Component, OnInit, Inject } from '@angular/core';
import { AssetDetails } from './assetDetails';
import {MatDialog,MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { AssetsDropDown, UserAssignAssset,AssetsDistribute, AssetAssign, RecommandedAsset} from '../model/Assets';
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
    name: '',
    type:''
  }];

  public tempAssetAssign: any[] = [{ 
    id: 1,
    key: '',
    count: '',
    name: '',
    type:''
  }];

  public sampleAssetAssign: any[] = [{ 
    id: 1,
    key: '',
    count: '',
    name: '',
    type:''
  }];

 constructor(private dialog :MatDialog,
    private dialogRef : MatDialogRef<AssetsAssignComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number,
    private adminService:AdminService
    ) {}
    
   //constructor(){}
  public isEditMode:boolean=false;
  public mode:string="";
  public assetTypes:string[]=[];
  public assetForType:UserAssignAssset[]=[];
  public Assets:AssetsDropDown[];
  public i:number=1;
  public dd:any[]=[];
  public AssetAssignToUser:UserAssignAssset[]=[];
  public userId:number;
  public departmentListDopdown:string[]=[];
  public selectedDepartment:string="";
  public buttonName:string="";
  ngOnInit() {
    this.mode = sessionStorage.getItem("manual-mode").toString();
    this.userId= this.data;
    if(this.mode == "Assign"){
      this.isEditMode = false;
      this.buttonName = "Assign";
    }else{
      this.buttonName = "Update";
      this.isEditMode = true;
      this.getDepartmentListDropdown();
    }
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
      name: '',
      type:''
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
        let temp = new UserAssignAssset(this.assetAssign[i].key,this.assetAssign[i].name,this.assetAssign[i].count,this.assetAssign[i].type);
        this.AssetAssignToUser.push(temp);
    }
    if(this.mode == 'Assign'){
    let assignAssets = new AssetAssign(this.AssetAssignToUser,this.data);
    console.log(assignAssets);
     
    this.adminService.updateUser(assignAssets).subscribe(data=>{
      progressBarRef.close();
      //snackbar event
      //this.close();
      });
    }
    else{
      let editAssetsForRole = new RecommandedAsset(this.selectedDepartment,this.AssetAssignToUser);
      console.log(editAssetsForRole)
      this.adminService.editRecommondedAssets(editAssetsForRole).subscribe(data=>{
      console.log(data);
      progressBarRef.close();
      });
      
    }
  }
  public close()
  {
    this.dialogRef.close();
    console.log("close");
  }
  public changeFunction(data:string,no:number)
  {
    //console.log(data); 
    let temp = new UserAssignAssset("",'Select',0,'');
    for(let i=0;i<this.Assets.length;i++)
    {
      if(data == this.Assets[i].assetName)
      {
        this.assetForType = this.Assets[i].assetTypes;
      }
    }
   // if(this.assetForType[0].assetName != 'Select'){
      //  if(this.mode == 'Assign'){ 
        //    this.assetForType.unshift(temp);
          //}
   // }
    this.dd[no]=this.assetForType;
   // this.dd[no]
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

 public getDepartmentListDropdown()
 {
    this.adminService.getUserRolesDropDown().subscribe(data=>{
        this.departmentListDopdown = data;
    });
 }
 
 public changeFunctionForRole(role:string)
 {
    let progressBarRef = this.progressBar();
    this.tempAssetAssign.splice(0,this.tempAssetAssign.length-1);// = this.sampleAssetAssign;
    this.assetAssign.splice(0,this.assetAssign.length-1)
    this.adminService.getRecommandedAssets(role).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.tempAssetAssign.push({
          id: i+1,
          key: data[i].assetKey,
          count: data[i].assetCount,
          name: data[i].assetName,
          type:data[i].assetType
        });
      }
      //this.tempAssetAssign.splice(0,1)
      this.assetAssign = this.tempAssetAssign;
      this.assetAssign.splice(0,1);
      console.log(this.assetAssign);
      progressBarRef.close();
    });
 }
}
 