import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  currentDateTime!: Observable<Date>;
  
  constructor(){}

  ngOnInit(): void {
      this.currentDateTime = timer(0, 1000).pipe(
      map(() => new Date())
    );
  }
}
