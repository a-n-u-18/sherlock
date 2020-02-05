import { Component, OnInit } from '@angular/core';
import { LeaderBoard } from '.././_models';
import { UserService, AlertService } from '.././_services';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    leaderboardList: Array<LeaderBoard>=[];    
    col = ["K_Id","Username", "Score"];
    index = ["kid","User.name", "score"];
    loading = true;
    constructor(
        private userService: UserService,
        private alertService: AlertService
        ){}
        
        ngOnInit() {
            this.loadAllUsers();
        }
        
        loadAllUsers(){
            this.userService.leaderBoard(27)
            .subscribe(users => {
                users.LeaderBoard.forEach(element => {
                    var data=new LeaderBoard(element.id,element.kid,element.gameid,element.score,element.User);
                    this.leaderboardList.push(data)  ; 
                    this.loading = false;
                });
            },error=>{
                if(error.status == '400')
                this.alertService.error('Check your internet connection and try again');
                setTimeout(() => {
                    this.alertService.clear();
                }, 5000);
            });
        }
    }