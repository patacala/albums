import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from "../shared/config/config";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  endpoint: string = URL_SERVICES
  constructor(private http: HttpClient) { }

  getAlbums(){
    return this.http.get(`${this.endpoint}album`).pipe()
  }

  createAlbum(album){
    return this.http.post(`${this.endpoint}album`, album)
  }
}
