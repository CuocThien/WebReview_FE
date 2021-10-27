import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  { path: 'index', component: IndexComponent },
  { path: 'signin', component: SignInComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },

  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(private router : Router){ }
 
  ngOnInit() { }
 
  signin() {
      this.router.navigate(['/signin']);
  }
  signup(){
    this.router.navigate(['/signup'])
  }
  index(){
    this.router.navigate(['/index'])
  }
}
