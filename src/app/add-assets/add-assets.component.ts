import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AssetsKeys, AssetInfo, AssetsDropDown, UserAssignAssset } from '../model/Assets';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent implements OnInit {

  public assetInfo:string="";
  public assetType:string="";
  public assetKey:string="";
  public isAssetTypeNew:boolean=false;
  public assetNumber:number;
  public newAssetType:string="";
  public isBelow=false;
  public isDuplicateKey:boolean=false;
  public isDuplicateType:boolean=false;
  public isAlreadyPresent:boolean=false;
  public assetTypes:string[]=[];
  public assetForTypes:UserAssignAssset[]=[];
  public assetForType:string[]=[];
  public Assets:AssetsDropDown[];
  public assetSelectedType:string="";
  public keysPreSelected:string[]=[];
  constructor(private adminService:AdminService,
              private dialogRef : MatDialogRef<AddAssetsComponent>,
              private dialog :MatDialog) { }

  //public assetTypes=["Moniter","CPU"];
  public assetKeyAndTypedropdown : AssetsKeys[];
  public keys:string[]=[];
  ngOnInit(): void { 
    this.start();
   // this.assetTypes.push("New");
   this.getDropDown();
  }

  getDropDown()
  {
    let progressBarRef = this.progressBar();
    //this.assetTypes = []; 
    this.adminService.getAssetsDropDown().subscribe(data=>{
        this.Assets = data;
      for(let i=0;i<this.Assets.length;i++)
      {
        this.assetTypes.push(this.Assets[i].assetName);
      }
      this.assetTypes.push('New');
      progressBarRef.close();
    });
  }

  public changeFunctionForDropDown(data:string)
  {
    if(data.toLowerCase() == "new")
    {
      this.isAssetTypeNew  = true;
      this.isBelow = false;
    }
    else{
      this.isAssetTypeNew = false;
      this.isBelow = true;
    }
    this.assetForType =[];
    this.keysPreSelected=[];
    //this.assetTypes.push('Select');
    //console.log(data); 
    //let temp = new UserAssignAssset("",'Select',0,'');
    for(let i=0;i<this.Assets.length;i++)
    {
      if(data == this.Assets[i].assetName)
      {
          this.assetForTypes = this.Assets[i].assetTypes;
        for(let j =0;j<this.Assets[i].assetTypes.length;j++){
        //this.assetForType = this.Assets[i].assetTypes;
          this.assetForType.push(this.Assets[i].assetTypes[j].assetName);
          //this.keysPreSelected.push(this.Assets[i].assetTypes[j].assetKey);
        }
      }
      //this.assetForType[0].name;
    }
  }
  public start()
  {
    let progressBarRef = this.progressBar();
    this.adminService.getAssetsKeyAndTypes().subscribe(data=> {
      this.assetKeyAndTypedropdown = data;
      let tempData = new AssetsKeys(0,"New","");
      this.assetKeyAndTypedropdown.push(tempData);
      for(let  i =0;i<this.assetKeyAndTypedropdown.length;i++)
      {
        this.keys.push(this.assetKeyAndTypedropdown[i].assetKey);
      }
      progressBarRef.close();
    });
  }
  public close()
  {
    this.dialogRef.close();
    console.log("close");
  }

  public changeFunction(data:string)
  {
    if(data.toLowerCase() == "new")
    {
      this.isAssetTypeNew  = true;
      this.isBelow = false;
    }
    else{
      this.isAssetTypeNew = false;
      this.isBelow = true;
    }
    console.log(data);
  }

  public addAsset()
  {
    console.log("add");
    let tempType="";
    let tempKey=""; 
    if(this.isAssetTypeNew)
    {
        tempType = this.newAssetType;
        tempKey = this.assetKey;
    }
    else{
      tempType = this.assetType;
      for(let k =0;k<this.assetKeyAndTypedropdown.length;k++)
      {
        if(this.assetKeyAndTypedropdown[k].assetType == this.assetType)
        {
            tempKey  = this.assetKeyAndTypedropdown[k].assetKey;
            break;
        }
      }
    }
    if(this.isAlreadyPresent){
        this.assetInfo = this.assetSelectedType;
    }
    let progressBarRef = this.progressBar();
    if(this.isAlreadyPresent){
      //tempKey = '';
      for(let k=0;k<this.assetForTypes.length;k++){
        if(this.assetForTypes[k].assetName == this.assetSelectedType ){
          tempKey = this.assetForTypes[k].assetKey;
        }
      }
      console.log(tempKey+" "+this.assetNumber);

      this.adminService.updateAssetCount(tempKey,this.assetNumber).subscribe(data=>{
        console.log(data);
       progressBarRef.close();
      });
    }else{
    let addAsset = new AssetInfo(0,tempKey,this.assetInfo,0,this.assetNumber,this.assetNumber,tempType,this.isAssetTypeNew);
    console.log(addAsset);
    
    this.adminService.addNewAssets(addAsset).subscribe(data=>{
      console.log(addAsset);
      console.log(data);
      this.assetTypes =[];
      this.getDropDown();
      //this.assetType="";
      //this.newAssetType ="";
      //this.assetKey="";
      this.isAssetTypeNew = false;
     progressBarRef.close();
    });
    
   }
    
  }
 
 public isKeyDuplicate()
  {
      if(this.assetKey.length >=2)
      {
        this.isBelow = true;
        for(let j=0;j<this.keys.length;j++)
        {
            if(this.assetKey == this.keys[j])
            {
              this.isBelow = false;
              this.isDuplicateKey = true;
              break;
            }
        }
        if(this.isBelow)
        {
            this.isDuplicateKey = false;
        }
      }
      else{
        this.isBelow = false; 
        this.isDuplicateKey = false;
      }

      if(this.isDuplicateKey || this.isDuplicateType){
        this.isBelow = false;
      }
  }


  public isTypeDuplicate()
  {
      if(this.newAssetType.length >=3)
      {
        this.isBelow = true;
        for(let j=0;j<this.assetKeyAndTypedropdown.length;j++)
        {
            if(this.newAssetType.toLowerCase() == this.assetKeyAndTypedropdown[j].assetType.toLowerCase())
            {
              this.isBelow = false;
              this.isDuplicateType = true;
              break;
            }
        }
        if(this.isBelow)
        {
            this.isDuplicateType = false;
        }
      }
      else{
        this.isBelow = false;  
        this.isDuplicateType = false;
      }
      if(this.isDuplicateKey || this.isDuplicateType){
        this.isBelow = false;
      }
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
