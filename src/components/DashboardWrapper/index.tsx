import React, { useEffect, useState, useRef } from 'react'
import { profile1 } from '../../assets/images'
import { IoIosNotifications } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { TiThMenu } from 'react-icons/ti'
import "./DashboardWrapper.css"
import  Sidebar  from '../Sidebar'
import UserMenus from './UserMenus'
import { useUser } from '@clerk/clerk-react'
// import PaymentButton from '../PaymentButton'

interface DashboardWrapperProps {
  children: React.ReactNode;
  contentClassName?: string;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
    children,
    contentClassName,
}) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showUserMenus, setShowUserMenus] = useState(false);
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    const email = user?.primaryEmailAddress?.emailAddress;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${email}`);//3000
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const notifications = [
        {
            id: 1,
            message: "Time for a water break! Stay hydrated for better mental clarity.",
            time: "Just now"
        },
        {
            id: 2,
            message: "Remember to get 8 hours of sleep tonight for better mental health.",
            time: "2 hours ago"
        }
    ];

    return (
      <section className='dashboard__wrapper'>
        <Sidebar 
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
        />
        <main>
            <nav>
                <div className="user__container">
                    <div className="profile" onClick={()=>setShowUserMenus(!showUserMenus)}>
                        <img src={userData?.profileImage} alt="" />
                </div>
                <div className="details">
                    <h3 className="name">{userData?.firstName}</h3>
                    <small className="text__muted">{userData?.email}</small>
                </div>
                {showUserMenus ? (<UserMenus onClose={()=>setShowUserMenus(!showUserMenus)}/>):""} 
                </div>
                <div className="buttons__container">
                    <div className="search__container">
                        <IoSearch/>
                        <input type="text" placeholder="Search items..." />
                    </div>
                    <div className="right">
                        {/* <PaymentButton /> */}
                        <div ref={notificationRef} className="icon__container">
                            <IoIosNotifications onClick={() => setShowNotifications(!showNotifications)}/>
                            {showNotifications && (
                                <div className="simple-notification-dropdown">
                                    <div className="simple-notification-header">
                                        Notifications
                                    </div>
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="simple-notification-item">
                                            <p>{notification.message}</p>
                                            <span>{notification.time}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="icon__container menu__btn" onClick={()=>setShowSidebar(!showSidebar)}>
                        <TiThMenu />
                    </div>
                </div>
            </nav>
            <section 
                className={`content ${contentClassName ? contentClassName:""}`}>
                {children}
            </section>
        </main>
    </section>
  )
}

export default DashboardWrapper