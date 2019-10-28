import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup,FormControl, Validators, RequiredValidator } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlbumService } from 'src/app/services/album.service';
import { ActivatedRoute } from "@angular/router";
import { HomeComponent } from "../../components/home/home.component";
import { Router } from "@angular/router";

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  fileUpload: any = {};
  error:string ='';
  arrayAlbum: any = [];
  filename: string ='';
  albumForm: string ='';
  actualPage: string = ''

  formFile: any = {
    album: '',
    profile: '',
    favorite: false
  }

  @ViewChild(HomeComponent, {static: false}) home: HomeComponent;


  constructor(private modalService: BsModalService,
              private fileUploadService: FileUploadService, 
              private albumService: AlbumService,
              private http:HttpClient,
              public sanitize: DomSanitizer,
              public route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getAlbum()

    // this.route
  }

  getAlbum(){
    this.albumService.getAlbums().subscribe((response: any) => {
      this.arrayAlbum = response.albums;
      console.log(this.arrayAlbum)
    })
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onChangeFile(event){
    // debugger
    if(event.target.files.length > 0){
      const profile = event.target.files[0];
      const max = 1024000;
      if(profile.size > max ){
        this.formFile.profile =''
        $("#file").val('')
        Swal.fire({
          title: 'Error!',
          text: 'file exceeds the allowed weight',
          type: 'warning',
          confirmButtonText: 'Ok'
        })
      }else{
        this.filename = event.target.files[0].name
        this.formFile.profile = profile
      }
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('album',this.formFile.album);
    // formData.append('favorite',this.formFile.favorite);
    formData.append('file',this.formFile.profile);
    if($("#file").val('') != '' ){
      this.fileUploadService.up(formData, 'upload').subscribe(
        res => {
          
          // setTimeout(() => {
          //   this.home.getPhotos();
          // }, 3000);
          
          this.router.navigateByUrl('/');

          Swal.fire({
            title: 'Good Job!',
            text: 'Photo uploaded successfully',
            type: 'success',
            confirmButtonText: 'Ok'
          })
          
          this.fileUpload = res
          this.modalRef.hide();
        },
        err => this.error = err
      )
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'You did not select any file to upload',
        type: 'warning',
        confirmButtonText: 'Ok'
      })
      
    }
  }

  saveAlbum(){
    debugger
    let album = {
      name: this.albumForm 
    }
    if(this.albumForm != ''){
      this.albumService.createAlbum(album).subscribe((response:any) => {   
        if(response.ok){
          Swal.fire({
            title: 'Good Job!',
            text: 'Album saved successfully',
            type: 'success',
            confirmButtonText: 'Ok'
          })
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'Error saving album',
            type: 'error',
            confirmButtonText: 'Ok'
          })
        }     
      });

    }else{
      Swal.fire({
        title: 'Error!',
        text: 'the field cannot be empty',
        type: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

}
