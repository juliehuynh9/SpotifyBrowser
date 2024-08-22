import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData | undefined;

  constructor() { }

  ngOnInit() {
  }

}