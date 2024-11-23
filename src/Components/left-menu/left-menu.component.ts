import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItems } from '../../model/list.model';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.css'
})
export class LeftMenuComponent {
  @Output() currentActiveMenu: EventEmitter<MenuItems[]> = new EventEmitter();
  @Input() listItems: MenuItems[] = [];
  activePage: number = 1;
  activeMenuItemHandler(activePage: number){
    this.listItems.map(i => i.id==activePage ? i.isActive=true : i.isActive=false);
    this.currentActiveMenu.emit(this.listItems);
  }
}
