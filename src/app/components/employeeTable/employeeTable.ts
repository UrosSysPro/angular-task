import {Component,Input} from '@angular/core';
import {TimeEntry} from '../../models/TimeEntry';

export type EmployeeTableRowData={
  name: string,
  totalTimeInMonth: number,
}

@Component({
  selector: 'employee-table',
  templateUrl: './employeeTable.html',
  styleUrls: ['./employeeTable.css'],
})
export class EmployeeTable{
  @Input() timeEntries!:TimeEntry[]|null;
}
