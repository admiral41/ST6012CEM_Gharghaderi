import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSubscriberApi } from '../../Apis/apis';
import AOS from 'aos';

const Subscriber = () => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 150, // Offset (in px) from the top of the screen
      easing: 'ease-in-out', // Easing type for the animation
    });
  }, []);
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await addSubscriberApi({ email });
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error('An error occurred while subscribing.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Internal server error');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-10 lg:px-8 p-8">
      <div
        style={{ backgroundColor: "#72B944" }}
        className="relative isolate overflow-hidden px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32" data-aos="zoom-in"
      >
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Want to hear from Us?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Search over 250+ listings including houses and Land
          available for sale. You’ll find your next home in any style you
          prefer.
        </p>
        <form className="mx-auto mt-10 flex flex-col sm:flex-row max-w-md gap-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={handleSubscribe}
          >
            Notify
          </button>
        </form>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6"></stop>
              <stop offset="1" stopColor="#7ED321" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Subscriber;
