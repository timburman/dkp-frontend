import { Link } from "react-router-dom";
import { ConnectWallet } from "../web3/ConnectWallet";
import { UserStats } from "../web3/UserStats";

export function Navbar() {

    return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              DKP
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/submit" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Submit
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserStats />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );

}
