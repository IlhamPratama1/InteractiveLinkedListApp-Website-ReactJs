// Lib
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// React component
import DashboardNav from "../template/dashboardNavbar";
import ProjectView from "./project";
import StructView from "../struct";
import SavedView from "./saved";
import QuestView from "./quest";
import ProfileView from "./profile";
import ExampleView from "./example";

// Redux Component
import { UserStateInterface } from "../../interface";
import { State } from "../../state";

// Css
import '../css/holeOverlay.css';

export default function DashboardView() {
    // --- lib
    let navigate = useNavigate();

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    useEffect(() => {
        if (!auth.token) navigate('/login');
    }, [auth.token, navigate]);
    
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