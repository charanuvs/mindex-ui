export type Employee = {
  employeeId: string
  firstName: string
  lastName: string
  position: string
  department: string
  directReports: Employee[]
}

export type Compensation = {
  employeeId: string
  salary: number
  effectiveDate: Date
}

export type ReportingStructure = {
  employee: Employee
  numberOfReports: number
}
