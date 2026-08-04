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
      className="px-3 sm:px-6 lg:px-8 py-6 sm:py-20 bg-white my-[5px]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.1)] border-2 border-golden/20">
          {/* LEFT COLUMN - Image with overlay */}
          <div
            className="relative bg-cover bg-center bg-no-repeat min-h-[180px] sm:min-h-[300px] lg:min-h-[500px]"
            style={{
              backgroundImage: 'url("/img/contacts.png")',
            }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full p-2 sm:p-6 lg:p-8 text-white">
              <h2 className="text-[10px] sm:text-2xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-4">
                Let's talk!
              </h2>
              <p className="text-white/80 text-[6px] sm:text-sm lg:text-lg leading-relaxed mb-1.5 sm:mb-6 hidden sm:block">
                Have a project in mind or just want to say hi? Send me a
                message!
              </p>

              <div className="space-y-1 sm:space-y-3 lg:space-y-4">
                <div className="flex items-center gap-1 sm:gap-3 text-white text-[6px] sm:text-xs lg:text-base">
                  <Mail size={10} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-[5px] sm:text-xs lg:text-base truncate">
                    akyeajunior@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-3 text-white text-[6px] sm:text-xs lg:text-base">
                  <MapPin size={10} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-[5px] sm:text-xs lg:text-base">
                    ACCRA, GHANA
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-3 text-white text-[6px] sm:text-xs lg:text-base">
                  <Phone size={10} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-[5px] sm:text-xs lg:text-base">
                    +233 55 860 5216
                  </span>
                </div>
              </div>

              <div className="flex gap-1 sm:gap-3 mt-1.5 sm:mt-6 pt-1.5 sm:pt-4 border-t border-white/20">
                <a
                  href="https://wa.me/233570622400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60">
                  <img
                    src="/img/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-2.5 h-2.5 sm:w-5 sm:h-5"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/codewithcojo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60">
                  <svg
                    className="w-2.5 h-2.5 sm:w-5 sm:h-5 text-white"
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
                  className="w-5 h-5 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/60">
                  <svg
                    className="w-2.5 h-2.5 sm:w-5 sm:h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Form */}
          <div className="p-2 sm:p-6 lg:p-8 bg-white flex items-center">
            <form
              onSubmit={handleSubmit}
              className="space-y-1.5 sm:space-y-4 w-full">
              <h3 className="text-[10px] sm:text-xl lg:text-2xl font-bold text-dark-navy mb-1 sm:mb-4">
                Send a Message
              </h3>

              <div className="grid grid-cols-2 gap-1 sm:gap-4">
                <div>
                  <label className="block text-[5px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-1.5 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[6px] sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[5px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-1.5 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[6px] sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[5px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-1.5 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 text-[6px] sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-[5px] sm:text-xs lg:text-sm font-semibold text-dark-navy mb-0.5 sm:mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project…"
                  rows={2}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-1.5 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300 resize-none text-[6px] sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 sm:py-3 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(252,163,17,0.3)] shadow-[0_4px_14px_rgba(252,163,17,0.2)] flex items-center justify-center gap-1 sm:gap-2 text-[6px] sm:text-sm">
                Send Message
                <Send size={10} className="sm:w-4 sm:h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
