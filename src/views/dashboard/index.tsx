// Lib
import { Routes, Route } from "react-router-dom";

// React component
import DashboardNav from "../template/dashboardNav";
import ProjectView from "./project";
import StructView from "../struct";


export default function DashboardView() {
    return(
        <DashboardNav>
            <Routes>
                <Route path="/" element={<ProjectView />} />
                <Route path="/struct/:type/:encodedId" element={<StructView />} />
            </Routes>
        </DashboardNav>
    );
}