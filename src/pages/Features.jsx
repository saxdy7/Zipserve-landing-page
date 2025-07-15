import React from 'react';
import ScrollFloat from '../components/ScrollFloat';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Cursor } from '../components/Cursor'; // Importing Cursor component

// Text animation variants
const textVariants1 = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: i * 0.15,
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateY: 30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
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
      duration: 1,
      staggerChildren: 0.25,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "circOut" }
  }
};

// Split text into words function
const SplitText = ({ children }) => {
  return (
    <>
      {children.split(" ").map((word, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          variants={letterVariants}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};

// Styled button component
const StyledButton = styled.button`
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 14px 32px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #3b75ef;
    color: white;
  }
`;

const ArrowIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
    transition: transform 0.3s ease;
  }
  
  ${StyledButton}:hover & {
    background-color: white;
  }
  
  ${StyledButton}:hover & svg {
    color: #3b75ef;
    transform: translate(2px, -2px);
  }
`;

// Background container
const BackgroundContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(130, 130, 130, 0.5) 1px, transparent 1px), 
      linear-gradient(90deg, rgba(130, 130, 130, 0.5) 1px, transparent 1px);
    background-size: 70px 70px;
    z-index: -1;
    opacity: 0.6;
    animation: gradientShift 15s ease infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(200,200,200,0.8) 0%, rgba(200,200,200,0) 70%);
    z-index: -2;
    opacity: 0.7;
    transform: rotate(0deg);
    pointer-events: none;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }
`;

// Animated component that resets on scroll
const AnimatedSection = ({ isReversed, index, title, description }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
    rootMargin: "-50px 0px"
  });
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Handle contact button click
  const handleContactClick = () => {
    navigate('/contact'); // Navigate to contact page
  };

  // Get the correct video path based on index
  const videoPath = `/videos/${index + 1}.mp4`;

  return (
    <div style={{
      display: "flex",
      flexDirection: isReversed ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "40px",
      padding: "40px",
      marginTop: index > 0 ? "40px" : "0",
      paddingLeft: isReversed ? "40px" : "110px",
      paddingRight: isReversed ? "110px" : "40px"
    }}>
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.9, x: isReversed ? -30 : 30 },
          visible: { 
            opacity: 1, 
            scale: 1,
            x: 0,
            transition: { 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2
            } 
          }
        }}
        style={{
          width: "50%",
          height: "500px",
          backgroundColor: "#0d0d22",
          borderRadius: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              transition: { 
                delay: 0.6,
                duration: 0.8,
                ease: "anticipate"
              } 
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "70px"
            }}
          >
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textVariants}
        style={{ 
          width: "50%", 
          textAlign: "left", 
          paddingLeft: isReversed ? "40px" : "100px",
          paddingRight: isReversed ? "100px" : "40px",
          marginTop: isReversed ? "0" : "-50px" 
        }}
      >
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 30, x: isReversed ? 30 : -30 },
            visible: { 
              opacity: 1, 
              y: 0, 
              x: 0,
              transition: { 
                duration: 0.8, 
                ease: "circOut",
                delay: 0.3
              } 
            }
          }}
          style={{ 
            fontSize: "50px", 
            fontWeight: "bold", 
            marginBottom: "20px",
            background: "linear-gradient(to right, #0d0d22, #333366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                ease: "easeOut",
                delay: 0.5
              } 
            }
          }}
          style={{ 
            fontSize: "25px", 
            lineHeight: "1.5", 
            color: "#333", 
            fontFamily: "Sirin Stencil",
          }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                ease: "easeOut",
                delay: 0.7
              } 
            }
          }}
        >
          <StyledButton
            onClick={handleContactClick} // Add onClick handler
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "backOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: -5 }}
              transition={{ duration: 0.3 }}
            >
              Contact Us
            </motion.span>
            <ArrowIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </ArrowIcon>
          </StyledButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Features = () => {
  return (
    <BackgroundContainer style={{ paddingTop: '10px' }}>
      <Cursor /> {/* Adding Cursor component here */}
      {/* Heading Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }
        }}
        viewport={{ once: true, amount: 0.5 }}
        style={{ paddingLeft: '140px', color: '#3b75ef' }}
      >
        <ScrollFloat animationDuration={1.5} ease="elastic.out(1, 0.3)">
          Features
        </ScrollFloat>
      </motion.div>

      {/* Smart Worker Booking App Info */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={textVariants1}
        viewport={{ once: false, amount: 0.3 }}
        style={{
          width: "30%",
          marginLeft: "auto",
          marginTop: "-20px",
          textAlign: "right",
          position: "relative",
          right: "150px",
          fontFamily: "Sirin Stencil",
          color: "#333",
          fontSize: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", lineHeight: "1.5" }}>
          <SplitText>
            The AI-powered smart worker booking app integrates technology for convenient access to skilled workers like electricians, plumbers, and more, revolutionizing service availability.
          </SplitText>
        </h3>
      </motion.div>

      {/* Feature Sections */}
      <AnimatedSection 
        isReversed={true} 
        index={0} 
        title="Instant Book Workers"
        description=" India's first 10-minute skilled worker booking app, connecting you with professionals within 5km for immediate service, revolutionizing how you access electrical, plumbing, carpentry and other essential services."
      />
      <AnimatedSection 
        isReversed={false} 
        index={1} 
        title="Precise Tracking"
        description="Monitor your worker's exact location from booking to arrival with our precision GPS system, ensuring complete visibility, and location of workers."
      />
      <AnimatedSection 
        isReversed={true} 
        index={2} 
        title="Review and Ratings"
        description="Build confidence through our comprehensive verification process, detailed worker profiles, authentic customer reviews, transparent pricing, and secure payment system—creating a trusted marketplace for skilled services."
      />
      <div style={{ height: '120px' }}></div>
    </BackgroundContainer>
  );
};

export default Features;