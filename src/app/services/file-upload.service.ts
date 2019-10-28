import { Injectable,isDevMode } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { URL_SERVICES } from '../shared/config/config';




@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

 
  apiUrl = URL_SERVICES;
 

  constructor(private http: HttpClient) { 
  }



  up(formData, path){
    const resp =  this.http.put(`${this.apiUrl}`+path, formData);
    return resp
  }

  upload(formData){
    return this.http.post(`${this.apiUrl}`, formData,{
      observe:'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData){
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);        
        
      case HttpEventType.Response:
        return this.apiResponse(event);        
        
    
      default:
        return `File "${formData.get('profile').name}" supuring upload event `; 
        
    }
  }

  private fileUploadProgress(event){
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone} 
  }

  private apiResponse(event){
    return event.body;
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Ocurrio un error:', error.error.message);
    }else{
      console.error(`Backend respondio ${error.status}, El body fue: ${error.error.message}`)
    }
    return throwError('Algo salio mal. por favor intente mas tarde')
  }

}
