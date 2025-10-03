import { environment } from './../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private readonly http = inject(HttpClient);

  getProductDetails(id: string | null): Observable<any>  {
    return this.http.get(`${environment.baseUrl}products/${id}`)
  }

}