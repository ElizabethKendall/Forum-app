import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent } from './forum/forum.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsNewComponent } from './questions-new/questions-new.component';
import { AnswersNewComponent } from './answers-new/answers-new.component';

// Note: The route with path: 'question/:id' will allow reloading of current route.
// See: https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2

const routes: Routes = [
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  // The route to a page with all questions
  { path: 'forum', component: ForumComponent },
  // The route to a page with a form to create a new question
  { path: 'question/create', component: QuestionsNewComponent },
  // The route to a page with a form to create a new answer
  { path: 'answer/create/:questionId', component: AnswersNewComponent },
  // The route to an individual question's 'wall'
  { path: 'question/:id', component: QuestionsComponent, runGuardsAndResolvers: 'always'},
  { path: '**', component: ForumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
