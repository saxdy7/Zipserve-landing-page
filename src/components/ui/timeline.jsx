"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Update height on mount and on window resize
  useEffect(() => {
    setIsMounted(true);
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Animate items in as they appear in the viewport
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div 
      className="w-full min-h-screen overflow-hidden font-['Sirin_Stencil'] "
      ref={containerRef}>
      
      {/* Background overlay effect */}
      {/* <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none" /> */}
      
      {/* Timeline container */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-32">
        {data.map((item, index) => (
          <motion.div 
            key={index} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            variants={itemVariants}
            className="flex justify-start pt-16 md:pt-40 md:gap-32">
            
            {/* Timeline marker and title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-inner border border-purple-200 p-2" />
              </motion.div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600">
                {item.title}
              </h3>
            </div>

            {/* Content with increased spacing */}
            <div className="pl-20 pr-8 md:pl-16 w-full">
              <h3 className="md:hidden block text-3xl mb-8 text-left font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
                {item.title}
              </h3>
              <div className="text-lg md:text-xl">
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Timeline line with animated progress */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-300 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full shadow-[0_0_10px_rgba(147,51,234,0.7)]" />
        </div>
      </div>
    </div>
  );
};