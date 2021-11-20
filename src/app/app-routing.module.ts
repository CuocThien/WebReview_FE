import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShareExperienceComponent } from './share-experience/share-experience.component';
import { ReviewHubComponent } from './review-hub/review-hub.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ForumsComponent } from './forums/forums.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { ReadPostComponent } from './read-post/read-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ManagePostsComponent } from './admin/manage-posts/manage-posts.component';

const routes: Routes = [

  { path: 'index', component: IndexComponent },
  { path: 'signin', component: SignInComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  { path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full'},
  { path: 'share-experience', component: ShareExperienceComponent, pathMatch: 'full'},
  { path: 'review-hub', component: ReviewHubComponent, pathMatch: 'full'},
  { path: 'forums', component: ForumsComponent, pathMatch: 'full'},
  { path: 'search', component: SearchComponent, pathMatch: 'full'},
  { path: 'create-post', component: CreatePostComponent, pathMatch: 'full'},
  { path: 'update-post/:GroupId/:PostId', component: UpdatePostComponent, pathMatch: 'full'},
  { path: 'post-detail/:GroupId/:PostId', component: ReadPostComponent},
  { path: 'post-detail/admin/:GroupId/:PostId', component: ReadPostComponent},
  { path: 'user/manage-posts', component: ManagePostsComponent},
  { path: 'admin', component: AdminComponent, pathMatch: 'full'},

  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
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
  profile(){
    this.router.navigate(['/profile'])
  }
  index(){
    this.router.navigate(['/index'])
  }
  changepassword(){
    this.router.navigate(['/change-password'])
  }
  shareExp(){
    this.router.navigate(['/share-experience'])
  }
  reviewHub(){
    this.router.navigate(['/review-hub'])
  }
  forums(){
    this.router.navigate(['/forums'])
  }
  search(query:any){
    this.router.navigate(['/search'], { queryParams: { q: query } })
  }
  admin(){
    this.router.navigate(['/admin'])
  }
  pageError(){
    this.router.navigate(['/**'])
  }
}
