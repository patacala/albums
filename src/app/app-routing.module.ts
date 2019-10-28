import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'albums', component: AlbumsComponent },
  {path: 'album/:idalbum', component: AlbumDetailsComponent },
  {path: '', redirectTo:'home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
