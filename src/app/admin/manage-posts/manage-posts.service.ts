import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ManagePostsService {
    constructor(private http: HttpClient, private toastr: ToastrService, private cookieService: CookieService) {

    }
    getPost(approved: boolean, isAdmin: boolean) {
        const urlGetPost = 'https://oggy-webreview.herokuapp.com/post/manage/getPost/' + approved;
        if (isAdmin == true) {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
            return this.http.get(urlGetPost, { headers })
                .toPromise();
        } else {
            const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.cookieService.get("authToken") })
            return this.http.get(urlGetPost, { headers })
                .toPromise();
        }

    }
    updatePostStatus(groupId: any, postId: any) {
        const urlAdmin = 'https://oggy-webreview.herokuapp.com/admin/update/changeStatus/' + groupId + '/' + postId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.put(urlAdmin, { headers })
            .toPromise();

    }
    deletePost(groupId: any, postId: any) {
        const urlDelPost = 'https://oggy-webreview.herokuapp.com/admin/deletePost/' + groupId + '/' + postId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.delete(urlDelPost, { headers })
            .toPromise();
    }
}
