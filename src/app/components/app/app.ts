import {Component, effect, inject, Injectable, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmployeePieChart} from '../employeePieChart/employeePieChart';
import {EmployeeTable} from '../employeeTable/employeeTable';
import {AzureWebsiteService} from '../../services/AzureWebsiteService';
import {TimeEntries} from '../../models/TimeEntries';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeePieChart, EmployeeTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private code:string = ""
  private azureWebsiteService=inject(AzureWebsiteService);
  private meetingEnteries!:Observable<TimeEntries[]>;

  ngOnInit() {
    console.log("hello world")
  }
}
