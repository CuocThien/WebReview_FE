import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()

export class ReadPostService {
    constructor(private http: HttpClient, private cookieService: CookieService) {

    }
    getDetailPost(groupId: any, postId: any) {
        const url = 'https://oggy-webreview.herokuapp.com/post/getPost/detail/' + groupId + '/' + postId;
        if (this.cookieService.get("authToken") == "") {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
            return this.http.get(url, { headers })
                .toPromise();
        } else {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
            return this.http.get(url, { headers })
                .toPromise();
        }
    }
    getDetailPostAdmin(groupId: any, postId: any) {
        const urlAdmin = 'https://oggy-webreview.herokuapp.com/admin/getPost/' + groupId + '/' + postId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.get(urlAdmin, { headers })
            .toPromise();

    }
}
