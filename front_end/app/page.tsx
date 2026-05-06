import Image from "next/image";

export default function Home() {
  const courses = [
    "B.Tech",
    "MBA",
    "MBBS",
    "BA",
    "B.Com",
    "B.Sc",
    "B.Design",
    "Law",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded bg-[#246d80] flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="text-xl font-bold text-[#246d80]">College Searcher</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <a href="#" className="hover:text-[#089670] transition-colors">Colleges</a>
          <a href="#" className="hover:text-[#089670] transition-colors">Exams</a>
          <a href="#" className="hover:text-[#089670] transition-colors">Courses</a>
          <a href="#" className="hover:text-[#089670] transition-colors">News</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-semibold text-[#246d80] hover:text-[#089670] transition-colors">
            Log In
          </button>
          <button className="text-sm font-semibold bg-[#089670] text-white px-5 py-2.5 rounded-md shadow-md hover:bg-[#067a5b] transition-all transform hover:scale-105 active:scale-95">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[#246d80] min-h-[550px]">
        {/* Subtle Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#246d80] to-[#154652] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent z-0"></div>

        <div className="z-10 w-full max-w-5xl px-6 py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-md">
            Find Your Dream College
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            Discover top educational institutions tailored to your goals. Search thousands of colleges, exams, and courses across the country.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center bg-white rounded-lg p-2 shadow-2xl mb-8 transform transition-all focus-within:scale-[1.01] focus-within:shadow-cyan-900/30">
            <div className="flex-1 w-full flex items-center px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#089670] mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for colleges, exams, courses and more..."
                className="w-full text-gray-800 focus:outline-none text-base md:text-lg bg-transparent placeholder-gray-400"
              />
            </div>
            <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-[#089670] hover:bg-[#067a5b] text-white px-8 py-3.5 rounded-md font-semibold text-lg transition-colors shadow-md">
              Search
            </button>
          </div>

          {/* Quick Links / Course Buttons */}
          <div className="w-full max-w-4xl flex flex-col items-center">
            <span className="text-sm text-gray-300 mb-4 uppercase tracking-widest font-bold">
              Popular Courses
            </span>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {courses.map((course) => (
                <button
                  key={course}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1 focus:ring-2 focus:ring-white/50 outline-none"
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Stats/Features Section */}
      <section className="py-16 px-6 bg-white flex justify-center border-t border-gray-100">
        <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "Colleges", value: "25,000+" },
            { label: "Exams", value: "400+" },
            { label: "Courses", value: "12,000+" },
            { label: "Student Reviews", value: "1M+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-[#089670]/30 hover:shadow-md transition-all group"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-[#246d80] mb-2 group-hover:text-[#089670] transition-colors">
                {stat.value}
              </span>
              <span className="text-gray-600 font-semibold text-sm md:text-base uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
