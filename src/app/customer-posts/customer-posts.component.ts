import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/posts.service';
import { posts } from '../interface/posts';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { user } from '../interface/customers';

@Component({
  selector: 'app-customer-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-posts.component.html',
  styleUrl: './customer-posts.component.scss'
})
export class CustomerPostsComponent implements OnInit{
  
  userId: any;
  postArr: posts[] = [];
  singleUser: user | null = null;;

  constructor(private service: PostsService, private route: ActivatedRoute, private customerService: CustomersService){
    this.userId = this.route.snapshot.paramMap.get('userId') || ' ';
  }
  
  ngOnInit(): void {
    this.fetchSinglepostByUserId();
  }

  fetchSinglepostByUserId(){
    this.service.getPostsByUserId(this.userId).subscribe({next: (res: posts[]) =>{
      this.postArr = res;
      this.fetchuser();
      },
      error: (err) =>{
        console.log(err);
      
      }
    })
  }
   
  fetchuser() {
  this.customerService.getSingleUser(this.userId).subscribe({
    next: (res: user) => {  
      this.singleUser = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
