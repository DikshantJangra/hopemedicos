"use client";
import { useState } from "react";
import { BiSearch, BiBadgeCheck } from "react-icons/bi";

const demoMeds:string[] = [
    "Paracetamol",
    "Ibuprofen",
    "Amoxicillin",
    "Cetirizine",
    "Metformin",
    "Aspirin",
  ];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    // Filter meds that include the query (case-insensitive)
    const filtered = demoMeds.filter((med) =>
      med.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  // Determine border color based on search state
  const getBorderColor = () => {
    if (!query) return "border-gray-200";
    if (results.length > 0) return "border-[#1BAB85]";
    return "border-[#637887]";
  };

  return (
    <div className="w-full mt-3 sm:mt-5">
      {/* Search Input with attached results */}
      <div className={`bg-white rounded-lg border-2 ${getBorderColor()} shadow-sm overflow-hidden transition-all duration-300`}>
        {/* Search Input */}
        <div className="h-10 flex justify-start items-center gap-2 pl-3 sm:pl-4 text-black/40">
          <BiSearch className="text-xl sm:text-2xl" />
          <input
            type="search"
            value={query}
            onChange={handleChange}
            className="w-full h-10 pr-3 sm:pr-4 focus:outline-none text-black placeholder:text-black/30 text-sm sm:text-base"
            placeholder="Search medicine availability right from your home"
          />
        </div>
        
        {/* Results Section - attached to search bar */}
        {query && (
          <div className="border-t border-gray-100">
            {/* Product Found - Green theme */}
            {results.length > 0 && (
              <div className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <BiBadgeCheck className="text-xl sm:text-2xl lg:text-3xl text-[#1BAB85]" />
                  <span className="text-lg sm:text-xl font-bold text-[#1BAB85]">Found {results.length} result{results.length > 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {results.slice(0, 3).map((med) => (
                    <div key={med} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border-2 border-[#1BAB85] shadow-sm gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1BAB85] rounded-full flex items-center justify-center flex-shrink-0">
                          <BiBadgeCheck className="text-white text-lg sm:text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#1BAB85]">{med}</h3>
                          <p className="text-sm sm:text-base text-gray-600">Medicine found. Ready when you are!</p>
                        </div>
                      </div>
                      <div className="w-16 h-12 sm:w-20 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-12 h-8 sm:w-16 sm:h-10 bg-gray-400 rounded-sm relative">
                          <div className="absolute -right-1 sm:-right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-r-sm sm:rounded-r-md font-medium">
                            {med.slice(0, 6).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Not Found - Gray theme */}
            {results.length === 0 && (
              <div className="p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-0">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-gray-800 text-base sm:text-lg">
                      We may have it,{" "}
                      <a href="#contact" className="text-[#1AAB85] underline font-semibold">
                        try contacting us.
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Let's see what we can do to get this to you</p>
                  </div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#637887] rounded-full flex items-center justify-center flex-shrink-0">
                    <BiSearch className="text-lg sm:text-2xl text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

