import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold text-gray-900">
              BlogSite
            </Link>
            <p className="text-sm text-gray-600 mt-1">© {new Date().getFullYear()} BlogSite. All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/blogs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Blogs
            </Link>
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer