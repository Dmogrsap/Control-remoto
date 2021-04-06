import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { profileComponent } from './profile/profile.component';
import { interceptorsProviders } from './interceptors';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http'

import { userComponent } from './user/user.component'
import { HttpErrorHandler } from './http-error-handler.service';
import { NodeService } from './node/node.service'
import { MessageService } from './message.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { TvComponent } from './tv/tv.component';
import { ScheDateComponent } from './sche-date/sche-date.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InicioComponent } from './inicio/inicio.component';
import { NewDeviceComponent } from './new-device/new-device.component';


@NgModule({
  declarations: [
    AppComponent,
    userComponent,
    profileComponent,
    MenuComponent,
    TvComponent,
    ScheDateComponent,
    FavoritesComponent,
    InicioComponent,
    NewDeviceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ScrollingModule,
    MatRippleModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule
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
    NodeService
    //httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
