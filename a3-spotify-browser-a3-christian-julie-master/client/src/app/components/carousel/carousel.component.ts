import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';
import { CommonModule } from '@angular/common';
import { CarouselCardComponent } from '../carousel-card/carousel-card.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselCardComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent implements OnInit {
	@Input() carouselId:string | undefined;
	@Input() resources:ResourceData[] | undefined;

  constructor() { }

  ngOnInit() {
  }

}