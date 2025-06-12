import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
   footerSections = [
    {
      title: 'ABOUT US',
      items: ['General Roles', 'Sport Rules', 'Restrictions']
    },
    {
      title: 'FOLLOW US',
      items: [
        { name: 'Facebook', link: '/home' },
        { name: 'Instagram', link: '/home' },
        { name: 'Twitter', link: '/home' }
      ],
      isLink: true
    },
    {
      title: 'CONTACT INFO',
      items: ['*1234', '(123) 4567890', 'example@mail.com']
    }
  ];
}
