import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { CustomerComponent } from './customer/customer.component';
import { PostsComponent } from './posts/posts.component';
import { TodoComponent } from './todo/todo.component';
import { CustomerPostsComponent } from './customer-posts/customer-posts.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'home page',
        component:MainComponent
    },
    {
        path: 'customers',
        title: 'Customers page',
        component: CustomerComponent
    },
    {
        path: 'posts',
        title: 'posts',
        component:PostsComponent
    },
    {
        path: 'todo/:id',
        title: 'customer to do list',
        component: TodoComponent
    },
    {
        path: 'post/:userId',
        title: 'customer Posts',
        component: CustomerPostsComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
