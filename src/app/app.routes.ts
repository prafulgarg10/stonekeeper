import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { CartComponent } from '../Components/cart/cart.component';
import { LoginComponent } from '../Components/login/login.component';
import { SignupComponent } from '../Components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from '../Components/orders/orders.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
];
