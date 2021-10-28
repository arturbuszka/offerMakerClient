import { Component, OnInit } from '@angular/core';

import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Form,
  Validators,
} from '@angular/forms';

import { OfferService } from 'src/app/shared/services/api/offer.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { Offer } from 'src/app/shared/models/offerModel';
import { CommonFunctionsService } from 'src/app/shared/services/common-functions.service';
import { ProductService } from 'src/app/shared/services/api/product.service';
import { Product } from 'src/app/shared/models/productModel';
import { ClientService } from 'src/app/shared/services/api/client.service';
import { Client } from 'src/app/shared/models/clientModel';
import { ProductMenuService } from 'src/app/shared/services/api/product-menu.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css'],
})
export class OfferEditComponent implements OnInit {
  form!: FormGroup;
  offer!: Offer;
  clients!: Client[];
  productsDropDown!: Product[];
  id!: Number;

  constructor(
    private _fb: FormBuilder,
    private _offerService: OfferService,
    private _clientService: ClientService,
    public _commonFuncService: CommonFunctionsService,
    private _productMenuService: ProductMenuService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    // initialize reactive form group
    this.form = this._commonFuncService.createOfferFormGroup(this._fb);
    // param an offer id from url
    this.id = this.router.snapshot.params.id;
    // get clients on init, for select options
    this.getClients();
    // get an offer from server
    this.getOffer(this.id, this._fb);
    // get products from server to select options
    this.getProducts();
    // check products array length and price 
    this._commonFuncService.checkProductsAndPrice(this.form);
  }

  // get offer method
  // id is taken from url
  getOffer(id: Number, fb: FormBuilder) {
    this._offerService.getOffer(id).subscribe((off) => {
      // parsed date to put into formControl
      const parsedDate = this._commonFuncService.parseDateFromServer(off.dateOfWork);

      // fill FormGroup with offer details from server
      this.form = fb.group({
        id: [off.id],
        clientId: [off.clientId, [Validators.required]],
        city: [off.city, [Validators.required]],
        street: [off.street, [Validators.required]],
        postalCode: [off.postalCode, [Validators.required, Validators.pattern("\\d{2}-\\d{3}")]],
        dateOfWork: [
          {
            year: Number(parsedDate.year),
            month: Number(parsedDate.month),
            day: Number(parsedDate.day),
          },
          [Validators.required]
        ],
        description: [off.description],
        productsCount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        productsPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        products: fb.array([]),
      });
      // push products from server to FormArray
      this.pushProductsToList(off.products, fb, this.products);
      this._commonFuncService.checkProductsAndPrice(this.form);
    });
  };

  // get a products FormArray
  get products() {
    return this.form.get('products') as FormArray;
  };
  get f() {
    return this.form.controls;
  };
  // get datepicker form control
  get dateOfWork() {
    return this.form.get('dateOfWork') as FormControl;
  };

  // method for pushing offer products list from server into FormArray
  // iterate through all elements and push every one into new FormGroup
  // array = products from api
  pushProductsToList(array: any[], fb: FormBuilder, formArray: FormArray) {
    array.forEach((element) => {
      formArray.push(
        fb.group({
          name: [element.name],
          quantity: [element.quantity],
          priceEach: [element.priceEach],
          priceTotal: [element.priceTotal],
          description: [element.description],
        })
      );
    });
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


  onSubmit() {
    this.dateOfWork.setValue(
      this._commonFuncService.parseDateToServer(this.dateOfWork)
    );
    const convertedToPostForm = Object.assign(this.form.value, this.offer);
    console.log(convertedToPostForm)
    this.putOffer(convertedToPostForm);
  };

  putOffer(offer: Offer) {
    this._offerService.putOffer(offer).subscribe((res) => {});
  };

  // get products for select options
  getProducts() {
    this._productMenuService.getProducts().subscribe((res) => {
      this.productsDropDown = res;
    });
  };

  getClients() {
    this._clientService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }
}
