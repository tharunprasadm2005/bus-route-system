"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react"

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0]
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0]

// Sample initial schedule data
const initialSchedules = [
  {
    id: 1,
    busNumber: "DL-1FC-1234",
    routeNumber: "522",
    routeName: "Anand Vihar to Mehrauli",
    departureTime: "06:30 AM",
    arrivalTime: "08:15 AM",
    driver: "Rajesh Kumar",
    status: "On Time",
    date: today,
  },
  {
    id: 2,
    busNumber: "DL-1FC-5678",
    routeNumber: "340",
    routeName: "Dhaula Kuan to Noida Sector 62",
    departureTime: "07:00 AM",
    arrivalTime: "09:00 AM",
    driver: "Amit Singh",
    status: "Delayed",
    date: today,
  },
  {
    id: 3,
    busNumber: "DL-1FC-9012",
    routeNumber: "419",
    routeName: "Dwarka to Saket",
    departureTime: "07:30 AM",
    arrivalTime: "08:45 AM",
    driver: "Vikram Patel",
    status: "On Time",
    date: today,
  },
  {
    id: 4,
    busNumber: "DL-1FC-3456",
    routeNumber: "764",
    routeName: "Connaught Place to Gurugram",
    departureTime: "08:00 AM",
    arrivalTime: "09:30 AM",
    driver: "Sunita Gupta",
    status: "On Time",
    date: today,
  },
  {
    id: 5,
    busNumber: "DL-1FC-7890",
    routeNumber: "118",
    routeName: "Shastri Park to Karol Bagh",
    departureTime: "08:30 AM",
    arrivalTime: "09:45 AM",
    driver: "Priya Sharma",
    status: "Cancelled",
    date: today,
  },
  {
    id: 6,
    busNumber: "DL-1FC-2468",
    routeNumber: "522",
    routeName: "Anand Vihar to Mehrauli",
    departureTime: "10:30 AM",
    arrivalTime: "12:15 PM",
    driver: "Rajesh Kumar",
    status: "Scheduled",
    date: tomorrow,
  },
  {
    id: 7,
    busNumber: "DL-1FC-1357",
    routeNumber: "340",
    routeName: "Dhaula Kuan to Noida Sector 62",
    departureTime: "11:00 AM",
    arrivalTime: "01:00 PM",
    driver: "Amit Singh",
    status: "Scheduled",
    date: tomorrow,
  },
  {
    id: 8,
    busNumber: "DL-1FC-8642",
    routeNumber: "522",
    routeName: "Anand Vihar to Mehrauli",
    departureTime: "06:30 AM",
    arrivalTime: "08:15 AM",
    driver: "Rajesh Kumar",
    status: "Completed",
    date: yesterday,
  },
  {
    id: 9,
    busNumber: "DL-1FC-9753",
    routeNumber: "340",
    routeName: "Dhaula Kuan to Noida Sector 62",
    departureTime: "07:00 AM",
    arrivalTime: "09:00 AM",
    driver: "Amit Singh",
    status: "Completed",
    date: yesterday,
  },
]

export default function SchedulePage() {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)
  const [newSchedule, setNewSchedule] = useState({
    busNumber: "",
    routeNumber: "",
    routeName: "",
    departureTime: "",
    arrivalTime: "",
    driver: "",
    status: "Scheduled",
    date: today,
  })
  const { toast } = useToast()

  const handleAddSchedule = () => {
    if (
      !newSchedule.busNumber ||
      !newSchedule.routeNumber ||
      !newSchedule.routeName ||
      !newSchedule.departureTime ||
      !newSchedule.arrivalTime ||
      !newSchedule.driver ||
      !newSchedule.date
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      })
      return
    }

    const schedule = {
      id: schedules.length + 1,
      ...newSchedule,
    }

    setSchedules([...schedules, schedule])
    setNewSchedule({
      busNumber: "",
      routeNumber: "",
      routeName: "",
      departureTime: "",
      arrivalTime: "",
      driver: "",
      status: "Scheduled",
      date: today,
    })
    setIsAddScheduleOpen(false)

    toast({
      title: "Schedule Added",
      description: `Bus ${schedule.busNumber} has been scheduled successfully`,
    })
  }

  const handleDeleteSchedule = (id: number) => {
    const scheduleToDelete = schedules.find((schedule) => schedule.id === id)
    setSchedules(schedules.filter((schedule) => schedule.id !== id))

    toast({
      title: "Schedule Removed",
      description: `Bus ${scheduleToDelete?.busNumber} schedule has been removed`,
    })
  }

  const handleUpdateScheduleStatus = (id: number, status: string) => {
    setSchedules(schedules.map((schedule) => (schedule.id === id ? { ...schedule, status } : schedule)))

    const schedule = schedules.find((s) => s.id === id)

    toast({
      title: "Status Updated",
      description: `Bus ${schedule?.busNumber} status changed to ${status}`,
    })
  }

  // Filter schedules by date and status
  const todaySchedules = schedules.filter((schedule) => schedule.date === today && schedule.status !== "Completed")
  const upcomingSchedules = schedules.filter(
    (schedule) => schedule.date > today || (schedule.date === today && schedule.status === "Scheduled"),
  )
  const completedSchedules = schedules.filter((schedule) => schedule.status === "Completed" || schedule.date < today)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bus Schedule</h1>
          <p className="text-muted-foreground">Manage and monitor all DTC bus schedules</p>
        </div>
        <Dialog open={isAddScheduleOpen} onOpenChange={setIsAddScheduleOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Clock className="mr-2 h-4 w-4" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
              <DialogDescription>
                Enter the details of the new bus schedule. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="busNumber" className="text-right">
                  Bus Number
                </Label>
                <Input
                  id="busNumber"
                  value={newSchedule.busNumber}
                  onChange={(e) => setNewSchedule({ ...newSchedule, busNumber: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. DL-1FC-1234"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="routeNumber" className="text-right">
                  Route No.
                </Label>
                <Input
                  id="routeNumber"
                  value={newSchedule.routeNumber}
                  onChange={(e) => setNewSchedule({ ...newSchedule, routeNumber: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="routeName" className="text-right">
                  Route Name
                </Label>
                <Input
                  id="routeName"
                  value={newSchedule.routeName}
                  onChange={(e) => setNewSchedule({ ...newSchedule, routeName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departureTime" className="text-right">
                  Departure
                </Label>
                <Input
                  id="departureTime"
                  value={newSchedule.departureTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, departureTime: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 06:30 AM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="arrivalTime" className="text-right">
                  Arrival
                </Label>
                <Input
                  id="arrivalTime"
                  value={newSchedule.arrivalTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, arrivalTime: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 08:15 AM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="driver" className="text-right">
                  Driver
                </Label>
                <Input
                  id="driver"
                  value={newSchedule.driver}
                  onChange={(e) => setNewSchedule({ ...newSchedule, driver: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newSchedule.status}
                  onValueChange={(value) => setNewSchedule({ ...newSchedule, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="On Time">On Time</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddSchedule}>
                Save Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule ({todaySchedules.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingSchedules.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedSchedules.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Bus schedules for today ({new Date().toLocaleDateString()})</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleTable
                schedules={todaySchedules}
                onDelete={handleDeleteSchedule}
                onUpdateStatus={handleUpdateScheduleStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedules</CardTitle>
              <CardDescription>Future bus schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleTable
                schedules={upcomingSchedules}
                onDelete={handleDeleteSchedule}
                onUpdateStatus={handleUpdateScheduleStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Schedules</CardTitle>
              <CardDescription>Past bus schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleTable
                schedules={completedSchedules}
                onDelete={handleDeleteSchedule}
                onUpdateStatus={handleUpdateScheduleStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Schedule Table Component
function ScheduleTable({
  schedules,
  onDelete,
  onUpdateStatus,
}: {
  schedules: any[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bus Number</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
              No schedules found in this category
            </TableCell>
          </TableRow>
        ) : (
          schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell className="font-medium">{schedule.busNumber}</TableCell>
              <TableCell>
                {schedule.routeNumber} - {schedule.routeName}
              </TableCell>
              <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
              <TableCell>{schedule.departureTime}</TableCell>
              <TableCell>{schedule.arrivalTime}</TableCell>
              <TableCell>{schedule.driver}</TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    schedule.status === "On Time"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : schedule.status === "Delayed"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        : schedule.status === "Cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : schedule.status === "Completed"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {schedule.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    {schedule.status !== "On Time" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(schedule.id, "On Time")}>
                        Set to On Time
                      </DropdownMenuItem>
                    )}
                    {schedule.status !== "Delayed" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(schedule.id, "Delayed")}>
                        Set to Delayed
                      </DropdownMenuItem>
                    )}
                    {schedule.status !== "Cancelled" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(schedule.id, "Cancelled")}>
                        Set to Cancelled
                      </DropdownMenuItem>
                    )}
                    {schedule.status !== "Completed" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(schedule.id, "Completed")}>
                        Set to Completed
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(schedule.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

