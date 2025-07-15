import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../components/ScrollFloat';
import Footer from './footer';
import { Cursor } from '../components/Cursor';

// Enhanced container with gradient background
const AboutContainer = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e6eef5 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, rgba(59, 117, 239, 0.05) 0%, rgba(59, 117, 239, 0) 70%);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`;

// Enhanced title with gradient text
const AboutTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 800;
  background: linear-gradient(45deg, #3b75ef, #6b94f5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.02em;
`;

const AboutSection = styled(motion.section)`
  margin-bottom: 4rem;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #2a2f45;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #3b75ef, #6b94f5);
    border-radius: 3px;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto;
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 3rem 0;
`;

const ServiceItem = styled(motion.div)`
  padding: 2.5rem;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #3b75ef, #6b94f5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(59, 117, 239, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 48px;
    height: 48px;
    color: #3b75ef;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2a2f45;
  font-weight: 700;
`;

const ServiceDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

// Animation variants - fixed to use proper easing functions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const serviceItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

// Updated Icons for services that match the descriptions
const InstantBookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationTrackingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ReviewRatingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

function About() {
  // Using Intersection Observer for scroll animations
  const [revolutionRef, revolutionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  // Animation controls
  const revolutionControls = useAnimation();
  const servicesControls = useAnimation();
  const missionControls = useAnimation();
  
  // Start animations when sections come into view
  useEffect(() => {
    if (revolutionInView) {
      revolutionControls.start('visible');
    }
    if (servicesInView) {
      servicesControls.start('visible');
    }
    if (missionInView) {
      missionControls.start('visible');
    }
  }, [revolutionInView, servicesInView, missionInView, revolutionControls, servicesControls, missionControls]);

  return (
    <div>
      <Cursor />
      <AboutContainer>
        <ContentWrapper>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <AboutTitle
              variants={titleVariants}
            >
              <ScrollFloat 
                animationDuration={1.2}
                ease="easeOut"
              >
                About Us
              </ScrollFloat>
            </AboutTitle>
          </motion.div>
        
          <AboutSection
            ref={revolutionRef}
            initial="hidden"
            animate={revolutionControls}
            variants={containerVariants}
          >
            <SectionTitle variants={itemVariants}>
              Revolutionizing Service Access
            </SectionTitle>
            <SectionText variants={itemVariants}>
              Welcome to the future of service booking. Our AI-powered platform connects you with skilled professionals, 
              making it easier than ever to find and book the services you need.
            </SectionText>
          </AboutSection>

          <AboutSection
            ref={servicesRef}
            initial="hidden"
            animate={servicesControls}
            variants={containerVariants}
          >
            <SectionTitle variants={itemVariants}>
              Our Services
            </SectionTitle>
            <ServicesGrid 
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {[0, 1, 2].map((index) => (
                <ServiceItem
                  key={index}
                  custom={index}
                  variants={serviceItemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <ServiceIcon>
                    {index === 0 ? <InstantBookIcon /> : 
                     index === 1 ? <LocationTrackingIcon /> : 
                     <ReviewRatingsIcon />}
                  </ServiceIcon>
                  <ServiceTitle>
                    {index === 0 ? "Instant Book Workers" : 
                     index === 1 ? "Precise Tracking" : 
                     "Review and Ratings"}
                  </ServiceTitle>
                  <ServiceDescription>
                    {index === 0 ? "India's first 10-minute skilled worker booking app, connecting you with professionals within 5km for immediate service, revolutionizing how you access electrical, plumbing, carpentry and other essential services." : 
                     index === 1 ? "Monitor your worker's exact location from booking to arrival with our precision GPS system, ensuring complete visibility, and location of workers." : 
                     "Build confidence through our comprehensive verification process, detailed worker profiles, authentic customer reviews, transparent pricing, and secure payment system—creating a trusted marketplace for skilled services."}
                  </ServiceDescription>
                </ServiceItem>
              ))}
            </ServicesGrid>
          </AboutSection>

          <AboutSection
            ref={missionRef}
            initial="hidden"
            animate={missionControls}
            variants={containerVariants}
          >
            <SectionTitle variants={itemVariants}>
              Our Mission
            </SectionTitle>
            <SectionText variants={itemVariants}>
              We're committed to digitalizing local labor markets, making professional services more accessible, 
              affordable, and efficient for everyone. Through technology and innovation, we're building a 
              user-centric platform that transforms how services are discovered and delivered.
            </SectionText>
          </AboutSection>
        </ContentWrapper>
      </AboutContainer>
      <Footer />
    </div>
  );
}

export default About;