import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeEntry, TimeEntryDto} from '../models/TimeEntry';

@Injectable({providedIn: 'root'})
export class AzureWebsiteService {
  private apiUrl: string = "https://rc-vault-fap-live-1.azurewebsites.net/api";
  private http: HttpClient = inject(HttpClient);

  getMeetingEntries(code: string){
    const url=`${this.apiUrl}/gettimeentries?code=${code}`
    return this.http.get<TimeEntryDto[]>(url);
  }
  getMeetingEntriesError(code: string){
    const url=`${this.apiUrl}/gettimeentries.lol?code=${code}`
    return this.http.get<TimeEntryDto[]>(url);
  }
}
