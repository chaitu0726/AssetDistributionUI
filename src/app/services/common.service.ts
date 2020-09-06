import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Login } from '../model/Login';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private URL : string = "http://ec2-54-209-216-148.compute-1.amazonaws.com:8080";
  constructor(private http :HttpClient) {}
              

  public login (login:Login) :Observable<Login> {
    //sessionStorage.setItem("frontendUrl",this.URL);
    return this.http.post<Login>(this.URL + "/api/login",login);
  }

  public logout():Observable<boolean>{
    return this.http.get<boolean>(`${this.URL}/api/logout`);
  }


}
