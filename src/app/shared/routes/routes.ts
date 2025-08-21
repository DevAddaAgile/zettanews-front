import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";

export const content: Routes = [
    {
        path: "",
        loadChildren: () => import("../../components/themes/themes.routes")
    },
    {
        path: "auth",
        loadChildren: () => import("../../components/auth/auth.routes")
    },
    {
        path: "",
        loadChildren: () => import("../../components/blog/blog.routes")
    }
]
