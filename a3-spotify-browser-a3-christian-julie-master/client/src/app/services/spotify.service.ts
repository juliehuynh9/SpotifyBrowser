import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    var uri:string = this.expressBaseUrl + endpoint;
    // console.log('it worked!');
    return firstValueFrom(this.http.get(uri)).then((response) => {
      // console.log('go to the backend!');
      return response;
    }, (err) => {
      // console.log('it didnt work...');
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  // searchFor(category:string, resource:string):Promise<ResourceData[]> {
  //   //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
  //   //Make sure you're encoding the resource with encodeURIComponent().
  //   //Depending on the category (artist, track, album), return an array of that type of data.
  //   //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
  //   const endpoint = '/search/' + category + '/' + encodeURIComponent(resource);

  //   return this.sendRequestToExpress(endpoint).then((result) => {
  
  //     let processedData: ResourceData[] = [];
  
  //     switch (category) {
  //       case 'artist':
  //         processedData = this.processSearchInput(result, 'artists', ArtistData);
  //         break;
  //       case 'track':
  //         processedData = this.processSearchInput(result, 'tracks', TrackData);
  //         break;
  //       default:
  //         processedData = this.processSearchInput(result, 'albums', AlbumData);
  //         break;
  //     }

  //     return processedData;
  //   });
  // }
  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    const endpoint = '/search/' + category + '/' + encodeURIComponent(resource);
  
    return this.sendRequestToExpress(endpoint).then((result) => {
  
      switch (category) {
        case 'artist':
          return this.processSearchInput(result, 'artists', ArtistData) as ArtistData[];
        case 'track':
          return this.processSearchInput(result, 'tracks', TrackData) as TrackData[];
        default:
          return this.processSearchInput(result, 'albums', AlbumData) as AlbumData[];
      }
    });
  }
  
  
  private processSearchInput(result: any, key: string, dataType: any): ResourceData[] {
    const items: ResourceData[] = [];
  
    if (result[key] && result[key]['items']) {
      result[key]['items'].forEach((element: any) => {
        items.push(new dataType(element));
      });
    }
  
    return items;
    return null as any;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const endpoint = '/artist/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((artist) =>{
      return new ArtistData(artist);
    });
    
    return null as any;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    const endpoint = '/artist-related-artists/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) =>
      data['artists'].map((artist: any) => new ArtistData(artist))
    );
   return null as any;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const endpoint = '/artist-top-tracks/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) =>
      data['tracks'].map((track: any) => new TrackData(track))
    );
    return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const endpoint = '/artist-albums/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(endpoint).then((data) =>
      data.items.map((album: any) => new AlbumData(album))
    );
    return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.

    const endpoint = '/album/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((album) =>{
      return new AlbumData(album);
    });
    return null as any;

  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const endpoint = '/album-tracks/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(endpoint).then((data) =>
      data.items.map((track: any) => new TrackData(track))
    );
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const endpoint = '/track/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(endpoint).then((track) =>{
      return new TrackData(track);
    });
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const endpoint = '/track-audio-features/' + encodeURIComponent(trackId);
    const features =[];
    return this.sendRequestToExpress(endpoint).then((data) => {
      TrackFeature.FeatureTypes.forEach(element => {
        features.push(new TrackFeature(element, data[element]))
      });
      console.log(features);
      return features;
    });
    // return null as any;
  }

  getTopTracks(topId:string):Promise<ProfileData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const endpoint = '/me/top/tracks' + encodeURIComponent(topId);
    return this.sendRequestToExpress(endpoint).then((data) =>
      data.items.map((track: any) => new ProfileData(track))
    );
    return null as any;
  }


  async getUserTopData(endpoint: string, dataClass: any): Promise<any[]> {
    try {
      const data = await this.sendRequestToExpress(`/me/top/${endpoint}`);
      return data.items.map((item: any) => new dataClass(item));
    } catch (error) {
      console.error(`Failed to fetch top ${endpoint} for user:`, error);
      throw error;
    }
  }
  
  async getUserTopTracks(): Promise<TrackData[]> {
    return this.getUserTopData('tracks', TrackData);
  }
  
  async getUserTopArtists(): Promise<ArtistData[]> {
    return this.getUserTopData('artists', ArtistData);
  }

  
}
