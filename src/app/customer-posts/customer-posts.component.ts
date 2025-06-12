import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { posts } from '../interface/posts';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { user } from '../interface/customers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-posts',
  imports: [RouterLink],
  templateUrl: './customer-posts.component.html',
  styleUrl: './customer-posts.component.scss'
})
export class CustomerPostsComponent implements OnDestroy, OnInit{
  
  userId: any;
  postArr: posts[] = [];
  singleUser: user | null = null;
  subscriptions = new Subscription();

  constructor(private service: PostsService, private route: ActivatedRoute, private customerService: CustomersService){
    this.userId = this.route.snapshot.paramMap.get('userId') || ' ';
  }
  
  ngOnInit(): void {
    this.fetchSinglepostByUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchSinglepostByUserId(){
    const postByUserSub = this.service.getPostsByUserId(this.userId).subscribe({
        next: (res: posts[]) =>{
          this.postArr = res;
          this.fetchuser();
          },
        error: (err) =>{
          console.log(err);
        }
      })
    this.subscriptions.add(postByUserSub);
  }
   
  fetchuser() {
  const userSub = this.customerService.getSingleUser(this.userId).subscribe({
    next: (res: user) => {  
      this.singleUser = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
  this.subscriptions.add(userSub);
}

}
