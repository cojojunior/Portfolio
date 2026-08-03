import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = filter === "all" || post.category === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { label: "All Posts", value: "all" },
    { label: "Web Development", value: "web-dev" },
    { label: "Design", value: "design" },
    { label: "Tutorials", value: "tutorials" },
    { label: "Thoughts", value: "thoughts" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="blog"
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-dark-navy tracking-tight">
            My Blog
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg mt-3 max-w-2xl mx-auto">
            Thoughts on web development, design, and technology. Sharing what I
            learn along the way.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-28 py-3 sm:py-4 bg-golden/5 border-2 border-golden/20 rounded-xl sm:rounded-2xl text-dark-navy placeholder-gray-400 focus:outline-none focus:border-golden focus:bg-golden/10 transition-all duration-300 text-sm sm:text-base lg:text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-2 sm:py-2.5 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:shadow-[0_4px_20px_rgba(252,163,17,0.3)] flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <Search size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === cat.value
                  ? "bg-golden text-white shadow-[0_0_20px_rgba(252,163,17,0.3)]"
                  : "border border-golden/30 text-dark-navy hover:text-golden hover:border-golden"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid - 2 columns on mobile */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-xl sm:rounded-2xl overflow-hidden bg-white border-2 border-golden/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-golden/50 hover:shadow-[0_20px_60px_rgba(252,163,17,0.15)]">
                <div className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/20 to-golden/10 pointer-events-none" />
                  <span className="absolute top-2 left-2 sm:top-4 sm:left-4 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-golden text-white text-[8px] sm:text-xs font-bold uppercase rounded-full shadow-[0_4px_15px_rgba(252,163,17,0.3)]">
                    {post.category.replace("-", " ")}
                  </span>
                </div>

                <div className="p-2 sm:p-4 md:p-6">
                  <div className="flex items-center gap-1.5 sm:gap-4 text-gray-500 text-[8px] sm:text-xs md:text-sm mb-1.5 sm:mb-4">
                    <span className="flex items-center gap-0.5 sm:gap-1.5">
                      <svg
                        width="10"
                        height="10"
                        className="sm:w-4 sm:h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="hidden xs:inline">{post.date}</span>
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1.5">
                      <svg
                        width="10"
                        height="10"
                        className="sm:w-4 sm:h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="hidden xs:inline">{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-xl font-bold text-dark-navy mb-0.5 sm:mb-2 tracking-tight leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-[8px] xs:text-[10px] sm:text-xs md:text-sm leading-relaxed mb-1.5 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-0.5 sm:gap-2 mb-1.5 sm:mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1 sm:px-3 py-0.5 sm:py-1 border border-golden/20 rounded-md bg-golden/5 text-dark-navy text-[6px] xs:text-[8px] sm:text-xs font-medium transition-all duration-300 group-hover:border-golden group-hover:text-golden group-hover:bg-golden/10">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-1 sm:px-3 py-0.5 sm:py-1 text-[6px] xs:text-[8px] sm:text-xs text-gray-400">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => alert(`Opening article: "${post.title}"`)}
                    className="inline-flex items-center gap-1 sm:gap-2 text-golden font-semibold text-[8px] xs:text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:gap-2 sm:hover:gap-3">
                    Read More
                    <svg
                      width="10"
                      height="10"
                      className="sm:w-4 sm:h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={80} className="mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-dark-navy mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-8 md:mt-12">
          <Link
            to="/blog"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-golden text-golden font-semibold rounded-xl transition-all duration-300 hover:bg-golden hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(252,163,17,0.2)] text-sm sm:text-base">
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
