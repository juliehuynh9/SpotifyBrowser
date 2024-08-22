import { Component, Input, OnInit } from '@angular/core';
import { TrackFeature } from '../../data/track-feature';
@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [],
  templateUrl: './thermometer.component.html',
  styleUrl: './thermometer.component.scss'
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() trackFeature: TrackFeature | undefined;
  constructor() { }
  ngOnInit() {
  }
}