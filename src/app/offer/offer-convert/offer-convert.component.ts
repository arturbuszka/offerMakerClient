import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';

import { Offer } from 'src/app/shared/models/offerModel';
import { OfferPdf } from 'src/app/shared/models/dtos/offerPdfModel';
import { ProductPdf } from 'src/app/shared/models/dtos/productPdfModel';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { OfferService } from 'src/app/shared/services/api/offer.service';
import { PdfConvertService } from 'src/app/shared/services/api/pdf-convert.service';

@Component({
  selector: 'app-offer-convert',
  templateUrl: './offer-convert.component.html',
  styleUrls: ['./offer-convert.component.css'],
})
export class OfferConvertComponent implements OnInit {
  productsArray!: FormArray;
  offer!: Offer;

  id!: number;
  disabled: boolean = true;


  isChckP: boolean = false;
  isChckQuantity: boolean = false;
  isChckPriceEach: boolean = false;
  isChckPriceTotal: boolean = false;
  isChckDescriptionP: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _offerService: OfferService,
    private _pdfConvertService: PdfConvertService,
    public _commonFuncService: CommonFunctionsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    
    this.productsArray = this._fb.array([]);

    this.getOffer(this.id);
  }

  onCheckBoxChange(e: any, i: number) {
    const target = e.target;
    if (target.checked) {
      switch (target.id) {
        case `product${i}`:
          this.productsArray.controls[i].get('isCheckedP')?.setValue(true);
          this.productsArray.controls[i].get('name')?.reset();

          break;

        case `quantity${i}`:
          this.productsArray.controls[i].get('isChckQuantity')?.setValue(true);
          this.productsArray.controls[i].get('quantity')?.setValue('')

          break;

        case `priceEach${i}`:
          this.productsArray.controls[i].get('isChckPriceEach')?.setValue(true);
          this.productsArray.controls[i].get('priceEach')?.setValue('')
          break;

        case `priceTotal${i}`:
          this.productsArray.controls[i].get('isChckPriceTotal')?.setValue(true);
          this.productsArray.controls[i].get('priceTotal')?.setValue('')
          break;

        case `descriptionP${i}`:
          this.productsArray.controls[i].get('isChckDescriptionP')?.setValue(true);
          this.productsArray.controls[i].get('descriptionP')?.setValue('')
          break;
      }
    }

    if (target.checked == false) {
      switch (target.id) {
        case `product${i}`:
          this.productsArray.controls[i].get('isCheckedP')?.setValue(false);
          this.productsArray.controls[i].patchValue(this.offer.products[i])
          break;

        case `quantity${i}`:
          this.productsArray.controls[i].get('isChckQuantity')?.setValue(false);
          this.productsArray.controls[i].get('quantity')?.setValue(this.offer.products[i].quantity);
          break;

        case `priceEach${i}`:
          this.productsArray.controls[i].get('isChckPriceEach')?.setValue(false);
          this.productsArray.controls[i].get('priceEach')?.setValue(this.offer.products[i].priceEach)
          break;

        case `priceTotal${i}`:
          this.productsArray.controls[i].get('isChckPriceTotal')?.setValue(false);
          this.productsArray.controls[i].get('priceTotal')?.setValue(this.offer.products[i].priceTotal)
          break;

        case `descriptionP${i}`:
          this.productsArray.controls[i].get('isChckDescriptionP')?.setValue(false);
          this.productsArray.controls[i].get('description')?.setValue(this.offer.products[i].description)
          break;
      }
    }
  }

  postOfferToPdf(): Object {
    var selectedProductsArray: ProductPdf[] = [];
    var offerToPost: OfferPdf = {
      id: this.offer.id,
      clientId: this.offer.clientId,
      client: this.offer.client,
      city: this.offer.city,
      street: this.offer.street,
      postalCode: this.offer.postalCode,
      dateOfWork: this.offer.dateOfWork,
      description: this.offer.description,
      productsCount: this.offer.productsCount,
      productsPrice: this.offer.productsPrice,
      products: [],
    }

    this.productsArray.controls.forEach((e) => {
      if (e.get('name')?.value != null) {
        const product = { 
          "Id": 1,
          "name": `${e.get("name")?.value}`,
          "quantity": `${e.get("quantity")?.value}`,
          "priceEach": `${e.get("priceEach")?.value}`,
          "priceTotal": `${e.get("priceTotal")?.value}`,
          "description": `${e.get("description")?.value}`,
          "offerId": this.id
        };
        selectedProductsArray.push(product);
      };
    });

    selectedProductsArray.forEach(element => {
      offerToPost.products.push(element)
      });

    console.log(offerToPost);


    this.postProducts(this.id, offerToPost);
    

    return offerToPost
  };

  getOffer(id: Number) {
    this._offerService.getOffer(id).subscribe((off) => {
      this.offer = off;
      this.offer.products.forEach((p) => {
        this.productsArray.push(
          this._fb.group({
            id: [p.Id],
            name: [p.name],
            quantity: [p.quantity],
            priceEach: [p.priceEach],
            priceTotal: [p.priceTotal],
            description: [p.description],
            isCheckedP: [this.isChckP],
            isChckQuantity: [this.isChckQuantity],
            isChckPriceEach: [this.isChckPriceEach],
            isChckPriceTotal: [this.isChckPriceTotal],
            isChckDescriptionP: [this.isChckDescriptionP],
          })
        );
      });
    });
  }

  postProducts(id: number, off: OfferPdf) {
    this._pdfConvertService.generatePdf(off).subscribe((res) => {
      this.getPdf(id);
    });
    
  };

  getPdf(id: number) {
    this._pdfConvertService.getPdf(id).subscribe((res) => {
      let blob: any = new Blob([res], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
