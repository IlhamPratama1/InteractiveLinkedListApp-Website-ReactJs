// Lib
import { Routes, Route, Navigate } from "react-router-dom";

// React component
import DashboardNav from "../template/dashboardNavbar";
import ProjectView from "./project";
import StructView from "../struct";
import SavedView from "./saved";
import QuestView from "./quest";
import ProfileView from "./profile";
import ExampleView from "./example";

// Css
import '../css/holeOverlay.css';

export default function DashboardView() {
    return(
        <DashboardNav>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard/project" />}
                />
                <Route path="/project" element={<ProjectView />} />
                <Route path="/example" element={<ExampleView />} />
                <Route path="/struct/:type/:encodedId" element={<StructView />} />
                <Route path="/saved" element={<SavedView />} />
                <Route path="/quest" element={<QuestView />} />
                <Route path="/profile" element={<ProfileView />} />
            </Routes>
        </DashboardNav>
    );
}