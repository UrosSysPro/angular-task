import {Component, input} from '@angular/core';
import {TimeEntry, TimeEntryPerUser} from '../../models/TimeEntry';
import {Hours} from '../../pipes/Hours';

export type EmployeeTableRowData={
  name: string,
  totalTimeInMonth: number,
}

@Component({
  selector: 'employee-table',
  templateUrl: './employeeTable.html',
  styleUrls: ['./employeeTable.css'],
  imports: [
    Hours
  ]
})
export class EmployeeTable{
  timeEntries=input<TimeEntryPerUser[]|null>(null);
}
