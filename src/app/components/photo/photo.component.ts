import { Component, OnInit, Input } from '@angular/core';
import { URL_SERVICES } from "../../shared/config/config";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  endpoint: string = URL_SERVICES+'files/' ;
  @Input() inputPhoto:any = {};

  constructor(public sanitize: DomSanitizer,) { }

  ngOnInit() {    
  }

  sanitizerPhoto(photo){
    return this.sanitize.bypassSecurityTrustUrl(photo)
  }


  

}
