import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  carts: any[] = [];
  products: any[] = [];
  total = 0;
  form!: FormGroup;
  details:any;



  constructor(
    private service: CartsService,
    private build: FormBuilder,
    private productservice:ProductsService

  ) { }
  
  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: ['']
    })
    this.getAllCarts();
  }



  applyFilter() {
    let date = this.form.value;
    this.service.getAllCarts(date)
      .subscribe(() => {
      
    })
    console.log(this.form.value)
  }


  getAllCarts() {
    this.service.getAllCarts().subscribe((res:any) => {
      this.carts = res;
    });
  }

  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe(res => {
     this.getAllCarts()
      alert("cart deleted success!")
    })
    
  }






  view(index: number) {
    this.products=[]
    this.details = this.carts[index];
    for (let x in this.details.products) {
      this.productservice
        .getProductById(
          this.details
            .products[x]
            .productId)
        .subscribe(res => {
          this.products.push({
            item: res,
            quantity: this.details.products[x].quantity,
            
          })
        });
    }
  }




}
