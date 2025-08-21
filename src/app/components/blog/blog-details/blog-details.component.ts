import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blog } from '../../../shared/interface/blog.interface';
import { BlogState } from '../../../shared/state/blog.state';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { BlogSidebarComponent } from '../sidebar/sidebar.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
    imports: [BreadcrumbComponent, BlogSidebarComponent, AsyncPipe, DatePipe]
})
export class BlogDetailsComponent implements OnDestroy {

  blog$: Observable<Blog> = inject(Store).select(BlogState.selectedBlog) as Observable<Blog>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Product",
    items: []
  }

  public sidebar: string;
  private destroy$ = new Subject<void>();

  constructor(private meta: Meta,
    private route: ActivatedRoute){
    
    // Set sidebar from query params or theme options
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if(params['sidebar']) {
        this.sidebar = params['sidebar'];
      } else {
        this.themeOption$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
          this.sidebar = theme?.blog?.blog_sidebar_type || 'left_sidebar';
        });
      }
    });

    // Handle blog data and meta tags
    this.blog$.pipe(takeUntil(this.destroy$)).subscribe(blog => {
      if(blog && blog.title) {
        this.breadcrumb.items = [];
        this.breadcrumb.title = blog.title;
        this.breadcrumb.items.push({ label: 'Blog', active: true }, { label: blog.title, active: false });
        
        if(blog.metaTitle) {
          this.meta.updateTag({property: 'og:title', content: blog.metaTitle});
        }
        if(blog.metaDescription) {
          this.meta.updateTag({property: 'og:description', content: blog.metaDescription});
        }
      }
    });
  }

  shareOnWhatsApp() {
    this.blog$.pipe(takeUntil(this.destroy$)).subscribe(blog => {
      if(blog) {
        const url = window.location.href;
        const text = `${blog.title}\n\n${url}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
      }
    });
  }

  shareOnTeams() {
    this.blog$.pipe(takeUntil(this.destroy$)).subscribe(blog => {
      if(blog) {
        const url = window.location.href;
        const text = `${blog.title}\n${url}`;
        const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=&topicName=${encodeURIComponent(blog.title)}&message=${encodeURIComponent(text)}`;
        window.open(teamsUrl, '_blank');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
