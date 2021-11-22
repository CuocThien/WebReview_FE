import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StarService } from './star.service';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
  providers: [StarService]
})
export class StarComponent implements OnInit {

  @Input() id:any;
  @Input() rate:any;
  isUpdateRating:boolean=false;
  x:any;
  constructor(private renderer:Renderer2, private service: StarService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    if(this.rate!=0)
      this.isUpdateRating=true;
  }
  ngAfterViewInit(){
    if(this.rate!=0){
    let name=this.id+"_"+this.rate;
    this.x = document.getElementById(name);
    this.x.checked=true;
    }
  }

  rating(event:any){
    // alert(this.id+": "+event.target.id.split('_')[1])
    this.rate = event.target.id.split('_')[1];
    // alert(this.rate)
  }
  data:any;
  result:any;
  Rate(){
    this.data={}
    this.data["Rate"]=this.rate;
    if(this.isUpdateRating==false){
      this.service.rating(this.id,this.data).then(res=>{
        this.result = res;
        this.toastr.success(this.result.msg);
      }).catch(err=>{
        console.log(err)
        this.toastr.error(err.error.msg)
      })
    }else{
      this.service.updateRating(this.id,this.data).then(res=>{
        this.result = res;
        this.toastr.success(this.result.msg);
      }).catch(err=>{
        console.log(err)
        this.toastr.error(err.error.msg)
      })
    }
  }
  cancelRating(){
    var items = document.getElementsByTagName("input");
    for(let i=0; i< items.length;i++){
      items[i].checked = false;
    }
  }
}
