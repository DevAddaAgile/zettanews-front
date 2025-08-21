import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";
import { Category } from "./category.interface";
import { Tag } from "./tag.interface";
import { User } from "./user.interface";

export interface BlogModel extends PaginateModel {
    data: Blog[];
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    published: boolean;
    metaTitle: string;
    metaDescription: string;
    thumbnail: {
        original_url: string;
        filename: string;
    };
    metaImage: {
        original_url: string;
        filename: string;
    };
    categories: Category[];
    tags: Tag[];
    featured: boolean;
    sticky: boolean;
    createdAt?: string;
    updatedAt?: string;
}
