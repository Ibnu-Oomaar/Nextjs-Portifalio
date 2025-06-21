'use client';
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChartLine, FaDatabase, FaServer, FaCode, 
  FaUsers, FaTasks, FaCog, FaBell, FaSearch,
  FaCalendarAlt, FaEnvelope, FaFileAlt, FaChevronDown,
  FaCrown, FaFire, FaStar, FaRegStar, FaGithub
} from "react-icons/fa";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Image from "next/image";

import 'react-calendar/dist/Calendar.css';



// Type definitions
interface DashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface Activity {
  id: number;
  action: string;
  time: string;
  icon: React.ReactNode;
}

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
}

interface NavItem {
  icon: React.ReactNode;
  name: string;
  id: string;
  badge?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  projects: number;
  tasks: number;
  lastActive: string;
  avatar: string;
  stars: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  date?: Date;
}

// Data constants
const pieData = [
  { name: 'Completed', value: 75 },
  { name: 'In Progress', value: 15 },
  { name: 'Pending', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Project data with dates (7 projects with 2 having same date)
const projectsData: Project[] = [
  {
    id: 1,
    title: "Basic Blog",
    description: "A simple blog built with HTML and CSS",
    image: "/imgs/image copy 3.png",
    tags: ["HTML", "CSS"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 5, 15) // June 15, 2023
  },
  {
    id: 2,
    title: "Landing Page",
    description: "Clean landing page built with HTML and CSS",
    image: "/imgs/image copy 4.png",
    tags: ["HTML", "CSS"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 6, 20) // July 20, 2023
  },
  {
    id: 3,
    title: "Calculator",
    description: "Functional calculator built with HTML, CSS and JavaScript",
    image: "/imgs/image copy 5.png",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 7, 10) // August 10, 2023
  },
  {
    id: 4,
    title: "Amazon Clone",
    description: "Amazon clone built with HTML and Tailwind CSS",
    image: "/imgs/image copy 6.png",
    tags: ["HTML", "Tailwind CSS"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 8, 5) // September 5, 2023
  },
  {
    id: 5,
    title: "YouTube Clone",
    description: "YouTube clone built with HTML and Tailwind CSS",
    image: "/imgs/image copy 7.png",
    tags: ["HTML", "Tailwind CSS"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 9, 15) // October 15, 2023
  },
  {
    id: 6,
    title: "Basic Landing Page",
    description: "Simple landing page built with HTML and Tailwind CSS",
    image: "/imgs/image copy 8.png",
    tags: ["HTML", "Tailwind CSS"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories",
    date: new Date(2023, 9, 15) // October 15, 2023 (same as project 5)
  },
  {
    id: 7,
    title: "Other Projects",
    description: "View all my other projects on GitHub",
    image: "/imgs/github-mark.png",
    tags: ["All Projects"],
    githubUrl: "https://github.com/Ibnu-Oomaar?tab=repositories"
  }
];

// Data generators
const generatePerformanceData = () => [...Array(6)].map((_, i) => ({
  name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
  projects: Math.floor(Math.random() * 10) + 1,
  tasks: Math.floor(Math.random() * 20) + 5,
  revenue: Math.floor(Math.random() * 5000) + 1000,
}));

const generateRecentActivities = (): Activity[] => [
  { id: 1, action: 'Deployed Project X', time: '2 hours ago', icon: <FaCode /> },
  { id: 2, action: 'Completed Task #123', time: '5 hours ago', icon: <FaTasks /> },
  { id: 3, action: 'Received new message', time: '1 day ago', icon: <FaEnvelope /> },
  { id: 4, action: 'Updated profile', time: '2 days ago', icon: <FaCog /> },
  { id: 5, action: 'Created new report', time: '3 days ago', icon: <FaFileAlt /> },
  { id: 6, action: 'Scheduled meeting', time: '4 days ago', icon: <FaCalendarAlt /> },
];

const generateQuickStats = (): Stat[] => [
  { title: 'Total Projects', value: 24, icon: <FaCode />, change: 12 },
  { title: 'Completed Tasks', value: 187, icon: <FaTasks />, change: 24 },
  { title: 'Team Members', value: 8, icon: <FaUsers />, change: 2 },
  { title: 'Server Uptime', value: '99.9%', icon: <FaServer /> },
];

const generateUsers = (): User[] => [
  { id: 1, name: 'Abdirizak Moktar', email: 'abdirizak@example.com', role: 'Admin', projects: 12, tasks: 45, lastActive: '2 mins ago', avatar: '/imgs/7fdf6a69-ea58-496a-a64b-3ec1341c0b28.jpeg', stars: 5 },
  { id: 2, name: 'Aisha Ahmed', email: 'aisha@example.com', role: 'Developer', projects: 8, tasks: 32, lastActive: '15 mins ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', stars: 4 },
  { id: 3, name: 'Mohamed Hassan', email: 'mohamed@example.com', role: 'Designer', projects: 5, tasks: 18, lastActive: '1 hour ago', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', stars: 3 },
  { id: 4, name: 'Fatima Ali', email: 'fatima@example.com', role: 'Manager', projects: 10, tasks: 28, lastActive: '30 mins ago', avatar: 'https://randomuser.me/api/portraits/women/63.jpg', stars: 5 },
  { id: 5, name: 'Omar Yusuf', email: 'omar@example.com', role: 'Developer', projects: 7, tasks: 25, lastActive: '45 mins ago', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', stars: 2 },
];

const navItems: NavItem[] = [
  { icon: <FaChartLine />, name: 'Overview', id: 'overview', badge: 3 },
  { icon: <FaDatabase />, name: 'Projects', id: 'projects', badge: projectsData.length },
  { icon: <FaTasks />, name: 'Tasks', id: 'tasks' },
  { icon: <FaUsers />, name: 'Team', id: 'team' },
  { icon: <FaCalendarAlt />, name: 'Calendar', id: 'calendar' },
  { icon: <FaEnvelope />, name: 'Messages', id: 'messages', badge: 12 },
  { icon: <FaFileAlt />, name: 'Reports', id: 'reports' },
  { icon: <FaCog />, name: 'Settings', id: 'settings' },
];

 function Dashboard({ darkMode, toggleDarkMode }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [performanceData, setPerformanceData] = useState(generatePerformanceData());
  const [recentActivities, setRecentActivities] = useState(generateRecentActivities());
  const [quickStats, setQuickStats] = useState(generateQuickStats());
  const [users, setUsers] = useState(generateUsers());
  const [backgroundElements, setBackgroundElements] = useState<React.ReactElement[]>([]);
const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  // Enhanced background elements with better motion
  useEffect(() => {
    const elements = Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 400 + 100;
      const duration = Math.random() * 30 + 15;
      const delay = Math.random() * 5;
      const colors = darkMode 
        ? ['#3b0764', '#6d28d9', '#4338ca', '#1e40af', '#0e7490']
        : ['#a5b4fc', '#c7d2fe', '#e0e7ff', '#dbeafe', '#bfdbfe'];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: [null, Math.random() * 200 - 100],
            y: [null, Math.random() * 200 - 100],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className={`absolute rounded-full ${darkMode ? 'bg-opacity-10' : 'bg-opacity-30'}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            filter: 'blur(80px)',
            backgroundColor: color,
          }}
        />
      );
    });
    setBackgroundElements(elements);
  }, [darkMode]);

  // Filter data based on search query
  const filteredRecentActivities = useMemo(() => {
    if (!searchQuery) return recentActivities;
    return recentActivities.filter(activity => 
      activity.action.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recentActivities, searchQuery]);

  const filteredQuickStats = useMemo(() => {
    if (!searchQuery) return quickStats;
    return quickStats.filter(stat => 
      stat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      stat.value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [quickStats, searchQuery]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projectsData;
    return projectsData.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  // Refresh data every minute to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prevData => prevData.map(item => ({
        ...item,
        projects: Math.max(1, item.projects + Math.floor(Math.random() * 3 - 1)),
        tasks: Math.max(5, item.tasks + Math.floor(Math.random() * 5 - 2)),
      })));
      
      // Occasionally add new activity
      if (Math.random() > 0.7) {
        setRecentActivities(prev => {
          const newActivity = {
            id: prev.length + 1,
            action: `New activity ${prev.length + 1}`,
            time: 'Just now',
            icon: [<FaCode />, <FaTasks />, <FaEnvelope />, <FaCog />][Math.floor(Math.random() * 4)]
          };
          return [newActivity, ...prev.slice(0, 5)];
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? (
            <FaStar key={star} className="text-yellow-400 text-sm" />
          ) : (
            <FaRegStar key={star} className="text-yellow-400 text-sm" />
          )
        ))}
      </div>
    );
  };

  // Custom calendar tile content to show project dates
  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const projectOnThisDate = projectsData.find(project => 
        project.date && 
        date.getDate() === project.date.getDate() &&
        date.getMonth() === project.date.getMonth() &&
        date.getFullYear() === project.date.getFullYear()
      );

      if (projectOnThisDate) {
        return (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
        );
      }
    }
    return null;
  };

  // Calendar change handler with proper type
  const handleCalendarChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setCalendarDate(value);
    } else if (Array.isArray(value)) {
      // Handle date range if needed
      setCalendarDate(value[0]);
    } else {
      setCalendarDate(null);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800'}`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {backgroundElements}
      </div>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b dark:border-gray-700 relative z-20">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="w-10"></div>
      </header>

      {/* Dashboard Layout */}
      <div className="flex flex-col md:flex-row relative z-10">
        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.aside 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 p-4 shadow-xl md:hidden"
              style={{
                background: darkMode 
                  ? 'linear-gradient(to bottom, #1e1b4b, #1e40af)' 
                  : 'linear-gradient(to bottom, #e0e7ff, #a5b4fc)'
              }}
            >
              <SidebarContent 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 p-6 fixed h-screen z-10"
          style={{
            background: darkMode 
              ? 'linear-gradient(to bottom, #1e1b4b, #1e40af)' 
              : 'linear-gradient(to bottom, #e0e7ff, #a5b4fc)'
          }}
        >
          <SidebarContent 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {/* Header */}
          <header className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-4 rounded-xl ${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'} shadow-lg border transition-all duration-300`}>
            <div>
              <motion.h1 
                className="text-2xl font-bold capitalize"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab}
              </motion.h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Welcome back, Abdirizak! Here's your daily summary.
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-4 w-full md:w-auto">
              <motion.div 
                className={`relative flex-1 md:w-64 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'} rounded-lg transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <FaSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none ${darkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-gray-800'}`}
                />
              </motion.div>

              <motion.button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-3 rounded-full relative ${darkMode ? 'hover:bg-gray-700/50 text-white' : 'hover:bg-gray-100/50 text-gray-800'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBell />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
              </motion.button>

              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-blue-500">
                  <Image
                    src="/imgs/7fdf6a69-ea58-496a-a64b-3ec1341c0b28.jpeg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Abdirizak M.</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin</p>
                </div>
                <FaChevronDown className={`ml-2 hidden md:block opacity-50 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
              </motion.div>
            </div>
          </header>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute right-8 mt-2 w-72 rounded-xl shadow-xl z-20 ${darkMode ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'} border`}
              >
                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                  <h3 className="font-bold">Notifications</h3>
                  <button className="text-xs text-blue-500">Mark all as read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className={`p-4 border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50/50'} transition-colors duration-200`}>
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <FaBell className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New notification {item}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">About {item} hour{item !== 1 ? 's' : ''} ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-2 text-center border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className="text-sm text-blue-500 hover:underline">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dashboard Content */}
          <div className="space-y-8">
            {/* Projects Section */}
            {activeTab === 'projects' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => (
                  <motion.article
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border transition-all duration-300`}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.date && (
                        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Created: {project.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center w-full py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} transition-colors duration-300`}
                      >
                        <FaGithub className="mr-2" />
                        View on GitHub
                      </motion.a>
                    </div>
                  </motion.article>
                ))}
              </motion.section>
            )}

            {/* Calendar Section */}
            {activeTab === 'calendar' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border transition-all duration-300`}
              >
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Project Calendar</h3>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                   
                  </div>
                  <div className="lg:w-80">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-md`}>
                      <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Projects on {calendarDate ? calendarDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'selected date'}
                      </h4>
                      <div className="space-y-4">
                        {calendarDate && projectsData
                          .filter(project => 
                            project.date && 
                            project.date.getDate() === calendarDate.getDate() &&
                            project.date.getMonth() === calendarDate.getMonth() &&
                            project.date.getFullYear() === calendarDate.getFullYear()
                          )
                          .map(project => (
                            <div 
                              key={project.id}
                              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} shadow-sm`}
                            >
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.tags.map((tag, index) => (
                                  <span 
                                    key={index}
                                    className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-500 text-blue-300' : 'bg-blue-100 text-blue-800'}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        {(!calendarDate || projectsData.filter(project => 
                          project.date && 
                          project.date.getDate() === calendarDate.getDate() &&
                          project.date.getMonth() === calendarDate.getMonth() &&
                          project.date.getFullYear() === calendarDate.getFullYear()
                        ).length === 0) && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {calendarDate ? 'No projects on this date' : 'Select a date to view projects'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Quick Stats - Only show when not in projects or calendar tab */}
            {!['projects', 'calendar'].includes(activeTab) && filteredQuickStats.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredQuickStats.map((stat, index) => (
                  <motion.article
                    key={index}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'} transition-colors duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                        <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                      </div>
                      {stat.change && (
                        <span className={`text-sm px-2 py-1 rounded-full ${stat.change > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400'}`}>
                          {stat.change > 0 ? '+' : ''}{stat.change}%
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))}
              </motion.section>
            )}

            {/* Charts Row - Only show when not in projects or calendar tab and not searching */}
            {!['projects', 'calendar'].includes(activeTab) && !searchQuery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Area Chart */}
                <article className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border lg:col-span-2 transition-all duration-300`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects & Tasks Overview</h3>
                    <select className={`text-sm px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                        <XAxis 
                          dataKey="name" 
                          stroke={darkMode ? '#9CA3AF' : '#6B7280'} 
                        />
                        <YAxis 
                          stroke={darkMode ? '#9CA3AF' : '#6B7280'} 
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                            borderColor: darkMode ? '#374151' : '#E5E7EB',
                            borderRadius: '0.5rem',
                            color: darkMode ? '#FFFFFF' : '#000000',
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="projects" 
                          stroke="#3B82F6" 
                          fillOpacity={1} 
                          fill="url(#colorProjects)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="tasks" 
                          stroke="#10B981" 
                          fillOpacity={1} 
                          fill="url(#colorTasks)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </article>

                {/* Pie Chart */}
                <article className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border transition-all duration-300`}>
                  <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Task Completion</h3>
                  <div className="h-64 flex flex-col">
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                              borderColor: darkMode ? '#374151' : '#E5E7EB',
                              borderRadius: '0.5rem',
                              color: darkMode ? '#FFFFFF' : '#000000',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-6 mt-4">
                      {pieData.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </motion.section>
            )}

            {/* Recent Activity and Bar Chart - Only show when not in projects or calendar tab */}
            {!['projects', 'calendar'].includes(activeTab) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Recent Activity */}
                {filteredRecentActivities.length > 0 && (
                  <article className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border lg:col-span-1 transition-all duration-300`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Recent Activity</h3>
                      <button className="text-sm text-blue-500 hover:underline">View all</button>
                    </div>
                    <div className="space-y-4">
                      {filteredRecentActivities.map((activity) => (
                        <motion.div
                          key={activity.id}
                          whileHover={{ x: 5 }}
                          className={`p-3 rounded-lg flex items-start ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} transition-colors duration-300`}
                        >
                          <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            {activity.icon}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activity.action}</p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </article>
                )}

                {/* Bar Chart - Only show when not searching */}
                {!searchQuery && (
                  <article className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border lg:col-span-2 transition-all duration-300`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monthly Performance</h3>
                      <div className="flex space-x-2">
                        <button className={`px-3 py-1 text-sm rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>Projects</button>
                        <button className={`px-3 py-1 text-sm rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>Tasks</button>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9CA3AF' : '#6B7280'} 
                          />
                          <YAxis 
                            stroke={darkMode ? '#9CA3AF' : '#6B7280'} 
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                              borderColor: darkMode ? '#374151' : '#E5E7EB',
                              borderRadius: '0.5rem',
                              color: darkMode ? '#FFFFFF' : '#000000',
                            }}
                          />
                          <Bar 
                            dataKey="projects" 
                            fill="#3B82F6" 
                            radius={[4, 4, 0, 0]} 
                          />
                          <Bar 
                            dataKey="tasks" 
                            fill="#10B981" 
                            radius={[4, 4, 0, 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </article>
                )}

                {/* Search results message */}
                {searchQuery && filteredRecentActivities.length === 0 && filteredQuickStats.length === 0 && (
                  <div className={`p-8 rounded-xl text-center col-span-full ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm border`}>
                    <FaSearch className="mx-auto text-4xl mb-4 opacity-50" />
                    <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>No results found</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      We couldn't find any matches for "{searchQuery}"
                    </p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Most Active Users Table - Only show when not in projects or calendar tab */}
            {!['projects', 'calendar'].includes(activeTab) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border transition-all duration-300`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Most Active Users</h3>
                  <button className="text-sm text-blue-500 hover:underline">View all users</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>User</th>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Role</th>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects</th>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tasks</th>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Active</th>
                        <th className={`text-left pb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className={`hover:bg-opacity-50 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <Image
                                  src={user.avatar}
                                  alt={user.name}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.name}</p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <FaDatabase className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                              <span className={darkMode ? 'text-white' : 'text-gray-800'}>{user.projects}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <FaTasks className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                              <span className={darkMode ? 'text-white' : 'text-gray-800'}>{user.tasks}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <FaFire className={`mr-2 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                              <span className={darkMode ? 'text-white' : 'text-gray-800'}>{user.lastActive}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            {renderStars(user.stars)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// SidebarContent component
function SidebarContent({ 
  darkMode, 
  toggleDarkMode, 
  activeTab, 
  setActiveTab,
  onClose
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <motion.div 
        className="flex items-center mb-8"
        whileHover={{ scale: 1.05 }}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
          <FaChartLine className="text-white text-xl" />
        </div>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Abdirizak's Dashboard</h1>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  onClose?.();
                }}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${activeTab === item.id 
                  ? darkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600'
                  : darkMode 
                    ? 'hover:bg-gray-700/50 text-gray-300' 
                    : 'hover:bg-gray-100/50 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${activeTab === item.id ? 'bg-white text-blue-600' : darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Dark Mode Toggle and Logout */}
      <div className="mt-auto space-y-4 pt-4">
        <motion.button
          onClick={toggleDarkMode}
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100/50 text-gray-700'}`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? (
            <>
              <FiSun className="mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <FiMoon className="mr-3" />
              Dark Mode
            </>
          )}
        </motion.button>

        <motion.button
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100/50 text-gray-700'}`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLogOut className="mr-3" />
          Logout
        </motion.button>
      </div>
    </div>
  );
}


export default Dashboard