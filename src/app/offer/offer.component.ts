import { Component, OnInit } from '@angular/core';

import { OfferService } from '../shared/services/api/offer.service';
import { Offer } from '../shared/models/offerModel';
import { FormBuilder, FormControl } from '@angular/forms';
import { Items } from '../shared/models/itemsModel';
import { catchError, map, tap } from 'rxjs/operators';
import { observable } from 'rxjs';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers!: Offer[];
  offers2!: Offer[];
  items!: Items;
  searchPhraseControl!: FormControl;
  pageSizeControl!: FormControl;
  pageNumberControl!: FormControl;
  sortDirectionControl!: FormControl;
  totalItemsCount!: number;
  sortDirection: string = "ASC";


  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(public service: OfferService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchPhraseControl = this._fb.control('');
    this.pageSizeControl = this._fb.control(5);
    this.pageNumberControl = this._fb.control(1);
    this.sortDirectionControl = this._fb.control("ASC");
    this.getOffers(this.searchPhraseControl.value, this.pageSizeControl.value, this.pageNumber, this.sortDirectionControl.value);


  }

  getOffers(searchPhrase: string, pageSize: number, pageNumber: number, sortDirection: string) {
    this.service.getOffers(searchPhrase, pageSize, pageNumber, sortDirection)
    .subscribe((res) => {
      this.offers = res.items;
      this.totalItemsCount = res.totalItemsCount
    }) 
  }
}
