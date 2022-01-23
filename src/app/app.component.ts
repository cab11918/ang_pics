import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { ImgCardComponent } from './img-card/img-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  images: Array<String> = [];
  current: number = 0;

  /**
   * 
   * @param http Angular http请求
   */
  constructor(private http: HttpClient) {
  }

  /**
   * 图片懒加载发送有限的请求并把图片加入到总数组中
   * @param num 图片请求数量
   */
  private getImages = (num: number) => {
    const httpOptions = {
     
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'header',
        'Access-Control-Expose-Headers': 'serve-header',
        'Access-Control-Allow-Methods': 'methods',
        'Access-Control-Max-Age': '1800', // 30min = 1800s
      
    };

    let temp = 0
    while (temp < num) {
      function getRandomArbitrary(min:number, max:number) {
        return Math.floor(Math.random() * (max - min) + min)*2;
    }

      this.http.get(`https://picsum.photos/${getRandomArbitrary(100,500)}/${getRandomArbitrary(100,500)}/?image=${temp+ this.current}`,{params: httpOptions}).subscribe((data: any) => {
        console.log(data.url)
        this.images.push(data)
      }, error =>{
        if(error.status !== 404) {
          this.images.push(error.url)
        }
       }),
      temp++
    }
    this.current += num

  }

  ngOnInit(): void {
    this.getImages(20)
    window.addEventListener('scroll',()=>{
      if(window.scrollY+ document.body.clientHeight>=document.body.scrollHeight ){
        this.getImages(10)
        console.log(this.current)
      }
    })
  }
}
