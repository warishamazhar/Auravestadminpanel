/* eslint-disable react/prop-types */

import { getMoneySymbol } from "../../../utils/additionalFunc";


const PlanCard = ({ plan, onSelect, isAdmin=false }) => {
  console.log(plan)
  const isRecommended = plan.recommended;
  const inActive = plan.status === false;

  return (
    <div
      className={`
            bg-slate-800/40 backdrop-blur-lg border rounded-2xl p-6 flex flex-col relative
            ${
              isRecommended
                ? "border-blue-500/80 shadow-2xl shadow-blue-600/20"
                : "border-slate-700/50"
            } 
        `}
    >
      {inActive && (
        <span className=" absolute top-0 left-6 -mt-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">Inactive</span>
      )}
      {isRecommended && (
        <div className="absolute top-0 right-6 -mt-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Best Value
        </div>
      )}

      <h3 className="text-xl font-bold text-white text-center uppercase">{plan.title}</h3>
      <p className="text-5xl font-bold text-white text-center my-6">
        {getMoneySymbol()}{plan.min}
        {/* <span className="text-base font-normal text-slate-400"> / min</span> */}
      </p>

      <ul className="space-y-3 text-slate-300 text-sm mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <i className="fa-solid fa-check-circle text-green-400"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`
                    w-full py-3 rounded-xl font-semibold transition-colors
                    ${
                      isRecommended
                        ? "bg-blue-600 hover:bg-blue-500 cursor-pointer text-white shadow-lg shadow-blue-600/30"
                        : "bg-slate-700/70 hover:bg-slate-700 cursor-pointer text-white"
                    }
                `}
      >
        {isAdmin ? "Edit Plan" : "Invest Now"}
      </button>
    </div>
  );
};

export default PlanCard;
