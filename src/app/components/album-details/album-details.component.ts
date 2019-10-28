import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album: string = '';
  arrayPhoto: any = [];

  constructor(private photoService: PhotoService, private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(data => {
      this.album = data.idalbum;
      this.findPhotoByAlbum()
    })

  }

  findPhotoByAlbum(){
    this.photoService.getPhotosByAlbum(this.album).subscribe((response:any)=> {
      if(response.ok){
        this.arrayPhoto = response.photos
      }
    })
  }

}
