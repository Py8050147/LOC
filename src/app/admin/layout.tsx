import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    // Sidebar,
    // SidebarContent,
    // SidebarGroup,
    // SidebarGroupContent,
    // SidebarGroupLabel,
    // SidebarHeader,
    SidebarInset,
    // SidebarMenu,
    // SidebarMenuButton,
    // SidebarMenuItem,
    // SidebarMenuSub,
    // SidebarMenuSubButton,
    // SidebarMenuSubItem,
    SidebarProvider,
    // SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator";
import Dropdown from "./_components/dropDwon";
  
// const lmsData = {
//     navMain: [
//       {
//         title: "Dashboard",
//         url: "#",
//         icon: LayoutDashboard,
//       },
//       {
//         title: "Courses",
//         url: "#",
//         icon: Book,
//         items: [
//           { title: "All Courses", url: "#" },
//           { title: "My Courses", url: "#" },
//           { title: "Course Catalog", url: "#" },
//         ],
//       },
//       {
//         title: "Assignments",
//         url: "#",
//         icon: GraduationCap,
//         items: [
//           { title: "Upcoming", url: "#" },
//           { title: "Completed", url: "#" },
//           { title: "Graded", url: "#" },
//         ],
//       },
//       {
//         title: "Community",
//         url: "#",
//         icon: MessageSquare,
//       },
//       {
//         title: "Students",
//         url: "#",
//         icon: Users,
//       },
//       {
//         title: "Settings",
//         url: "#",
//         icon: Settings,
//       },
//     ],
//     courses: [
//       { id: 1, name: "Introduction to React", progress: 75 },
//       { id: 2, name: "Advanced JavaScript", progress: 40 },
//       { id: 3, name: "UX Design Fundamentals", progress: 90 },
//     ],
//     assignments: {
//       upcoming: [
//         { id: 1, name: "React Hooks Essay", dueDate: "2023-05-15", course: "Introduction to React" },
//         { id: 2, name: "JavaScript Algorithms", dueDate: "2023-05-18", course: "Advanced JavaScript" },
//         { id: 3, name: "User Persona Creation", dueDate: "2023-05-20", course: "UX Design Fundamentals" },
//       ],
//       completed: [
//         { id: 4, name: "React Components Quiz", submittedDate: "2023-05-01", course: "Introduction to React" },
//         { id: 5, name: "JavaScript Closures Assignment", submittedDate: "2023-04-28", course: "Advanced JavaScript" },
//         { id: 6, name: "Wireframing Exercise", submittedDate: "2023-04-25", course: "UX Design Fundamentals" },
//       ],
//       graded: [
//         { id: 7, name: "React State Management Project", grade: "A", feedback: "Excellent work!", course: "Introduction to React" },
//         { id: 8, name: "Advanced JavaScript Concepts Test", grade: "B+", feedback: "Good understanding of complex topics.", course: "Advanced JavaScript" },
//         { id: 9, name: "UX Research Report", grade: "A-", feedback: "Great insights, could improve on data visualization.", course: "UX Design Fundamentals" },
//       ],
//     },
//   }

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <div className='flex items-center '>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb >
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
  
           </div>
            <div>
            <Dropdown />
            </div>
          </header>
         
          {/* <div className="aspect-video rounded-xl  bg-amber-300 border border-red-800"> */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
          {/* </div> */}
        </SidebarInset>
      </SidebarProvider>
    );
};
 
export default AdminLayout