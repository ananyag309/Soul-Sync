import { Eye, Video } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cropsStream, streamers } from '../source'
import generateUniqueId from 'generate-unique-id'
import MapBoxMap from './Map/MapBoxMap'

const Rightbar = () => {
  return (
    <div className='hidden min-[1150px]:block fixed 
    top-0 right-0 w-[300px] h-screen 
    bg-bgsecondary p-4'>
        <div>
    <Link to={`/dashboard/golive?roomID=${generateUniqueId({length:6})}&role=Host`} className='flex 
    items-center gap-2 py-2 px-4 bg-gradient-to-r from-primary to-[#1E88E5]  rounded-full'>
        <Video/> Book 1 : 1 Sessions
    </Link>
</div>

    <div className='py-4'>
        <h3 className='text-gray-500'>Watch Now!</h3>
        <div className='grid grid-cols-2 gap-3 mt-4'>
            {
                cropsStream.map((crop,index)=>(
                    <div className='relative h-[70px] overflow-hidden 
                    rounded-lg' key={index}>
                        <div className='absolute top-0 left-0 z-30 w-full flex
                        items-center justify-between p-2'>
                            <div className='flex items-center gap-2'>
                                <div className='size-2 bg-red-500 rounded-full'/>
                                <p className='text-gray-200 text-sm'>live</p>
                            </div>
                            <div className='flex items-center gap-1'>
                            <Eye size={14} style={{ color: 'black' }} />
                                <p className='text-sm'>{crop.watching}</p>
                            </div>
                    </div>
                    <img src={crop.image} alt="" />
                    <div className='absolute bottom-0 left-0 z-30 w-full flex items-center
                    justify-between p-2'>
                        <h4 className='text-sm'>{crop.name}</h4>
                    </div>

                    <div className='absolute top-0 left-0 z-10 w-full h-full bg-dark-overlay'/>
                </div>
                ))
            }
        </div>
    </div>

    <div className='py-4'>
        <h3 className='text-gray-500'>Certified Counsellors</h3>
        <div className='mt-4'>
            {
                streamers.map((streamer,index)=>(
                    <div className='flex item-center gap-2 my-3' key={index}>
                        <div className='size-10 overflow-hidden rounded-full'>
                            <img src={streamer.image} alt="" />
                        </div>
                        <div>
                            <h3 style={{ color: 'black' }}>{streamer.name}</h3>
                            <p className='text-sm text-gray-500'>{streamer.followers} Followers</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    </div>
  )
}

export default Rightbar