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
  searchPhraseControl!: FormControl;
  pageSizeControl!: FormControl;
  pageNumberControl!: FormControl;
  sortDirectionControl!: FormControl;
  totalItemsCount!: number;
  sortDirection: string = "ASC";

  pageNumber: number = 1;

  constructor(public service: OfferService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchPhraseControl = this._fb.control('');
    this.pageSizeControl = this._fb.control(5);
    this.pageNumberControl = this._fb.control(1);
    this.sortDirectionControl = this._fb.control("ASC");
    this.getOffers(this.searchPhraseControl.value, this.pageSizeControl.value, this.pageNumber, this.sortDirectionControl.value);

  }

  getOffers(searchPhrase: string, pageSize: number, pageNumber: number, sordDirection: string) {
    this.service.getOffer(searchPhrase, pageSize, pageNumber, sordDirection)
    .subscribe((res) => {
      this.offers = res.items
      this.totalItemsCount = res.totalItemsCount
    })
  }

  // getFilteredOffers(searchPhrase: FormControl, pageSize: FormControl, pageNumber: number, sD: string) {
  //   this.service.getFilteredOffer(searchPhrase.value, pageSize.value, pageNumber, sD)
  //   .subscribe((res) => {
  //     this.offers = res.items
  //     this.totalItemsCount = res.totalItemsCount;
  //   })
  // }



}
