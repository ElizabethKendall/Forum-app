import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent } from './forum/forum.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsNewComponent } from './questions-new/questions-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  // The route to a page with all questions
  { path: 'forum', component: ForumComponent },
  // The route to a page with a form to create a new question
  { path: 'question/create', component: QuestionsNewComponent },
  // The route to an individual question's 'wall'
  { path: 'question/:id', component: QuestionsComponent},
  { path: '**', component: ForumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
