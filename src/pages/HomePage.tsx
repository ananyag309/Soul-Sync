
import Wrapper from '../components/Wrapper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { streams, topStreams } from '../source';
import { banner4 } from '../assets';
import { SignedOut } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import MapBoxMap from '../components/Map/MapBoxMap.tsx';
import { Flower } from 'lucide-react';
import { useEffect } from 'react';

// const InputField = ({label, placeholder, type}) => {
//   return (
//     <div className="grid grid-cols-1 gap-2">
//     <label className="font-semibold">{label}</label>
//     <input 
//     type={type}
//     placeholder={placeholder}
//     className="border border-gray-400 rounded-md px-5 py-3"
//     />
//     </div>
//   );
// };

const HomePage = () => {

  useEffect(() => {
    // Create script elements
    const gtranslateSettings = document.createElement('script');
    gtranslateSettings.innerHTML = `
      window.gtranslateSettings = {
        "default_language": "en",
        "detect_browser_language": true,
        "wrapper_selector": ".gtranslate_wrapper",
        "flag_size": 16
      };
    `;
    document.body.appendChild(gtranslateSettings);

    const gtranslateScript = document.createElement('script');
    gtranslateScript.src = "https://cdn.gtranslate.net/widgets/latest/popup.js";
    gtranslateScript.defer = true;
    document.body.appendChild(gtranslateScript);

    // Cleanup function to remove scripts on unmount
    return () => {
      document.body.removeChild(gtranslateSettings);
      document.body.removeChild(gtranslateScript);
    };
  }, []);
  return (
    <Wrapper enableRightbar>
      <div className='w-full overflow-hidden rounded-md'>
        <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={true}
        loop={true}
        modules={[Autoplay]}
        >
          {
            topStreams.map((list,index)=>(
              <SwiperSlide className='h-[150px] md:h-[250px]' key={index}>
                <img src={list.image} alt=""/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='flex items-center justify-between gap-4 bg-secondary p-4'>
          <div className='flex items-center gap-2'>
            <div className='size-10 rounded-md flex items-center justify-center'>
              {/* <img src={banner4} alt=""/> */}
              <Flower />
            </div>
          <div>
          <h3 className="text-base text-black">Recommended Videos</h3>
          <p className="text-gray-500 text-sm">Tune into your calm, sync with your soul!</p>
        </div>
      </div>
      <SignedOut>
        <Link to={'/sign-up'}
        className='bg-transparent transition-all text-primary hover:bg-primary hover:text-black
        rounded-lg border-[2px] border-primary border-solid py-2 px-4 inline-block text-sm'
        >Create Account</Link>
      </SignedOut>
      </div>
      </div>

      {/* Live streams display */}
      <div className="pt-8">
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4">
                {streams.map((stream, index) => (
                    <div className="bg-bgsecondary p-3 rounded-lg" key={index}>
                        <div className="overflow-hidden rounded-lg">
                            <img 
                                src={stream.image} 
                                alt="" 
                                className="transition-all hover:scale-110" 
                            />
                        </div>
                        <div className="py-2">
                            <h3 className="text-sm line-clamp-2 text-black">
                                {stream.title}
                            </h3>
                            <div className="flex items-center justify-between gap-1 mt-3 max-[400px]:flex-col max-[400px]:items-start">
                                <div className="flex items-center gap-2">
                                    <Eye className="text-primary" size={16} />
                                    <span className="text-sm text-gray-500">
                                        {stream.watching} viewed
                                    </span>
                                </div>
                                <a 
                                    href={stream.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-1 px-3 bg-primary text-sm rounded-lg hover:bg-opacity-90 transition-all"
                                >
                                    Watch
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      {/* Chatbot */}
      
      
      {/*Crop Recommendation System */}
      {/* <div className="w-full bg-bgprimary flex items-center justify-content">
            <div className="w-[800px] p-10 bg-bgprimary">
              <form className="grid grid-cols-1 gap-5">
                <h3 className="text-3xl font-semibold">Crop Recommendation System</h3>
                <p className="text-gray-500 text-lg">Get the best crop recommendation for your farm</p>
                <div className="grid grid-cols-2 gap-8">
                  <InputField 
                  label={"Nitrogen"} 
                  placeholder={"Enter Nitrogen"} 
                  type={"number"}
                  />
                  <InputField 
                  label={"Phosphorus"} 
                  placeholder={"Enter Phosphorus"} 
                  type={"number"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <InputField 
                  label={"Potassium"} 
                  placeholder={"Enter Potassium"} 
                  type={"number"}
                  />
                  <InputField 
                  label={"Temperature"} 
                  placeholder={"Enter Temperature in °C"} 
                  type={"number"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <InputField 
                  label={"Humidity"} 
                  placeholder={"Enter Humidity in %"} 
                  type={"number"}
                  />
                  <InputField 
                  label={"pH"} 
                  placeholder={"Enter pH value"} 
                  type={"number"}
                  />
                </div>
                <div className="grid grid-cols-1 gap-8 items-center justify-items-center">
                  <InputField
                  label={"Rainfall"} 
                  placeholder={"Enter Rainfall in mm"} 
                  type={"number"}
                  />
                </div>
                <button className="bg-gradient-to-r from-primary 
    to-blue-600 hover:bg-primary text-white font-bold w-full py-3">Get Recommendation</button>
              </form>

            </div>
          </div> }

      {/*Map Info */}
      
      <div className="container mx-auto my-8">
  <h1 className="text-3xl font-bold mb-4 text-black">Map</h1>
  <div className="h-[400px] w-[100%] rounded-lg shadow-lg">
  
  <MapBoxMap />

  </div>
</div>
        {/* Language Translator */}
      <div className="gtranslate_wrapper"></div>

    </Wrapper>
  )
}

export default HomePage 