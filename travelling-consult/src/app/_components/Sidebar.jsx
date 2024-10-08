"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import FlightSearchForm from "./FlightSearchForm";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import BasicDateCalendar from "./Calendar";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from '@mui/material/Card';

import MultiActionAreaCard from "./Card";


import Image from "next/image";
import { cn } from "@/lib/utils";

function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/home",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/sign-in",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 ",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>)
  );
}
export const Logo = () => {
  return (
    (<Link
      href="/"
      className="font-bold flex space-x-2 items-center text-sm text-custom_blue py-1 relative z-20">
      <div
        className="h-5 w-6 bg-custom_blue dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-custom_black text-lg dark:text-white whitespace-pre">
      
       ErnestLinks
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>)
  );
};
const Dashboard = () => {
  return (
    (<div className=" flex-1 overflow-y-auto w-screen">
     
      <div
        className="flex flex-col ">
       <div
  className="bg-white h-60 rounded-tl-2xl  relative"
  style={{
    backgroundImage: `url('/images/Airport.jpg')`,
    backgroundSize: 'cover', // This ensures the image covers the entire div
    backgroundPosition: 'center', // This centers the image
    backgroundRepeat: 'no-repeat' // This prevents repeating the image
  }}
>
 
</div>
          
        <div className="p-2 md:p-10  border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-row gap-2 flex-1 w-full h-full">
        <div className="flex gap-2 flex-1 h-full ">
        <MultiActionAreaCard/>
          
        </div>
        <div className="flex">
        <Card  sx={{ height: '290px' }}><BasicDateCalendar/></Card>
        
        </div>
        
      </div>
      </div>
    </div>)
  );
};

export default SidebarDemo;
