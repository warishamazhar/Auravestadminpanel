/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { NumberFormatCommas } from "../../../utils/FormatText";

const StatCard = ({
  title,
  value,
  icon,
  iconImage,
  change,
  changeType,
  isMoney,
  path,
  data
}) => {
  const isPositive = changeType === "positive";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path, { state: data });
  };

  return (
    <div 
      className="card hero-glass cursor-pointer hover-gold-shadow transition-all duration-300" 
      onClick={handleNavigate}
    >
      <div className="flex items-center gap-4">
        {iconImage ? (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-space-cadet/50 border border-glass-border">
            <img
              src={iconImage}
              alt={title}
              className="w-8 h-8 object-contain"
            />
          </div>
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-space-cadet/50 border border-glass-border">
            <img src={icon} className="w-8 h-8 object-contain" alt="" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm text-hero-secondary">{title}</p>
          <p className="text-2xl font-bold text-hero-primary gradient-text">
            <NumberFormatCommas value={value} decimalScale={isMoney ? 2 : 0} />
          </p>
        </div>
      </div>
      {change && (
        <div
          className={`mt-4 text-xs flex items-center font-semibold ${
            isPositive ? "text-stat-active" : "text-red-400"
          }`}
        >
          <i
            className={`fa-solid ${
              isPositive ? "fa-arrow-up" : "fa-arrow-down"
            } mr-1`}
          ></i>
          {change} in last 7 days
        </div>
      )}
    </div>
  );
};

export default StatCard;