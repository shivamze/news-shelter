"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, PenLine, FolderKanban, Zap, Newspaper  } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/src/context/AuthContext"

export function AdminSidebar(){
    const location = usePathname();
    const {logout} = useAuth();
    const router = useRouter();

    const navItems = [
        {path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true},
        {path: '/admin/news', icon: FileText, label: 'Manage News'},
        {path: '/admin/blogs', icon: PenLine, label: 'Blogs'},
        {path: '/admin/projects', icon: FolderKanban, label: 'Projects'},
        {path: '/admin/automation', icon: Zap, label: 'Automation'},
    ];

    const isActive = (path: string, exact?: boolean) => {
        if(exact){
            return location === path;
        }
        return location.startsWith(path);
    }

    const onLogout = async() => {
        try{
            const response = await axios.get("/api/users/logout");
            logout();
            toast.success("Logout successful")
            console.log(response);
            router.push("/");
        } catch(err: any){
            toast.error(err.response?.data?.message || "Signup failed");
        }
    }

    return (
      <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
        <div className="p-4">
          <div className="flex items-center gap-2 px-3 py-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path, item.exact)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>
    );
}