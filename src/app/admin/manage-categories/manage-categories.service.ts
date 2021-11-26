import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ManageCategoriesService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getGroup() {
        const url = 'https://oggy-webreview.herokuapp.com/category/getCategory/true';
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        
    }
    getCateDeleted() {
        const url = 'https://oggy-webreview.herokuapp.com/category/getCategory/false';
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        
    }
    addCategory(value: any) {
        const urlAddCategory = 'https://oggy-webreview.herokuapp.com/category/createCategory';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        const body = JSON.stringify(value);
        return this.http.post(urlAddCategory, body, { headers })
            .toPromise()
    }
    updateCategory(id:any, value:any) {
        const urlUpdateCategory = 'https://oggy-webreview.herokuapp.com/category/getCategory/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        const body = JSON.stringify(value);
        return this.http.put(urlUpdateCategory, body, { headers })
            .toPromise()
    }
    changeStatusCategory(id:any, value:any) {
        const urlChangeStatusCategory = 'https://oggy-webreview.herokuapp.com/category/getCategory/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        const body = JSON.stringify(value)
        // console.log(id+"/"+body)
        return this.http.post(urlChangeStatusCategory, body, { headers })
            .toPromise()
    }
}
