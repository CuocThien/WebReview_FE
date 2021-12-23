import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class ManageCommentsService {
    constructor(private http: HttpClient, private toastr: ToastrService, private cookieService: CookieService) {

    }
    getComment() {
        const url = 'https://oggy-webreview.herokuapp.com/admin/getComment';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.get(url, { headers })
            .toPromise();

    }
}
