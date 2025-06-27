import {Component} from '@angular/core';

type EmployeePieChartData = {
  name: string,
  value: number
}

@Component({
  selector: 'employee-pie-chart',
  templateUrl:'./employeePieChart.html',
  styleUrls: ['./employeePieChart.css']
})

export class EmployeePieChart {
  enteries: EmployeePieChartData[]=[];
}
