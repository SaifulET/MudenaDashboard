import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  ChartColumnIncreasing,
  Package,
  Puzzle,
  Settings,
  TriangleAlert,
  UserPlus,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <MdDashboard className="w-5 h-5" />,
      label: "Dashboard",
      Link: "/",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Users",
      Link: "/user-list",
    },
    {
      icon: <ChartColumnIncreasing className="w-5 h-5" />,
      label: "Earnings",
      Link: "/earnings",
    },
    {
      icon: <Puzzle className="w-5 h-5" />,
      label: "Quiz Management",
      Link: "/quiz-management",
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: "Quiz Pack",
      Link: "/quiz-pack",
    },
    {
      icon: <UserPlus className="w-5 h-5" />,
      label: "Create Admin",
      Link: "/admin",
    },
    {
      icon: <TriangleAlert className="w-5 h-5" />,
      label: "Report",
      Link: "/reports",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      Link: "/settings",
    },
    {
      icon: <FiLogOut className="w-5 h-5" />,
      label: "Logout",
      Link: "/sign-in",
    },
  ];

  return (
    <div className="flex flex-col h-auto p-3 w-72">
      <div className="mx-auto">
        <img src="/logo.svg" alt="logo" className="w-40 h-40" />
      </div>

      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)]">
        {menuItems.map((item, index) => {
          const isActive =
            item.Link === "/"
              ? location.pathname === "/" || location.pathname === "/dashboard"
              : location.pathname === item.Link ||
                location.pathname.startsWith(`${item.Link}/`);

          return (
            <div key={`${item.label}-${index}`}>
              <div
                className={`flex justify-between items-center px-5 py-2 my-5 cursor-pointer transition-all hover:bg-[#FF0099] hover:text-white hover:font-semibold ${
                  isActive
                    ? "bg-[#FF0099] text-white font-semibold"
                    : "text-black"
                }`}
              >
                <Link to={item.Link} className="flex items-center w-full gap-3">
                  {item.icon}
                  <p>{item.label}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
