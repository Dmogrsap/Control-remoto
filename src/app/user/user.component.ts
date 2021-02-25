import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { tokeninfo } from './user'
import { UserService } from './user.service'

@Component({
    selector: "app-login",
    templateUrl: './user.component.html',
    providers: [UserService]
})

export class userComponent implements OnInit {
    user!: SocialUser;
    idTok: tokeninfo;
    loggedIn: boolean;
    mamas: boolean;
    use: any;

    constructor(private authService: SocialAuthService,
                private userService: UserService,
                private router: Router) { 
        this.loggedIn = false;
        this.mamas = false;
        this.idTok = {idtoken: ""};
    }

    ngOnInit() {
      this.authService.authState.subscribe(async (user) => {
        this.user = user;
        this.loggedIn = (user != null);

        if(this.mamas) {
            this.use = await this.login(user.idToken)
        } else {
            this.use = await this.sigin(user.idToken)
        }

        localStorage.setItem("user_remo", this.use["id"]);

        this.redirect()
      });
    }

    signInWithGoogle() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.mamas = false;
    }

    loginWithGoogle() {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.mamas = true;
    }

    signOut(): void {
      this.authService.signOut();
    }

    redirect() {
        this.router.navigate(['profile'])
    }

    login(token: string) {
        const newUse : tokeninfo = { idtoken: token } as tokeninfo;
        return this.userService.addUser(newUse);
    }

    sigin(token: string) {
        const newUse : tokeninfo = { idtoken: token } as tokeninfo;
        return this.userService.verUser(newUse);
    }
}
