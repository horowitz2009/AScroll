import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from "./product";
import { ProductDatastoredService } from "./product-datastored.service";

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component( {
    selector: 'app-product',
    templateUrl: './product.component.html',
    styles: [`
    :host /deep/ .ngx-gallery-icon {
          font-size: 100px;
        }
    
    `
    ],
    encapsulation: ViewEncapsulation.None
} )
export class ProductComponent implements OnInit {

    product$: Observable<Product>;
    //product$: Product;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductDatastoredService
    ) { }

    ngOnInit() {
        this.product$ = this.route.paramMap
            .switchMap(( params: ParamMap ) =>
                this.service.getProduct( params.get( 'id' ) ) );

        const x = 1000;
        const y = 750;
        const ar = x / y;
        const n = 5;
        const m = 5;
        const tw = ( x - ( n - 1 ) * m ) / n;
        const th = tw / ar;
        console.log("tw = " + tw);
        console.log("th = " + th);
        
        this.galleryOptions = [
            {
                width: '600px',
                height: '598px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 5,
                thumbnailMargin: 5,
                imageSwipe: true,
                previewSwipe: true,
                previewCloseOnClick: true,
                previewCloseOnEsc: true, 
                previewKeyboardNavigation: true, 
                
                previewZoom: true,
                previewZoomStep: 0.1,
                previewZoomMax: 3.0,
                arrowPrevIcon: 'fa fa-angle-left',
                arrowNextIcon: 'fa fa-angle-right',
                
                
                
                
                imageArrowsAutoHide: true
            }
        ];
        /*,
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 75,
                thumbnailsPercent: 25,
                thumbnailsMargin: 5,
                thumbnailMargin: 5,
                imageArrowsAutoHide: true
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }*/

        this.galleryImages = [
            {
                small: 'assets/products/product-1.jpg',
                medium: 'assets/products/product-1.jpg',
                big: 'assets/products/product-1.jpg',
                description: "PRIMARY image this is"
            },
            {
                small: 'assets/products/product-1a.jpg',
                medium: 'assets/products/product-1a.jpg',
                big: 'assets/products/product-1a.jpg',
                description: "SECOND image this is. LOREM IPSUM BLAH BLAH"
            },
            {
                small: 'assets/products/product-1b.jpg',
                medium: 'assets/products/product-1b.jpg',
                big: 'assets/products/product-1b.jpg',
                description: "Third image this is"
            },
            {
                small: 'assets/products/product-1c.jpg',
                medium: 'assets/products/product-1c.jpg',
                big: 'assets/products/product-1c.jpg',
                description: "SECOND image this is. LOREM IPSUM BLAH BLAH"
            }
        ];

    }

    gotoProducts( product: Product ) {
        const productId = product ? product.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        //this.router.navigate(['', { id: productId, foo: 'foo' }]);
        this.router.navigate( [''] );
    }

}
