import { environment } from "../environments/environment";

export class ApiRoutes {
    private static _baseUrl = environment.apiUrl;

    static login = this._baseUrl + "/login";
}