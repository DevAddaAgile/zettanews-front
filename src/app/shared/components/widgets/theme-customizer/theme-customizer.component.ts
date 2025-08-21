import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Option } from '../../../interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ClickOutsideDirective } from '../../../directive/out-side-directive';
import { ThemeOptionService } from '../../../services/theme-option.service';

@Component({
    selector: 'app-theme-customizer',
    templateUrl: './theme-customizer.component.html',
    styleUrls: ['./theme-customizer.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, ButtonComponent, NgClass, ReactiveFormsModule, FormsModule, TranslateModule]
})
export class ThemeCustomizerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public open: boolean = false;
  public show: boolean = false;
  public mode: string;
  public value: string;
  public primary_color: string;

  constructor(public themeOptionService: ThemeOptionService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.themeOption$.subscribe(option => {
      this.mode = option?.general ? option?.general?.mode : 'light';
      this.value = option?.general ? option?.general?.language_direction : 'ltr';
    });
    
    // Load saved preferences
    if (isPlatformBrowser(this.platformId)) {
      const savedMode = localStorage.getItem('theme_mode');
      const savedDirection = localStorage.getItem('theme_direction');
      const savedColor = localStorage.getItem('theme_color');
      
      if (savedMode) {
        this.layoutMode(savedMode);
      }
      
      if (savedDirection) {
        this.layout(savedDirection);
      }
      
      if (savedColor) {
        document.documentElement.style.setProperty('--theme-color', savedColor);
        this.themeOptionService.theme_color = savedColor;
      }
    }
  }

  toggle(){
    this.open = !this.open;
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
      // Persist preference
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
      // Persist preference
      localStorage.setItem('theme_mode', value);
    }
  }

  customizeThemeColor(event: any){
    if (isPlatformBrowser(this.platformId)) {  
     document.documentElement.style.setProperty('--theme-color', event.target.value);
     this.themeOptionService.theme_color = event.target.value;
     // Persist preference
     localStorage.setItem('theme_color', event.target.value);
    }
  }

  openColorPicker(){
    if (isPlatformBrowser(this.platformId)) {
      const colorInput = document.querySelector('.color-picker-input') as HTMLInputElement;
      if (colorInput) {
        colorInput.click();
      }
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }

  closeDropdown(){
    this.open = false;
  }
}
