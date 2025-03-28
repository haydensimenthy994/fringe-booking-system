import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export default function EventsContent() {
  const events = [
    { id: 1, name: "Comedy Night", venue: "Main Theatre", date: "2023-06-15", status: "Active" },
    { id: 2, name: "Jazz Festival", venue: "Garden Stage", date: "2023-06-20", status: "Active" },
    { id: 3, name: "Theatre Show", venue: "Drama Hall", date: "2023-06-25", status: "Draft" },
    { id: 4, name: "Dance Performance", venue: "Main Theatre", date: "2023-07-01", status: "Active" },
    { id: 5, name: "Poetry Reading", venue: "Small Hall", date: "2023-07-05", status: "Draft" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Events</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8 bg-gray-900 border-gray-800 text-white w-full sm:w-[250px]"
            />
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">All Events</CardTitle>
          <CardDescription className="text-gray-400">Manage your events and performances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Venue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-white">{event.name}</td>
                    <td className="py-3 px-4 text-gray-300">{event.venue}</td>
                    <td className="py-3 px-4 text-gray-300">{event.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === "Active"
                            ? "bg-green-900/20 text-green-400"
                            : "bg-yellow-900/20 text-yellow-400"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

