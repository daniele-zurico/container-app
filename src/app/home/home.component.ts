import {Component, OnInit, ElementRef, AfterViewInit, NgZone} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    constructor(public el: ElementRef, public route: ActivatedRoute, private http: Http, private zone: NgZone) {
    }

    ngOnInit() {
    }

    public ngAfterViewInit(): void {
        this.route.url.subscribe((value) => {
            let app = null;
            if (value.length > 0) {
                app = value[1].path;
            }
            console.log(app);
            if (app === '123') {

                this.getResources(['http://localhost:4300/inline.bundle.js',
                    'http://localhost:4300/vendor.bundle.js', 'http://localhost:4300/main.bundle.js',
                    'http://localhost:4300/entrypoint.js']).subscribe((files) => {
                    let module = {};

                    for (let i = 0; i < files.length; i++) {
                        this.zone.runOutsideAngular(() => {
                            eval(files[i]);
                        });
                    };


                    //debugger;
                    //module.exports.bootstrap();
                    //eval(files);

                    // this.getApp('http://localhost:4300/entrypoint.js').subscribe((text) => {
                    //     eval(files);
                    // });
                });


                // this.getApp('http://localhost:4300/entrypoint.js').subscribe((text) => {
                //     let module = {};
                //     console.log(text);
                //     eval(text);
                //     console.log(text);
                //     // test.exports.bootstrap(this.el.nativeElement.innerHTML, undefined, () => {
                //     //     console.log('app has bootstrapped');
                //     // });
                // });


                // this.el.nativeElement.innerHTML = `
                //    <object type="text/html" data="http://localhost:4300" style="width:100%; height:100%;"></object>`;
            } else {
                this.el.nativeElement.innerHTML = 'Jono 124';
            }
        });
    }

        /**
         * It returns the content of the url that you called
         * It should be moved to a service
         *
         * @param url
         * @returns {Observable<R>}
         */
    public
        getResources(urls
    :
        Array < string >
    ):
        any
        {
            return Observable.forkJoin(_.map(urls, (url) => {
                return this.http.get(url)
                    .map((res: Response) => res.text());
            }));
        }

    }
