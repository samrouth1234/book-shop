import { PaginationWithLinks } from "@/app/(front-end)/(components)/pagination-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teachingReportings = [
  {
    teachingDate: "12/02/2025",
    submitDate: "23/04/2034",
    time: "7 AM",
    subject: "Java Programming",
    numberOfStudents: 34,
    status: "Active",
  },
  {
    teachingDate: "13/02/2025",
    submitDate: "24/04/2034",
    time: "9 AM",
    subject: "Web Development",
    numberOfStudents: 28,
    status: "Pending",
  },
  {
    teachingDate: "14/02/2025",
    submitDate: "25/04/2034",
    time: "5 PM",
    subject: "Database Systems",
    numberOfStudents: 30,
    status: "Active",
  },
  {
    teachingDate: "15/02/2025",
    submitDate: "25/04/2034",
    time: "6 PM",
    subject: "Information Systems",
    numberOfStudents: 30,
    status: "Completed",
  },
  {
    teachingDate: "16/02/2025",
    submitDate: "25/04/2034",
    time: "8 PM",
    subject: "Data structures",
    numberOfStudents: 30,
    status: "Pending",
  },
  {
    teachingDate: "17/02/2025",
    submitDate: "25/04/2034",
    time: "12 PM",
    subject: "Network Engineer",
    numberOfStudents: 30,
    status: "Completed",
  },
  {
    teachingDate: "18/02/2025",
    submitDate: "25/04/2034",
    time: "10 PM",
    subject: "C# Programming",
    numberOfStudents: 30,
    status: "Pending",
  }
];

const ListAllBooks = () => {
  const page = Number.parseInt("1");
  const pageSize = Number.parseInt("2");
  const totalItems = Number.parseInt("20");

  return (
    <section>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="border-r-1 p-4">Teaching Date</TableHead>
            <TableHead className="border-r-1">Submit Date</TableHead>
            <TableHead className="border-r-1">Time</TableHead>
            <TableHead className="border-r-1">Subject</TableHead>
            <TableHead className="w-20 border-r-1">
              Number of Students
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachingReportings.map((report, index) => (
            <TableRow key={index}>
              <TableCell className="p-4">{report.teachingDate}</TableCell>
              <TableCell>{report.submitDate}</TableCell>
              <TableCell>{report.time}</TableCell>
              <TableCell>{report.subject}</TableCell>
              <TableCell>{report.numberOfStudents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <section className="flex justify-end">
        <div className="cursor-pointer">
          <PaginationWithLinks
            page={page}
            pageSize={pageSize}
            totalCount={totalItems}
          />
        </div>
      </section>
    </section>
  );
};

export default ListAllBooks;
