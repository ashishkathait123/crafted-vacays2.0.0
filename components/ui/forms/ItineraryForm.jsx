"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ItineraryForm({ onClose }) {
  const [isMobile, setIsMobile] = useState(false);
  const [destination, setDestination] = useState("");
  const [travelMonth, setTravelMonth] = useState("April");
  const [duration, setDuration] = useState("");
  const [persons, setPersons] = useState("Solo");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const durations = ["3-5 Days", "1 Week", "10 Days", "2 Weeks", "1 Month"];
  const personsOptions = ["Solo", "Couple", "Family", "Group"];

  const handleSubmit = async () => {
    const formData = {
      destination,
      travelMonth,
      duration,
      persons,
      submittedAt: new Date().toISOString(),
    };

    // Save to local storage
    localStorage.setItem("inquiryFormData", JSON.stringify(formData));

    // WhatsApp integration
    const adminNumber = "919876543210";
    const whatsappMessage = `📌 New Destination Inquiry:
- Destination: ${destination}
- Month: ${travelMonth}
- Duration: ${duration}
- Persons: ${persons}`;

    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");

    // Email integration
    try {
      await emailjs.send(
       "service_79m1aj6",
        "template_zl07dn8",
        {
          to_name: "TravelCraft Team",
          from_name: persons,
          email: "inquiry@travelcraft.com",
          destination,
          travel_month: travelMonth,
          duration,
          persons,
          message: `
      Hi,
      
      New destination inquiry received:
      
      🌴 Destination: ${destination}
      📅 Travel Month: ${travelMonth}
      🕒 Duration: ${duration}
      👥 Number of Persons: ${persons}
      📝 Submitted At: ${new Date().toLocaleString()}
      `
        },
        "6_ceoboGTfkeyhpgT"
      );
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const renderForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-150 bg-gradient-to-br from-white via-orange-50 to-white p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-md"
    >
     {onClose && (
  <button
    onClick={onClose}
    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
    aria-label="Close form"
  >
    &times;
  </button>
)}

      <div className="mb-6">
        <motion.h2 className="text-lg italic font-semibold text-gray-700">Let's Plan Your Escape</motion.h2>
        <motion.h1 className="text-2xl font-bold text-gray-900 mt-1">Inquire About a Destination</motion.h1>
      </div>

      <div className="space-y-4">
        <motion.div className="flex items-center gap-3 border p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300" whileHover={{ scale: 1.02 }}>
          <FaMapMarkerAlt className="text-orange-500 text-xl flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold text-gray-700">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Maldives, Bali"
              className="mt-1 border rounded px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-3 border p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300" whileHover={{ scale: 1.02 }}>
          <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold text-gray-700">Travel Month</label>
            <select
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="mt-1 border rounded px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-3 border p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300" whileHover={{ scale: 1.02 }}>
          <FaCalendarAlt className="text-orange-500 text-xl flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold text-gray-700">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 border rounded px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Select Duration</option>
              {durations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-3 border p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300" whileHover={{ scale: 1.02 }}>
          <FaUser className="text-orange-500 text-xl flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold text-gray-700">Travelers</label>
            <select
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              className="mt-1 border rounded px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {personsOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={handleSubmit}
        className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white py-3 rounded-xl mt-6 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        📩 Send Inquiry
      </motion.button>
    </motion.div>
  );

  return (
    <>
    
      {isMobile ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          {renderForm()}
        </div>
      ) : (
        renderForm()
      )}
    </>
  );
}