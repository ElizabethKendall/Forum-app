import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms'; // Need for ngModel directive that is used for 2-way data binding. Added to imports array.
import { HttpClientModule } from '@angular/common/http';

import { MainService } from './main.service';

import { ForumComponent } from './forum/forum.component';
import { QuestionsNewComponent } from './questions-new/questions-new.component';
import { QuestionsComponent } from './questions/questions.component';
import { FilterForumTablePipe } from './filter-forum-table.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    QuestionsNewComponent,
    QuestionsComponent,
    FilterForumTablePipe
  ],
  imports: [  // register all modules with app
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
