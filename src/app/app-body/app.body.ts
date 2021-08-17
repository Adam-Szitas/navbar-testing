import { Component, HostListener, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


document.addEventListener('scroll',GetActiveContainer);
window.onload = function():void{
    if((window.innerHeight < 1080) && (window.innerHeight < window.innerWidth)){
        GetActiveContainer();
    }
}
function GetActiveContainer():void {
    //number of homeContainers
    let homeContainerNum = document.getElementsByClassName('homeContainers').length;
    //number of full body height
    let body = document.body;
    let maxHeight = body.scrollHeight;
    //get height of each homeContainers
    let homeCtNumHeight = document.getElementsByClassName('homeContainers');

    let activeDivNum = homeContainerNum - Math.round((maxHeight-window.pageYOffset - 200)/600);


    const homeContainers = Array.from(document.getElementsByClassName('homeContainers'));
    homeContainers.forEach(element => {
        if(element.classList.contains('activeHomeContainer')){
            element.classList.remove('activeHomeContainer');
        }
    });
    homeCtNumHeight[activeDivNum].classList.add('activeHomeContainer')
}

@Component({
  selector: 'app-body',
  templateUrl: 'app.body.html',
  styleUrls: [
      '../app.component.scss'
  ],
  animations:[
      //triggering first the overlay and second the div inside
      trigger('openCloseOverlay',[
        state('open',style({
            display: 'block',
            height: '65vh',
        })),
        state('closed', style({
            display: 'none',
            height: '0vh'
        })),
        transition('open => closed,closed => open', [
            animate('0.5s')
        ])
      ]),
      trigger('openClose',[
          //state if open
          state('open', style({
            height: '65vh',
            opacity: 1,
            backgroundColor: 'white',
            zIndex: 10,
          })),
          state('closed', style({
            height: '0',
            opacity: 0,
            backgroundColor: 'transparent',
            zIndex: 0
          })),
          transition('open => closed, closed => open', [
            animate('1s')
          ])
      ]),
      /*trying to trigger
      trigger('backgroundSwitching',[
        state('waya',style({
            backgroundImage: 'url(../assets/body-images/waya-min.png)'
        })),
        state('vanregals',style({
            backgroundImage: 'url(../assets/body-images/vanregals-min.png)'
        })),
        state('myespm',style({
            backgroundImage: 'url(../assets/body-images/myespm-min.png)'
        })),
        transition('waya => vanregals',[
            animate('0.5s')
        ]),
        transition('waya => myespm',[
            animate('0.5s')
        ]),
        transition('vanregals => waya',[
            animate('0.5s')
        ]),
        transition('vanegals => myespm',[
            animate('0.5s')
        ]),
        transition('myespm => vanregals',[
            animate('0.5s')
        ])
      ])*/
  ]
})

export class AppBodyComponent{
    isOpen = false;
    canReset = false;
    show:number[] = [];


    sendForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })


    //From this we are starting to send the data from form to a file via POST
    //which we can't really test because of this page is running on localhost only, not on webserver and we don't even have
    //wamp/lamp-server installed yet. But I believe in this. Let's get back to learn!
    // This needs to be in the "Send" button as an attribute -->(click)="SendMail([Name.value,Email.value,Phone.value,Topic.value,Description.value])"<--
    /*
    constructor(private http: HttpClient) {
    }

    errors:any = "";
    URL:string="";
    //get values from mail popup
    SendMail(val:string[]):Observable<any>{

        this.URL = "https://";
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        let data = "firstData = 5";

        return this.http.post(this.URL,JSON.stringify(data)).pipe(catchError(this.errors));
    }
    */

    public nameOfSender = 'Add us a name!';
    Log(nameOfSender:string){
        console.log(nameOfSender);
    }

    ChangeBackgroundImage(toImage:string,element:string){
        this.canReset = false;
        if(toImage && element){
            let elBgChange = document.getElementById(element);
            if(elBgChange){
                elBgChange.style.backgroundImage = 'url(../assets/body-images/'+toImage+'-min.png)';
            };
        }
    }
    setBgBackToStart(element:string){
        this.canReset = true;
        setTimeout(() =>{
            if(element && this.canReset){
                let elBgChange = document.getElementById(element);
                if(elBgChange){
                    elBgChange.style.backgroundImage = '';
                }
            }
        },2000);
    }

    submitForm(){

      if(this.sendForm.valid){
        console.log(this.sendForm.value);

      }

    }


    @HostListener('document:keydown.escape', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.stopImmediatePropagation;
        this.isOpen = false;
    }

    toggle(){
        this.isOpen = !this.isOpen;
    }

    Relocate(href:string):void{
        window.open(href,'_blank');
    }
    divs:any[] = [
        {
            divClasses: ['middle pd-t-5 hoverBgT'],
            divId: 'home',
            including: 'Turn your ideas into reality.',
            style: ['background-color: rgba(0,0,0,0.2)'],
        },
        {
            divClasses: ['middle pd-t-5 hoverBgT'],
            divId: 'portfolio',
            including: "You can check some works I made. These have simple and complicated functions with reason -> Everything for the Customer needs! My AIM is to serve the Customers which includes not just one-time job but service either.",
            style: ["background-position: center; background-repeat: no-repeat; background-size: cover; filter: saturate(30%)"],
            id: 'switchBgImage',
            buttons: [{
                button:'MyESPM',
                link: 'https://myespm.eu',
                background: 'myespm',
            },
            {
                button: 'WAYA',
                link: 'http://waya.sk',
                background: 'waya',
            },
            {
                button: 'VANREGALS',
                link: 'http://vanregals.sk',
                background: 'vanregals'
            }
        ]},
        {
            divClasses: ['middle pd-t-5 hoverBgT'],
            divId: 'about',
            including: 'What is my weapon as Web Developer? \n This is a great question. But the answer is not simple. For those who wants to belong to the group of the best developers must have the property of Intelligence. What does that mean? In the world of the internet every staff is just changing continuously. If you want to stay on the top you have to learn about things you already learned. This is the price we pay all day long.',
            style: ["background-color: rgba(0,0,0,0.2)"],
            controls:[{
                language: 'Angular',
                icon: '../../../../assets/icons/angular.png',
                script: '<div *ngIf="statement == true">shown</div>\n\
                <div *ngIf="statement == false">[empty]</div>\n\
                export clas AppComponent{\n\
                    statement = true\n\
                }',
            },{
                language: 'JavaScript',
                icon: '../../../../assets/icons/javascript.png',
                script: '<script>\n\
                element.style.color = "red"\
                \n</script>',
            },{
                language: 'jQuery',
                icon: '../../../../assets/icons/jquery.png',
                script: '$("elem").on("click",\nfunction(e){\
                    $(this).css("background-color","red")})',
            },{
                language: 'JSON',
                icon: '../../../../assets/icons/json.png',
                script: '{\
                    "just_a_name": [\
                            {\
                                "item_one": "Name of item 1",\n\
                                "item_two": "Name of item 2",\n\
                            }\
                        ]\
                    }',
            },{
                language: 'HTML5',
                icon: '../../../../assets/icons/html.png',
                script: '<input type="number" value="144" min="10"\n\
                    max="150" name="Name" step=".01">',
            },{
                language: 'CSS3',
                icon: '../../../../assets/icons/css.png',
                script: 'input{\n\
                        position: relative;\n\
                        width: 500px;\n\
                        background-color: red;\n\
                    }',
            },{
                language: 'PHP',
                icon: '../../../../assets/icons/php.png',
                script: '$conn->query("SELECT * FROM table_name AS TN\n\
                    RIGHT JOIN second_table_name AS STN\n\
                    ON (TN.ID = STN.TNID) WHERE(isDeleted = FALSE)")',
            },{
                language: 'SQL',
                icon: '../../../../assets/icons/sql.png',
                script: 'UPDATE table SET\n\
                    item_one="FirstItem",\n\
                    item_two="SecondItem",\n\
                    item_date="01.01.2020"\n\
                    WHERE(ID = "1" AND TRUE)',
            }]
        },
        {
            divClasses: ['middle pd-t-5 hoverBgT'],
            divId: 'contact',
            list: [{
                left: 'Name:',
                right: 'Ádám Szitás'
            },{
                left: 'Phone:',
                right: '+421 908 731 893'
            },{
                left: 'E-mail:',
                right: 'adam.szitas.as@gmail.com'
            },{
                middle: 'Or just Click me!',
                contactPop: 'contactMe'
            }],
            style: ["background-image: url('../../../../assets/body-images/about-min.png'); background-color: #ccc; background-position: center; background-repeat: no-repeat; background-size: cover"],
        }
    ]
}
