import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AzureWebsiteService {
  private apiUrl: string = "https://rc-vault-fap-live-1.azurewebsites.net/api";
  private http: HttpClient = inject(HttpClient);

  getMeetingEnteries(code: string){
    return this.http.get(`${this.apiUrl}/gettimeenteries?code=${code}`);
  }
}
