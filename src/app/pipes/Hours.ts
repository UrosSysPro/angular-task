import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name:"hours"
})
export class Hours implements PipeTransform{
  transform(value:number){
    return `${Math.round(value)}`;
  }
}
