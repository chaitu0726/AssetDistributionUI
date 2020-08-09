import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Login } from '../model/Login';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private URL : string = "http://localhost:8080";
  constructor(private http :HttpClient) {}
              

  public login (login:Login) :Observable<Login> {
    //sessionStorage.setItem("frontendUrl",this.URL);
    return this.http.post<Login>(this.URL + "/api/login",login);
  }

  public logout():Observable<boolean>{
    return this.http.get<boolean>(`${this.URL}/api/logout`);
  }


}
