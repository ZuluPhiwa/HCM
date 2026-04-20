import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, FileUp, BookOpen, 
  ClipboardList, Calendar as CalendarIcon, User, 
  Bell, Plus, Menu, X, MessageSquare 
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [updates] = useState([
    { id: 1, type: 'Network', text: 'Server maintenance scheduled for Friday. Contact KD', time: '2h ago' },
    { id: 2, type: 'HR', text: 'New hmis documents uploaded.', time: '5h ago' },
    { id: 3, type: 'Dev', text: 'Welcome Zanela to the Development team!', time: '1d ago' },
  ]);


  const events = [
    { 
      id: 1, 
      date: '2026-04-20', 
      title: 'GOAT is born', 
      time: '10:00 AM', 
      type: 'Dev' 
    },
    { 
      id: 2, 
      date: '2026-04-26', 
      title: 'Q2 ELMIS Performance Review', 
      time: '02:00 PM', 
      type: 'HR' 
    },
    { 
      id: 3, 
      date: '2026-04-28', 
      title: 'Weekly Meeting', 
      time: '09:30 AM', 
      type: 'Leadership' 
    },
    { 
      id: 4, 
      date: '2026-04-30', 
      title: 'Leave Approval Deadline', 
      time: 'All Day', 
      type: 'HR' 
    },
  ];


  const dayEvents = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  }, [selectedDate, events]);


  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const hasEvent = events.some(event => event.date === dateStr);
      if (hasEvent) {
        return 'has-event';
      }
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 items-center px-6 text-white border-b border-slate-800">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
            <span className="font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Pulse</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<CalendarIcon size={20} />} label="Leave Requests" />
          <NavItem icon={<FileUp size={20} />} label="My Documents" />
          <NavItem icon={<BookOpen size={20} />} label="Knowledge Base" />
          <NavItem icon={<ClipboardList size={20} />} label="Meeting Minutes" />
        </nav>


      </aside>

      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-slate-800">
                Welcome Back, <span className="text-blue-600">Phiwa Zulu</span>
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-slate-600 hover:text-slate-900 relative">
                <Bell size={22} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</div>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">Phiwa Zulu</p>
                  <p className="text-xs text-slate-500">ELMIS Officer</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                  <User size={22} className="text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            

            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <MetricCard title="Leave Balance" value="12 Days" icon={<CalendarIcon className="text-blue-500"/>} />
                <MetricCard title="Pending Approvals" value={isAdmin ? "04" : "01"} icon={<ClipboardList className="text-amber-500"/>} />
                <MetricCard title="Docs Uploaded" value="08" icon={<FileUp className="text-emerald-500"/>} />
              </div>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="font-semibold text-xl">Recent Minutes</h2>
                  {isAdmin && (
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all active:scale-95">
                      <Plus size={18} /> New Entry
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-100">
                  <MinuteRow title="April Weekly Meeting" date="Apr 15, 2026" />
                  <MinuteRow title="Product Roadmap Planning" date="Apr 10, 2026" />
                  <MinuteRow title="Q2 ELMIS Planning Session" date="Apr 5, 2026" />
                </div>
              </section>
            </div>

            
            <div className="lg:col-span-4 space-y-8">
              
          
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <h2 className="font-semibold text-lg mb-6">Calendar</h2>
                
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={tileClassName}
                  className="custom-calendar w-full"
                />

       
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-base">Agenda for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                  </div>

                  {dayEvents.length > 0 ? (
                    <div className="space-y-4">
                      {dayEvents.map(event => (
                        <div key={event.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="text-right w-16 shrink-0">
                            <p className="text-sm font-mono font-bold text-blue-600">{event.time}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{event.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{event.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-400">
                      <CalendarIcon size={40} className="mx-auto mb-3 opacity-50" />
                      <p>No events scheduled for this day</p>
                    </div>
                  )}
                </div>
              </div>

              
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <h2 className="font-semibold text-lg mb-6">Live Updates</h2>
                <div className="space-y-6">
                  {updates.map(update => (
                    <div key={update.id} className="flex gap-4">
                      <div className="mt-1 w-8 h-8 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                        <MessageSquare size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-800 leading-snug">{update.text}</p>
                        <p className="text-xs text-slate-500 mt-1.5">{update.time} • {update.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all text-sm font-semibold
    ${active 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}>
    {icon}
    <span>{label}</span>
  </div>
);

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow transition-shadow">
    <div className="p-3 bg-slate-100 w-fit rounded-2xl mb-5">
      {icon}
    </div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
    <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);

const MinuteRow = ({ title, date }) => (
  <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-xl">PDF</div>
      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</span>
    </div>
    <span className="text-sm text-slate-500 font-medium">{date}</span>
  </div>
);

export default Index;