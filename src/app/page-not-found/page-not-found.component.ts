import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-404',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page_404">
      <div class="error_404">ERROR 404</div>
      <div class="error_404_message"><h1>Hey, cette page n'existe pas !</h1></div>
    </div>
  `,
  styles: ``
})
export class PageNotFoundComponent {

}
