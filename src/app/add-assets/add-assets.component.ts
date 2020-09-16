import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AssetsKeys, AssetInfo } from '../model/Assets';

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
  constructor(private adminService:AdminService,
              private dialogRef : MatDialogRef<AddAssetsComponent>,
              private dialog :MatDialog) { }

  //public assetTypes=["Moniter","CPU"];
  public assetKeyAndTypedropdown : AssetsKeys[];
  public keys:string[]=[];
  ngOnInit(): void {
    this.start();
   // this.assetTypes.push("New");
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
    let progressBarRef = this.progressBar();
    let addAsset = new AssetInfo(0,tempKey,this.assetInfo,0,this.assetNumber,this.assetNumber,tempType,this.isAssetTypeNew);
    this.adminService.addNewAssets(addAsset).subscribe(data=>{
      console.log(addAsset);
      console.log(data);
      this.start();
      //this.assetType="";
      //this.newAssetType ="";
      //this.assetKey="";
      this.isAssetTypeNew = false;
     progressBarRef.close();
    });
    
    
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
