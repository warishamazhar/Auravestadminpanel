import React, { useState } from 'react';

const techItems = [
  {
    title: 'Autonomy',
    content:
      'The Forsage ecosystem is built around the technology of smart contracts and NFTs, which are completely autonomous and exclude the influence of the human factor.',
  },
  {
    title: 'Unchanging conditions',
    content:
      'The conditions of the smart contract cannot be changed by anyone, including the developers. This ensures the stability and reliability of the platform.',
  },
  {
    title: 'Transparency',
    content:
      'All transactions and operations are recorded on the blockchain and are available for public viewing. This ensures complete transparency of all processes.',
  },
  {
    title: 'Full automation',
    content:
      'All processes in the Forsage ecosystem are automated through smart contracts, eliminating the need for manual intervention and ensuring 24/7 operation.',
  },
  {
    title: 'Decentralization',
    content:
      'The platform operates on a decentralized network, ensuring that no single entity has control over the system and making it resistant to censorship.',
  },
  {
    title: '100% online',
    content:
      'The platform operates entirely online, allowing users to participate from anywhere in the world at any time, without geographical restrictions.',
  },
];

const Technology = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative container mx-auto px-4 mb-20 lg:px-[115px]">
      <div className="flex flex-col items-center gap-3 max-w-[343px] lg:max-w-[720px] mx-auto text-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-[12px] bg-blue-600">
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M11.625 16.5C12.1223 16.5 12.5992 16.3025 12.9508 15.9508C13.3025 15.5992 13.5 15.1223 13.5 14.625C13.5 14.1277 13.3025 13.6508 12.9508 13.2992C12.5992 12.9475 12.1223 12.75 11.625 12.75C11.1277 12.75 10.6508 12.9475 10.2992 13.2992C9.94754 13.6508 9.75 14.1277 9.75 14.625C9.75 15.1223 9.94754 15.5992 10.2992 15.9508C10.6508 16.3025 11.1277 16.5 11.625 16.5Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M5.625 1.5H9C9.99456 1.5 10.9484 1.89509 11.6517 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V7.125C12.75 8.161 13.59 9 14.625 9H16.5C17.4946 9 18.4484 9.39509 19.1517 10.0983C19.8549 10.8016 20.25 11.7554 20.25 12.75V20.625C20.25 21.66 19.41 22.5 18.375 22.5H5.625C5.12772 22.5 4.65081 22.3025 4.29917 21.9508C3.94754 21.5992 3.75 21.1223 3.75 20.625V3.375C3.75 2.339 4.59 1.5 5.625 1.5Z" fill="white" />
            <path d="M14.2502 5.24992C14.2519 3.98846 13.7977 2.76888 12.9712 1.81592C14.6445 2.25588 16.1709 3.13239 17.3943 4.3558C18.6177 5.57922 19.4942 7.10563 19.9342 8.77892C18.9812 7.9524 17.7616 7.49817 16.5002 7.49992H14.6252C14.5257 7.49992 14.4304 7.46041 14.36 7.39008C14.2897 7.31976 14.2502 7.22437 14.2502 7.12492V5.24992Z" fill="white" />
          </svg>
        </div>
        <h2 className="text-[32px] lg:text-[48px] font-medium leading-[1.21] text-center">
          Technology of smart contracts and non-fungible tokens
        </h2>
        <p className="text-base lg:text-lg text-gray-400 lg:text-white-500">
          Decentralized marketing is powered by the revolutionary technology of smart contracts and NFTs. The Forsage smart contract code is completely open. You can be sure of its safety and long-term performance.
        </p>
      </div>

      {/* Desktop View */}
      <div className="mt-10 hidden lg:block">
        <div className="flex max-w-[1170px] mx-auto border border-white-100 rounded-[30px] p-10">
          <div className="flex flex-col space-y-3 pr-6 border-r border-white-100 w-[240px]">
            {techItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`text-sm px-4 h-[40px] rounded-[10px] text-left transition ${
                  activeIndex === index
                    ? 'bg-[#216EFF] text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.35)]'
                    : 'opacity-50 hover:bg-white-100 hover:opacity-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="pl-10 flex-1">
            <h3 className="text-[32px] font-medium leading-[51.2px] mb-4">
              {techItems[activeIndex].title}
            </h3>
            <p className="text-[20px] text-gray-400 leading-[32px] max-w-[378px]">
              {techItems[activeIndex].content}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View (Simple Stack) */}
      <div className="mt-10 block lg:hidden space-y-4">
        {techItems.map((item, index) => (
          <div
            key={index}
            className="border border-white-100 rounded-[30px] p-6 backdrop-blur-md"
          >
            <h3 className="text-[24px] font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technology;
