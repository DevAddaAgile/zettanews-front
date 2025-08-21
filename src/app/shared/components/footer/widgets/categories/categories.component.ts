import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../../../shared/interface/category.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { CategoryState } from '../../../../../shared/state/category.state';
import { GetCategories } from '../../../../../shared/action/category.action';

@Component({
    selector: 'app-footer-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    imports: [RouterLink]
})

export class FooterCategoriesComponent implements OnInit {

  @Input() data: Option | null;

  private store = inject(Store);
  category$: Observable<CategoryModel> = this.store.select(CategoryState.category);

  public categories: Category[] = [];

  ngOnInit() {
    this.store.dispatch(new GetCategories({ type: 'product' }));
    this.category$.subscribe(categories => {
      if(categories?.data && Array.isArray(categories.data)) {
        this.categories = categories.data.slice(0, 6);
      }
    })
  }

}
