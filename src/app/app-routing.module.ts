import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfferComponent } from './offer/offer.component';
import { OfferCreateComponent } from './offer/offer-create/offer-create.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { OfferConvertComponent } from './offer/offer-convert/offer-convert.component';
import { ClientComponent } from './offer/client/client.component';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'offer', component: OfferComponent },
  { path: 'offer/new', component: OfferCreateComponent },
  { path: 'offer/edit/:id', component: OfferEditComponent },
  { path: 'client', component: ClientComponent },
  { path: 'offer/convert/:id', component: OfferConvertComponent },
  { path: 'account/login', component: AuthComponent },
  { path: 'home', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
