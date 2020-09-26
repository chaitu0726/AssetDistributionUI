import { Component, OnInit, Inject } from '@angular/core';
import { AssetDetails } from './assetDetails';
import {MatDialog,MatDialogConfig,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { AssetsDropDown, UserAssignAssset,AssetsDistribute, AssetAssign, RecommandedAsset, AssetInfo} from '../model/Assets';
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
  public isValidCount:boolean[]=[];
  public countNumbers:number[]=[];
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
  public isCountSufficient:boolean=true;
  public assetInfo:AssetInfo[];
  public isAnyInvalid :boolean=false;
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
    this.getAssetInfo();
  }
  getAssetInfo()
  {
    let progressbarRef = this.progressBar();
    this.adminService.getAssetsDetails().subscribe(data=>{
      this.assetInfo = data;
      progressbarRef.close();
    });

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

    if(this.mode == 'Assign'){
      this.isValidCount.push(false);
      this.countNumbers.push(0);
    }
  }

  removeAddress(i: number) {
    this.assetAssign.splice(i, 1);
    this.dd.splice(i,1);
    if(this.mode =='Assign'){
      this.isValidCount.splice(i,1);
      this.countNumbers.splice(i,1);
    }
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
      this.close();
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
 public isSufficientCount(data:string,indx:number,key:string){
   if(this.mode == 'Assign'){
    let selectCount = Number(data);
    console.log(selectCount+" "+indx+" "+key);
    for(let i =0;i<this.assetInfo.length;i++){
      if(key == this.assetInfo[i].assetkey){
        if(selectCount > this.assetInfo[i].availableAssets){
          this.isValidCount[indx] = true;
          this.countNumbers[indx] = this.assetInfo[i].availableAssets;
        }
        else{
          this.isValidCount[indx] = false;
        }
      }
    }
    if(this.isValidCount.includes(true)){
      this.isAnyInvalid = true;
    }else{
      this.isAnyInvalid = false;
    }
   }
 } 

  
}
 