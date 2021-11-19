import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShareExperienceComponent } from './share-experience/share-experience.component';
import { StarComponent } from './star/star.component';
import { ReviewHubComponent } from './review-hub/review-hub.component';
import { FooterComponent } from './footer/footer.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ForumsComponent } from './forums/forums.component';
import { CommentComponent } from './comment/comment.component';
import { SearchComponent } from './search/search.component';
import { MyBootstrapModalComponent } from './modals/my-bootstrap-modal/my-bootstrap-modal.component';
import { AdminComponent } from './admin/admin.component';
import { ManagePostsComponent } from './admin/manage-posts/manage-posts.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageGroupComponent } from './admin/manage-group/manage-group.component';
import { ReadPostComponent } from './read-post/read-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    IndexComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ShareExperienceComponent,
    StarComponent,
    ReviewHubComponent,
    FooterComponent,
    CreatePostComponent,
    ForumsComponent,
    CommentComponent,
    SearchComponent,
    MyBootstrapModalComponent,
    AdminComponent,
    ManagePostsComponent,
    ManageUsersComponent,
    ManageCategoriesComponent,
    ManageGroupComponent,
    ReadPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1500,
      preventDuplicates:true,
      progressBar:true,
      progressAnimation:"decreasing",
      positionClass: 'toast-top-right'
      
    }),
    HttpClientModule,
    NgxPaginationModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
