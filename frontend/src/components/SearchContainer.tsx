import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../services/api";
import useJob from "../store/jobStore";
import useNotification from "../store/notiStore";

const LOCATIONS = [
  "India",
  "Remote",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
];
const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export function SearchContainer() {
  const { showRecommendedJobs, setJobs, setIsLoading } = useJob();
  const { setIsVisible, setMessage, setType } = useNotification()
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("India");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [yearsExp, setYearsExp] = useState(0);

  const isFirstRender = useRef(true);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const saveFilters = () => {
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("selectedJobTypes", JSON.stringify(selectedJobTypes));
    localStorage.setItem("yearsExp", JSON.stringify(yearsExp));
    localStorage.setItem(
      "selectedCompanies",
      JSON.stringify(selectedCompanies)
    );
    localStorage.setItem("location", JSON.stringify(location));
  };

  const getCombinedFilters = () => {
    const filters = [
      ...tags,
      `${yearsExp} years of experience`,
      ...selectedJobTypes,
      ...selectedCompanies,
      location,
    ].join(" ");

    return filters;
  };

  useEffect(() => {
    const performSearch = async () => {
      if (isFirstRender.current) {
        const savedFilters = {
          tags: JSON.parse(localStorage.getItem("tags") || "[]"),
          location: JSON.parse(localStorage.getItem("location") || '"India"'),
          selectedCompanies: JSON.parse(
            localStorage.getItem("selectedCompanies") || "[]"
          ),
          selectedJobTypes: JSON.parse(
            localStorage.getItem("selectedJobTypes") || "[]"
          ),
          yearsExp: JSON.parse(localStorage.getItem("yearsExp") || "0"),
        };

        setTags(savedFilters.tags);
        setLocation(savedFilters.location);
        setSelectedCompanies(savedFilters.selectedCompanies);
        setSelectedJobTypes(savedFilters.selectedJobTypes);
        setYearsExp(savedFilters.yearsExp);

        isFirstRender.current = false;
        return;
      }

      if (!tags.length && showRecommendedJobs) return
      if (!tags.length && !selectedCompanies.length && !selectedJobTypes.length && yearsExp === 0) return;
      
      saveFilters();
      const filters = getCombinedFilters();
      await handleSearch(filters);
    };

    performSearch();
  }, [location, selectedCompanies, selectedJobTypes, tags, yearsExp]);

  const handleSearch = async (filters: string) => {
    try {
      setIsLoading(true);
      const response = await apiService.getJobs(filters, location);
      if (response?.data) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error("Error fetching jobs: ", error);
      setMessage("We had some trouble getting your jobs")
      setType("error")
      setIsVisible(true)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-10 w-[65%] mx-auto mt-12">
      <div className="flex items-center gap-6">
        <div className="flex flex-wrap gap-2 flex-1 border border-gray-200 rounded-md px-4 py-2 bg-gray-50 min-h-12">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-3 py-1 text-base font-medium"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-400 hover:text-red-500 focus:outline-none"
                aria-label={`Remove ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type keywords and press Enter"
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-gray-700 text-base py-1"
          />
        </div>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-200 bg-gray-50 text-gray-700 text-base focus:ring-2 focus:ring-blue-200"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-7 text-right">
        <button
          onClick={() => setShowFilters((f) => !f)}
          className={`px-7 py-2 rounded-md font-medium text-white transition-colors ${
            showFilters
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="mt-8 border border-gray-200 rounded-md p-7 bg-gray-50">
          <div>
            <label className="font-semibold text-blue-600 text-base">
              Company Employees
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {COMPANY_SIZES.map((size) => (
                <label
                  key={size}
                  className={`flex items-center gap-2 text-sm rounded px-3 py-1 cursor-pointer transition ${
                    selectedCompanies.includes(size)
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(size)}
                    onChange={() =>
                      toggleSelection(
                        size,
                        selectedCompanies,
                        setSelectedCompanies
                      )
                    }
                    className="accent-blue-600"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label className="font-semibold text-blue-600 text-base">
              Job Type
            </label>
            <div className="flex gap-4 mt-2">
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 text-sm rounded px-3 py-1 cursor-pointer transition ${
                    selectedJobTypes.includes(type)
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() =>
                      toggleSelection(
                        type,
                        selectedJobTypes,
                        setSelectedJobTypes
                      )
                    }
                    className="accent-blue-600"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label className="font-semibold text-blue-600 text-base block mb-1">
              Years of Experience:{" "}
              <span className="text-gray-700">{yearsExp}</span>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              value={yearsExp}
              onChange={(e) => setYearsExp(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 rounded"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
              <span>0</span>
              <span>20+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
