import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);


  addProduct(id: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}cart`, {
      "productId": id
    },
)
  }

  getCartProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}cart`,)
  }

  updateProduct(id: string, count: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}cart/${id}`,
      {
        "count": count
      }
    ,)
  }

  removeProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart/${id}`,)
  }

  cashPayment(id: string | null, data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}orders/${id}`, data,)
  }

  visaPayment(id: string | null, data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${id}?url=http://localhost:4200`, data,)
  }
}
