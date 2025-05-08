"use client"

import { useState } from "react"
import { Search, MapPin, Clock, Mail, Briefcase, Phone } from "lucide-react"

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("")

  const employees = [
    { id: 1, name: "Murtaza Mehmood", role: "Manager" },
    { id: 2, name: "Zara Ejaz", role: "Developer" },
    { id: 3, name: "Abid Mehmood", role: "Developer" },
    { id: 4, name: "Bilal", role: "Developer" },
  ]

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Top Cards */}
        <div className="p-4 bg-gray-50 rounded-lg m-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-500 rounded-md"></div>
              <div>
                <div className="font-medium">Department Head</div>
                <div className="text-sm text-gray-600">MD-005- Musharraf Sajjad</div>
                <div className="text-sm text-gray-600">Chief Technology Officer</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-500 rounded-md"></div>
              <div>
                <div className="font-medium">Manager</div>
                <div className="text-sm text-gray-600">KAR-033- Murtaza Mehmood</div>
                <div className="text-sm text-gray-600">Software Developer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 p-4 bg-white">
            <h2 className="font-medium mb-2">Employees</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-2 pr-8 py-1 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                  <div>
                    <div className="text-sm font-medium">{employee.role}</div>
                    <div className="text-xs">{employee.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Profile */}
          <div className="flex-1 p-4">
            {/* Profile Header */}
            <div className="relative mb-16">
              <div className="h-24 bg-purple-900 rounded-lg overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-purple-900 to-purple-500 opacity-80"></div>
              </div>
              <div className="absolute -bottom-12 left-8 flex items-end">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md"></div>
                <div className="w-6 h-6 -ml-4 mb-2 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="md:col-span-2">
                <div className="mb-4">
                  <h2 className="text-lg font-medium">KAR-039- Zara Ejaz</h2>
                  <p className="text-gray-600">Software Developer</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-green-100 rounded-md">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-xs">Karachi</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-100 rounded-md">
                    <Briefcase className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Department</div>
                      <div className="text-xs">Software Development</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-orange-100 rounded-md">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Time Zone</div>
                      <div className="text-xs">(GMT+05:00)</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-100 rounded-md">
                    <Mail className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Email ID</div>
                      <div className="text-xs">zeja@datasolutions.com</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-indigo-100 rounded-md">
                    <Briefcase className="h-5 w-5 text-indigo-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Shift</div>
                      <div className="text-xs">General</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-100 rounded-md">
                    <Phone className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">Work phone</div>
                      <div className="text-xs">03257459999</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-gray-700">
                    I'm Frontend Developer with over a year of experience in building responsive web-based solutions
                    using React.js, JavaScript, and Restful APIs. Currently working at FastSolutions as a Frontend
                    developer. I'm also pursuing a bachelor's in software engineering at Bahria University and
                    constantly looking to grow through impactful, real-world projects.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Work experience</h3>
                    <div className="text-sm">
                      <div className="font-medium">Designation</div>
                      <div className="text-gray-600">Company Name XYZ</div>
                      <div className="text-gray-600">Job description</div>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium">Full-time</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Education</h3>
                    <div className="text-sm">
                      <div className="font-medium">Degree</div>
                      <div className="text-gray-600">Educational institute name</div>
                      <div className="text-gray-600">degree completion date or present</div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
