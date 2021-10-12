import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';


import { Offer } from 'src/app/shared/models/offerModel';
import { Product } from 'src/app/shared/models/productModel';
import { ProductPdf } from 'src/app/shared/models/productPdfModel';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { OfferService } from 'src/app/shared/services/offer.service';
import { PdfConvertService } from 'src/app/shared/services/pdf-convert.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-offer-convert',
  templateUrl: './offer-convert.component.html',
  styleUrls: ['./offer-convert.component.css'],
})
export class OfferConvertComponent implements OnInit {
  productsArray!: FormArray;
  offer!: Offer;
  id!: Number;

  productsToJson!: ProductPdf[]

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
    // param an offer id from url
    this.id = this.router.snapshot.params.id;
    this.productsArray = this._fb.array([]);

    // get an offer from server
    this.getOffer(this.id);
  }

  getOffer(id: Number) {
    this._offerService.getOneOffer(id).subscribe((off) => {
      this.offer = off;
      this.offer.products.forEach((p) => {
        this.productsArray.push(
          this._fb.group({
            name: [p.name],
            quantity: [p.quantity],
            priceEach: [p.priceEach],
            priceTotal: [p.priceTotal],
            descriptionP: [p.description],
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
          this.productsArray.controls[i].get('quantity')?.setValue(this.offer.products[i].quantity)
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

  addHtmlCode(): Object {
    var selectedProductsArray: any[] = [];
    this.productsArray.controls.forEach((e) => {
      if (e.get('name')?.value != null) {
        const product = {
          "name": `${e.get("name")?.value}`,
          "quantity": `${e.get("quantity")?.value}`,
          "priceEach": `${e.get("priceEach")?.value}`,
          "priceTotal": `${e.get("priceTotal")?.value}`,
          "description": `${e.get("description")?.value}`,
          "offerId": this.id
        };
        selectedProductsArray.push(product)
      };
    });
    const postProductsToPdfConvert = Object.assign(selectedProductsArray, this.productsToJson);
    console.log(postProductsToPdfConvert)
    this.postProducts(this.id, postProductsToPdfConvert);
    

    return postProductsToPdfConvert
  };

  postProducts(id: Number, p: ProductPdf[]) {
    this._pdfConvertService.addProductsToPdfConvert(id, p).subscribe((res) => {
      this.getPdf(id);
    });
    
  };

  getPdf(id: Number) {
    this._pdfConvertService.getPdf(id).subscribe((res) => {
      let blob: any = new Blob([res], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
