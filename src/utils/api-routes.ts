import { environment } from "../environments/environment";

export class ApiRoutes {
    private static _authBaseUrl = environment.authApiUrl;
    
    private static _pifeBaseUrl = environment.pifeApiUrl;

    static login = this._authBaseUrl + "/login";

    static listRooms = this._pifeBaseUrl + "/rooms"
}