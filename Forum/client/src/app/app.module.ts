import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms'; // Need for ngModel directive that is used for 2-way data binding. Added to imports array.
import { ReactiveFormsModule } from '@angular/forms'; // Need to pass form data between components.
import { HttpClientModule } from '@angular/common/http';

import { MainService } from './main.service';

import { ForumComponent } from './forum/forum.component';
import { QuestionsNewComponent } from './questions-new/questions-new.component';
import { QuestionsComponent } from './questions/questions.component';
import { FilterForumTablePipe } from './filter-forum-table.pipe';
import { AnswersNewComponent } from './answers-new/answers-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    QuestionsNewComponent,
    QuestionsComponent,
    FilterForumTablePipe,
    AnswersNewComponent
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
