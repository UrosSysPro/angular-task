import {Component} from '@angular/core';

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
  rows: EmployeeTableRowData[]=[
    {
      name:"default 1",
      totalTimeInMonth: 200,
    },
    {
      name:"default 2",
      totalTimeInMonth: 150,
    },
    {
      name:"default 3",
      totalTimeInMonth: 70,
    },
    {
      name:"default 4",
      totalTimeInMonth: 50,
    },
  ];
}
