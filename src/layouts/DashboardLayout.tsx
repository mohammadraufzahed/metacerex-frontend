import React, { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { statusData } from "../atoms/status";
import Loading from "../components/Loading";
import { getStatus } from "../functions/status";
import { getIdentity } from "../functions/identityForm";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../atoms/userProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";

const BottomBar = lazy(() => import("../components/BottomBar"));
const DashboardNavbar = lazy(() => import("../components/DashboardNavbar"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

const DashboardLayout: React.FC = () => {
  // States
  const [statusD, setStatus] = useRecoilState(statusData);
  const [userProfileD, setUserProfile] = useRecoilState(userProfile);
  const user = useRecoilValue(userToken);
  const [profileStat, setProfileStat] = useState<boolean>(false);

  // Queries
  const statusQuery = useQuery(["status"], getStatus, {
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
  const identityData = useQuery(["identityDataFetcher"], getIdentity, {
    networkMode: "online",
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: profileStat,
  });
  // Effects
  useEffect(() => {
    if (identityData.data) {
      setUserProfile(identityData.data);
    }
  }, [identityData.data]);
  useEffect(() => {
    if (user && user.access) {
      setProfileStat(true);
    } else {
      setProfileStat(false);
    }
  }, []);

  // Effects
  useEffect(() => setStatus(statusQuery.data ?? null), [statusQuery.data]);
  return (
    <div className="flex pb-16 flex-col w-screen min-h-max h-max max-h-max max-w-[100vw] overflow-hidden scrollbar-vertical lg:pb-0">
      <header>
        <DashboardNavbar />
      </header>
      <main className="min-h-max max-h-max h-max w-full overflow-hidden scrollbar-vertical flex flex-row bg-background-50">
        <DashboardSidebar />
        <div className="min-h-max max-h-max overflow-hidden h-max w-full flex px-2 py-16 lg:pr-14">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
        <BottomBar />
      </main>
    </div>
  );
};

export default DashboardLayout;
