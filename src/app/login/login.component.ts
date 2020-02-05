import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '.././_services';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    closeResult: string;
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(

        private modalService: NgbModal,

        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
        ) {
            // redirect to home if already logged in
            if (this.authenticationService.getToken()) {
                this.router.navigate(['/']);
            }
        }
        ngOnInit() {
            this.loginForm = this.formBuilder.group({
                username: ['', [ Validators.required, Validators.email]],
                password: ['', [ Validators.required, Validators.minLength(6)]]
            });
            
            // get return url from route parameters or default to '/'
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        }
        googleSignin(){
            window.location.href="https://ksiteandappapi.ml/auth/google/"
            }
           
        
        // convenience getter for easy access to form fields
        get f() { return this.loginForm.controls; }
        
        onSubmit() {
            this.submitted = true;
            
            // reset alerts on submit
            this.alertService.clear();
            
            // stop here if form is invalid
            if (this.loginForm.invalid) {
                return;
            }
            
            this.loading = true;
            this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    if(error.status == '400')
                    this.alertService.error('Wrong credentials');
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000);
                    if(error.status=='401')
                    this.alertService.error('Username not found');
                    setTimeout(() => {
                        this.alertService.clear();
                    }, 5000);
                    this.loading = false;
                });
            }
            
            open(content) {
                this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
            }
            
            private getDismissReason(reason: any): string {
                if (reason === ModalDismissReasons.ESC) {
                    return 'by pressing ESC';
                } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                    return 'by clicking on a backdrop';
                } else {
                    return  `with: ${reason}`;
                }
            }
        
    }