import { Component, Input, HostListener, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { ThemeOptionService } from '../../../services/theme-option.service';
import { TranslateModule } from '@ngx-translate/core';
import { DealComponent } from '../widgets/deal/deal.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { CategoriesBlockComponent } from '../widgets/categories/categories.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';


import { CallComponent } from '../widgets/call/call.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';

import { LogoComponent } from '../widgets/logo/logo.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { TopbarComponent } from '../widgets/topbar/topbar.component';

@Component({
    selector: 'app-basic-header',
    templateUrl: './basic-header.component.html',
    styleUrls: ['./basic-header.component.scss'],
    imports: [TopbarComponent, NavbarMenuButtonComponent, LogoComponent,
        SearchBoxComponent, CallComponent, MyAccountComponent, CategoriesBlockComponent,
        ButtonComponent, MenuComponent, DealComponent, TranslateModule]
})
export class BasicHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public stick: boolean = false;
  public active: boolean = false;
  public mode: string = 'light';
  public value: string = 'ltr';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              public themeOptionService: ThemeOptionService) {
    this.themeOption$.subscribe(option => {
      this.mode = option?.general ? option?.general?.mode : 'light';
      this.value = option?.general ? option?.general?.language_direction : 'ltr';
    });
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {  
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number >= 150 && window.innerWidth > 400) {
        this.stick = true;
      } else {
        this.stick = false;
      }
    }
  }

  toggle(val: boolean){
    this.active = val;
  }

  layout(value: string){
    if (isPlatformBrowser(this.platformId)) {  
      this.value = value;
      if(value === 'rtl'){
        document.body.classList.add('rtl');
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      } else {
        document.body.classList.remove('rtl');
        document.getElementsByTagName('html')[0].removeAttribute('dir');
      }
      localStorage.setItem('theme_direction', value);
    }
  }

  layoutMode(value: string){
    if (isPlatformBrowser(this.platformId)) {  
      this.mode = value;
      if(this.mode === 'dark'){
        document.getElementsByTagName('html')[0].classList.add('dark')
      } else {
        document.getElementsByTagName('html')[0].classList.remove('dark')
      }
      localStorage.setItem('theme_mode', value);
    }
  }

  customizeThemeColor(event: any){
    if (isPlatformBrowser(this.platformId)) {  
     document.documentElement.style.setProperty('--theme-color', event.target.value);
     this.themeOptionService.theme_color = event.target.value;
     localStorage.setItem('theme_color', event.target.value);
    }
  }

  openColorPickerMini(){
    if (isPlatformBrowser(this.platformId)) {
      const colorInput = document.querySelector('.color-input-mini') as HTMLInputElement;
      if (colorInput) {
        colorInput.click();
      }
    }
  }
}
