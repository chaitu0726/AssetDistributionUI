import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { UserShortDetails, UserDetail } from '../model/User';
import {Constants} from '../constant/ConstantData'
import { AssetInfo, AssetAssign, RecommandedAssets, AssetsDropDown,RecommandedAsset, UserAssignAssset, AssetsKeys } from '../model/Assets';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
  
  private URL : string = Constants.API_ENDPOINT;
  constructor(private http :HttpClient) {}

  public getShortUsersDetails():Observable<UserShortDetails[]>
  {
    let role = sessionStorage.getItem("role").toString();
    return this.http.get<UserShortDetails[]>(this.URL+"/api/getnames?role="+role);
  }

  public getUserDetail(id:number):Observable<UserDetail>
  {
    return this.http.get<UserDetail>(this.URL+"/api/getuserbyid?userId="+id);
  }
  
  public getAssetsDetails():Observable<AssetInfo[]>
  {
    return this.http.get<AssetInfo[]>(`${this.URL}/api/getAssetsDetails`);
  }

  public updateUser(assetAssign: AssetAssign):Observable<number>
  {
    return this.http.post<number>(this.URL+"/api/assetsAssign",assetAssign);
  }

  public getRecommandedAssets(deprtment:string):Observable<UserAssignAssset[]>
  {
    return this.http.get<UserAssignAssset[]>(this.URL+"/api/getassets?department="+deprtment);
  }

  public getAssetsDropDown():Observable<AssetsDropDown[]>
  {
    return this.http.get<AssetsDropDown[]>(`${this.URL}/api/getAssetsDropDown`);
  }
//==============================================================================
  public getAssetsKeyAndTypes():Observable<AssetsKeys[]>
  {
    return this.http.get<AssetsKeys[]>(`${this.URL}/api/getAssetsTypesDropDown`);
  }

  public addNewAssets(asset: AssetInfo):Observable<boolean>
  {
    //console.log(asset);
    return this.http.post<boolean>(this.URL+"/api/addNewAsset",asset);
  }

  public editRecommondedAssets(assets:RecommandedAsset):Observable<number>
  {
    return this.http.post<number>(this.URL+"/api/setRecommendedAssets",assets);
  }

  public getUserRolesDropDown():Observable<string[]>
  {
    return this.http.get<string[]>(`${this.URL}/api/getRoleDropdown`);
  }

  public updateAssetCount(key:string,count:number):Observable<boolean>
  {
    return this.http.get<boolean>(this.URL+"/api/updateAssetCount?key="+key+"&count="+count);
  }
} 
