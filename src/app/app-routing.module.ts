import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { HtmlAstPath } from '@angular/compiler';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'index', component: IndexComponent },

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
