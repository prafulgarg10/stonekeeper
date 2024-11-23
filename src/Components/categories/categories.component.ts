import { Component, Input } from '@angular/core';
import { Category } from '../../model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() categoriesList: Category[] = [];
}
