import { Component, Directive, HostListener, NgModule, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Icon, IconName, IconPrefix, IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faHome,faFilm,fas, faInfo, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { far, faUser } from '@fortawesome/free-regular-svg-icons';
import { NgxCaptureService } from 'ngx-capture';
import { delay, tap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


/*
@Directive({selector: 'a[click]'})
export class CountClicks {
  numberOfClicks = 0;
  @HostListener('click', ['$event.target']) onClick(btn:Element) {
    console.log("button", btn, "number of clicks:", this.numberOfClicks++);
  }
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ],
  animations: [
    trigger('w-50', [
      state('w-full',style({
        width: '50%'
      })),
      state('w-0',style({
        width: '0'
      })),
      transition('* => w-0',[
        animate('1s ease-in-out')
      ])
    ])
  ]
})

export class AppComponent {

  img = '';

  constructor(
    library: FaIconLibrary,
    private captureService: NgxCaptureService,
    private _router: Router
    ){
    library.addIconPacks(fas,far);
    library.addIcons(faHome,faFilm,faUser,faInfo,faEnvelope);
  }


  @ViewChild('screen', {static: true}) screen: any;
  //capture
  Capture(){
    this.img = '';
    setTimeout(() => {        //or delay or lagging
      this.captureService.getImage(this.screen.nativeElement, true)
      .pipe(
        tap((img:any) => {
          this.img = img;
        })
      ).subscribe();
        //this._router.navigateByUrl('void');
    }, 2500)
  }

  ScrollTo(el:string){
    let elem = document.getElementById(el as string);
    if(elem){
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }


  title = 'navbar-testing';

  navItems = [
      {orientation: 'left',icon: faHome,button: 'home', value: 'home',hasChildren: false},
      {orientation: 'right',icon: faEnvelope,button: 'contact', value: 'contact', hasChildren: false},
      {orientation: 'right',icon: faInfo,button: 'about', value: 'about', hasChildren: false},
      {orientation: 'right',icon: faUser,button: 'portfolio', value: 'portfolio', hasChildren: false},
  ]
}
