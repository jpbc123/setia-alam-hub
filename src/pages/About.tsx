import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import flyingMail from "@/assets/mail.png";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

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

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("contact_messages").insert([
      {
        cu_name: formData.name,
        cu_email: formData.email,
        cu_contact_no: formData.contact,
        cu_subject: formData.subject,
        cu_message: formData.message,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
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
            If you have any questions about our privacy practices or suggestions, please contact us using the form below.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <main className="flex-grow px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>

          <div className="w-full max-w-2xl mx-auto text-left">
            <form onSubmit={handleSubmit} className="space-y-6 pb-32">
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

              <div className="pt-6">
                <Button
                  type="submit"
                  className="bg-malaysia-red hover:bg-malaysia-orange text-white"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Submit"}
                </Button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-3 text-green-600 pt-2">
                  <span>Thanks! Our team will review your message and get back to you as soon as we can.</span>
                  <img
                    src={flyingMail}
                    alt="Flying mail icon"
                    className="w-7 h-7 sm:w-8 sm:h-8 -rotate-12"
                  />
                </div>
              )}

              {status === "error" && (
                <p className="text-red-600 pt-2">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
