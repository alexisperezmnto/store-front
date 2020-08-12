import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  
  items: Array<any>;
  pageOfItems: Array<any>;

  status: boolean = false;

  showHideFilter(){
      this.status = !this.status;    
  }

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router:Router) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      this.items = prods.products
    });
    
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id, 1);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }
  
  sortByDefault() {
    this.productService.getAllProducts(20,'').subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      this.items = prods.products;
    });
  }

  sortByPrice() {
    this.productService.getAllProducts(20,'price').subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      this.items = prods.products;
    });
  }

  sortByRecent() {
    this.productService.getAllProducts(20,'recent').subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      this.items = prods.products
    });
  }
}
