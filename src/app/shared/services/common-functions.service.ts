import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionsService {
  constructor() {}


  // get products array 
  ProductFormArray(fg: FormGroup) {
    return fg.get("products") as FormArray;
  }

  // method for checking an array size for products
  // set productsLength form control
  checkProductsLength(form: FormGroup) {
    const productsArray = this.ProductFormArray(form);
    form.get('productsCount')?.setValue(productsArray.length);
  };

  // method for checking products price
  // iterate through products controls
  // get all needed controls values
  // set productsPrice control value
  checkProductsPrice(form: FormGroup) {
    const productsArray = this.ProductFormArray(form)
    let sumAll = 0;
    productsArray.controls.forEach((g) => {
      const pEa = g.get('priceEach')?.value;
      const qty = g.get('quantity')?.value;
      const pTotal = g.get('priceTotal')?.setValue(pEa * qty);
      const pTotalValue = g.get('priceTotal')?.value;
      sumAll = sumAll + pTotalValue;
    });
    form.get('productsPrice')?.setValue(sumAll);
  };

  // combine checking products length and price
  checkProductsAndPrice(form: FormGroup) {
    this.checkProductsLength(form);
    this.checkProductsPrice(form);
  };

  // parse date from object to string (YYYY-MM-DD)
  // get object values
  // if day or month < 10 add 0 before digit
  // e.x. date in object: 2021-5-5
  // return 2021-05-05
  parseDateToServer(date: FormControl) {
    let dateString;
    const dateObject = Object.values(date.value);

    if (Number(dateObject[1]) && Number(dateObject[2]) < 10) {
      dateString = `${dateObject[0]}-0${dateObject[1]}-0${dateObject[2]}`;
    } else if (Number(dateObject[1]) < 10) {
      dateString = `${dateObject[0]}-0${dateObject[1]}-${dateObject[2]}`;
    } else if (Number(dateObject[2]) < 10) {
      dateString = `${dateObject[0]}-${dateObject[1]}-0${dateObject[2]}`;
    }

    return dateString;
  };

  // method to parse date from server
  // first, format from "2020-10-12T00:00:00" to "2020-10-12"
  // split it to array, without "-" char
  // put it into object, to fit a ngbDatepicker format
  // parse if digits are less than 10, remove 0, 05 => 5
  // return object
  parseDateFromServer(date: any) {
    const formatedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const arrayDate = formatedDate.split('-');
    const d = {
      year: arrayDate[0],
      month: arrayDate[1],
      day: arrayDate[2],
    };

    if (Number(d.month) < 10) {
      d.month = d.month.slice(1);
    };
    if (Number(d.day) < 10) {
      d.day = d.day.slice(1);
    };

    return d;
  };

  // add product to products list
  // pushing new form group
  addProduct(form: FormGroup, fb: FormBuilder) {
    const productsArray = this.ProductFormArray(form);
    productsArray.push(this.createProductFormGroup(fb));
  };

  // delete product from products list
  // given parameter is an index
  removeProduct(productsArray: FormArray, i: number) {
    productsArray.removeAt(i);
  };


  // return product formgroup
  createProductFormGroup(fb: FormBuilder) {
    return fb.group({
      name: [''],
      quantity: [''],
      priceEach: [''],
      priceTotal: [''],
      description: [''],
    });
  }

  // return offer formgroup
  createOfferFormGroup(fb: FormBuilder) {
    return fb.group({
      clientId: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern("\\d{2}-\\d{3}")]],
      dateOfWork: ['', [Validators.required]],
      description: [''],
      productsCount: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      productsPrice: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      products: fb.array([]),
    });
  };
}
