import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class SearchService {
    constructor(private http: HttpClient) {

    }
    getResultSearch(keyword:any) {
        const url = 'https://oggy-webreview.herokuapp.com/post/searchPost?keyword='+keyword;
            const headers = new HttpHeaders({ 'Content-Type': 'application/json'})
            return this.http.get(url, { headers })
            .toPromise();
    }
}
