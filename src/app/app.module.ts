import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

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
    SearchComponent
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
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
