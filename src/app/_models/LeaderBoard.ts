

export class LeaderBoard {
    id : number;
    kid: number;
    gameid: number;
    score: number;
    User: {
        name: String;}
        

    constructor(
        id : number,
        kid: number,
        gameid: number,
        score: number,
        User: {
            name: String;}
            ){
                this.id = id;
                this.kid = kid;
                this.gameid = gameid;
                this.score = score;
                this.User = User; 
            }
        }