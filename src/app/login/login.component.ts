import { Component, OnInit } from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {CommonService} from'../services/common.service';
import { Login } from '../model/Login';
import { ActivatedRoute , Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName : string='';
  public userPassword : string='';
  public isInvalidUser:boolean =false;
  
  constructor(private dialog :MatDialog,
              private commonService: CommonService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
  }

  public login()
  {
    let progressRef = this.progressBar();
    let loginDetails = new Login(this.userName,this.userPassword,'');
    this.commonService.login(loginDetails).subscribe(data=>{
		console.log(data);
        if(data.role == "admin")
        {
          this.isInvalidUser = false;
          progressRef.close();
          this.router.navigate(['/admin']);
        }
        else if(data.role == "user")
        {
          this.isInvalidUser = false;
          progressRef.close();
          this.router.navigate(['/user']);
        }
        else
        {
          this.isInvalidUser = true;
		      progressRef.close();
        }
    });

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
