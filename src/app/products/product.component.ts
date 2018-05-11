import 'rxjs/add/operator/switchMap';
import { Component, OnInit, DoCheck, OnChanges, SimpleChanges, HostBinding, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from "./product";
import { ImageItem } from "./image-item";
import { ProductDatastoredService } from "./product-datastored.service";

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BsModalService } from "ngx-bootstrap";
import { CartViewService } from "../cart/cart-view.service";

@Component( {
    selector: 'app-product',
    templateUrl: './product.component.html',
    styles: [`
    
    
      ngx-gallery .ngx-gallery-icon {
        font-size: 50px !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails .ngx-gallery-icon {
        font-size: 40px !important;
      }
      
      ngx-gallery ngx-gallery-image ngx-gallery-arrows .ngx-gallery-arrow-wrapper { 
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 9% !important;
        z-index: 1049 !important;
      }
      
      ngx-gallery ngx-gallery-image ngx-gallery-arrows .ngx-gallery-arrow-wrapper.ngx-gallery-arrow-left { 
        background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 9% !important;
        z-index: 1049 !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails ngx-gallery-arrows .ngx-gallery-arrow-wrapper { 
        background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 6% !important;
        z-index: 1049 !important;
      }
      
      ngx-gallery ngx-gallery-thumbnails ngx-gallery-arrows .ngx-gallery-arrow-wrapper.ngx-gallery-arrow-left { 
        background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.16) 100%) !important;
        width: 6% !important;
        z-index: 1049 !important;
      }
      
      .gallery-wrapper {
 
  width: 100%;
  padding-bottom: 75%;

//      min-width: 600px;
//      min-height: 600px;
//      display:grid;
    }
      
.container1 {
   position: relative;
   width: 100%;
   padding-top: 100%; /* 1:1 Aspect Ratio */
   margin-top: 1rem;
   margin-bottom: 1rem;
}

.text1 {
   position:  absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   text-align: center;
   font-size: 20px;
   color: white;
}
             
    `
    ],
    encapsulation: ViewEncapsulation.None
} )
export class ProductComponent implements OnInit, DoCheck, OnChanges {

    //product$: Observable<Product>;
    @Input() product: Product;
    @Input() state: string;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductDatastoredService,
        private modalService: BsModalService, private cartService: CartViewService
    ) { }


    public addToCart() {
        this.cartService.addToCartAndOpenModal( this.product );
    }

    private initGallery(): void {
        this.galleryImages = [];
        if ( this.product.additionalAttributes && this.product.additionalAttributes.images ) {
            const images = this.product.additionalAttributes.images;
            for ( let i = 0; i < images.length; i++ ) {
                const im = images[i];
                const imDesc = new ImageItem();
                imDesc.small = im.image;
                imDesc.medium = im.image;
                imDesc.big = im.image;
                imDesc.description = im.description;

                this.galleryImages.push( imDesc );
            }
        } else {
            const imDesc = new ImageItem();
            imDesc.small = this.product.image;
            imDesc.medium = this.product.image;
            imDesc.big = this.product.image;
            imDesc.description = this.product.shortDesc;
            this.galleryImages.push( imDesc );
        }

        if ( this.galleryImages.length === 1 ) {
            this.setupGalleryoptionsForSingle();
        } else {
            this.setupGalleryoptionsForMulti();
        }

    }

    private setupGalleryoptionsForSingle(): void {
        this.galleryOptions = [
            {
                width: '600px',
                height: '480px',

                thumbnails: false,
                thumbnailsArrows: false,
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


                imageArrows: false,

                imageArrowsAutoHide: false
            }
        ];

    }

    private setupGalleryoptionsForMulti(): void {
        this.galleryOptions = [
            {
                width: '100%',
                height: '100%',
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

    }

    ngOnInit() {
        if ( this.product ) {
            this.initGallery();
        } else {
            this.route.paramMap.subscribe(
                ( params: ParamMap ) => {
                    this.product = this.service.getProductById( params.get( 'id' ) );

                    this.initGallery();
                }
            );

        }
    }

    gotoProducts( product: Product ) {
        const productId = product ? product.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        //this.router.navigate(['', { id: productId, foo: 'foo' }]);
        this.router.navigate( [''] );
    }

    ngDoCheck() {
        //this.initGallery();
    }

    ngOnChanges( changes: SimpleChanges ) {
        for ( const propName in changes ) {
            if ( changes.hasOwnProperty( propName ) ) {
                const chng = changes[propName];
                if ( propName === 'state' && chng.currentValue !== "ko" ) {
                    this.initGallery();
                }
            }
        }
    }
}
