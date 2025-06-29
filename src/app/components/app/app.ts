import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeePieChart} from '../employeePieChart/employeePieChart';
import {EmployeeTable} from '../employeeTable/employeeTable';
import {AzureWebsiteService} from '../../services/AzureWebsiteService';
import {TimeEntry, TimeEntryDto, timeEntryDtoToModel} from '../../models/TimeEntry';
import {catchError, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeePieChart, EmployeeTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private code:string = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
  private azureWebsiteService:AzureWebsiteService=inject(AzureWebsiteService);
  isLoading=signal(true)
  subscription=signal<Subscription|null>(null);
  timeEntries=signal<TimeEntry[]|null>(null);
  hasErrorOccurred=signal(false);

  handleDtoEntries(dtoEntries :TimeEntryDto[]) {
    const  entries = dtoEntries.map(timeEntryDtoToModel);
    const map:Map<string,TimeEntry>=new Map();
    for(const entry of entries){
      if(entry.employeeName==null)continue;
      if(map.has(entry.employeeName)){
        const previous=map.get(entry.employeeName)!;
        map.set(entry.employeeName, {
          ...previous,
          totalHoursInMonth:previous.totalHoursInMonth+entry.totalHoursInMonth,
        });
      }else{
        map.set(entry.employeeName, entry);
      }
    }
    const compactedEntries=Array.from(map.values());
    const sortedEntries=compactedEntries.sort((a,b)=>a.totalHoursInMonth<b.totalHoursInMonth?1:-1);
    this.timeEntries.set(sortedEntries);
    this.isLoading.set(false);
  }

  handleError(error:any){
    console.log(error);
    this.hasErrorOccurred.set(true);
    this.isLoading.set(false);
  }

  requestData(){
    //reset app state
    this.isLoading.set(true);
    this.hasErrorOccurred.set(false);
    this.timeEntries.set(null);
    this.subscription()?.unsubscribe();

    //make and handle request
    const observer = this.azureWebsiteService.getMeetingEntries(this.code)
    this.subscription.set(observer.pipe(catchError((error,observable) => {
      this.handleError(error);
      return of([]);
    })).subscribe(dtoEntries => {
      this.handleDtoEntries(dtoEntries);
    }));
  }

  ngOnInit() {
    this.requestData();
  }
}
