import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeePieChart} from '../employeePieChart/employeePieChart';
import {EmployeeTable} from '../employeeTable/employeeTable';
import {AzureWebsiteService} from '../../services/AzureWebsiteService';
import {TimeEntry, timeEntryDtoToModel} from '../../models/TimeEntry';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeePieChart, EmployeeTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private code:string = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
  private azureWebsiteService:AzureWebsiteService=inject(AzureWebsiteService);
  timeEntries=signal<TimeEntry[]|null>(null);

  ngOnInit() {
    // this.azureWebsiteService.getMeetingEntries(this.code).subscribe(dtoEntries => {
    const observer = this.azureWebsiteService.getMeetingEntries(this.code)
    observer.subscribe(dtoEntries => {
      this.timeEntries.set(dtoEntries.map(timeEntryDtoToModel));
    });
  }
}
