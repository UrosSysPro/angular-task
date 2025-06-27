import {Component, Input} from '@angular/core';
import {TimeEntry} from '../../models/TimeEntry';

@Component({
  selector: 'employee-pie-chart',
  templateUrl:'./employeePieChart.html',
  styleUrls: ['./employeePieChart.css']
})

export class EmployeePieChart {
  @Input() timeEntries!: TimeEntry[]|null;
}
