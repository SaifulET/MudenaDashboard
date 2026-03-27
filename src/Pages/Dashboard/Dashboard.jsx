import RecentUsersTable from "../../Components/Dashboard/RecentUsersTable";
import UserRatioChart from "../../Components/Dashboard/UserRatioChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen ">
      <div className="p-4 mx-auto mt-[27px] ">
        <div>
          <div className="my-2 flex flex-wrap justify-evenly rounded-md border border-gray-600 p-5 md:flex-nowrap">
            {/*============================= Total User =============================*/}
            <div className="bg-[##f6f6f6] flex justify-center w-1/4 ">
              <div className="flex flex-col gap-5">
                <p className="text-[#1C2434] text-2xl font-bold">38.6K</p>
                <p className="text-xl text-[#101010] font-semibold">
                  Total Users
                </p>
              </div>
            </div>
            {/*============================= Old User =============================*/}
            <div className="bg-[##f6f6f6] flex justify-center w-1/4">
              <div className="flex flex-col gap-5">
                <p className="text-[#1C2434] text-2xl font-bold">4.9M</p>
                <p className="text-xl text-[#101010] font-semibold">
                  Total Revenue
                </p>
              </div>
            </div>
          </div>
          <div >
            <UserRatioChart />
          </div>
          <div>
            <RecentUsersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
