import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import {RouterModule} from '@angular/router'
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  name:string | undefined;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string | undefined;
  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }
  ngOnInit() {
  }
  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  populateUserInfo(): void{
    this.spotifyService.aboutMe().then((userInfo) => {
      this.name = userInfo.name;
      this.profile_pic = userInfo.imageURL;
      this.profile_link = userInfo.spotifyProfile;
    })
  }
}