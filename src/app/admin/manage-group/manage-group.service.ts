import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ManageGroupService {
    constructor(private http: HttpClient, private toastr:ToastrService, private cookieService:CookieService) {

    }
    getGroup() {
        const url = 'https://oggy-webreview.herokuapp.com/group/getGroup/true';
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
        
    }
    addGroup(value: any) {
        const urlAddGroup = 'https://oggy-webreview.herokuapp.com/group/createGroup';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        const body = JSON.stringify(value);
        return this.http.post(urlAddGroup, body, { headers })
            .toPromise()
    }
    updateGroup(id:any, name:any) {
        const urlUpdateGroup = 'https://oggy-webreview.herokuapp.com/group/getGroup/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        const body = JSON.stringify(name);
        return this.http.post(urlUpdateGroup, body, { headers })
            .toPromise()
    }
    deleteGroup(id:any) {
        const urlDeleteGroup = 'https://oggy-webreview.herokuapp.com/group/getGroup/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
        return this.http.put(urlDeleteGroup, { headers })
            .toPromise()
    }
}
