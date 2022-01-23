import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.scss']
})
export class ImgCardComponent implements OnInit {
  @Input() img: String = '123';

  constructor() { }

  ngOnInit(): void {
  }

}
