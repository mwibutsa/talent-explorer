import { FC } from "react";
import { Users } from "lucide-react";

const Navbar: FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Torre Talent Explorer
              </h1>
              <p className="text-sm text-gray-500">
                Discover amazing talent worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
