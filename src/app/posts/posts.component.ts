import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../interface/posts';
import { CommonModule } from '@angular/common';
import { PostsService } from '../service/posts.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnDestroy, OnInit{
  
  id: string | undefined ;
  selectedPost: posts | null = null;
  postArr: posts[] = [];
  viewDetail: boolean = false;
  subscriptions = new Subscription();

  constructor(private service: PostsService){}
  
  ngOnInit(): void {
    this.catchPost();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  catchPost() {
    const postSub = this.service.getPost().subscribe({
      next: (res: posts[]) => {
        this.postArr = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.subscriptions.add(postSub);
  }

  viewDetailsOfPosts(postId: number) {
    const detailSub = this.service.getSinglePost(postId).subscribe({
      next: (res: posts) => {
        this.selectedPost = res;
        this.overFlowBackGround();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.subscriptions.add(detailSub);
  }

  closeDetails() {
    this.selectedPost = null;
    this.overFlowBackGround();  
  }

  overFlowBackGround() {
    this.viewDetail = !this.viewDetail;
      if (this.viewDetail) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }

}
