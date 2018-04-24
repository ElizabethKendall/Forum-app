import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Need to pass form data between components.
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainService } from './main.service';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ForumComponent } from './forum/forum.component';
import { QuestionsNewComponent } from './questions-new/questions-new.component';
import { QuestionsComponent } from './questions/questions.component';
import { FilterForumTablePipe } from './filter-forum-table.pipe';
import { AnswersNewComponent } from './answers-new/answers-new.component';
import { CommentsNewComponent } from './comments-new/comments-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FooterComponent,
    NavComponent,
    ForumComponent,
    QuestionsNewComponent,
    QuestionsComponent,
    FilterForumTablePipe,
    AnswersNewComponent,
    CommentsNewComponent
  ],
  imports: [  // register all modules with app
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MainService, AnswersNewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
