import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-header-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    imports: [TranslateModule]
})
export class CategoriesBlockComponent {

  @Input() data: Option | null;

} 
