import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Drawer } from "antd";
import Header from "../../Components/Sidebar/Header";

const MainLayout = () => {
  const onClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 z-10 hidden h-full border border-gray-600 w-72 lg:block">
        <Sidebar />
      </div>

      {/* Drawer for Mobile */}
      <Drawer placement="left" onClose={onClose} open={open} width={250}>
        <Sidebar />
      </Drawer>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 h-full lg:ml-72">
        {/* Styled Header */}
        <div className="fixed left-0 z-20 px-6 rounded-lg bg-gray-50 subtract-width lg:ml-72">
          <Header showDrawer={showDrawer} />
        </div>

        {/* Scrollable Outlet Section */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 pb-4 pt-[72px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
