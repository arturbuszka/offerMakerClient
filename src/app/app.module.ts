import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';




import { OfferComponent } from './offer/offer.component';
import { OfferCreateComponent } from './offer/offer-create/offer-create.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { ClientComponent } from './offer/client/client.component';
import { OfferConvertComponent } from './offer/offer-convert/offer-convert.component';
import { GlobalInterceptor } from './shared/interceptors/global.interceptor';
import { AuthInterceptor } from './shared/identity/auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ForgotChangeComponent } from './auth/forgot-change/forgot-change.component';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferCreateComponent,
    OfferEditComponent,
    ClientComponent,
    OfferConvertComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    ForgotChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
