import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";

export interface CategoryModel extends PaginateModel {
    data: Category[];
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    status: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    type?: string;
    parent_id?: string;
    category_image?: Attachment;
    category_image_id?: string;
    category_icon?: Attachment;
    category_icon_id?: string;
    commission_rate?: number;
    subcategories?: Category[];
    products_count?: number;
    blogs_count?: number;
    created_by_id?: string;
    deleted_at?: string;
}