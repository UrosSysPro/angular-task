export type TimeEntry = {
  id:string,
  employeeName:string,
  startTimeUtc:Date,
  endTimeUtc:Date,
  note:string,
  deleted:boolean,
}
export type TimeEntryDto ={
  Id:string,
  EmployeeName:string,
  StartTimeUtc:string,
  EndTimeUtc:string,
  EntryNotes:string,
  DeletedOn:string|null,
}

export function timeEntryDtoToModel(dto: TimeEntryDto): TimeEntry {
  return {
    id:dto.Id,
    employeeName:dto.EmployeeName,
    note:dto.EntryNotes,
    startTimeUtc:new Date(Date.parse(dto.StartTimeUtc)),
    endTimeUtc:new Date(Date.parse(dto.EndTimeUtc)),
    deleted:dto.DeletedOn==null,
  }
}
