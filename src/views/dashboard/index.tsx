// Lib
import { Routes, Route, Navigate } from "react-router-dom";

// React component
import DashboardNav from "../template/dashboardNavbar";
import ProjectView from "./project";
import StructView from "../struct";
import SavedView from "./saved";
import QuestView from "./quest";
import ProfileView from "./profile";
import FeedbackView from "./feedback";
import QuizView from "./lesson";
import StartQuizView from "../quiz";
import StructLesson from "./lessons/structLesson";
import SingleLinkLesson from "./lessons/singleLinkLesson";
import DoubleLinkLesson from "./lessons/doubleLinkLesson";
import CircularLinkLesson from "./lessons/circularLinkLesson";
import AdminView from "./admin";

// Css
import '../css/holeOverlay.css';

export default function DashboardView() {
    return(
        <DashboardNav>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/project" />} />
                <Route path="/project" element={<ProjectView />} />
                <Route path="/struct/:type/:encodedId" element={<StructView />} />
                <Route path="/saved" element={<SavedView />} />
                <Route path="/quest" element={<QuestView />} />
                <Route path="/lesson" element={<QuizView />} />
                <Route path="/lesson/test" element={<StartQuizView />} />
                <Route path="/lesson/struct" element={<StructLesson />} />
                <Route path="/lesson/single-link" element={<SingleLinkLesson />} />
                <Route path="/lesson/double-link" element={<DoubleLinkLesson />} />
                <Route path="/lesson/circular-link" element={<CircularLinkLesson />} />
                <Route path="/profile" element={<ProfileView />} />
                <Route path="/feedback" element={<FeedbackView />} />
                <Route path="/admin-view" element={<AdminView />} />
            </Routes>
        </DashboardNav>
    );
}