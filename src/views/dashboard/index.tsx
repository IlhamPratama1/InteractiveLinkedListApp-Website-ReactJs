// Lib
import { Routes, Route, Navigate } from "react-router-dom";

// React component
import DashboardNav from "../template/dashboardNav";
import ProjectView from "./project";
import StructView from "../struct";
import SavedView from "./saved";
import QuestView from "./quest";
import ProfileView from "./profile";


export default function DashboardView() {
    return(
        <DashboardNav>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard/project" />}
                />
                <Route path="/project" element={<ProjectView />} />
                <Route path="/struct/:type/:encodedId" element={<StructView />} />
                <Route path="/saved" element={<SavedView />} />
                <Route path="/quest" element={<QuestView />} />
                <Route path="/profile" element={<ProfileView />} />
            </Routes>
        </DashboardNav>
    );
}