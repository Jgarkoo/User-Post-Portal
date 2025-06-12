import { Component, OnInit, OnDestroy } from '@angular/core';
import { user } from '../interface/customers';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserItemComponent } from '../components/user-item/user-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  imports: [RouterLink, ReactiveFormsModule, UserItemComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnDestroy, OnInit{
  
  userArr: user[] = [];
  filteredUsers: user[] = [];                         
  searchControl = new FormControl('');
  subscription = new Subscription();
  customerArray = Array(6).fill(null);

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchUser() {
    const userSub = this.service.getUser().subscribe({
      next: (res) =>{
        this.userArr = res;
        this.filteredUsers = res;
    },
      error: (err) =>{
        console.log(err);
      }
    });
    this.subscription.add(userSub);
  }

  search(query: string): user[] {
    return this.userArr.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }

}