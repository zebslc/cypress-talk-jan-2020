import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products = [];
  constructor(private apiService: ProductsService) {}
  ngOnInit() {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }
}
