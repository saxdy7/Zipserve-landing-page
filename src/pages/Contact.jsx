import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiCheck, 
  FiArrowRight, FiPlus, FiMinus, FiStar, FiClock, FiShield
} from 'react-icons/fi';
import Footer from './footer';
import useMediaQuery from "../hooks/useMediaQuery";
import { Cursor } from '../components/Cursor'; // Added Cursor import

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 });
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Parallax effect for the background decorative elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // FAQ items
  const faqItems = [
    {
      question: "1. WHAT SERVICES DO YOU OFFER?",
      answer: "We offer a wide range of services through our AI-powered smart worker booking app including electricians, plumbers, locksmiths, painters, carpenters, and many more skilled professionals. Our platform connects you with qualified service providers in your area."
    },
    {
      question: "2. HOW LONG DOES A TYPICAL PROJECT TAKE?",
      answer: "Project timelines vary depending on the service type and complexity. Our app provides estimated completion times for each service, and you can track progress in real-time. Most basic services can be completed within 24-48 hours of booking."
    },
    {
      question: "3. DO YOU WORK WITH ALL TYPES OF BUSINESSES?",
      answer: "Yes, we work with various service providers and businesses of all sizes. Our platform accommodates independent contractors, small businesses, and larger service companies, ensuring you have access to the right professional for your specific needs."
    },
    {
      question: "4. HOW DO YOU MEASURE SUCCESS?",
      answer: "We measure success through customer satisfaction, service completion rates, provider quality scores, and platform efficiency. Our robust rating system and review process ensure transparency and accountability for all services booked through our app."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const textFadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1] 
      } 
    }
  };

  const staggeredContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const rotatingBgVariants = {
    initial: { rotate: -5, scale: 0.98 },
    animate: { 
      rotate: 5, 
      scale: 1.02,
      transition: { 
        duration: 20, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10], 
      transition: { 
        duration: 6, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };

  // Dynamic contact items with icons
  const contactItems = [
    { 
      icon: <FiPhone className="w-6 h-6" />, 
      title: "Call Us", 
      content: "+1 (555) 123-4567",
      description: "Monday-Friday, 9am-5pm EST",
      color: "blue",
      gradient: "from-blue-500 to-blue-400",
      highlight: "text-blue-600"
    },
    { 
      icon: <FiMail className="w-6 h-6" />, 
      title: "Email Us", 
      content: "support@zipserve.com",
      description: "We'll respond within 24 hours",
      color: "indigo",
      gradient: "from-indigo-500 to-violet-400",
      highlight: "text-indigo-600"
    },
    { 
      icon: <FiMapPin className="w-6 h-6" />, 
      title: "Visit Us", 
      content: "123 Business Ave, Suite 100",
      description: "City, State 12345",
      color: "sky",
      gradient: "from-sky-500 to-cyan-400",
      highlight: "text-sky-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-white">
      <Cursor />
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-white">
        <motion.div 
          className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full opacity-40 blur-3xl"
          style={{ background: 'rgba(0, 0, 255, 0.4)' }} // Deep blue hue for a vibrant effect
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div 
          className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'rgba(135, 206, 250, 0.3)' }} // Soft sky blue for a calming effect
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 30 }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'rgba(173, 255, 47, 0.3)' }} // Light teal for a refreshing touch
          animate={{
            x: mousePosition.x * -25,
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
        />
      </div>

      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 z-50"
        style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex-grow relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.215, 0.61, 0.355, 1] 
          }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-lg transform transition-transform duration-300 hover:scale-105">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-medium">AI-Powered Service Booking</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative inline-block">
              Touch
              <motion.span 
                className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-50 -z-10 rounded"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h1>
          
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
            variants={textFadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            The AI-powered smart worker booking app revolutionizes service access by seamlessly integrating technology with convenience. Find and book skilled workers including electricians, plumbers, painters, and more.
          </motion.p>

          {/* Floating illustration dots */}
          <div className="relative mt-8 mb-4 h-10">
            <motion.div 
              className="absolute left-1/2 ml-20 w-3 h-3 rounded-full bg-blue-400"
              animate={{ y: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute left-1/2 w-2 h-2 rounded-full bg-indigo-500"
              animate={{ y: [8, -8, 8], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div 
              className="absolute left-1/2 mr-20 w-4 h-4 rounded-full bg-violet-400"
              animate={{ y: [4, -4, 4], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Contact cards */}
          <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                transition: { type: "spring", stiffness: 300, damping: 20 } 
              }}
              className="bg-white backdrop-blur-md bg-opacity-90 p-6 rounded-3xl shadow-lg border border-gray-200 group relative overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.05, opacity: 0.1 }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className={`flex items-center justify-center w-20 h-20 rounded-full bg-${item.color}-100 ${item.highlight} mb-6 group-hover:bg-gradient-to-br ${item.gradient} group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-lg mx-auto`}
              >
                {item.icon}
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className={`${item.highlight} font-medium mb-2`}>{item.content}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-blue-500"
                whileHover={{ scaleX: 1.5 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section with enhanced container design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={textFadeInVariants}
          className="mb-20 relative overflow-hidden p-8 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-black"
        >
          <div className="relative z-10 text-white p-10 md:p-14 overflow-hidden">
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-16 tracking-tight"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            >
              <span className="text-white">COMMON</span>
              <br />
              <span className="text-gray-400">QUESTIONS</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-8"
              variants={staggeredContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {faqItems.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="border-b border-gray-700 pb-8"
                  variants={itemVariants}
                >
                  <div 
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center cursor-pointer group"
                  >
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">{faq.question}</h3>
                    <motion.button 
                      className="bg-transparent h-12 w-12 flex items-center justify-center rounded-full border border-gray-600 group-hover:border-blue-500 group-hover:bg-blue-900/20 transition-all duration-300"
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={openFaqIndex === index ? "minus" : "plus"}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {openFaqIndex === index ? <FiMinus /> : <FiPlus />}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="mt-4 text-gray-300 overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 mb-20">
          {/* Left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:w-1/3"
          >
            <div className="sticky top-10 space-y-8">
              {/* Main info section */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                  How Can We 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Help?</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  With features like real-time tracking, personalized recommendations, AI-powered searches that match user needs, and complex sorting options, our app ensures a smooth experience.
                </p>
              </div>
              
              {/* Our Guarantee section with enhanced design */}
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-lg relative overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-100 opacity-30 transform translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-indigo-100 opacity-30 transform -translate-x-12 translate-y-12" />
                
                <h3 className="text-xl font-semibold mb-6 text-blue-800 relative">
                  <span className="inline-block bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    <FiShield className="w-4 h-4" />
                  </span>
                  Our Guarantee
                </h3>
                
                <motion.ul 
                  className="space-y-5"
                  variants={staggeredContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.6 }}
                >
                  {[
                    { 
                      icon: <FiStar className="w-4 h-4" />, 
                      text: "Verified professionals", 
                      desc: "All service providers are thoroughly vetted" 
                    },
                    { 
                      icon: <FiShield className="w-4 h-4" />, 
                      text: "Secure payment system", 
                      desc: "Pay only when you're satisfied with the service" 
                    },
                    { 
                      icon: <FiClock className="w-4 h-4" />, 
                      text: "Real-time tracking", 
                      desc: "Monitor service progress from booking to completion" 
                    }
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5 text-blue-600 shadow-sm">
                        {item.icon}
                      </span>
                      <div>
                        <span className="block font-medium text-gray-800">{item.text}</span>
                        <span className="block text-sm text-gray-500">{item.desc}</span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              
              {/* App Features section with enhanced design */}
              <motion.div 
                className="p-8 rounded-xl border border-gray-200 bg-white shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow-md">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <h3 className="font-semibold text-xl">App Features</h3>
                </div>
                
                <motion.div 
                  className="space-y-3"
                  variants={staggeredContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.6 }}
                >
                  {[
                    "Advanced filtering based on reviews and pricing",
                    "Customizable feedback system",
                    "Seamless communication options"
                  ].map((q, i) => (
                    <motion.div 
                      key={i} 
                      className="group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center p-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400 mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{q}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:w-2/3"
          >
            <div className="bg-white backdrop-blur-sm bg-opacity-90 p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Background decoration for the form */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full opacity-50 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
                </div>
                
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-6 rounded-xl mb-6 flex items-center border border-green-100 shadow-md"
                    >
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-2 mr-4 shadow-sm">
                        <FiCheck className="text-green-600 w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 mb-1">Message Sent Successfully!</h3>
                        <p className="text-green-700">Thank you for reaching out. We'll get back to you soon.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="relative"
                    >
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your Name" 
                        className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`} 
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </motion.div>
                    <motion.div
                      className="relative"
                    >
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Your Email" 
                        className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`} 
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </motion.div>
                  </div>
                  <motion.div
                    className="relative"
                  >
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="Subject" 
                      className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.subject ? 'border-red-500' : ''}`} 
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </motion.div>
                  <motion.div
                    className="relative"
                  >
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Your Message" 
                      className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : ''}`} 
                      rows="4"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </motion.div>
                  <button 
                    type="submit" 
                    className={`w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;