"use client"
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Newspaper,
  Globe,
  Scale,
  Zap,
  CheckCircle,
  Users,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: Newspaper,
      title: "Real-time Verified News",
      description:
        "Breaking stories verified by our fact-checking team before publication",
    },
    {
      icon: Globe,
      title: "Regional & National Coverage",
      description:
        "Comprehensive reporting from local communities to national affairs",
    },
    {
      icon: Scale,
      title: "Fact-first Journalism",
      description:
        "Independent, unbiased reporting grounded in accuracy and integrity",
    },
    {
      icon: Zap,
      title: "Fast, Clean Reading",
      description:
        "Distraction-free design optimized for modern digital readers",
    },
  ];

  const stats = [
    { icon: CheckCircle, value: "10K+", label: "Daily Readers" },
    { icon: Users, value: "10+", label: "Expert Journalists" },
    { icon: Target, value: "24/7", label: "News Coverage" },
    { icon: Award, value: "5+", label: "Awards Won" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1635340038191-96eea7fbd056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcm9vbSUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3Njg4NDU3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-sm tracking-widest text-blue-300 uppercase mb-4 font-medium">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Delivering credible news that matters.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              News Shelter is an independent digital news platform committed to
              delivering fact-checked, unbiased journalism. We cover regional
              and national stories with integrity, serving the digital
              generation with fast, clean, and trustworthy reporting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section
        ref={sectionRef}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Independent journalism for the digital age
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded by a team of passionate journalists and technologists,
                News Shelter was created to address the growing need for
                credible, accessible news in India s rapidly evolving digital
                landscape.
              </p>
              <p>
                We believe that quality journalism is essential for a
                functioning democracy. Our mission is to provide readers with
                accurate, timely, and comprehensive news coverage that empowers
                informed decision-making.
              </p>
              <p>
                From breaking national stories to in-depth regional reporting,
                we maintain the highest standards of journalistic integrity
                while embracing modern technology to deliver news where and when
                you need it.
              </p>
            </div>
          </motion.div>

          {/* Visual Element - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest text-blue-600 uppercase mb-3 font-medium">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for modern readers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine traditional journalistic values with cutting-edge
              technology to deliver the news experience you deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our core values
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide every story we publish
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Accuracy Above All",
                description:
                  "Every fact is verified, every source is checked. We prioritize getting it right over getting it first.",
              },
              {
                title: "Independence & Integrity",
                description:
                  "We remain free from political and commercial influence, answering only to our readers and the truth.",
              },
              {
                title: "Transparency",
                description:
                  "We openly acknowledge corrections and provide clear sourcing, building trust through openness.",
              },
              {
                title: "Diversity of Voices",
                description:
                  "We amplify perspectives from all communities, ensuring comprehensive and balanced coverage.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-600"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join our community of informed readers
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Stay updated with breaking news, in-depth analysis, and stories
              that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg">
                Subscribe to Newsletter
              </button>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
