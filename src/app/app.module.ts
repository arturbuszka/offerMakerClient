import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';




import { OfferComponent } from './offer/offer.component';
import { OfferCreateComponent } from './offer/offer-create/offer-create.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { ClientComponent } from './offer/client/client.component';
import { OfferConvertComponent } from './offer/offer-convert/offer-convert.component';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    OfferCreateComponent,
    OfferEditComponent,
    ClientComponent,
    OfferConvertComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
