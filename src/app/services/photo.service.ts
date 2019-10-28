import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from "../shared/config/config";
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  endpoint: string = URL_SERVICES
  constructor(private http: HttpClient) { }

  getPhotos(){
    return this.http.get(`${this.endpoint}photo`).pipe()
  }


}


