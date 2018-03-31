import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

    private currentLang: string;

    constructor() {
        this.currentLang = 'en';
    }
    
    setLanguage( lang: string ) {
        this.currentLang = lang;
    }
    
    getLanguage() {
        console.log("MHAHAHAHA", this.currentLang);
        return this.currentLang;
    }

}
