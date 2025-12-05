/**
 * Dashboard Interface
 * @example
 * {
 *   "overview": {
 *     "countDocuments": 2,
 *     "countCalls": 34,
 *     "countReceptionist": 5
 *   },
 *   "calendarMetrics": {
 *     "date": "2025-12-01T15:51:21.647Z",
 *     "availableCount": 0,
 *     "confirmedCount": 0,
 *     "toConfirmCount": 0
 *   },
 *   "callHistory": [
 *     {
 *       "date": "2025-12-01T15:51:21.647Z",
 *       "clientName": "Client A",
 *       "durationInSeconds": 3,
 *       "receptionistId": "receptionist1",
 *       "state": "completed"
 *     },
 *     {
 *       "date": "2025-12-01T15:51:21.647Z",
 *       "clientName": "Client B",
 *       "durationInSeconds": 0,
 *       "receptionistId": "receptionist2",
 *       "state": "missed"
 *     },
 *     {
 *       "date": "2025-12-01T15:51:21.647Z",
 *       "clientName": "Client C",
 *       "durationInSeconds": 5,
 *       "receptionistId": "receptionist3",
 *       "state": "completed"
 *     }
 *   ]
 * }
 */
export interface IDashboard {
    overview: IOverview
    calendarMetrics: ICalendarMetrics
    callHistory: Array<ICallHistory>
}
export interface ICalendarMetrics {
    date: string
    availableCount: number
    confirmedCount: number
    toConfirmCount: number
}
export interface ICallHistory {
    date: string
    clientName: string
    durationInSeconds: number
    receptionistId: string
    state: string
}
export interface IOverview {
    countDocuments: number
    countCalls: number
    countReceptionist: number
}
