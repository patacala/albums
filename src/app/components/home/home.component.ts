import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayPhoto: any = [];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos(){
    this.photoService.getPhotos().subscribe((response: any) => {
      if(response.ok){
        this.arrayPhoto = response.photos
      }
    })
  }

}
