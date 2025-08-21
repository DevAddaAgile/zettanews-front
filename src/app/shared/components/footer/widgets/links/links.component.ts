import { Component, Input } from '@angular/core';
import { Link } from '../../../../../shared/interface/theme-option.interface';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss'],
    imports: [RouterLink, TitleCasePipe]
})

export class LinksComponent {
  
  @Input() links: Link[] = [];

}
