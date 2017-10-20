import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductsService } from "./products.service";



@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductsService]
})
export class ProductListComponent
implements OnInit{
    performFilter(filter:string):IProduct[]{
        let filtered:IProduct[] = [];
        this.products.forEach(prod => {
            if(prod.productName.toLowerCase().indexOf(filter.toLowerCase()) > -1)
                filtered.push(prod);
        })
        return filtered;
    }
    ngOnInit(): void {
        console.log('In OnInit');
        this.products = this._productsService.getProducts();
        this.filteredProducts = this.performFilter(this.listFilter);
        this.products.forEach((element) => {
            element.imageWidth = 20;
            element.imageHeight = 20;
        });
        
    }
    showImage: boolean = false;
    pageTitle:string = 'Product List!'
    
    filteredProducts: IProduct[];
    products: IProduct[];
    _listFilter:string = 'cart';
    get listFilter():string {return this._listFilter;}
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    toggleImages = () => this.showImage = !this.showImage;
    

    /**
     *
     */
    constructor(private _productsService: ProductsService) {
        
    }
}