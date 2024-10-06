import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NutritionalNeedsComponent } from './nutritional-needs/nutritional-needs.component';
import { NutritionalMonitoringComponent } from './nutritional-monitoring/nutritional-monitoring.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { FoodDetailComponent } from './my-food/food-detail/food-detail.component';
import { EditFoodComponent } from './my-food/edit-food/edit-food.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CreateFoodComponent } from './my-food/create-food/create-food.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditCredentialsComponent } from './profile/edit-credentials/edit-credentials.component';
import { CreateUserComponent } from './profile/create-user/create-user.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'profile/edit-profile', component: EditProfileComponent, canActivate: [authGuard] },
    { path: 'profile/edit-credentials', component: EditCredentialsComponent, canActivate: [authGuard] },
    { path: 'my-food', component: MyFoodComponent, canActivate: [authGuard] },
    { path: 'my-food-detail/:id', component: FoodDetailComponent, canActivate: [authGuard] },
    { path: 'my-food-detail/edit/:id', component: EditFoodComponent, canActivate: [authGuard] },
    { path: 'my-food/create', component: CreateFoodComponent, canActivate: [authGuard] }, ///////////////////////////////
    { path: 'nutritional-needs', component: NutritionalNeedsComponent, canActivate: [authGuard] },
    { path: 'nutritional-monitoring', component: NutritionalMonitoringComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'create-account', component: CreateUserComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];
