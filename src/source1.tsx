import { MdSpaceDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsChatSquareDots } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { VscSourceControl } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import {profile2,profile3,profile4,profile5,
        profile6,profile7,profile8,amla,
        Beetroot,
        Tomato,
        spinach,
        potato,
        lemon,
        ginger
} from './assets/images'
import { Route, Routes } from 'react-router-dom'
export  const sidebar = [
    {
        name:"Dashboard",
        route:"/",
        icon:<MdSpaceDashboard/>,
    },
    {
        name:"Soul Station",
        route:"",
        icon:<FiUsers/>,
    },
    {
        name:"Progress Tracker",
        route:"",
        icon:<BsChatSquareDots/>,
        notificationCount:3,
    },
    // {
    //     name:"Products",
    //     route:"",
    //     icon:<FaSitemap/>,
    // },
    //{
    //    name:"",
    //    route: "",
    //    icon:<HiOutlineShoppingBag/>,
    //},
    // {
    //     name:"Sources",
    //     route:"",
    //     icon:<VscSourceControl/>,
    // },
    {
        name:"Settings",
        route:"",
        icon:<IoSettingsOutline/>,
    },
    
]

export const userMenus = [
    {name:"Profile", route:"#"},
    {name:"Settings", route:"#"},
    {name:"Logout", route:"#"},
]


export const soulResources = {
    // Videos section with meditation and relaxation content
    videos: [
      {
        name: "10-Minute Mindful Breathing Exercise",
        duration: "10 mins",
        category: "Meditation",
        rating: "4.8/5"
      },
      {
        name: "Gentle Yoga for Stress Relief",
        duration: "25 mins",
        category: "Movement",
        rating: "4.9/5"
      },
      {
        name: "Nature Sounds Visualization",
        duration: "15 mins",
        category: "Relaxation",
        rating: "4.7/5"
      }
    ],
    
    // Blog posts about stress management
    blogs: [
      {
        name: "Understanding Stress Response",
        readTime: "5 mins",
        category: "Education",
        author: "Dr. Sarah Chen"
      },
      {
        name: "5 Daily Habits for Mental Peace",
        readTime: "7 mins",
        category: "Lifestyle",
        author: "Mark Williams"
      },
      {
        name: "Mindfulness at Work",
        readTime: "6 mins",
        category: "Workplace",
        author: "Emma Thompson"
      }
    ],
    
    // Books for stress relief and mental wellness
    books: [
      {
        name: "The Stress-Free Mind",
        author: "Dr. John Martinez",
        category: "Self-Help",
        rating: "4.6/5"
      },
      {
        name: "Peaceful Evenings",
        author: "Lisa Chang",
        category: "Meditation",
        rating: "4.8/5"
      },
      {
        name: "Stress Relief Through Art",
        author: "Michael Reed",
        category: "Creative Therapy",
        rating: "4.7/5"
      }
    ],
    
    // Podcasts about mental wellness
    podcasts: [
      {
        name: "Daily Calm",
        duration: "20 mins",
        category: "Meditation",
        host: "Sarah Williams"
      },
      {
        name: "Stress-Free Living",
        duration: "30 mins",
        category: "Lifestyle",
        host: "James Carter"
      },
      {
        name: "Mental Wellness Today",
        duration: "25 mins",
        category: "Health",
        host: "Dr. Emily Brooks"
      }
    ]
  };
  
  // Color mapping for different categories
  export const categoryColors = {
    Meditation: 'bg-blue-100 text-blue-800',
    Movement: 'bg-green-100 text-green-800',
    Relaxation: 'bg-purple-100 text-purple-800',
    Education: 'bg-yellow-100 text-yellow-800',
    Lifestyle: 'bg-pink-100 text-pink-800',
    Workplace: 'bg-orange-100 text-orange-800',
    'Self-Help': 'bg-teal-100 text-teal-800',
    'Creative Therapy': 'bg-indigo-100 text-indigo-800',
    Health: 'bg-red-100 text-red-800'
  };