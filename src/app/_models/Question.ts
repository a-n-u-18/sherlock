export class Question {
    gameid: number;
    question: string;
    Image: Array<string>;
    clues: Array<string>;    

    constructor(
        gameid: number,question:string,Image :[],clues : []){
         this.gameid=gameid;
         this.Image=Image;
         this.question=question;
         this.clues = clues;
        }
    }