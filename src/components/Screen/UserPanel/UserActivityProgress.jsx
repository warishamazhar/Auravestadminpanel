import React from 'react';
import { TrendingUp, Star, Crown, Award, Target, DollarSign, ArrowUp, Zap } from 'lucide-react';

// Investment levels configuration with dummy data
const investmentLevels = [
  { id: 1, name: "Bronze Investor", minInvestment: 0, maxInvestment: 9999, color: "bronze", icon: Star, benefits: ["Basic portfolio tracking", "Monthly reports"] },
  { id: 2, name: "Silver Investor", minInvestment: 10000, maxInvestment: 49999, color: "silver", icon: Award, benefits: ["Priority support", "Advanced analytics", "Quarterly reviews"] },
  { id: 3, name: "Gold Investor", minInvestment: 50000, maxInvestment: 149999, color: "gold", icon: Crown, benefits: ["Personal advisor", "Premium strategies", "Weekly insights"] },
  { id: 4, name: "Platinum Investor", minInvestment: 150000, maxInvestment: 499999, color: "platinum", icon: Zap, benefits: ["VIP treatment", "Exclusive opportunities", "Daily market updates"] },
  { id: 5, name: "Diamond Investor", minInvestment: 500000, maxInvestment: Infinity, color: "diamond", icon: Crown, benefits: ["Elite status", "Private banking", "Custom investment solutions"] }
];

// Dummy user data
const userData = {
  totalInvestment: 87500,
  currentLevel: "Gold Investor",
  nextLevel: "Platinum Investor",
  progressPercentage: 58.33, // (87500 - 50000) / (150000 - 50000) * 100
  amountToNextLevel: 62500,
  memberSince: "2023-03-15",
  totalReturns: 12750,
  activeInvestments: 8
};

const UserActivityProgress = () => {
  const currentLevelData = investmentLevels.find(level => level.name === userData.currentLevel);
  const nextLevelData = investmentLevels.find(level => level.name === userData.nextLevel);
  const CurrentLevelIcon = currentLevelData?.icon || Star;
  const NextLevelIcon = nextLevelData?.icon || Crown;

  const getColorClasses = (color) => {
    const colors = {
      bronze: { bg: "bg-chamoisee/20", text: "text-chamoisee", glow: "shadow-chamoisee/20" },
      silver: { bg: "bg-beaver/20", border: "border-beaver/30", text: "text-beaver", glow: "shadow-beaver/20" },
      gold: { bg: "bg-ecru/20", border: "border-ecru/30", text: "text-ecru", glow: "shadow-ecru/20" },
      platinum: { bg: "bg-delft-blue/20", border: "border-delft-blue/30", text: "text-delft-blue", glow: "shadow-delft-blue/20" },
      diamond: { bg: "bg-space-cadet-2/20", border: "border-space-cadet-2/30", text: "text-space-cadet-2", glow: "shadow-space-cadet-2/20" }
    };
    return colors[color] || colors.bronze;
  };

  const currentColors = getColorClasses(currentLevelData?.color);
  const nextColors = getColorClasses(nextLevelData?.color);

  return (
    <div className=" rounded-3xl shadow-2xl hover:shadow-glow transition-all duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border ${currentColors.border} shadow-lg ${currentColors.glow} ${currentColors.bg}`}>
            <CurrentLevelIcon className={`w-8 h-8 ${currentColors.text}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-hero-primary mb-1">Investment Progress</h2>
            <p className="text-hero-secondary">Track your journey to the next level</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-hero-primary gradient-text">${userData.totalInvestment.toLocaleString()}</div>
          <div className="text-sm text-hero-secondary">Total Investment</div>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card border border-glass-border p-5 rounded-xl hover:border-chamoisee/50 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-stat-active" />
            <span className="text-hero-secondary text-sm">Total Returns</span>
          </div>
          <div className="text-2xl font-bold text-stat-active">${userData.totalReturns.toLocaleString()}</div>
        </div>

        <div className="card border border-glass-border p-5 rounded-xl hover:border-chamoisee/50 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-delft-blue-2" />
            <span className="text-hero-secondary text-sm">Active Investments</span>
          </div>
          <div className="text-2xl font-bold text-delft-blue-2">{userData.activeInvestments}</div>
        </div>

        <div className="card border border-glass-border p-5 rounded-xl hover:border-chamoisee/50 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-chamoisee" />
            <span className="text-hero-secondary text-sm">Member Since</span>
          </div>
          <div className="text-lg font-bold text-chamoisee">
            {new Date(userData.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Level Progress Section */}
      <div className="hero-glass border border-glass-border p-6 rounded-2xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${currentColors.border} ${currentColors.bg}`}>
              <CurrentLevelIcon className={`w-5 h-5 ${currentColors.text}`} />
            </div>
            <div>
              <div className="text-lg font-bold text-hero-primary">{userData.currentLevel}</div>
              <div className="text-sm text-hero-secondary">Current Level</div>
            </div>
          </div>
          
          <ArrowUp className="w-6 h-6 text-beaver animate-bounce" />
          
          <div className="flex items-center gap-3">
            <div>
              <div className="text-lg font-bold text-hero-primary text-right">{userData.nextLevel}</div>
              <div className="text-sm text-hero-secondary text-right">Next Level</div>
            </div>
            <div className={`p-2 rounded-lg border ${nextColors.border} ${nextColors.bg}`}>
              <NextLevelIcon className={`w-5 h-5 ${nextColors.text}`} />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full bg-space-cadet/50 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gold-gradient rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${userData.progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ecru/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-5 left-0 right-0 flex justify-between text-xs text-hero-secondary">
            <span>${currentLevelData?.minInvestment.toLocaleString()}</span>
            <span>{userData.progressPercentage.toFixed(1)}% Complete</span>
            <span>${nextLevelData?.minInvestment.toLocaleString()}</span>
          </div>
        </div>

        {/* Investment Needed */}
        <div className="flex items-center justify-center gap-2 p-4 bg-chamoisee/20 rounded-xl border border-chamoisee/30">
          <Target className="w-5 h-5 text-chamoisee" />
          <span className="text-hero-primary font-semibold">
            Invest <span className="text-chamoisee font-bold">${userData.amountToNextLevel.toLocaleString()}</span> more to reach {userData.nextLevel}
          </span>
        </div>
      </div>

      {/* Level Benefits Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-5 border ${currentColors.border} rounded-xl ${currentColors.bg}`}>
          <h4 className={`font-bold ${currentColors.text} mb-3 flex items-center gap-2`}>
            <CurrentLevelIcon className="w-5 h-5" />
            Current Benefits
          </h4>
          <ul className="space-y-2">
            {currentLevelData?.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-hero-secondary flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${currentColors.text}/60`}></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className={`p-5 border ${nextColors.border} rounded-xl opacity-75 hover:opacity-100 transition-opacity duration-300 ${nextColors.bg}`}>
          <h4 className={`font-bold ${nextColors.text} mb-3 flex items-center gap-2`}>
            <NextLevelIcon className="w-5 h-5" />
            Next Level Benefits
          </h4>
          <ul className="space-y-2">
            {nextLevelData?.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-hero-secondary flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${nextColors.text}/60`}></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserActivityProgress;