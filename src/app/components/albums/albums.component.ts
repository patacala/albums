import { Component, OnInit , TemplateRef } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  arrayAlbum:any = [];
  constructor(private albumService: AlbumService,
              private router: Router) { }

  ngOnInit() {
    this.getAlbum()
  }

  getAlbum(){
    this.albumService.getAlbums().subscribe((response: any) => {
      this.arrayAlbum = response.albums;
      // console.log(this.arrayAlbum)
    })
  }

  navigate(album){
    this.router.navigateByUrl(`album/${album._id}`)
  }

}
