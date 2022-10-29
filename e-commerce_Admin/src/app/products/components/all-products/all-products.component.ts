import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {


  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  base64: any = '';
  form!:FormGroup



  constructor(private service: ProductsService,
    private build:FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.build.group({
      title: ['', Validators.required],
      price: ['',Validators.required],
      description: ['',Validators.required],
      image: ['',Validators.required],
      category: ['',Validators.required]
      
    })

    this.getProducts();
    this.getCategories();
  }



  getProducts() {

    this.loading = true;
    this.service.getAllProducts().subscribe((res:any) => {

      this.products = res;
      this.loading = false;
    },
      error => {
        console.log(error.message)
      }
    );
  }


  getCategories() {

    this.loading = true;

    this.service.getAllCategories().subscribe((res:any) => {

      this.loading = false;

     // console.log(this.categories);
      this.categories = res;
    },
      error => {

        this.loading = false;
        console.log(error);
      }
    );
  }


  filterCategory(event: any)
  {
    let value = event.target.value;  // talk change to select
    //console.log(value);
    value == 'all'? this.getProducts():this.getProductsCategory(value);


    
  }

  
  getProductsCategory(keyword: string) {
    this.loading = true;

    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;

      this.products = res;
    });
  }


  addToCart(event: any) {
    
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);// ! for skip null
      let exist = this.cartProducts.find(item => item.item.id== event.item.id);

      if (exist) {
        alert('Product is already in cart!');
      }
      else {
        this.cartProducts.push(event);
        localStorage.setItem(
          'cart', JSON.stringify(
            this.cartProducts));
       }

    } else {
      this.cartProducts.push(event);
      localStorage.setItem(
        'cart', JSON.stringify(
          this.cartProducts));
    }
    //JSON.stringify // ابعت الداتا زي ماهي جايه send data
    //JSON.parse //Rcieve data
  }


  getSelectedCategory(event:any) {
    this.form.get('category')?.setValue(event.target.value);
    console.log(this.form)
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
    {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(event.target.value);

    }


  }


  AddProduct() {
    
    const model = this.form.value;
    this.service.createProduct(model)
      .subscribe(res => {
        alert("Add product successfully..")
      
    })

  }
  update(item: any) {
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64 = item.image;

  }


}





