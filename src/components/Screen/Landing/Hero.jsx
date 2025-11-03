import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Globe,
  Award,
  Clock,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { LandingRouters } from "../../../constants/routes";

const Hero = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState({
    participants: 3476318,
    joined: 217,
    profit: 1317726919,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        participants: prev.participants + Math.floor(Math.random() * 3),
        joined: prev.joined + (Math.random() > 0.7 ? 1 : 0),
        profit: prev.profit + Math.floor(Math.random() * 10000),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, text: "Instant Execution", sub: "0.5s average" },
    { icon: Shield, text: "Military Grade", sub: "Security" },
    { icon: BarChart3, text: "Smart AI", sub: "Analytics" },
    { icon: Clock, text: "24/7", sub: "Monitoring" },
  ];

  return (
    <div className="relative min-h-screen bg-rich-black overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--ecru) 1px, transparent 1px),
              linear-gradient(90deg, var(--ecru) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-ecru rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Gradient Blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-chamoisee rounded-full mix-blend-overlay filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-delft-blue-2 rounded-full mix-blend-overlay filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-space-cadet to-raisin-black border border-ecru/30 rounded-2xl px-6 py-3 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-chamoisee" />
                  <span className="text-ecru font-semibold text-sm">
                    TRUSTED BY 3M+ INVESTORS
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-chamoisee fill-current"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-6">
                <motion.h1
                  className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-ecru">Take Full</span>
                  <br />
                  <span className="gradient-text">Control</span>
                  <br />
                  <span className="text-ecru">of Your Wealth with</span>
                  <br />
                  <span className="gradient-text">
                    AURAVEST AI
                    <motion.span
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-chamoisee" />
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-beaver leading-relaxed max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Experience the next generation of decentralized investment.{" "}
                  <span className="text-ecru font-semibold">Join millions</span>{" "}
                  earning passive income daily with our AI-powered platform.
                </motion.p>
              </div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  {
                    icon: Users,
                    value: count.participants.toLocaleString(),
                    label: "Participants",
                    change: "+12.5%",
                  },
                  {
                    icon: TrendingUp,
                    value: `+${count.joined}`,
                    label: "24h Joined",
                    change: "+8.2%",
                  },
                  {
                    icon: Shield,
                    value: `$${(count.profit / 1000000).toFixed(1)}M`,
                    label: "Total Profit",
                    change: "+15.3%",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-space-cadet/80 border border-delft-blue rounded-2xl p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: "var(--ecru)" }}
                  >
                    <stat.icon className="w-6 h-6 text-ecru mb-2" />
                    <div className="text-ecru font-bold text-lg mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-beaver text-xs">{stat.label}</span>
                      <span className="text-chamoisee text-xs font-bold">
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  className="group bg-gradient-to-r from-[#9C7542] to-[#D8BB7E] text-[#20253C] font-bold py-4 px-8 rounded-xl text-lg flex items-center gap-3 justify-center shadow-2xl hover-gold-shadow"
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(LandingRouters.USER_REGISTER)}
                >
                  <Sparkles className="w-5 h-5" />
                  Start Earning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  className="group border-2 border-ecru text-ecru font-bold py-4 px-8 rounded-xl text-lg bg-space-cadet/50 backdrop-blur-sm flex items-center gap-3 justify-center"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "hsla(41, 54%, 67%, 0.1)",
                    borderColor: "var(--chamoisee)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(LandingRouters.USER_LOGIN)}
                >
                  <BarChart3 className="w-5 h-5" />
                  View Platform Stats
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* X3 Protocol Card */}
              <motion.div
                className="bg-gradient-to-br from-space-cadet to-raisin-black border border-ecru/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(45deg, var(--chamoisee), var(--ecru), var(--chamoisee))",
                    padding: "2px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-8xl font-black bg-gradient-to-r from-chamoisee to-ecru bg-clip-text text-transparent mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    X3
                  </motion.div>
                  <h3 className="text-2xl text-ecru font-bold mb-2">
                    MULTIPLIER PROTOCOL
                  </h3>
                  <p className="text-beaver mb-6">
                    Advanced AI-powered investment multiplier
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {[
                      "Smart Contract",
                      "Blockchain Verified",
                      "AI Powered",
                      "Secure",
                    ].map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="bg-chamoisee/20 text-ecru px-4 py-2 rounded-full text-sm border border-chamoisee/30 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="bg-space-cadet/80 border border-delft-blue rounded-2xl p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    
                    whileHover={{
                      scale: 1.05,
                      borderColor: "var(--ecru)",
                      backgroundColor: "var(--raisin-black)",
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-ecru mb-2" />
                    <div className="text-ecru font-semibold text-sm mb-1">
                      {feature.text}
                    </div>
                    <div className="text-beaver text-xs">{feature.sub}</div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Bar */}
              <motion.div
                className="bg-space-cadet/50 border border-delft-blue rounded-2xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-beaver text-center mb-4 text-sm">
                  TRUSTED AND VERIFIED
                </p>
                <div className="flex justify-center items-center gap-8 text-ecru">
                  {[
                    { icon: Shield, text: "Blockchain Verified" },
                    { icon: Users, text: "3.4M+ Users" },
                    { icon: Zap, text: "Instant TX" },
                    { icon: Globe, text: "Global" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.1, color: "var(--chamoisee)" }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-chamoisee to-ecru rounded-2xl flex items-center justify-center shadow-2xl z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(LandingRouters.USER_REGISTER)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Sparkles className="text-space-cadete w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Hero;
