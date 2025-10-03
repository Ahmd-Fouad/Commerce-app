
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { loggedGuard } from './core/guards/logged-guard';
import { authGuard } from './core/guards/auth-guard';
import { ForgetPassComponent } from './core/auth/forget-pass/forget-pass.component';
import { provideClientHydration } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },

  {
    path: '', component: AuthLayoutComponent ,children: [
      {path: 'login', component: LoginComponent, title: 'Login Page'},
      {path: 'register', component: RegisterComponent, title: 'Register Page'},
      {path: 'forget', component: ForgetPassComponent, title: 'Reset Password Page'}
    ],
    canActivate: [loggedGuard]
  },

  {
    path: "", component: BlankLayoutComponent, children: [
      {path: 'allorders', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent, title: 'Home Page'},
      {path: 'cart', component: CartComponent, title: 'Cart Page'},
      {path: 'brands', component: BrandsComponent, title: 'Brands Page'},
      {path: 'products', component: ProductsComponent, title: 'Products Page'},
      {path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout Page'},
      {path: 'categories', component: CategoriesComponent, title: 'Categories Page'},
      {path: 'details/:slug/:id', component: DetailsComponent, title: 'Details Page'},
      {path: 'details/:id', component: DetailsComponent, title: 'Details Page'}
    ],
    canActivate: [authGuard]
  }, 

  {
    path: '**', component: NotfoundComponent, title: 'Not Found Page'
  }
];
