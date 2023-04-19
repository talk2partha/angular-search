import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { take } from 'rxjs';
import { ProductService } from './services/product.service';

export interface Products {
  id: number;
  name: string;
  price: number;
  popularity: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  color = 'red';

  data:any;
  searchText = '';
  
  displayedColumns = ['id', 'name', 'price', 'popularity'];
  dataSource: MatTableDataSource<Products>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: Products[] = [];

  constructor(private service:ProductService) {
    this.dataSource = new MatTableDataSource(this.products);
    this.sort = new MatSort();
    this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.service.getProducts().pipe(take(1))
      .subscribe((response: any) => {
        this.products = response.data;
        this.dataSource = new MatTableDataSource(this.products);
        this.announcePageChange(1);
      },(error) => {
        console.log('Error in fetching Records.');
      });
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  announceSortChange(sortType: any){
    this.dataSource.sort = this.sort;
  }

  announcePageChange(pageType: any){
    this.dataSource.paginator = this.paginator;
  }

}
