import { Injectable,isDevMode } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { URL_SERVICES } from '../shared/config/config';




@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

//  import endpoint service
  apiUrl = URL_SERVICES;
 

  constructor(private http: HttpClient) { 
  }

  up(formData, path){
    const resp =  this.http.put(`${this.apiUrl}`+path, formData);
    return resp
  }  

  
}
