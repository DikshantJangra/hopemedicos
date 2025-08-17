"use client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

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

  const handleChange = (e:any) => {
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


  return (
    <div className="w-full mt-5">
      {/* Search Input */}
      <div className="bg-white h-10 rounded-lg flex justify-start items-center gap-2 pl-4 text-black/40 border border-gray-200 shadow-sm">
        <BiSearch className="text-2xl" />
        <input
          type="search"
          value={query}
          onChange={handleChange}
          className="w-full h-10 pr-4 rounded-md focus:outline-none text-black placeholder:text-black/30"
          placeholder="Search medicine availability right from your home"
        />
      </div>
      
        <div className="mt-3 space-y-3">
            {query && results.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {results.map((med) => (
                    <div
                        key={med}
                        className="bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 cursor-pointer hover:bg-green-200 transition"
                        title={`Check availability for ${med}`}
                    >
                        ✅ {med}
                    </div>
                    ))}
                </div>
                )}

            {/* Message Box (conditionally rendered) */}
            {query && results.length === 0 && (
                <div className="mt-3 w-full bg-yellow-100 border border-yellow-300 text-yellow-800 px-5 py-4 rounded-lg text-center font-medium transition-all animate-fade-in">
                💡 We may have it... Try <a href="#contact" className="underline font-semibold text-yellow-900">contacting us</a> to confirm availability!
                </div>
            )}
        </div>
    </div>
  );
}
