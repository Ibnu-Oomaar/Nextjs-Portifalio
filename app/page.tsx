'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaDownload, FaGithub, FaLinkedin, FaTwitter
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTypescript, SiPostgresql, SiRedux,
  SiTailwindcss, SiExpress, SiPrisma
} from "react-icons/si";
import Image from "next/image";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const techIcons = [
  { name: "NextJS", icon: SiNextdotjs, color: ["#000000", "#FFFFFF"] },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node", icon: FaNodeJs, color: "#339933" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', darkMode);
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode, isMounted]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const goToDashboard = () => router.push('/dashboard');

  if (!isMounted) return null;

  // Background animation variants - FIXED VERSION
  const backgroundVariants = {
    initial: {
      backgroundPositionX: '0%'
    },
    animate: {
      backgroundPositionX: ['0%', '100%', '0%'],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen overflow-hidden relative transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      {/* Fixed Background Animation */}
      <motion.div
        className="fixed inset-0 -z-20"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        style={{
          backgroundImage: darkMode
            ? 'linear-gradient(90deg, #111827, #1e1b4b, #111827, #6b21a8, #111827)'
            : 'linear-gradient(90deg, #e0f2fe, #e9d5ff, #f0fdfa, #c7d2fe, #e0f2fe)',
          backgroundSize: '300% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle floating particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Navigation */}
          <motion.nav 
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`flex items-center space-x-6 px-6 py-3 rounded-full shadow-lg backdrop-blur-md transition-colors duration-500 ${
              darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-800'
            }`}>
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className={`list-none transition-colors duration-200 ${darkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </motion.button>
                <motion.button
                  onClick={goToDashboard}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See my dashboard
                </motion.button>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Navigation */}
          <motion.div
            className="md:hidden flex justify-between items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={goToDashboard}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My dashboard
            </motion.button>

            <div className={`relative transition-colors duration-200 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full shadow-md`}>
              <motion.button
                onClick={toggleMobileMenu}
                className={`p-3 rounded-full transition-colors duration-200 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>

              {mobileMenuOpen && (
                <motion.div
                  className={`absolute top-14 right-0 w-48 py-2 rounded-lg shadow-xl z-50 transition-colors duration-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href={`/${item.toLowerCase()}`} 
                        className={`block px-4 py-2 transition-colors duration-200 ${
                          darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full text-left px-4 py-2 flex items-center transition-colors duration-200 ${
                      darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {darkMode ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                        Light Mode
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        Dark Mode
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        {/* Hero Section */}
<section className="flex flex-col items-center justify-center min-h-[80vh] pt-16 pb-8">
  {/* Profile Image - Centered Circle with Animations */}
  <motion.div
    className="relative w-64 h-64 md:w-80 md:h-80 mb-12"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      ease: "backOut",
    }}
  >
    {/* Main Circle Image */}
    <motion.div
      className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-xl relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src="/imgs/7fdf6a69-ea58-496a-a64b-3ec1341c0b28.jpeg"
        alt="Abdirizak Moktar"
        width={320}
        height={320}
        className="rounded-full object-cover"
        priority
      />
    </motion.div>

    {/* Floating Animated Rings */}
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-blue-400 -z-10 opacity-30"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute inset-0 rounded-full border border-blue-300 -z-20 opacity-20"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
  </motion.div>

  {/* Text Content (Same as Before) */}
  <motion.div 
    className="text-center max-w-2xl"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    <motion.h1 
      className={`text-4xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
      variants={textVariants}
    >
      Hi, I'm <motion.span 
        className="text-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >Abdirizak Moktar</motion.span>
    </motion.h1>
    
    <motion.p 
      className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
      variants={textVariants}
    >
      Fullstack Developer & Graphic Designer creating digital experiences that help businesses grow.
    </motion.p>
    
    <motion.div
      className="flex gap-4 justify-center"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.button 
        variants={textVariants}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaDownload />
        Download CV
      </motion.button>
      <motion.button 
        variants={textVariants}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
          darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Me
      </motion.button>
    </motion.div>
  </motion.div>

  {/* Tech Icons Circle (Same as Before) */}
  <motion.div 
    className="relative w-full h-64 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.5 }}
  >
    <div className="relative w-full h-full">
      {techIcons.map((icon, index) => {
        const IconComponent = icon.icon;
        const iconColor = Array.isArray(icon.color) 
          ? (darkMode ? icon.color[1] : icon.color[0])
          : icon.color;
        
        const radius = 150;
        const angle = (index / techIcons.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={icon.name + index}
            className="absolute text-4xl transition-colors duration-500"
            style={{
              left: '50%',
              top: '50%',
              x: x,
              y: y,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -180,
            }}
            animate={{
              opacity: 0.9,
              scale: 1,
              rotate: 0,
              x: x,
              y: y,
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "backOut" },
              rotate: { duration: 0.3, ease: "easeOut" },
              delay: 0.5 + index * 0.1,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              whileHover={{ scale: 1.2 }}
            >
              <IconComponent 
                className="drop-shadow-2xl transition-colors duration-500"
                style={{ 
                  color: iconColor,
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.6))',
                  textShadow: '0 0 10px rgba(0,0,0,0.5)',
                  transition: 'all 0.5s ease'
                }} 
                title={icon.name}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
</section>

 <section 
  id="about"
  className="py-20 px-4 relative overflow-hidden"
>
  {/* Same background animation as the rest of the page */}
  <motion.div
    className="absolute inset-0 -z-20"
    variants={backgroundVariants}
    initial="initial"
    animate="animate"
    style={{
      backgroundImage: darkMode
        ? 'linear-gradient(90deg, #111827, #1e1b4b, #111827, #6b21a8, #111827)'
        : 'linear-gradient(90deg, #e0f2fe, #e9d5ff, #f0fdfa, #c7d2fe, #e0f2fe)',
      backgroundSize: '300% 100%',
      backgroundRepeat: 'no-repeat',
    }}
  />

  {/* Same floating particles as the rest of the page */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-20"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          width: Math.random() * 10 + 5 + 'px',
          height: Math.random() * 10 + 5 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
        }}
        animate={{
          y: [0, (Math.random() - 0.5) * 100],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>

  {/* Content container with backdrop blur for better readability */}
  <div className="container mx-auto relative">
    <div className={`backdrop-blur-md rounded-3xl p-8 md:p-12 ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}>
      <motion.div
        className="flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Circular Image - Left Side */}
       <motion.div 
  className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
  initial={{ x: -100, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 60 }}
  viewport={{ once: true }}
>
  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
    <Image
      src="/imgs/9ddb3cf4-7668-4f8b-93f7-c23bf371053c.jpeg"
      alt="Abdirizak Moktar"
      width={320}
      height={320}
      className="rounded-full object-cover"
    />
  </div>
  
  {/* Animated decorative circles */}
  <motion.div 
    className="absolute -z-10 inset-0 rounded-full border-2 border-blue-400"
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
  <motion.div 
    className="absolute -z-20 inset-0 rounded-full border border-blue-300"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1]
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}
  />
</motion.div>

        {/* Text Content - Right Side */}
        <motion.div
          className="flex-1"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>
          
          <motion.p 
            className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            I'm a passionate Fullstack Developer and Graphic Designer with 3+ years of experience creating 
            digital experiences that help businesses grow. I specialize in modern web technologies and 
            design principles to deliver high-quality products.
          </motion.p>
          
          <motion.p 
            className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            When I'm not coding or designing, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </motion.p>
          
          {/* Download CV Button */}
          <motion.div
            className="mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.button
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download CV
            </motion.button>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { icon: FaGithub, url: "https://github.com/Ibnu-Oomaar", color: darkMode ? "#ffffff" : "#333333" },
              { icon: FaLinkedin, url: "https://linkedin.com", color: "#0A66C2" },
              { icon: FaTwitter, url: "https://x.com/abdirisaaqmukh?s=21", color: "#1DA1F2" },
              { icon: FaInstagram, url: "https://www.instagram.com/zir.opthirizak?igsh=M2ZiNm1mcjE5Z3kx&utm_source=qr.", color: "#E1306C" },
              { icon: FaFacebook, url: "https://facebook.comhttps://www.facebook.com/share/15pGA8T3Ha/?mibextid=wwXIfr", color: "#1877F2" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 transition-colors duration-200"
                style={{ color: social.color }}
                whileHover={{ 
                  y: -5,
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

{/* Skills Section */}
<section 
  id="skills"
  className="py-20 px-4 relative overflow-hidden"
>
  {/* Background Animation */}
  <motion.div
    className="absolute inset-0 -z-20"
    variants={backgroundVariants}
    initial="initial"
    animate="animate"
    style={{
      backgroundImage: darkMode
        ? 'linear-gradient(90deg, #111827, #1e1b4b, #111827, #6b21a8, #111827)'
        : 'linear-gradient(90deg, #e0f2fe, #e9d5ff, #f0fdfa, #c7d2fe, #e0f2fe)',
      backgroundSize: '300% 100%',
      backgroundRepeat: 'no-repeat',
    }}
  />

  {/* Floating Particles */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-20"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          width: Math.random() * 10 + 5 + 'px',
          height: Math.random() * 10 + 5 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
        }}
        animate={{
          y: [0, (Math.random() - 0.5) * 100],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>

  {/* Main Content */}
  <div className="container mx-auto relative">
    <motion.div
      className={`backdrop-blur-md rounded-3xl p-8 md:p-12 ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        My <span className="text-blue-500">Skills</span>
      </motion.h2>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {techIcons.map((skill, index) => {
          const Icon = skill.icon;
          const iconColor = Array.isArray(skill.color) 
            ? (darkMode ? skill.color[1] : skill.color[0])
            : skill.color;

          return (
            <motion.div
              key={skill.name + index}
              className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800/50 hover:bg-gray-700/70' : 'bg-white/50 hover:bg-gray-100/70'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: darkMode 
                  ? '0 10px 25px -5px rgba(59, 130, 246, 0.4)' 
                  : '0 10px 25px -5px rgba(59, 130, 246, 0.2)'
              }}
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Icon 
                  style={{ color: iconColor }}
                  className="drop-shadow-lg"
                />
              </motion.div>
              <motion.h3 
                className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              >
                {skill.name}
              </motion.h3>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bars (Optional) */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className={`text-xl font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Proficiency Level
        </h3>
        {[
          { name: "Next.js", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "React", level: 90 },
          { name: "Node.js", level: 80 },
          { name: "Tailwind CSS", level: 95 },
          { name: "HTML5", level: 100 },
          { name: "CSS3", level: 100 },
          { name: "Postgresql", level: 100 },
          { name: "Prisma", level: 100 },

        ].map((skill, index) => (
          <motion.div 
            key={skill.name}
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-1">
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {skill.name}
              </span>
              <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {skill.level}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className={`h-full rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.1 * index + 0.5 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
</section>

{/* Projects Section */}
<section 
  id="projects"
  className="py-20 px-4 relative overflow-hidden"
>
  {/* ... (keep existing background and particles code) ... */}

  {/* Main Content */}
  <div className="container mx-auto relative">
    <motion.div
      className={`backdrop-blur-md rounded-3xl p-8 md:p-12 ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        My <span className="text-blue-500">Projects</span>
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project 1 - HTML & Bootstrap CSS */}
        <motion.div
          className={`rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -10,
            boxShadow: darkMode 
              ? '0 20px 25px -5px rgba(59, 130, 246, 0.4)' 
              : '0 20px 25px -5px rgba(59, 130, 246, 0.2)'
          }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/imgs/image copy 2.png"
              alt="HTML & Bootstrap Project"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Bootstrap Dashboard
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Responsive admin dashboard built with HTML and Bootstrap CSS framework.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-orange-400' : 'bg-orange-100 text-orange-800'
              }`}>
                HTML
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-800'
              }`}>
                Bootstrap
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'
              }`}>
                CSS
              </span>
            </div>
            <motion.a
              href="https://github.com/Ibnu-Oomaar/Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Project 2 - TypeScript, HTML & Tailwind CSS */}
        <motion.div
          className={`rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -10,
            boxShadow: darkMode 
              ? '0 20px 25px -5px rgba(59, 130, 246, 0.4)' 
              : '0 20px 25px -5px rgba(59, 130, 246, 0.2)'
          }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/imgs/image copy.png"
              alt="TypeScript & Tailwind Project"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Weather App 
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Waether Application built with TypeScript, HTML and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-blue-600' : 'bg-blue-100 text-blue-800'
              }`}>
                TypeScript
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-orange-400' : 'bg-orange-100 text-orange-800'
              }`}>
                HTML
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-cyan-400' : 'bg-cyan-100 text-cyan-800'
              }`}>
                Tailwind
              </span>
            </div>
            <motion.a
              href="https://github.com/Ibnu-Oomaar/Weather-App"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Project 3 - HTML, CSS, Tailwind & JavaScript */}
        <motion.div
          className={`rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            y: -10,
            boxShadow: darkMode 
              ? '0 20px 25px -5px rgba(59, 130, 246, 0.4)' 
              : '0 20px 25px -5px rgba(59, 130, 246, 0.2)'
          }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src="/imgs/image.png"
              alt="JavaScript & Tailwind Project"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              E-commerce Store
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Dynamic E-commerce Store using HTML, CSS, Tailwind and JavaScript.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-orange-400' : 'bg-orange-100 text-orange-800'
              }`}>
                HTML
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-800'
              }`}>
                CSS
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-cyan-400' : 'bg-cyan-100 text-cyan-800'
              }`}>
                Tailwind
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
              }`}>
                JavaScript
              </span>
            </div>
            <motion.a
              href="https://github.com/Ibnu-Oomaar/E-commerce-Store"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="mr-2" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* View All Button */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="https://github.com/Ibnu-Oomaar"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center px-6 py-3 rounded-full font-medium ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="mr-2" />
          View All Projects on GitHub
        </motion.a>
      </motion.div>
    </motion.div> 
  </div>
</section>

{/* Contact Us Section */}
<section 
  id="contact"
  className="py-20 px-4 relative overflow-hidden"
>
  {/* Background Animation */}
  <motion.div
    className="absolute inset-0 -z-20"
    variants={backgroundVariants}
    initial="initial"
    animate="animate"
    style={{
      backgroundImage: darkMode
        ? 'linear-gradient(90deg, #111827, #1e1b4b, #111827, #6b21a8, #111827)'
        : 'linear-gradient(90deg, #e0f2fe, #e9d5ff, #f0fdfa, #c7d2fe, #e0f2fe)',
      backgroundSize: '300% 100%',
      backgroundRepeat: 'no-repeat',
    }}
  />

  {/* Floating Particles */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full opacity-20"
        style={{
          background: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          width: Math.random() * 10 + 5 + 'px',
          height: Math.random() * 10 + 5 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
        }}
        animate={{
          y: [0, (Math.random() - 0.5) * 100],
          x: [0, (Math.random() - 0.5) * 50],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>

  {/* Main Content */}
  <div className="container mx-auto relative">
    <motion.div
      className={`backdrop-blur-md rounded-3xl p-8 md:p-12 ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Get In <span className="text-blue-500">Touch</span>
      </motion.h2>

      <motion.p 
        className={`text-center max-w-2xl mx-auto mb-12 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        Have a project in mind or want to discuss potential opportunities? 
        Feel free to reach out - I'd love to hear from you!
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className={`p-6 md:p-8 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <form 
            action="https://formsubmit.co/apdirsaqmoktar@gmail.com" // Replace with your email
            method="POST"
            className="space-y-6"
          >
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label 
                htmlFor="name" 
                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Your Name
              </label>
              <div className="relative">
                <motion.div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <label 
                htmlFor="email" 
                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Email Address
              </label>
              <div className="relative">
                <motion.div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <label 
                htmlFor="message" 
                className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Your Message
              </label>
              <div className="relative">
                <motion.div
                  className="absolute top-3 left-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Hello Abdirizak, I'd like to talk about..."
                ></textarea>
              </div>
            </motion.div>

            {/* Hidden fields for FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://yourdomain.com/thanks" /> {/* Replace with your domain */}
            <input type="hidden" name="_template" value="box" />

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <motion.button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: darkMode 
                    ? '0 5px 15px rgba(37, 99, 235, 0.4)' 
                    : '0 5px 15px rgba(59, 130, 246, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Send Message
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className={`p-6 md:p-8 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg h-full`}
            whileHover={{ 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Contact Information
            </h3>

            {/* Email */}
            <motion.div 
              className="flex items-start mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className={`p-3 rounded-full mr-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</h4>
                <a 
                  href="mailto:your-email@gmail.com" 
                  className={`text-lg ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  your-email@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className={`font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: FaGithub, url: "https://github.com/Ibnu-Oomaar", color: darkMode ? "#ffffff" : "#333333" },
                  { icon: FaLinkedin, url: "https://linkedin.com/apdirsaqmoktar-68a86b369", color: "#0A66C2" },
                  { icon: FaTwitter, url: "https://x.com/abdirisaaqmukh?s=21", color: "#1DA1F2" },
                  { icon: FaInstagram, url: "https://www.instagram.com/zir.opthirizak?igsh=M2ZiNm1mcjE5Z3kx&utm_source=qr", color: "#E1306C" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
                    whileHover={{ 
                      y: -5,
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon 
                      className="text-xl" 
                      style={{ color: social.color }} 
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className={`p-3 rounded-full mr-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Location</h4>
                <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Hargeisa , Somaliland
                </p>
              </div>
            </motion.div>

            {/* Map Embed */}
            <motion.div 
              className="mt-8 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.156659423472!2d44.06168231533246!3d9.56287679326645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1628c93e6b5a98b9%3A0x1a1a9b1b1b1b1b1b!2sHargeisa%2C%20Somaliland!5e0!3m2!1sen!2sso!4v1620000000000!5m2!1sen!2sso" 
                width="100%" 
                height="250" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                className={`rounded-xl ${darkMode ? 'filter grayscale-50 contrast-75' : ''}`}
              ></iframe>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>

        </div>
      </div>
    </div>
  );
}