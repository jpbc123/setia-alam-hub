import { useEffect, useState } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-b from-yellow-300 via-yellow-100 to-transparent text-black">
        <div className="px-6 py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Setia Alam Hub</h1>
          <p className="text-lg mb-10">
            Setia Alam Hub is your trusted source for all things Setia Alam – news, lifestyle, events, dining, and local highlights.
            We’re community-driven and aim to empower locals with useful, timely, and engaging content.
          </p>
        </div>
      </div>
    </div>
  );
}
