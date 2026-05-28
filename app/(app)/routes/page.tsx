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
import { Edit, MapPin, MoreHorizontal, Trash2 } from "lucide-react"

// Sample initial route data
const initialRoutes = [
  {
    id: 1,
    routeNumber: "522",
    name: "Anand Vihar to Mehrauli",
    busName: "Yamuna Express",
    startLocation: "Anand Vihar ISBT",
    endLocation: "Mehrauli Bus Terminal",
    distance: "28.5 km",
    stops: 24,
    busesAssigned: 12,
    status: "Active",
    assignedDriver: "Rajesh Kumar",
  },
  {
    id: 2,
    routeNumber: "340",
    name: "Dhaula Kuan to Noida Sector 62",
    busName: "Rajdhani Line",
    startLocation: "Dhaula Kuan Metro Station",
    endLocation: "Noida Sector 62",
    distance: "32.1 km",
    stops: 28,
    busesAssigned: 15,
    status: "Active",
    assignedDriver: "Amit Singh",
  },
  {
    id: 3,
    routeNumber: "419",
    name: "Dwarka to Saket",
    busName: "Dwarka Express",
    startLocation: "Dwarka Sector 21 Metro Station",
    endLocation: "Saket Metro Station",
    distance: "24.3 km",
    stops: 18,
    busesAssigned: 10,
    status: "Inactive",
    assignedDriver: "Unassigned",
  },
  {
    id: 4,
    routeNumber: "764",
    name: "Connaught Place to Gurugram",
    busName: "Gurugram Shuttle",
    startLocation: "Connaught Place",
    endLocation: "Gurugram Bus Stand",
    distance: "30.8 km",
    stops: 22,
    busesAssigned: 14,
    status: "Active",
    assignedDriver: "Sunita Gupta",
  },
  {
    id: 5,
    routeNumber: "118",
    name: "Shastri Park to Karol Bagh",
    busName: "Central Delhi Line",
    startLocation: "Shastri Park Metro Station",
    endLocation: "Karol Bagh Metro Station",
    distance: "15.2 km",
    stops: 16,
    busesAssigned: 8,
    status: "Maintenance",
    assignedDriver: "Unassigned",
  },
  {
    id: 6,
    routeNumber: "225",
    name: "Rohini to Lajpat Nagar",
    busName: "South Delhi Express",
    startLocation: "Rohini Sector 18",
    endLocation: "Lajpat Nagar Market",
    distance: "22.7 km",
    stops: 19,
    busesAssigned: 0,
    status: "Inactive",
    assignedDriver: "Unassigned",
  },
  {
    id: 7,
    routeNumber: "433",
    name: "Janakpuri to Mayur Vihar",
    busName: "East Delhi Connector",
    startLocation: "Janakpuri District Center",
    endLocation: "Mayur Vihar Phase 1",
    distance: "26.4 km",
    stops: 21,
    busesAssigned: 0,
    status: "Maintenance",
    assignedDriver: "Unassigned",
  },
]

export default function RoutesPage() {
  const [routes, setRoutes] = useState(initialRoutes)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)
  const [newRoute, setNewRoute] = useState({
    routeNumber: "",
    name: "",
    busName: "",
    startLocation: "",
    endLocation: "",
    distance: "",
    stops: "",
    busesAssigned: "0",
    status: "Inactive",
    assignedDriver: "Unassigned",
  })
  const { toast } = useToast()

  const handleAddRoute = () => {
    if (
      !newRoute.routeNumber ||
      !newRoute.name ||
      !newRoute.busName ||
      !newRoute.startLocation ||
      !newRoute.endLocation ||
      !newRoute.distance ||
      !newRoute.stops
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      })
      return
    }

    const route = {
      id: routes.length + 1,
      ...newRoute,
    }

    setRoutes([...routes, route])
    setNewRoute({
      routeNumber: "",
      name: "",
      busName: "",
      startLocation: "",
      endLocation: "",
      distance: "",
      stops: "",
      busesAssigned: "0",
      status: "Inactive",
      assignedDriver: "Unassigned",
    })
    setIsAddRouteOpen(false)

    toast({
      title: "Route Added",
      description: `Route ${route.routeNumber} has been added successfully`,
    })
  }

  const handleDeleteRoute = (id: number) => {
    const routeToDelete = routes.find((route) => route.id === id)
    setRoutes(routes.filter((route) => route.id !== id))

    toast({
      title: "Route Removed",
      description: `Route ${routeToDelete?.routeNumber} has been removed`,
    })
  }

  const handleUpdateRouteStatus = (id: number, status: string) => {
    setRoutes(routes.map((route) => (route.id === id ? { ...route, status } : route)))

    const route = routes.find((r) => r.id === id)

    toast({
      title: "Status Updated",
      description: `Route ${route?.routeNumber} status changed to ${status}`,
    })
  }

  // Filter routes by status
  const activeRoutes = routes.filter((route) => route.status === "Active")
  const inactiveRoutes = routes.filter((route) => route.status === "Inactive")
  const maintenanceRoutes = routes.filter((route) => route.status === "Maintenance")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Management</h1>
          <p className="text-muted-foreground">Manage and monitor all DTC bus routes</p>
        </div>
        <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MapPin className="mr-2 h-4 w-4" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
              <DialogDescription>Enter the details of the new route. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="routeNumber" className="text-right">
                  Route No.
                </Label>
                <Input
                  id="routeNumber"
                  value={newRoute.routeNumber}
                  onChange={(e) => setNewRoute({ ...newRoute, routeNumber: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Route Name
                </Label>
                <Input
                  id="name"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="busName" className="text-right">
                  Bus Name
                </Label>
                <Input
                  id="busName"
                  value={newRoute.busName}
                  onChange={(e) => setNewRoute({ ...newRoute, busName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startLocation" className="text-right">
                  Start
                </Label>
                <Input
                  id="startLocation"
                  value={newRoute.startLocation}
                  onChange={(e) => setNewRoute({ ...newRoute, startLocation: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endLocation" className="text-right">
                  End
                </Label>
                <Input
                  id="endLocation"
                  value={newRoute.endLocation}
                  onChange={(e) => setNewRoute({ ...newRoute, endLocation: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="distance" className="text-right">
                  Distance
                </Label>
                <Input
                  id="distance"
                  value={newRoute.distance}
                  onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g. 25.5 km"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stops" className="text-right">
                  Stops
                </Label>
                <Input
                  id="stops"
                  value={newRoute.stops}
                  onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={newRoute.status} onValueChange={(value) => setNewRoute({ ...newRoute, status: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddRoute}>
                Save Route
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Routes ({activeRoutes.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Routes ({inactiveRoutes.length})</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance ({maintenanceRoutes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Routes</CardTitle>
              <CardDescription>Currently operational bus routes</CardDescription>
            </CardHeader>
            <CardContent>
              <RouteTable routes={activeRoutes} onDelete={handleDeleteRoute} onUpdateStatus={handleUpdateRouteStatus} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Routes</CardTitle>
              <CardDescription>Routes that are currently not in operation</CardDescription>
            </CardHeader>
            <CardContent>
              <RouteTable
                routes={inactiveRoutes}
                onDelete={handleDeleteRoute}
                onUpdateStatus={handleUpdateRouteStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Routes Under Maintenance</CardTitle>
              <CardDescription>Routes temporarily suspended for maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <RouteTable
                routes={maintenanceRoutes}
                onDelete={handleDeleteRoute}
                onUpdateStatus={handleUpdateRouteStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Route Table Component
function RouteTable({
  routes,
  onDelete,
  onUpdateStatus,
}: {
  routes: any[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Route No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Bus Name</TableHead>
          <TableHead>Start Location</TableHead>
          <TableHead>End Location</TableHead>
          <TableHead>Assigned Driver</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
              No routes found in this category
            </TableCell>
          </TableRow>
        ) : (
          routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell className="font-medium">{route.routeNumber}</TableCell>
              <TableCell>{route.name}</TableCell>
              <TableCell>{route.busName}</TableCell>
              <TableCell>{route.startLocation}</TableCell>
              <TableCell>{route.endLocation}</TableCell>
              <TableCell>{route.assignedDriver}</TableCell>
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
                    {route.status !== "Active" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(route.id, "Active")}>
                        Set to Active
                      </DropdownMenuItem>
                    )}
                    {route.status !== "Inactive" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(route.id, "Inactive")}>
                        Set to Inactive
                      </DropdownMenuItem>
                    )}
                    {route.status !== "Maintenance" && (
                      <DropdownMenuItem onClick={() => onUpdateStatus(route.id, "Maintenance")}>
                        Set to Maintenance
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(route.id)} className="text-red-600">
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

