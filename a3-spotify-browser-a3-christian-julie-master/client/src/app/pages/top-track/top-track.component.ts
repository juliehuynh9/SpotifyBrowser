import { Component, OnInit } from '@angular/core';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { SpotifyService } from '../../services/spotify.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProfileData } from '../../data/profile-data';
@Component({
  selector: 'app-top-track',
  standalone: true,
  imports: [TrackListComponent, CarouselComponent],
  templateUrl: './top-track.component.html',
  styleUrl: './top-track.component.scss'
})
export class TopTrackComponent implements OnInit {
  name: string;
  tracks: TrackData[];
  resources: ResourceData[];
  topArtists = "artists";
  constructor(private spotifyService: SpotifyService) { }
  ngOnInit() {
    this.spotifyService.aboutMe().then((userInfo: ProfileData) => {
      this.name = userInfo.name;
    });
    this.spotifyService.getUserTopTracks().then((userTracks: TrackData[]) => {
      this.tracks = userTracks;
    });
    this.spotifyService.getUserTopArtists().then((userArtists: ResourceData[]) => {
      this.resources = userArtists;
    });
  }
}