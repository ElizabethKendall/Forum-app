// Pipe based on tutorial at this link.
// https://seegatesite.com/angular-4-tutorial-create-custom-search-filter-pipe-in-html-table/
// TODO: In future, replace this pipe with a service. This is not a performant search function.

import { Pipe, PipeTransform } from '@angular/core';
import { ForumComponent } from './forum/forum.component';

@Pipe({
  name: 'filterForumTable'
})

export class FilterForumTablePipe implements PipeTransform {

  public checkQuestionOrAuthorIncludeTerm(question, term) {
    let includesTerm = false;
    if (question['content'].toLowerCase().includes(term)) {
      includesTerm = true;
    }
    if (question['_user']['firstName'].toLowerCase().includes(term)) {
      includesTerm = true;
    }
    if (question['_user']['lastName'].toLowerCase().includes(term)) {
      includesTerm = true;
    }
    return includesTerm;
  }

  public transform(allQuestions: Array<Object>, term: string) {
    if (!term) {return allQuestions; }
    term = term.toLowerCase();
    return allQuestions.filter(question => this.checkQuestionOrAuthorIncludeTerm(question, term));
  }

  // transform(items: any[], value: string, label:string): any[] {
  //   if (!items) { return []; }
  //   if (!value) { return  items; }
  //   if (value === '' || value == null) { return []; }
  //   return items.filter(e => e[label].toLowerCase().indexOf(value) > -1 );
  // }

}
