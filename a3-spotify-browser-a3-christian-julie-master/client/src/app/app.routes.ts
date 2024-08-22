import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopTrackComponent } from './pages/top-track/top-track.component';
export const routes: Routes = [
    { path: 'artist/:id', component: ArtistPageComponent},
    { path: 'track/:id', component: TrackPageComponent},
    { path: 'album/:id', component: AlbumPageComponent},
    { path: '', component: HomePageComponent},
    { path: 'top-track', component: TopTrackComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }