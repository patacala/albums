import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from "../shared/config/config";
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  endpoint: string = URL_SERVICES
  constructor(private http: HttpClient) { }

  // get all photos
  getPhotos(){
    return this.http.get(`${this.endpoint}photo`).pipe()
  }

  // get all photos by album
  getPhotosByAlbum(id){
    return this.http.get(`${this.endpoint}photo/find-album/${id}`).pipe()
  }

  // get all photos by name
  getPhotosByName(name){
    return this.http.get(`${this.endpoint}photo/find/${name}`).pipe()
  }

  // Delete photo fisical en data
  deletePhoto(id){
    return this.http.delete(`${this.endpoint}photo/${id}`).pipe()
  }

  // update
  updatePhoto(photo: any) {
    return this.http.put(`${this.endpoint}photo/${photo._id}`,photo).pipe()
  }


}


