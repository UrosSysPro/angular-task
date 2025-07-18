import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {EmployeePieChart} from '../employeePieChart/employeePieChart';
import {EmployeeTable} from '../employeeTable/employeeTable';
import {AzureWebsiteService} from '../../services/AzureWebsiteService';
import {
  TimeEntry,
  TimeEntryDto,
  timeEntryDtoToModel,
  TimeEntryPerUser,
  timeEntryToTimeEntryPerUser
} from '../../models/TimeEntry';
import {catchError, map, of, Subscription} from 'rxjs';

export interface AppState {name:string;}
export const LoadingState:AppState = {name:"loading"};
export class ErrorState implements AppState{
  name="error";
  constructor(public error:string){}
}
export class NormalState implements AppState{
  name="normal";
  constructor(public entries:TimeEntry[]){}
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeePieChart, EmployeeTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private code:string = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
  private azureWebsiteService:AzureWebsiteService=inject(AzureWebsiteService);
  appState=signal<AppState>(LoadingState)
  timeEntriesPerUser=computed(()=>{
    if(this.appState().name=='normal'){
      const appState = this.appState() as NormalState;
      const map=new Map<string, TimeEntryPerUser>();
      for(let entry of appState.entries){
        if(!entry.employeeName)continue;
        if(map.has(entry.employeeName)){
          const current=map.get(entry.employeeName)!;
          map.set(entry.employeeName,{
            ...current,
            TotalHoursInMonth:current.TotalHoursInMonth+entry.totalHoursInMonth
          })
        }else{
          map.set(entry.employeeName,timeEntryToTimeEntryPerUser(entry));
        }
      }
      return Array.from(map.values()).sort((a,b)=>a.TotalHoursInMonth<b.TotalHoursInMonth?1:-1);
    }else return [] as TimeEntryPerUser[];
  });

  requestData(){
    //reset appState
    this.appState.set(LoadingState);

    //make and handle request
    this.azureWebsiteService.getMeetingEntries(this.code)
      .pipe(
        map(dtoEntries=>{return dtoEntries.map(timeEntryDtoToModel);}),
        catchError((error,observer)=>{return of(error);})
      )
      .subscribe((value:TimeEntry[]|any)=>{
        if(Array.isArray(value)){
          console.log("is array",value);
          this.appState.set(new NormalState(value as TimeEntry[]));
        }else{
          console.log("[ERROR] request threw error:",value);
          this.appState.set(new ErrorState(value.message));
        }
      });
  }

  ngOnInit() {
    this.requestData();
  }
}
