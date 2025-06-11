import { Component, OnInit } from '@angular/core';
import { user } from '../interface/customers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../service/customers.service';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, RouterLink  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  
  userArr: user[] = [];
  filteredUsers: user[] = [];

  constructor(private service: CustomersService){}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.service.getUser().subscribe({next: (res) =>{
      this.userArr = res;
      this.filteredUsers = res;
    }})
  }

  search(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.filteredUsers = this.userArr.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }

}