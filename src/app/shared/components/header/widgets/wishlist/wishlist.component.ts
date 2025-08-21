import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WishlistModel } from '../../../../interface/wishlist.interface';
import { WishlistState } from '../../../../state/wishlist.state';
@Component({
    selector: 'app-header-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    imports: []
})
export class WishlistComponent {

  @Input() style: string = 'basic';

  wishlist$: Observable<WishlistModel> = inject(Store).select(WishlistState.wishlistItems);

}
