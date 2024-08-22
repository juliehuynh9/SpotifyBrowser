import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';
import { TrackListComponent } from '../../components/track-list/track-list.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule,TrackListComponent, CarouselComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.scss'
})
export class ArtistPageComponent implements OnInit {
	artistId:string | undefined;
	artist:ArtistData | undefined;
	relatedArtists:ArtistData[] | undefined;
	topTracks:TrackData[] | undefined;
	albums:AlbumData[] | undefined;
  // define carousel identifiers 
  album_carousel:string = "static";
  related_artist_carousel = "artists";

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id') || "";
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((artist) => {
      this.artist = artist;
    })
    
    this.spotifyService.getRelatedArtists(this.artistId).then((artists) => {
      this.relatedArtists = artists;
    })

    this.spotifyService.getTopTracksForArtist(this.artistId).then((top_tracks) => {
      this.topTracks = top_tracks;
    })

    this.spotifyService.getAlbumsForArtist(this.artistId).then((album) => {
      this.albums = album;
    })
  }

}
