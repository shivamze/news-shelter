"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  Mail,
  User,
  MessageSquare,
  MapPin,
  Clock,
  Phone,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface ContactFormData {
  fullName: string;
  email: string;
  profession: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {

    console.log("Submitting form data:", data);

    try{
      setIsSubmitting(true);

      const res = await axios.post("/api/contact", {
        name: data.fullName,
        email: data.email,
        profession: data.profession,
        message: data.message,
      });
      console.log("Form submitted:", res.data);
      toast.success("Message sent successfully! We'll get back to you soon.");


    }catch(err: any){
      toast.error("An error occurred while sending your message. Please try again later.");
      console.log("Error submitting form:", err);
    }finally{
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
    // Reset form after 3 seconds
    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm tracking-widest text-blue-300 uppercase mb-4 font-medium">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We are here to listen.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you have a story tip, feedback, correction request, or
              collaboration inquiry, we value your input. Your voice helps us
              serve our community better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in touch
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our editorial team reviews all messages carefully. We're
                committed to transparency, accuracy, and serving the public
                interest.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:contact@newsshelter.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact@newsshelter.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+91 (022) 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Editorial Office
                  </h3>
                  <p className="text-gray-600">
                    News Shelter Media Pvt. Ltd.
                    <br />
                    123 Press Avenue, Lower Parel
                    <br />
                    Mumbai, Maharashtra 400013
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond within 24–48 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Your privacy matters
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    All communications are handled with strict confidentiality.
                    We never share personal information with third parties
                    without consent.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips & Corrections */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6">
              <h3 className="font-medium mb-3">Story Tips & Corrections</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Have a lead on an important story? Found an error in our
                reporting? We take both seriously and appreciate your help in
                maintaining accuracy.
              </p>
              <a
                href="mailto:tips@newsshelter.com"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
              >
                tips@newsshelter.com
              </a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-gray-800">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName.message}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Profession */}
                <div>
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Profession <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="profession"
                    {...register("profession", {
                      required: "Please select your profession",
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none bg-white ${
                      errors.profession
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select your profession</option>
                    <option value="student">Student</option>
                    <option value="journalist">Journalist</option>
                    <option value="government">Government Official</option>
                    <option value="researcher">Researcher</option>
                    <option value="business">Business / Advertiser</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.profession && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.profession.message}
                    </motion.p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      id="message"
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      rows={6}
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                      }`}
                      placeholder="Tell us what's on your mind..."
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                    <Shield className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Your information is safe. We never share personal data and
                      handle all communications with strict confidentiality.
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={
                    !isSubmitting && !isSubmitted ? { scale: 1.02 } : {}
                  }
                  whileTap={
                    !isSubmitting && !isSubmitted ? { scale: 0.98 } : {}
                  }
                  className={`w-full py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : isSubmitting
                        ? "bg-blue-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Other ways to reach us
            </h2>
            <p className="text-gray-600 mb-8">
              Different inquiries may have dedicated channels for faster
              responses
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Corrections</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Report factual errors or inaccuracies
                </p>
                <a
                  href="mailto:corrections@newsshelter.com"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  corrections@newsshelter.com
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Story Tips</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Share newsworthy information
                </p>
                <a
                  href="mailto:tips@newsshelter.com"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  tips@newsshelter.com
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Partnerships</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Business & collaboration inquiries
                </p>
                <a
                  href="mailto:partners@newsshelter.com"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  partners@newsshelter.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
