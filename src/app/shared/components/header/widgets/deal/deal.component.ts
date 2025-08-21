import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-deal',
    imports: [TranslateModule],
    templateUrl: './deal.component.html',
    styleUrls: ['./deal.component.scss']
})
export class DealComponent {

  @Input() style: string = 'basic';
  @Input() data: Option | null;

}
