import { useEffect, useState } from "react"
import Wrapper from "../components/Wrapper"
import { Delete, Edit, EllipsisVertical, ShieldPlus } from "lucide-react";
import ScheduleForm from "../components/ScheduleForm";
import { useUser } from "@clerk/clerk-react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const SchedulePage = () => {
  const [schedules,setSchedules]= useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [displayScheduleForm, setDisplayScheduleForm] = useState(false);
  const [mode,setMode]=useState<'create'|'update'>('create');
  const [preloadedData,setPreloadedData] = useState<any>(null);
  const {user} = useUser();
  const fetchData =async()=>{
    try{
      setLoading(true);
      const q = query(
        collection(db, "schedules"),
        where("email", "==", user?.primaryEmailAddress?.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      const dataList = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))

      setSchedules(dataList);
    }finally{
      setLoading(false);
    }
  }
  //Fetch fata on page load
  useEffect(()=>{
    if(user) fetchData();
  },[user])

  const deleteSchedule = async (id:any) => {
    await deleteDoc(doc(db,"schedules",id));
    fetchData();
  }

  const copyStreamDetails = (type:"Cohost" | "Audience",schedule:any) => {
    const {scheduleId,title,date,time,description} = schedule || {};
    let url = window.location.origin + "/dashboard/golive?roomID="+ scheduleId + '&role'+ type;
    navigator.clipboard.writeText(`
      ${title}
      Date: ${date}
      Time: ${time}
      Link: ${url}
      Description: ${description}
      `)
      toast(type+" stream details copied successfully",{
        position: "top-right",
      })
  }
  return (
    <Wrapper>
      {
        displayScheduleForm &&
        (
          <ScheduleForm
          mode={mode}
          onClose={()=>setDisplayScheduleForm(false)}
          preloadedData={preloadedData}
          onComplete={()=>{fetchData()}}
          />
        )
      }
      {
      !schedules.length && !loading && (
        <div className='h-[70vh] flex flex-col items-center justify-center gap-4'>
          <ShieldPlus size={100} className='text-primary'/>
          <p className="text-gray-500">You have not schedule any live stream</p>
          <button
          className='py-2 px-5 bg-primary rounded-2xl'
            onClick={()=>{
              setPreloadedData(null);
              setMode('create')
              setDisplayScheduleForm(!displayScheduleForm); 
            }}
            >
            Schedule Live Stream
          </button>
        </div>
      )
    }

    {
      !loading && schedules.length && <>
      <div className='my-5'>
        <button
        onClick={
        ()=>{
          setPreloadedData(null);
          setMode('create');
          setDisplayScheduleForm(!displayScheduleForm);
        }
        }
        className='py-2 px-5 bg-gradient-to-r from-primary to-[#1E88E5] rounded-2xl'>
          Add Schedule
          </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {
          schedules.map((schedule:any,index:number)=>(
            <div className="bg-bgsecondary p-4 rounded-lg" key={index}>
              <div className="flex items-center justify-end gap-4 my-2">
                <div
                onClick={()=>{
                  setPreloadedData(schedule);
                  setMode('update');
                  setDisplayScheduleForm(!displayScheduleForm);
                }}
                className='bg-bgprimary size=0 flex items-center justify-center rounded-lg text-gray-500 hover::text-primary'>
                  <Edit size={18}/>
                </div>
                {/* Delete button */}
                <div 
                onClick={()=>deleteSchedule(schedule.id)}
                className='bg-bgprimary size-8 flex items-center justify-center 
                rounded-lg text-gray-500 hover:text-red-700 cursor-pointer'
                >
                  <Delete size={18}/>
                  </div>
                  {/* Copy Schedule details button */}
                  <div
                  className='relative group bg-bgprimary size-8 flex items-center justify-center 
                  rounded-lg text-gray-500 hover:text-red-700 cursor-pointer' 
                  >
                    <EllipsisVertical/>
                    <ul className='absolute top-full right-0 hidden group-hover:block bg-bgprimary p-2
                    rounded-lg text-gray-500 w-[130px] text-sm text-center'>
                      <li className='py-2 hover:text-black' onClick={()=>copyStreamDetails('Cohost',
                        schedule)}>Invite Cohost</li>
                      <li className='py-2 hover:text-black' onClick={()=>copyStreamDetails('Audience',
                        schedule
                      )}>Invite Audience</li>
                    </ul>
                  </div>
              </div>
              <h2>{schedule.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-3 text-black">{schedule.description}</p>
              <div className='flex items-center text-sm'>
                <span className='text-gray-500'>Date:</span> {schedule.date}
              </div>
              <div className='flex items-center text-sm'>
                <span className='text-gray-500'>Time:</span> {schedule.time}
              </div>

              {
                schedule.date === moment().format("MM-DD-YYYY") ?
                <Link 
                to={`/dashboard/golive?roomID=${schedule.scheduledId}&role=Host`}
                target='_blank'
                className='block w-full bg-gradient-to-r from-primary to-[#1E88E5] py-2 px-4 rounded-lg
                mt-4 text-center'>
                  Go live
                </Link>:
                moment(schedule.date).isBefore(moment().format('MM-DD-YYYY'))?
                <Link 
                to={''}
                className='block w-full bg-gradient-to-r from-primary to-[#1E88E5] py-2 px-4 rounded-lg
                mt-4 text-center'>
                  Ended
                </Link>:
                moment(schedule.date).isAfter(moment().format('MM-DD-YYYY'))?
                <Link 
                to={''}
                className='block w-full bg-gradient-to-r from-primary to-[#1E88E5] py-2 px-4 rounded-lg
                mt-4 text-center'>
                  Upcoming
                </Link>:''
              }
            </div>
          ))
        }
      </div>
      </>
    }
    </Wrapper>
  )
}

export default SchedulePage