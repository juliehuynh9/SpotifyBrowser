import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss'
})

export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[] | undefined;
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
