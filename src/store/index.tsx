import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { Compensation, Employee, ReportingStructure } from "../types"
import { appFetch } from "../util/http-util"

interface EmployeeSliceState {
  employee: Employee
  compensation: Compensation[]
  numberOfReports: number
}

const initalState: EmployeeSliceState = {
  employee: {
    department: "",
    directReports: [],
    employeeId: "",
    firstName: "",
    lastName: "",
    position: "",
  },
  compensation: [],
  numberOfReports: 0,
}

export const getEmployeeAsync = createAsyncThunk<
  Employee,
  string,
  { state: RootState }
>("getEmployeeAsync", async (id) => {
  const response = await appFetch(`/employee/${id}`, "GET")

  return response as Employee
})

export const getCompensationAsync = createAsyncThunk<
  Compensation[],
  string,
  { state: RootState }
>("getCompensationAsync", async (id) => {
  const response = await appFetch(`compensation/${id}`, "GET")

  return response as Compensation[]
})

export const getNumberOfReportsAsync = createAsyncThunk<
  number,
  string,
  { state: RootState }
>("getNumberOfReportsAsync", async (id) => {
  const response = (await appFetch(
    `employee/${id}/reportingStructure`,
    "GET"
  )) as ReportingStructure

  return response.numberOfReports
})

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeAsync.fulfilled, (state, action) => {
        state.employee = action.payload
      })
      .addCase(getCompensationAsync.fulfilled, (state, action) => {
        state.compensation = action.payload
      })
      .addCase(getNumberOfReportsAsync.fulfilled, (state, action) => {
        state.numberOfReports = action.payload
      })
  },
})

const reducer = combineReducers({
  employee: employeeSlice.reducer,
})

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
