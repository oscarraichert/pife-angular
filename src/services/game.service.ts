import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from "../utils/api-routes";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class GameService {
    constructor(
        private http: HttpClient
    ) {}

    public getRooms(): Observable<string[]> {
        return this.http.get<string[]>(ApiRoutes.listRooms);
    }
}