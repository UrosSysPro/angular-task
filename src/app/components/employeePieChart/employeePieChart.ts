import {
  Component,
  input,
  OnInit,
  OnChanges,
  afterEveryRender,
  inject,
  ElementRef,
  viewChild,
  computed
} from '@angular/core';
import {TimeEntry} from '../../models/TimeEntry';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'employee-pie-chart',
  templateUrl:'./employeePieChart.html',
  styleUrls: ['./employeePieChart.css']
})

export class EmployeePieChart
  implements OnChanges
{
  timeEntries=input<TimeEntry[]|null>([]);
  canvasRef=viewChild<ElementRef<HTMLCanvasElement>>("canvas")
  chart=computed<Chart|null>(()=>{
    if(this.timeEntries()&&this.canvasRef()?.nativeElement){
      const entries = this.timeEntries()!.slice(0,20);
      const canvas=this.canvasRef()!.nativeElement;
      console.log("entries",entries);
      console.log("canvas",canvas);
      const chart=new Chart(
        canvas,
        {
          type:"pie",
          data:{
            labels:entries.map(entry=>entry.employeeName),
            datasets:[
              {
                label:"Total Time in Month",
                data:entries.map(entry=>entry.totalHoursInMonth)
              }
            ]
          }
        }
      );
      chart.update();
      return chart;
    }else{
      console.log("data and canvas not found");
      return null;
    }
  });
  ngOnChanges() {
    this.chart()?.update();
  }
}
