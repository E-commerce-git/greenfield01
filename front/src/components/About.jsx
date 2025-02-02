// src/components/About.jsx
import React from "react";
import Person1 from "../assets/56A9D19F-D5AC-49E1-AD3C-60B58F5BE2B6.jpg";
import Person2 from "../assets/4D902F64-0F61-4AFD-B3F0-D564089B55E1.jpg";
import Person3 from "../assets/19848403-7CCC-4287-8F24-8E2B388CC30D.jpg";
import Person4 from "../assets/mee.jpg"
import Aboutimg from "../assets/SignImg.png";

export default function About() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h1>
            <p className="text-lg text-gray-600 mb-8">
              Launched in 2025, GlobBuy is South Asia’s premier online shopping
              mall with an active presense in Bangladesh. Supported by a wide
              range of tailored marketing, data and service solutions, GlobBuy
              has 10,500 sallers and 300 brands and serves 3 million customers
              across the region.
            </p>
          </div>
          <img
            src={Aboutimg}
            alt="About Us Image"
            className="w-64 h-64 object-cover rounded-lg ml-8"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-12">
          <p className="text-lg text-gray-600">
            Our mission is to provide the best online shopping experience to our
            customers.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
          <div className="flex flex-wrap justify-center mb-12">
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <img
                src={Person1}
                alt="Team Member 1"
                className="w-48 h-48 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">John Doe</h3>
              <p className="text-lg text-gray-600">Chief Strategy Officer</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <img
                src={Person4}
                alt="Team Member 1"
                className="w-48 h-48 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mehdi Idoudi</h3>
              <p className="text-lg text-gray-600">Founder & CEO</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <img
                src={Person2}
                alt="Team Member 2"
                className="w-48 h-48 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Fahmi Najjari
              </h3>
              <p className="text-lg text-gray-600">Co-Founder & CTO</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <img
                src={Person3}
                alt="Team Member 3"
                className="w-48 h-48 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Achref Fraj
              </h3>
              <p className="text-lg text-gray-600">Marketing Manager</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <div className="flex flex-wrap justify-center mb-12">
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                FREE AND FAST DELIVERY
              </h3>
              <p className="text-lg text-gray-600">
                Free delivery for all orders over $140
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                24/7 CUSTOMER SERVICE
              </h3>
              <p className="text-lg text-gray-600">
                Friendly 24/7 customer support
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                MONEY BACK GUARANTEE
              </h3>
              <p className="text-lg text-gray-600">
                We return money within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
