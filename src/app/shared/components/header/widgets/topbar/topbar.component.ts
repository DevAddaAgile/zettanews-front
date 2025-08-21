import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '../language/language.component';
import { NoticeComponent } from '../notice/notice.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    imports: [NoticeComponent, LanguageComponent, TranslateModule]
})
export class TopbarComponent {

  @Input() data: Option | null;

}
