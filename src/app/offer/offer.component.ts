import { Component, OnInit } from '@angular/core';

import { OfferService } from '../shared/services/offer.service';
import { Offer } from '../shared/models/offerModel';
import { FormBuilder, FormControl } from '@angular/forms';
import { Items } from '../shared/models/itemsModel';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers!: Offer[];
  items!: Items;
  searchControl!: FormControl;
  pageSizeControl!: FormControl;
  sortDirectionControl!: FormControl;
  pageNumber: number = 1;
  totalItemsCount!: number;
  sortDirection: string = "ASC";

  constructor(public service: OfferService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchControl = this._fb.control('');
    this.pageSizeControl = this._fb.control(5);
    this.sortDirectionControl = this._fb.control("ASC");
    this.getOffers(this.pageSizeControl, this.pageNumber, this.sortDirectionControl.value);

  }

  getOffers(pageSize: FormControl, pageNumber: number, sD: string) {
    this.service.getOffer(pageSize.value, pageNumber, sD)
    .subscribe((res) => {
      this.offers = res.items
      this.totalItemsCount = res.totalItemsCount
    })
  }

  getFilteredOffers(searchPhrase: FormControl, pageSize: FormControl, pageNumber: number, sD: string) {
    this.service.getFilteredOffer(searchPhrase.value, pageSize.value, pageNumber, sD)
    .subscribe((res) => {
      this.offers = res.items
      this.totalItemsCount = res.totalItemsCount;
    })
  }



}
