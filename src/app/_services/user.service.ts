import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    leaderBoard(gameid){
        return this.http.post<any>(`${environment.apiUrl}/kgames/leaderBoard`, { gameid })
        .pipe(map(res => {
            return res;
        }));
    }

    questionId(gameid){
        return this.http.post<any>(`${environment.apiUrl}/kgames/signin`, { gameid })
        .pipe(map(res => {
            return res;
        }));
    }
    getClue(gameid, qid){
        return this.http.post<any>(`${environment.apiUrl}/kgames/getClue`, { gameid, qid})
        .pipe(map(res => {
            console.log(res);
            return res;
        }));
    }
    getQuestion(gameid,qid){
        return this.http.post<any>(`${environment.apiUrl}/kgames/getQuestion`, { gameid, qid})
        .pipe(map(res => {
            return res;
        }));
     
    }
    checkAnswer(gameid,qid,ans){
        return this.http.post<any>(`${environment.apiUrl}/kgames/checkAnswer`, { gameid, qid,ans})
        .pipe(map(res => {
            return res;
        }));
    
    }
}