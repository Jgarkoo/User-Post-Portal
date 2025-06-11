import { Component, OnInit } from '@angular/core';
import { user } from '../interface/customers';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserItemComponent } from '../components/user-item/user-item.component';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, UserItemComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  
  userArr: user[] = [];
  filteredUsers: user[] = [];                         
  searchControl = new FormControl('');

  constructor(private service: CustomersService){}

  ngOnInit(): void {
    this.fetchUser();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.filteredUsers = this.search(query || '');
      });
  }

  fetchUser() {
    this.service.getUser().subscribe({next: (res) =>{
      this.userArr = res;
      this.filteredUsers = res;
    }})
  }

  search(query: string): user[] {
    return this.userArr.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }

}