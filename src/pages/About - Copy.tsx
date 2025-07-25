import { useEffect, useState } from "react";
import Navbar from "@/components/TopNavigation";
import FooterNav from "@/components/BottomMenuBanner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Top Gradient Section */}
      <div className="bg-gradient-to-b from-yellow-300 via-yellow-100 to-transparent text-black">
        <div className="px-6 py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Setia Alam Hub</h1>
          <p className="text-lg mb-10">
            Setia Alam Hub is your trusted source for all things Setia Alam – news, lifestyle, events, dining, and local highlights.
            We’re community-driven and aim to empower locals with useful, timely, and engaging content.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
          <p className="mb-4 text-gray-700">
            Your privacy is important to us. This policy outlines how Setia Alam Hub collects, uses, and protects your personal information.
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
            <li><strong>Data Collection:</strong> We may collect your name, email, or usage data when you interact with our site.</li>
            <li><strong>Use of Data:</strong> Data is used to improve our website, personalize content, and send relevant updates.</li>
            <li><strong>Cookies:</strong> We may use cookies for a better user experience. You can control cookies via your browser settings.</li>
            <li><strong>Third-Party Sharing:</strong> We do not sell your personal data. Data may be shared with trusted service providers only.</li>
            <li><strong>Security:</strong> We take reasonable measures to protect your data from unauthorized access.</li>
            <li><strong>Updates:</strong> We may update this policy periodically. Continued use of our site implies acceptance of the revised policy.</li>
          </ul>

          <p className="text-gray-700">
            If you have questions about our privacy practices, please contact us via the form below.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>

          <div className="w-full max-w-2xl mx-auto text-left">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 pb-32"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium mb-1">
                  Contact No.
                </label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="Optional"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
				<div className="pt-6 flex items-center justify-between">
				<Button
					type="submit"
					className="bg-malaysia-red hover:bg-malaysia-orange text-white"
				>
					Submit
				</Button>
				<img
					src="/src/assets/mail.png"
					alt="Flying mail icon"
					className="w-10 h-10 sm:w-12 sm:h-12 -rotate-12"
				/>
				</div>
            </form>
          </div>
        </div>
      </main>

      <FooterNav />
    </div>
  );
}
