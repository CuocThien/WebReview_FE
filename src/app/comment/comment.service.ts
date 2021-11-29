import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { AppRoutingModule } from "../app-routing.module";

@Injectable()

export class CommentService {
    constructor(private http: HttpClient, private toastr: ToastrService, private cookieService: CookieService,
        private router: AppRoutingModule) {

    }
    getCmt(value: any) {
        const urlGetCmt = 'https://oggy-webreview.herokuapp.com/comment/' + value;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.get(urlGetCmt, { headers })
            .toPromise()
    }
    postCmt(value: any) {
        const urlPostCmt = 'https://oggy-webreview.herokuapp.com/comment/posts';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.post(urlPostCmt, body, { headers })
            .toPromise()
    }
    updateCmt(value: any) {
        const urlUpdateCmt = 'https://oggy-webreview.herokuapp.com/comment/update';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.post(urlUpdateCmt, body, { headers })
            .toPromise()
    }
    deleteCmt(value: any) {
        const urlDeleteCmt = 'https://oggy-webreview.herokuapp.com/comment/delete/' + value;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        return this.http.delete(urlDeleteCmt, { headers })
            .toPromise()
    }
    postReply(value: any) {
        const urlPostReply = 'https://oggy-webreview.herokuapp.com/comment/reply';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.post(urlPostReply, body, { headers })
            .toPromise()
    }
    updateReply(value: any) {
        const urlUpdateReply = 'https://oggy-webreview.herokuapp.com/comment/updateReply';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        const body = JSON.stringify(value);
        return this.http.post(urlUpdateReply, body, { headers })
            .toPromise()
    }
    deleteReply(value: any) {
        const urlDeleteReply = 'https://oggy-webreview.herokuapp.com/comment/deleteReply/' + value["idComment"] + '/' + value["_id"];
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
        return this.http.delete(urlDeleteReply, { headers })
            .toPromise()
    }
}
