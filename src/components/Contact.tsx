import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you for your message, ${formData.firstName}! I'll get back to you soon.`,
    );
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="px-3 sm:px-6 lg:px-2 py-1 sm:py-8 bg-white my-[5px]">
      <div
        className="max-w-6xl mx-auto"
        style={{
          backgroundImage: 'url("/img/contactsbg.jpg")',
        }}>
        <div className="grid grid-cols-2 lg:grid-cols-5 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.1)] border-2 border-golden/20 relative bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-0" />

          {/* Left Section */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 bg-golden/95 p-3 sm:p-6 lg:p-12 relative z-10 overflow-hidden">
            <div className="absolute w-24 sm:w-64 h-24 sm:h-64 bg-white/10 rounded-full -top-6 sm:-top-16 -right-6 sm:-right-16" />
            <div className="absolute w-20 sm:w-48 h-20 sm:h-48 bg-white/8 rounded-full -bottom-6 sm:-bottom-16 -left-6 sm:-left-16" />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-base sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 lg:mb-4">
                Let's talk!
              </h2>
              <p className="text-white/90 text-[8px] sm:text-sm lg:text-lg leading-relaxed mb-2 sm:mb-4 lg:mb-8">
                Have a project in mind or just want to say hi? Send me a
                message!
              </p>

              <div className="space-y-1.5 sm:space-y-3 lg:space-y-4 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-white text-[8px] sm:text-xs lg:text-base">
                  <Mail
                    size={14}
                    className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                  />
                  <span className="truncate text-[7px] sm:text-xs lg:text-base">
                    akyeajunior@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-white text-[8px] sm:text-xs lg:text-base">
                  <MapPin
                    size={14}
                    className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                  />
                  <span className="text-[7px] sm:text-xs lg:text-base">
                    ACCRA, GHANA
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-white text-[8px] sm:text-xs lg:text-base">
                  <Phone
                    size={14}
                    className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0"
                  />
                  <span className="truncate text-[7px] sm:text-xs lg:text-base">
                    Tel: +233 55 860 5216
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 sm:gap-2 lg:gap-3 mt-2 sm:mt-4 lg:mt-8 pt-2 sm:pt-4 lg:pt-8 border-t border-white/20">
                <a
                  href="https://wa.me/233570622400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60 hover:-translate-y-0.5">
                  <img
                    src="/img/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/bright-sakyi-junior-akyea-09aaa1370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60 hover:-translate-y-0.5">
                  <svg
                    className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://github.com/cojojunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60 hover:-translate-y-0.5">
                  <svg
                    className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 p-3 sm:p-6 lg:p-12 relative z-10 bg-white/80 backdrop-blur-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-2 sm:space-y-4 lg:space-y-6">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-4 lg:gap-6">
                <div>
                  <label className="block text-[7px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1 lg:mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[7px] sm:text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[7px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1 lg:mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[7px] sm:text-sm lg:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[7px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1 lg:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[7px] sm:text-sm lg:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-[7px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1 lg:mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project…"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 lg:px-5 py-1.5 sm:py-2 lg:py-3 bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 resize-none text-[7px] sm:text-sm lg:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 sm:py-3 lg:py-4 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(252,163,17,0.3)] shadow-[0_4px_14px_rgba(252,163,17,0.2)] flex items-center justify-center gap-1.5 sm:gap-2 text-[8px] sm:text-sm lg:text-base">
                Send Message
                <Send size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
