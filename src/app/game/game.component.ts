import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Question } from '.././_models';
import { UserService, AlertService } from '.././_services';

import { Router } from '@angular/router';

import { NgbModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NgbCarouselConfig]
})



export class GameComponent implements OnInit{

    
    closeResult: string;

    loading = true;

    curr_question:number=0;
    height: string = '200px';
    question=new Question(27,"",[],[]);
    answer:string = "";
    public que : boolean;
    constructor(
        
        private modalService: NgbModal,
        config: NgbCarouselConfig,
        private userService: UserService,
        private alertService: AlertService,
        private router : Router
        ){
            this.getQuesionId();
            config.interval = Infinity;
        }
        getQuesionId(){
            this.userService.questionId(27).subscribe(res=>{
                this.curr_question =res.curr_question;
                this.que = true;
                if(this.curr_question==2709)
                {
                    this.alertService.success("Congratulations! You've cracked it! You'll be redirected to kurukshetraceg.org.in in a few seconds. Stay tuned!");
                    setTimeout(() => {
                        this.alertService.clear();
                        window.location.href="https://kurukshetraceg.org.in/";
                    }, 5000);
                    
                }
                else{
                    
                    this.userService.getQuestion(27,this.curr_question).subscribe(res=>{
                        this.question.Image=res.Image;
                        this.question.question=res.Question;
                        this.loading = false;
                        this.userService.getClue(27,this.curr_question).subscribe(res=>{
                            this.question.clues = res.clues;
                            },err=>{
                            this.alertService.error('Error in fetching clues');
                            setTimeout(() => {
                                this.alertService.clear();
                            }, 5000);
                        }) 
                    },err=>{
                        this.alertService.error('Error in fetching question');
                        setTimeout(() => {
                            this.alertService.clear();
                        }, 5000);
                    })
                }
            },err=>{
                this.que = false;
                this.alertService.error('Error in fetching question id');
                setTimeout(() => {
                    this.alertService.clear();
                }, 5000);
            })
        }
        
        checkAns(){
            this.modalService.dismissAll();
            
            this.answer = this.answer.replace(/ /g, '').toUpperCase().trim();
            if (!this.answer) { 
                this.alertService.error("Answer can't be empty");
                setTimeout(() => {
                    this.alertService.clear();
                }, 5000);
            }
            else{
                this.userService.checkAnswer(27,this.curr_question,this.answer).subscribe(res=>{
                    this.alertService.success('Correct answer! Fetching the next question....');
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000);
                    this.answer = '';
                    this.getQuesionId();
                },err=>{
                    if(err.status == '401')
                    this.alertService.error('Wrong answer! Try again');
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000);
                    if(err.status == '400')
                    this.alertService.error('Check your internet connection and try again');
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000);
                })
                
            }
        }
        openVerticallyCentered1(content1) {
            this.modalService.open(content1, { centered: true });
          }
          openVerticallyCentered2(content2) {
            this.modalService.open(content2, { centered: true });
          }
        ngOnInit() {}
        
    }
    