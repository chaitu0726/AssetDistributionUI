import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { UserShortDetails, UserDetail } from '../model/User';
import { AssetInfo, AssetAssign, RecommandedAssets, AssetsDropDown, UserAssignAssset } from '../model/Assets';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  private URL : string = "ec2-54-89-58-29.compute-1.amazonaws.com:8080";
  constructor(private http :HttpClient) {}

  public getShortUsersDetails():Observable<UserShortDetails[]>
  {
    return this.http.get<UserShortDetails[]>(`${this.URL}/api/getnames`);
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
} 
