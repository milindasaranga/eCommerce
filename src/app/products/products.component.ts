import { Component, OnInit, Input } from '@angular/core';
import { Product, FilterBy } from './../model/product';
import { ProductsService } from './../products/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products: Product[] = [];
  sortItem:string;
  dropdownList: FilterBy[] = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.sortItem = "1";
    this.initializeFilter();
  }

  public onOptionsSelected(event) {
    this.productService.sortProductList(this.sortItem);
  }

  initializeFilter(): void {
    this.dropdownList = [
      { "id": 1, "itemName": "Closet", "facets": "Brand" },
      { "id": 3, "itemName": "Max", "facets": "Brand" },
      { "id": 4, "itemName": "Multi", "facets": "Color" },
      { "id": 5, "itemName": "Purple", "facets": "Color" },
      { "id": 8, "itemName": "Pink", "facets": "Color" },
      { "id": 6, "itemName": "STYLI", "facets": "Sold By" },
      { "id": 7, "itemName": "Max", "facets": "Sold By" },
    ];
    this.selectedItems = [
    ];

    this.dropdownSettings = {
      singleSelection: false,
      text: "Filter By",
      enableSearchFilter: false,
      selectGroup: false,
      groupBy: "facets",      
      classes: "myclass custom-class-example"
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.productService.filterBySelection(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.productService.filterBySelection(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

}
