import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { profileComponent } from './profile/profile.component';
import { interceptorsProviders } from './interceptors'

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http'

import { userComponent } from './user/user.component'
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    userComponent,
    profileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider ('989733355663-lgp4hmr5kfojnq279ptdbknv8fo6v7j8.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    HttpErrorHandler,
    MessageService,
    interceptorsProviders,
    //httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
