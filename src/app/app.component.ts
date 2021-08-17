import { Component, Directive, HostListener, NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Icon, IconName, IconPrefix, IconProp, library } from '@fortawesome/fontawesome-svg-core';
import { faHome,faFilm,fas, faInfo, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { far, faUser } from '@fortawesome/free-regular-svg-icons';


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
})

export class AppComponent {

  ScrollTo(el:string){
    let elem = document.getElementById(el as string);
    if(elem){
      elem.scrollIntoView({
        behavior: 'smooth', 
        block: 'center'
      });
    }
  }

    constructor(library: FaIconLibrary){
      library.addIconPacks(fas,far);
      library.addIcons(faHome,faFilm,faUser,faInfo,faEnvelope);
    }

  title = 'navbar-testing';

  navItems = [
      {orientation: 'left',icon: faHome,button: 'home', value: 'home',hasChildren: false},
      {orientation: 'right',icon: faEnvelope,button: 'contact', value: 'contact', hasChildren: false},
      {orientation: 'right',icon: faInfo,button: 'about', value: 'about', hasChildren: false},
      {orientation: 'right',icon: faUser,button: 'portfolio', value: 'portfolio', hasChildren: false},
  ]
}
