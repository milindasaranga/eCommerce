import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from './../products/service/products.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products = [];
  prodSub: Subscription;
  currentPage = 0;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data)=>{
        this.products = this.prodService.getProductOnScroll(0) ;
      }
    );
    this.prodService.emitProducts();
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      const newCurrentPage = this.currentPage + 1;
      const prod = this.prodService.getProductOnScroll(newCurrentPage);
      if (prod.length) {
        this.products = prod;
        this.currentPage = newCurrentPage;
      }
    }
  }

}
