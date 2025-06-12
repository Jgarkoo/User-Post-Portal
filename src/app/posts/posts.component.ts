import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../interface/posts';
import { CommonModule } from '@angular/common';
import { PostsService } from '../service/posts.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy{
  
  id: string | undefined ;
  selectedPost: posts | null = null;
  postArr: posts[] = [];
  viewDetail: boolean = false;

  constructor(private service: PostsService){}
  
  ngOnInit(): void {
    this.catchPost();
  }

  ngOnDestroy(): void {
      if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  catchPost() {
    this.service.getPost().subscribe({
      next: (res: posts[]) => {
        this.postArr = res;
      },
      error: (err) => {
         console.log(err);
      }
    });
  }

  viewDetailsOfPosts(postId: number) {
    this.service.getSinglePost(postId).subscribe({
      next: (res: posts) => {
        this.selectedPost = res;
        this.overFlowBackGround();
      },
      error: (err) => {
        console.log(err);
      }
    });
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
