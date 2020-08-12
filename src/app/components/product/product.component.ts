import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductModelServer} from "../../models/product.model";
import {map} from "rxjs/operators";
import {CartService} from "../../services/cart.service";

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit, OnInit {

  id: Number;
  product;
  thumbimages: any[] = [];


  @ViewChild('quantity') quantityInput;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router) {


  }

  ngOnInit(): void {
    this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
    this.loadScript('../assets/vendor/bootstrap/js/popper.js');
    this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
    this.loadScript('../assets/vendor/slick/slick.min.js');
    this.loadScript('../assets/js/slick-custom.js');
    this.loadScript('../assets/js/main.js');

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        if (prod.images !== null) {
          this.thumbimages = prod.images.split(';');
        }

      });
    });

    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }

  ngAfterViewInit(): void {

    
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 1;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
