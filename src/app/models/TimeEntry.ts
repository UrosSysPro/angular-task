export type TimeEntry = {
  id:string,
  employeeName:string,
  startTimeUtc:Date,
  endTimeUtc:Date,
  totalHoursInMonth:number,
  note:string,
  deleted:boolean,
}
export type TimeEntryDto ={
  Id:string,
  EmployeeName:string,
  StarTimeUtc:string,
  EndTimeUtc:string,
  EntryNotes:string,
  DeletedOn:string|null,
}

export function timeEntryDtoToModel(dto: TimeEntryDto): TimeEntry {
  const numberFormat=new Intl.NumberFormat("en-US",{
    maximumFractionDigits:0,
    minimumFractionDigits:0,
  });
  const startDate=new Date(Date.parse(dto.StarTimeUtc));
  const endDate=new Date(Date.parse(dto.EndTimeUtc));
  const totalTime=parseInt(numberFormat.format((endDate.getTime()-startDate.getTime())/1000/3600));
  return {
    id:dto.Id,
    employeeName:dto.EmployeeName,
    note:dto.EntryNotes,
    startTimeUtc:startDate,
    endTimeUtc:endDate,
    totalHoursInMonth:totalTime,
    deleted:dto.DeletedOn==null,
  }
}
