import { Component, Input } from '@angular/core';
import { user } from '../../interface/customers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-item',
  imports: [RouterLink],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  @Input() user!: user;

}
