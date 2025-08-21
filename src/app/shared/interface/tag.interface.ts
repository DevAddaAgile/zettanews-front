import { PaginateModel } from "./core.interface";

export interface TagModel extends PaginateModel {
    data: Tag[];
}
  
export interface Tag {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    type?: string;
    status: number;
    created_by_id?: string;
    createdAt?: string;
    updatedAt?: string;
    deleted_at?: string;
    __v?: number;
}