import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url = environment.api.dataApi;
   
  constructor(private httpClient: HttpClient) { }
  
  getProducts(){
    return this.httpClient.get(this.url);
  }
}