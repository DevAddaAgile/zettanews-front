import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../../../public/environments/environment";
import { BlogModel } from "../interface/blog.interface";
import { Params } from "../interface/core.interface";

@Injectable({
  providedIn: "root",
})
export class BlogService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) {}

  getBlogs(payload?: Params): Observable<BlogModel> {
    const params = { ...payload, _t: Date.now().toString() };
    return this.http.get<BlogModel>(`${environment.apiUrl}/blogs/published`, { params });
  }

}