import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { OfferService } from 'src/app/shared/services/offer.service';
import { Offer } from 'src/app/shared/models/offerModel';
import { Client } from 'src/app/shared/models/clientModel';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/productModel';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';





@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css'],
})
export class OfferCreateComponent implements OnInit {
  form!: FormGroup;
  offer!: Offer;
  clients!: Client[];
  productsDropDown!: Product[];


  constructor(
    private _fb: FormBuilder,
    private service: OfferService,
    private _clientService: ClientService,
    private _productService: ProductService,
    public _commonFuncService: CommonFunctionsService,

  ) {}

  ngOnInit() {
    // create reactive form on init
    this.form = this._commonFuncService.createOfferFormGroup(this._fb)
    // get clients on init, for select options
    this.getClients();
    // get products on init, for select options
    this.getProducts();
    // check size of nested form array for products
    this._commonFuncService.checkProductsAndPrice(this.form);
  };



  // nested form array for products list
  get products() {
    return this.form.get('products') as FormArray;
  };

  get f() {
    return this.form.controls;
  }

  // get datepicker form control
  get dateOfWork() {
    return this.form.get('dateOfWork') as FormControl;
  };

  // add product to products list
  // pushing new form builder group
  // check products length and products overall price
  addProduct() {
    this._commonFuncService.addProduct(this.form, this._fb);
    this._commonFuncService.checkProductsAndPrice(this.form);
  };

  // delete product from products list
  // given parameter is an index
  // check products length and products overall price
  removeProduct(i: number) {
    this._commonFuncService.removeProduct(this.products, i);
    this._commonFuncService.checkProductsAndPrice(this.form);
  };

  // submit form method
  // first, parse date to YYYY--MM-DD string format
  // assign form object to json accepted format
  // post offer using an offer service
  onSubmit() {
    this.dateOfWork.setValue(this._commonFuncService.parseDateToServer(this.dateOfWork));
    const convertedToPostForm = Object.assign(this.form.value, this.offer);
    this.postOffer(convertedToPostForm);
  };

  // post offer with subscribe and offer model
  postOffer(offer: Offer) {
    this.service.addOffer(offer).subscribe((res) => {});
  }

  // get clients for select options
  getClients() {
    this._clientService.getClients().subscribe((res) => {
      this.clients = res;
    });
  };

  // get products for select options
  getProducts() {
    this._productService.getProducts().subscribe((res) => {
      this.productsDropDown = res;
    });
  };
}
