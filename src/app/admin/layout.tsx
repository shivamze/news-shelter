"use client"

// "use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "../components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar for mobile */}
        <div className="lg:hidden p-4 border-b bg-white w-full">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

// import { AdminSidebar } from "../components/layout/AdminSidebar";

// export default function AdminLayout({children}: {children: React.ReactNode}){
//     return(
//         <div className="flex min-h-screen bg-gray-50">
//             <AdminSidebar/>
//             <main className="flex-1 p-6 md:p-8">
//                 {children}
//             </main>
//         </div>
//     )
// }