"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar"

const App = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
      
    </div>
  )
}
export default App;