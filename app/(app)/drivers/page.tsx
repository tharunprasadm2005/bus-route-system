"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Edit, MoreHorizontal, Trash2, UserPlus } from "lucide-react"

// Sample initial driver data
const initialDrivers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    licenseNumber: "DL-0123456789",
    phone: "9876543210",
    status: "On Duty",
    route: "522 - Anand Vihar to Mehrauli",
    experience: "8 years",
  },
  {
    id: 2,
    name: "Amit Singh",
    licenseNumber: "DL-9876543210",
    phone: "8765432109",
    status: "On Duty",
    route: "340 - Dhaula Kuan to Noida Sector 62",
    experience: "5 years",
  },
  {
    id: 3,
    name: "Priya Sharma",
    licenseNumber: "DL-5678901234",
    phone: "7654321098",
    status: "Off Duty",
    route: "419 - Dwarka to Saket",
    experience: "3 years",
  },
  {
    id: 4,
    name: "Vikram Patel",
    licenseNumber: "DL-4567890123",
    phone: "6543210987",
    status: "On Leave",
    route: "Unassigned",
    experience: "10 years",
  },
  {
    id: 5,
    name: "Sunita Gupta",
    licenseNumber: "DL-3456789012",
    phone: "9543210876",
    status: "On Duty",
    route: "764 - Connaught Place to Gurugram",
    experience: "6 years",
  },
  {
    id: 6,
    name: "Rahul Verma",
    licenseNumber: "DL-2345678901",
    phone: "8432109765",
    status: "Off Duty",
    route: "Unassigned",
    experience: "4 years",
  },
  {
    id: 7,
    name: "Neha Patel",
    licenseNumber: "DL-1234567890",
    phone: "7321098654",
    status: "On Leave",
    route: "Unassigned",
    experience: "7 years",
  },
]

export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers)
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)
  const [newDriver, setNewDriver] = useState({
    name: "",
    licenseNumber: "",
    phone: "",
    status: "Off Duty",
    route: "Unassigned",
    experience: "",
  })
  const { toast } = useToast()

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.licenseNumber || !newDriver.phone || !newDriver.experience) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      })
      return
    }

    const driver = {
      id: drivers.length + 1,
      ...newDriver,
    }

    setDrivers([...drivers, driver])
    setNewDriver({
      name: "",
      licenseNumber: "",
      phone: ""
    })
    setNewDriver({
      name: "",
      licenseNumber: "",
      phone: "",
      status: "Off Duty",
      route: "Unassigned",
      experience: "",
    })
    setIsAddDriverOpen(false)

    toast({
      title: "Driver Added",
      description: `${driver.name} has been added successfully`,
    })
  }

  const handleDeleteDriver = (id: number) => {
    const driverToDelete = drivers.find((driver) => driver.id === id)
    setDrivers(drivers.filter((driver) => driver.id !== id))

    toast({
      title: "Driver Removed",
      description: `${driverToDelete?.name} has been removed`,
    })
  }

  const handleUpdateDriverStatus = (id: number, status: string) => {
    setDrivers(drivers.map((driver) => (driver.id === id ? { ...driver, status } : driver)))

    const driver = drivers.find((d) => d.id === id)

    toast({
      title: "Status Updated",
      description: `${driver?.name}'s status changed to ${status}`,
    })
  }

  // Filter drivers by status
  const onDutyDrivers = drivers.filter((driver) => driver.status === "On Duty")
  const offDutyDrivers = drivers.filter((driver) => driver.status === "Off Duty")
  const onLeaveDrivers = drivers.filter((driver) => driver.status === "On Leave")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
          <p className="text-muted-foreground">Manage and monitor all DTC bus drivers</p>
        </div>
        <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Enter the details of the new driver. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="license" className="text-right">
                  License No.
                </Label>
                <Input
                  id="license"
                  value={newDriver.licenseNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newDriver.status}
                  onValueChange={(value) => setNewDriver({ ...newDriver, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On Duty">On Duty</SelectItem>
                    <SelectItem value="Off Duty">Off Duty</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  value={newDriver.experience}
                  onChange={(e) => setNewDriver({ ...newDriver, experience: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 5 years"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddDriver}>
                Save Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="on-duty" className="space-y-4">
        <TabsList>
          <TabsTrigger value="on-duty">On Duty ({onDutyDrivers.length})</TabsTrigger>
          <TabsTrigger value="off-duty">Off Duty ({offDutyDrivers.length})</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave ({onLeaveDrivers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="on-duty">
          <Card>
            <CardHeader>
              <CardTitle>On Duty Drivers</CardTitle>
              <CardDescription>Drivers currently on active duty</CardDescription>
            </CardHeader>
            <CardContent>
              <DriverTable
                drivers={onDutyDrivers}
                onDelete={handleDeleteDriver}
                onUpdateStatus={handleUpdateDriverStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="off-duty">
          <Card>
            <CardHeader>
              <CardTitle>Off Duty Drivers</CardTitle>
              <CardDescription>Drivers currently off duty</CardDescription>
            </CardHeader>
            <CardContent>
              <DriverTable
                drivers={offDutyDrivers}
                onDelete={handleDeleteDriver}
                onUpdateStatus={handleUpdateDriverStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="on-leave">
          <Card>
            <CardHeader>
              <CardTitle>Drivers on Leave</CardTitle>
              <CardDescription>Drivers currently on leave</CardDescription>
            </CardHeader>
            <CardContent>
              <DriverTable
                drivers={onLeaveDrivers}
                onDelete={handleDeleteDriver}
                onUpdateStatus={handleUpdateDriverStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Driver Table Component
function DriverTable({
  drivers,
  onDelete,
  onUpdateStatus,
}: {
  drivers: any[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>License Number</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No drivers found in this category
            </TableCell>
          </TableRow>
        ) : (
          drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-medium">{driver.name}</TableCell>
              <TableCell>{driver.licenseNumber}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.route}</TableCell>
              <TableCell>{driver.experience}</TableCell>
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
                    {driver.status !== "On Duty" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(driver.id, "On Duty")}>
                        Set to On Duty
                      </DropdownMenuItem>
                    )}
                    {driver.status !== "Off Duty" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(driver.id, "Off Duty")}>
                        Set to Off Duty
                      </DropdownMenuItem>
                    )}
                    {driver.status !== "On Leave" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(driver.id, "On Leave")}>
                        Set to On Leave
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(driver.id)} className="text-red-600">
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

