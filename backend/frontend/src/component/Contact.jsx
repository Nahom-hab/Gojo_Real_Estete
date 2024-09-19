import React, { useState } from 'react';

export default function Contact({ listing }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmailGmail = () => {
    const email = listing.email;
    const subject = listing.name;
    const body = encodeURIComponent(message);
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

  return (
    <div className="mt-5">
      <div>
        Contact <span className="text-purple-600 text-sm">{listing.username}</span> for the listing <span className="text-purple-600 text-sm">{listing.name}</span>
      </div>
      <textarea
        placeholder="Enter your message here..."
        onChange={handleChange}
        className="w-3/5 mt-2 h-12 p-2 bg-gray-200 border-none outline-none text-sm"
        value={message}
        rows="2"
      />
      <button
        onClick={sendEmailGmail}
        className="mt-3 mb-10 w-3/5 p-2 text-center text-lg bg-blue-800 text-white rounded-md"
      >
        Send Message
      </button>
    </div>
  );
}