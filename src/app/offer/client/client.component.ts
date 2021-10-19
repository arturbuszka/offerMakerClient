import { Component, OnInit, PipeTransform } from '@angular/core';
import { ClientService } from 'src/app/shared/services/api/client.service';
import { Client } from 'src/app/shared/models/clientModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients!: Client[]
  client!: Client
  form!: FormGroup
  id!: Number
  searchString!: FormControl

  constructor(private service: ClientService, private _fb: FormBuilder) { }

  ngOnInit() {
    // initalize form
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern("\\d{2}-\\d{3}")]],
      nip: ['', [Validators.required, Validators.pattern("\\d{3}-\\d{4}")]],
      email: [''],
      phoneNumber: ['']
    });
    // get clients list
    this.getClients();
    this.searchString = this._fb.control('')
  };


  get c() {
    return this.form.controls;
  };

  // get client detail on click
  getClientDetails(id:Number) {
    this.service.getClient(id).subscribe((res) =>{
      this.form = this._fb.group({
        name: [res.name, [Validators.required]],
        city: [res.city, [Validators.required]],
        street: [res.street, [Validators.required]],
        postalCode: [res.postalCode, [Validators.required, Validators.pattern("\\d{2}-\\d{3}")]],
        nip: [res.nip, [Validators.required, Validators.pattern("\\d{3}-\\d{4}")]],
        email: [res.email],
        phoneNumber: [res.email]
      })
      this.id = res.id;
    })
  }

  // convert form to json format
  // if client edited => invoke edit method
  // else add new client
  onSubmitNew() {
    const convertedForm = Object.assign(this.form.value, this.client)
    if(this.id != null) {
      this.putClient(this.id, convertedForm);
    }
    this.postClient(convertedForm);
  }

  filter() {
      if(this.searchString.value == "" ) {
        this.ngOnInit()
      }
      else {
        this.clients = this.clients.filter(c => {
          return c.name.toLocaleLowerCase().match(String(this.searchString.value).toLocaleLowerCase())
        })
      }
  }



  getClients() {
    this.service.getClients()
    .subscribe((clients) => {
      this.clients = clients;
    });
  }

  deleteClient() {
    this.service.deleteClient(this.id).subscribe((res) => {})
  }

  postClient(c: Client) {
    this.service.postClient(c).subscribe((res) => {})
  }

  putClient(id: Number, c: Client) {
    this.service.putClient(id, c).subscribe((res) => {})
  }
}
