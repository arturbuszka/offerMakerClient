import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferComponent } from './offer/offer.component';
import { OfferCreateComponent } from './offer/offer-create/offer-create.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { OfferConvertComponent } from './offer/offer-convert/offer-convert.component';
import { ClientComponent } from './offer/client/client.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService as AuthGuard } from './shared/identity/auth-guard.service';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ForgotChangeComponent } from './auth/forgot-change/forgot-change.component';


const routes: Routes = [
  { path: 'offer', component: OfferComponent, canActivate: [AuthGuard] },
  { path: 'offer/new', component: OfferCreateComponent, canActivate: [AuthGuard] },
  { path: 'offer/edit/:id', component: OfferEditComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'offer/convert/:id', component: OfferConvertComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/signup', component: SignupComponent },
  { path: 'account/forgot', component: ForgotComponent },
  { path: 'account/forgot/new/:guid/:id', component: ForgotChangeComponent },
  { path: 'home', component: AppComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
