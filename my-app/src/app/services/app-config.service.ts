import { Injectable } from "@angular/core";

export interface AppConfig{
    apiUrl: string;
}

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private config: AppConfig | null = null;
    
    async load(): Promise<void>{
        const response = await fetch('config.json');
        if (!response.ok){
            throw new Error(`Failed to load config: ${response.statusText}`);
        }
        this.config = await response.json();
    }

    get apiUrl(): string {
        if (!this.config?.apiUrl){
            throw new Error('App config not loaded or apiUrl is missing');
        }
        return this.config.apiUrl;
    }
}