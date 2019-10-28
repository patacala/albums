import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { URL_SERVICES } from "../../shared/config/config";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo.service';
import { AlbumService } from 'src/app/services/album.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  overlideInfo = false;
  endpoint: string = URL_SERVICES+'files/' ;
  @Input() inputPhoto:any = {};
  @Output() outputReload = new EventEmitter();
  arrayAlbum: any = [];
  albumValue: string = '';

  constructor(public sanitize: DomSanitizer, 
              private photoService: PhotoService,
              private albumService: AlbumService) { }

  ngOnInit() {  
      this.getAlbum();
  }

  sanitizerPhoto(photo){
    return this.sanitize.bypassSecurityTrustUrl(photo)
  }

  getTime(date) {
    return moment(date).fromNow(); 
  }

  deletePhoto(id){
    this.photoService.deletePhoto(id).subscribe((response:any) => {
      if(response.ok){
        this.outputReload.emit('')
        Swal.fire({
          title: 'Good Job!',
          text: 'file deleted',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'error deleting the photo',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  deletePhotoAlbun (photo: any){
    photo.album = '';
    this.photoService.updatePhoto(photo).subscribe((response:any) => {
      if(response.ok){
        this.outputReload.emit('')
        Swal.fire({
          title: 'Good Job!',
          text: 'file deleted',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'error deleting the photo',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }
    })
  }


  getAlbum(){
    this.albumService.getAlbums().subscribe((response: any) => {
      this.arrayAlbum = response.albums;
      // console.log(this.arrayAlbum)
    })
  }

  setAlbum(photo){
    photo.album = this.albumValue;
    this.photoService.updatePhoto(photo).subscribe((response:any) => {
      if(response.ok){
        this.outputReload.emit('')
        Swal.fire({
          title: 'Good Job!',
          text: 'file Update',
          type: 'success',
          confirmButtonText: 'Ok'
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'error deleting the photo',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }
    })
  }


}
