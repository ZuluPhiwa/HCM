import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  BookOpen, 
  Users, 
  Settings,
  PlusCircle,
  Bell
} from 'lucide-react';

const Home = () => {
  // Mock State: In a real app, this would come from an Auth Provider/API
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">HRIS Core</h1>
        <nav className="space-y-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active /> 
          <NavItem icon={<CalendarDays size={20}/>} label="Leave Management" />
          <NavItem icon={<FileText size={20}/>} label="My Documents" />
          <NavItem icon={<BookOpen size={20}/>} label="Knowledge Hub" />
          {isAdmin && <NavItem icon={<Users size={20}/>} label="Admin Portal" />}
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Alex!</h2>
            <p className="text-gray-500 text-sm">Thursday, April 16, 2026</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-blue-600"><Bell size={24}/></button>
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Leave Tracker Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-4">Leave Balance</h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">14</p>
                <p className="text-xs text-gray-400 uppercase font-medium">Days Remaining</p>
              </div>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Apply Now</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ActionButton icon={<PlusCircle className="text-green-500"/>} label="Upload Doc" />
              <ActionButton icon={<BookOpen className="text-purple-500"/>} label="Wiki" />
              {isAdmin && <ActionButton icon={<FileText className="text-orange-500"/>} label="Post Minutes" />}
              <ActionButton icon={<CalendarDays className="text-blue-500"/>} label="View Calendar" />
            </div>
          </div>

          {/* Recent Knowledge Sharing Articles */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4">Internal Knowledge Base</h3>
            <ul className="space-y-4">
              <ArticleItem title="Updated Remote Work Policy 2026" date="2 days ago" />
              <ArticleItem title="How to use the new Expense Tracker" date="1 week ago" />
            </ul>
          </div>

          {/* Administrative Section (Conditional Rendering) */}
          <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-gray-300">
            <h3 className="font-semibold text-slate-800 mb-2">Meeting Minutes</h3>
            <p className="text-xs text-gray-500 mb-4">Only authorized admins can upload official records.</p>
            {isAdmin ? (
               <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700">
                 Upload New Minutes
               </button>
            ) : (
              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                Read-only access: Contact HR for upload permissions.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

/* Helper Components */
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600' : 'hover:bg-slate-800 text-gray-400 hover:text-white'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const ActionButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
    {icon}
    <span className="mt-2 text-xs font-semibold text-gray-600">{label}</span>
  </button>
);

const ArticleItem = ({ title, date }) => (
  <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
    <span className="text-sm text-gray-700 font-medium truncate pr-4">{title}</span>
    <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
  </li>
);

export default Home;