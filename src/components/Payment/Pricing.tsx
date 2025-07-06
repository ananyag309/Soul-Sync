import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Menu, X } from 'lucide-react';
import './Pricing.css';
import axios from 'axios';

interface FormDataType {
  name: string;
  mobile: string;
  amount: string;
}

interface PaymentData extends FormDataType {
  MUID: string;
  transactionId: string;
}

const Pricing: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    mobile: '',
    amount: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    const data: PaymentData = {
      name: name,
      mobile: mobile,
      amount: amount,
      MUID: "MUIDW" + Date.now(),
      transactionId: "T" + Date.now()
    };

    try {
      const response = await axios.post("http://localhost:8000/order", data);
      if(response.data && response.data.data.instrumentResponse.redirectInfo.url){
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="column">
          <h1 className="logo">Logo</h1>
          <button className="menu__btn" onClick={() => setIsMenuVisible(true)}>
            <Menu />
          </button>
        </div>

        <div className={`hamburger ${isMenuVisible ? 'visible' : ''}`}>
          <button className="cancel__btn" onClick={() => setIsMenuVisible(false)}>
            <X />
          </button>
          <div className="menu__group">
            <a href="#" className="item">Home</a>
            <a href="#" className="item">About</a>
            <a href="#" className="item">Services</a>
            <a href="#" className="item">Pricing</a>
          </div>
        </div>

        <div className="column">
          <button className="contact__btn">Contact Us</button>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuVisible && (
        <div className="sidebar__overlay" onClick={() => setIsMenuVisible(false)} />
      )}

      {/* Main Content */}
      <div className='flex items-center justify-between h-[600px] mx-20'>
        {/* Left Section: Video */}
        <div className='w-1/2'>
          <video
            src='https://www.phonepe.com/webstatic/8478/videos/page/home-fast-secure-v3.mp4'
            autoPlay
            loop
            muted
            className='w-[500px] h-full object-cover'
          />
        </div>

        {/* Right Section: Payment Form */}
        <div className='w-1/2 border-2 max-w-3xl p-6 rounded-md border-dashed border-[#6739b7]'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <h2 className='text-4xl font-bold mb-6 text-[#6739B7]'>
              Make a Payment
            </h2>

            {/* Name Field */}
            <div className='mb-6'>
              <label 
                htmlFor="name"
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder='Enter your Name'
                className='mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6739b7]'
                required
              />
            </div>

            {/* Mobile Field */}
            <div className='mb-6'>
              <label 
                htmlFor="mobile"
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                placeholder='Enter your mobile number'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
                className='mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6739b7]'
                required
                maxLength={10}
              />
            </div>

            {/* Amount Field */}
            <div className='mb-6'>
              <label 
                htmlFor="amount"
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-[0.9rem] text-gray-500">₹</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6739b7]'
                  required
                  min="1"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className='w-full bg-[#6739b7] text-white rounded-md py-2 px-4 font-medium hover:bg-[#5a33a3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6739b7] focus:ring-offset-2'
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pricing;