import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "../store"
import { Compensation, Employee } from "../types"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const EmployeeDetails = () => {
  const [tabValue, setTabValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const employee = useAppSelector((state) => state.employee.employee)
  const compensation = useAppSelector((state) => state.employee.compensation)
  const numberOfReports = useAppSelector(
    (state) => state.employee.numberOfReports
  )

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Employee" />
          <Tab label="Compensation" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Table>
          <TableRow>
            <TableCell>Employee Id</TableCell>
            <TableCell>{employee.employeeId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>{employee.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last name</TableCell>
            <TableCell>{employee.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>{employee.position}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Department</TableCell>
            <TableCell>{employee.department}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Direct reports</TableCell>
            <TableCell>
              {employee.directReports?.map((dr) => dr.employeeId).join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Number of reports</TableCell>
            <TableCell>
              {numberOfReports}
            </TableCell>
          </TableRow>
        </Table>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Effective date</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          {compensation.map((compEntry) => (
            <TableRow>
              <TableCell>{compEntry?.effectiveDate.toString()}</TableCell>
              <TableCell>{compEntry.salary}</TableCell>
            </TableRow>
          ))}
        </Table>
      </TabPanel>
    </>
  )
}

export default EmployeeDetails
