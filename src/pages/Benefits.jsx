import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import ScrollFloat from '../components/ScrollFloat';
import { Timeline } from "../components/ui/timeline";
import { Cursor } from '../components/Cursor';

const ImageGallery = () => {
  const gallery = useRef(null);
  const textRef = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  
  // useInView hook to detect when element is in viewport
  const isInView = useInView(textRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  // Animation variants for the paragraph
  const textVariants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for words
  const wordVariants1 = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Split text into words
  const text = "The AI booking app connects skilled workers with customers, offering real-time tracking, smart recommendations, and easy filtering. With streamlined communication and reward features, it provides an efficient digital marketplace for local services.";
  
  const words = text.split(" ");

  // Timeline data
  const timelineData = [
    {
      title: "Finding the Perfect Match",
      content: "Our AI-powered platform seamlessly connects you with skilled professionals including electricians, plumbers, locksmiths, painters, and carpenters"
    },
    {
      title: "Transparency & Trust",
      content: "Make informed decisions with our advanced filtering based on verified reviews, transparent pricing, and comprehensive service provider profiles. Real-time tracking lets you know exactly when your service provider will arrive, eliminating the uncertainty of traditional service bookings"
    },
    {
      title: "Seamless Experience",
      content: "Enjoy a frictionless service booking experience with these revolutionary features: ✅ Intuitive chat and call options for direct communication with service providers. ✅ Customizable reviews to share your detailed feedback with the community. ✅ Gamified rewards system that offers discounts on future services. ✅ Affordable pricing with complete transparency and no hidden fees. ✅ Digital payments and receipts for a paperless, hassle-free experience."
    }
  ];

  // All styles moved to the top
  const styles = {
    container: {
      overflow: "hidden"
    },
    spacer: {
      height: "20vh"  // Changed from "12vh" to "20vh"
    },
    spacerLarge: {
      height: "20vh"
    },
    spacerMedium: {
      height: "12vh"
    },
    // No spacer at all between Benefits and Timeline
    noSpacer: {
      height: "0"
    },
    
    gallery: {
      height: "175vh",
      background: "rgb(45, 45, 45)",
      position: "relative",
      display: "flex",
      gap: "2vw",
      padding: "2vw",
      boxSizing: "border-box",
      overflow: "hidden"
    },
    column: (index) => ({
      position: "relative",
      height: "100%",
      width: "25%",
      minWidth: "250px",
      display: "flex",
      flexDirection: "column",
      gap: "2vw",
      top: index === 1 ? "-45%" : index === 2 ? "-95%" : index === 3 ? "-45%" : "-75%"
    }),
    imageContainer: {
      height: "100%",
      width: "100%",
      position: "relative",
      borderRadius: "2vw",
      overflow: "hidden"
    },
    image: {
      objectFit: "cover",
      width: "100%",
      height: "100%"
    },
    
    timelineContainer: {
      padding: "0 5vw", // Removed top padding completely
      maxWidth: "1200px",
      margin: "-40px auto 0", // Added negative top margin to pull it up
      position: "relative", // Added for z-index
      zIndex: 1 // Ensure it's above other elements
    },
    timelineHeading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem", // Reduced from 2rem
      textAlign: "center"
    },
    benefitsSection: {
      marginBottom: "-20px" // Negative margin to pull content together
    },
    benefitsText: {
      marginBottom: "-40px" // Pull text up closer to timeline
    }
  };

  const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
  ];

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const Column = ({ images, y, index }) => {
    return (
      <>
        <Cursor />
        <motion.div style={{ ...styles.column(index), y }}>
          {images.map((src, i) => {
            return (
              <div key={i} style={styles.imageContainer}>
                <img
                  src={`/images/${src}`}
                  alt="gallery image"
                  style={styles.image}
                />
              </div>
            );
          })}
        </motion.div>
      </>
    );
  };

  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.2 });

  return (
    <div>
      <Cursor /> {/* Added Cursor component here */}
      <div style={styles.container}>
        <div style={styles.spacer}></div>
        <div ref={gallery} style={styles.gallery}>
          <Column images={[images[0], images[1], images[2]]} y={y} index={1} />
          <Column images={[images[3], images[4], images[5]]} y={y2} index={2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} index={3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} index={4} />
        </div>
        <div style={styles.spacer}></div>
      </div>
      
      {/* Benefits Section */}
      <div style={styles.benefitsSection}>
        {/* Heading Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
          viewport={{ once: true, amount: 0.5 }}
          style={{ paddingLeft: '140px', color: '#3b75ef', marginBottom: '-10px' }} // Added negative margin
        >
          <ScrollFloat animationDuration={1} ease="back.inOut(2)">
            Benefits
          </ScrollFloat>
        </motion.div>

        {/* Main Content */}
        <div
          style={{
            width: "50%",
            marginLeft: "auto",
            marginTop: "-20px",
            textAlign: "center",
            position: "relative",
            right: "100px",
            fontFamily: "Sirin Stencil",
            fontSize: "30px",
            ...styles.benefitsText
          }}
          ref={textRef}
        >
          <motion.p
            variants={textVariants1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "flex-end",
              gap: "0.3em"
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants1}
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </div>

      {/* No spacer at all between sections */}
      <div style={styles.noSpacer}></div>

      {/* Timeline Section */}
      <div 
        style={styles.timelineContainer}
        ref={timelineRef}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={styles.timelineHeading}
        >
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <Timeline data={timelineData} />
        </motion.div>
      </div>

      {/* Only one spacer at the end */}
      <div style={styles.spacerLarge}></div>
    </div>
  );
};

export default ImageGallery;