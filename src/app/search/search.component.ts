import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: SearchService, private router: Router,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  p: number = 1;
  query: any;
  result: any;
  listSearch: any;
  count: number = 0;
  ngOnInit(): void {
    this.spinner.show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.query = this.route.snapshot.queryParamMap.get("q");
    const page = this.route.snapshot.queryParamMap.get("page")
    if(page!=null){
    this.p = parseInt(page);}
    this.service.getResultSearch(this.query).then(res => {
      this.result = res;
      this.result = this.result.data.search;
      this.listSearch = []
      for (let i = 0; i < this.result.length; i++) {
        for (let j = 0; j < this.result[i].post.length; j++) {
          this.result[i].post[j]["PostId"] = this.result[i].GroupId
          this.listSearch.push(this.result[i].post[j])
        }
      }
      // console.log(this.result)
      // console.log(this.listSearch)
      this.count = this.listSearch.length;
      this.spinner.hide();
    }).catch(err => {
      // console.log(err)
      this.toastr.error(err.error.msg)
      this.spinner.hide()
    })
    // console.log(this.query)
  }

  goToPage(){
    this.router.navigate(['/search'], { queryParams: {q: this.query, page: this.p }})
  }
}
