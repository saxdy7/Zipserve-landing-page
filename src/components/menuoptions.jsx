import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 50px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
`;

const MenuItem = styled.li`
  position: relative;
  list-style: none;
  margin-top: ${props => props.index === 0 ? '0' : '30px'};  // Decreased from 80px to 40px
  
  &::before {
    position: absolute;
    content: '';
    width: 80px;
    height: 80px;
    top: 50%;
    left: 0;
    transform: translate(-100px, -50%) rotate(225deg);
    opacity: 0;
    background: url('/arrow.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    will-change: transform;
    transition: 0.8s cubic-bezier(0.9, 0, 0.1, 1);
  }
  
  &:hover::before {
    opacity: 1;
    transform: translate(0%, -50%) rotate(180deg);
  }
`;

const MenuLink = styled.div`
  position: relative;
  display: block;
  text-transform: uppercase;
  font-size: 90px; // Decreased from 100px to 80px
  line-height: 0.9;
  text-decoration: none;
  color: transparent;
  -webkit-text-stroke: 2px #fff;
  z-index: 2;
  transition: 0.8s cubic-bezier(0.9, 0, 0.1, 1);
  cursor: pointer;
  bottom: 50px;
  
  &:hover {
    transform: translateX(100px);
    color: #fff;
    -webkit-text-stroke: 2px transparent;
  }
`;

const SocialMedia = styled.div`
  position: absolute;
  bottom: 80px;
  left: 40px;
  font-size: 22px;
  color: #fff;
  z-index: 2;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #000;
    transition: width 0.4s cubic-bezier(0.9, 0, 0.1, 1);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const SocialLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.9, 0, 0.1, 1);
  position: relative;
  padding: 5px 0;
  
  &:hover {
    color: #fff;
    transform: translateY(-3px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #fff;
    transition: width 0.3s ease;
  }
  
  &:hover::before {
    width: 100%;
  }
`;

const MenuOptions = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 1, title: 'Home', to: '/' },
    { id: 2, title: 'Features', to: '/features' },
    { id: 3, title: 'Benefits', to: '/benefits' },
    { id: 4, title: 'About', to: '/about' },
    { id: 5, title: 'Contact', to: '/contact' }
  ];

  const handleClick = (path) => {
    // Close menu if needed (you might want to add this functionality)
    // For example: setMenuOpen(false);
    
    // Navigate to the selected page
    navigate(path);
  };

  return (
    <MenuWrapper>
      <ul>
        {menuItems.map((item, index) => (
          <MenuItem 
            key={item.id}
            index={index}
          >
            <MenuLink onClick={() => handleClick(item.to)}>
              {item.title}
            </MenuLink>
          </MenuItem>
        ))}
      </ul>
      <SocialMedia>
        <div>Social Media</div>
        <SocialLinks>
          <SocialLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</SocialLink>
          <SocialLink href="https://www.x.com" target="_blank" rel="noopener noreferrer">X</SocialLink>
          <SocialLink href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
          <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</SocialLink>
        </SocialLinks>
      </SocialMedia>
    </MenuWrapper>
  );
};

export default MenuOptions;