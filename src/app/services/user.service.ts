import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { UserDetail } from '../model/User';
import { UserAssignAssset } from '../model/Assets';
@Injectable({
  providedIn: 'root' 
})
export class UserService {


  private URL : string = "ec2-54-89-58-29.compute-1.amazonaws.com:8080";
  constructor(private http :HttpClient) {}

  public getUserDetail():Observable<UserDetail>
  {
    return this.http.get<UserDetail>(`${this.URL}/api/getuser`);
  }

  public getUserAssignAssets():Observable<UserAssignAssset>
  {
    return this.http.get<UserAssignAssset>(`${this.URL}/api/getAssignAssets`);
  }

  public leaveAssets(userAssets:UserAssignAssset[]):Observable<number>
  {
    return this.http.post<number>(this.URL+"/api/leaveAssets",userAssets);
  }
}
