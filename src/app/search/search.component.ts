import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  p:number=1;
  query:any;
  ngOnInit(): void {
    this.query=this.route.snapshot.queryParamMap.get("q");
    console.log(this.query)
  }

}
