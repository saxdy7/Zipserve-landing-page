import React, { useEffect, useState } from 'react';
  import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Contact from './Contact';
import About from './About';
import Features from './Features';
import Benefits from './Benefits';

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #ffffff;
  padding: 6rem 3rem 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #000000;
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    transform: translateY(-50%);
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .asterisk {
    margin-right: 0.5rem;
    font-size: 2.2rem;
    color: #3b75ef;
  }
`;

const Tagline = styled(motion.div)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #ffffff, #3b75ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
`;

const NavContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const NavLink = styled(motion(Link))`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #3b75ef;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const SocialContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const SocialIconLink = styled(motion.a)`
  color: #ffffff;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3b75ef;
    transform: translateY(-3px);
  }
`;

const BackToTopContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const BackToTopButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background-color: rgba(59, 117, 239, 0.2);
    border-color: #3b75ef;
  }
`;

const Divider = styled(motion.div)`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  margin: 2rem 0;
`;

const BottomBar = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CreditsText = styled(motion.div)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  
  a {
    color: #ffffff;
    text-decoration: none;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: #3b75ef;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #3b75ef;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

const FooterNav = styled(motion.div)`
  display: flex;
  gap: 2rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: #3b75ef;
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #3b75ef;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

const RotatingCircle = styled(motion.div)`
  position: absolute;
  right: 5%;
  bottom: 20%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(59, 117, 239, 0.2);
  cursor: pointer;
  border: 1px solid rgba(59, 117, 239, 0.3);
  z-index: 10;
  
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    fill: none;
  }
  
  .circle-text {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 5px;
    fill: #ffffff;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    right: 10%;
    bottom: 15%;
    width: 120px;
    height: 120px;
  }
`;

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isVisible, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.1, boxShadow: "0 0 15px rgba(59, 117, 239, 0.5)", transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
  };
  
  const socialVariants = {
    hover: { y: -5, color: "#3b75ef", transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const rotateVariants = {
    animate: { 
      rotate: 360,
      transition: { 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 0 25px rgba(59, 117, 239, 0.4)",
      transition: { duration: 0.3 } 
    }
  };

  return (
    <FooterContainer>
      <FooterContent as={motion.div} initial="hidden" animate="visible" variants={containerVariants}>
        <Logo variants={itemVariants}>
          <span className="asterisk">*</span>
          ZIPSERVE
        </Logo>
        <Tagline variants={itemVariants}>Smart Work Smarter Hiring!</Tagline>
        
        <NavContainer variants={itemVariants}>
          <NavLink to="/" variants={socialVariants} whileHover="hover" whileTap="tap">Home</NavLink>
          <NavLink to="/features" variants={socialVariants} whileHover="hover" whileTap="tap">Features</NavLink>
          <NavLink to="/benefits" variants={socialVariants} whileHover="hover" whileTap="tap">Benefits</NavLink>
          <NavLink to="/about" variants={socialVariants} whileHover="hover" whileTap="tap">About</NavLink>
          <NavLink to="/contact" variants={socialVariants} whileHover="hover" whileTap="tap">Contact</NavLink>
        </NavContainer>
        
        <SocialContainer variants={itemVariants}>
          <SocialIconLink 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            whileHover="hover"
            whileTap="tap"
            variants={socialVariants}
          >
            <FaInstagram />
          </SocialIconLink>
          <SocialIconLink 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter"
            whileHover="hover"
            whileTap="tap"
            variants={socialVariants}
          >
            <FaTwitter />
          </SocialIconLink>
          <SocialIconLink 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            whileHover="hover"
            whileTap="tap"
            variants={socialVariants}
          >
            <FaLinkedin />
          </SocialIconLink>
          <SocialIconLink 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
            whileHover="hover"
            whileTap="tap"
            variants={socialVariants}
          >
            <FaFacebook />
          </SocialIconLink>
        </SocialContainer>
        
        <BackToTopContainer variants={itemVariants}>
          <BackToTopButton 
            onClick={scrollToTop}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </BackToTopButton>
        </BackToTopContainer>
      </FooterContent>
      
      {/* Rotating circle with text */}
      {/* <RotatingCircle
        animate="animate"
        whileHover="hover"
        variants={rotateVariants}
        onClick={() => window.location.href = "/contact"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.svg 
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
          <text>
            <textPath href="#circle" className="circle-text">
              • LET'S TALK • SAY HELLO • LET'S TALK • SAY HELLO
            </textPath>
          </text>
        </motion.svg>
        <motion.div 
          className="arrow"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↑
        </motion.div>
      </RotatingCircle> */}
      
      <Divider variants={itemVariants} />
      <BottomBar variants={containerVariants}>
        <CreditsText variants={itemVariants}>
          Created by <a href="#flowaze">Zipserve Members</a>.&nbsp;&nbsp;Powered by <a href="#webflow">Zipserve</a>.
        </CreditsText>
        <FooterNav variants={itemVariants}>
          <a href="#style-guide">Style Guide</a>
          <a href="#licenses">Licenses</a>
          <a href="#changelog">Changelog</a>
        </FooterNav>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
