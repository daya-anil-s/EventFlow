'use client';

import { useState, useEffect } from "react";
import { Users, FileText, MessageSquare, Clock, TrendingUp, Calendar, ChevronRight, Star } from "lucide-react";

export default function MentorDashboard() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Mock mentor data
    const mentorStats = {
        assignedTeams: 2,
        pendingReviews: 5,
        upcomingMeetings: 3,
        totalHours: 24
    };

    useEffect(() => {
        // mock fetch simulation
        setTimeout(() => {
            setTeams([
                { 
                    id: 1, 
                    name: "Team Apollo", 
                    members: 4,
                    project: "AI-Powered Analytics",
                    progress: 75,
                    lastActive: "2 hours ago",
                    status: "active"
                },
                { 
                    id: 2, 
                    name: "HyperLoopers", 
                    members: 3,
                    project: "Sustainable Transport",
                    progress: 45,
                    lastActive: "1 day ago",
                    status: "active"
                },
                { 
                    id: 3, 
                    name: "EcoInnovators", 
                    members: 5,
                    project: "Green Energy Grid",
                    progress: 30,
                    lastActive: "3 days ago",
                    status: "pending"
                }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleView = (team) => {
        setMessage(`Viewing ${team.name}`);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleReview = (team) => {
        setMessage(`Reviewing submissions for ${team.name}`);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleMessage = (team) => {
        setMessage(`Opening chat with ${team.name}`);
        setTimeout(() => setMessage(""), 3000);
    };

    const getStatusColor = (status) => {
        return status === "active" 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-amber-100 text-amber-700";
    };

    const getProgressColor = (progress) => {
        if (progress >= 70) return "bg-emerald-500";
        if (progress >= 40) return "bg-blue-500";
        return "bg-amber-500";
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
                            <p className="mt-2 text-slate-300 text-lg">
                                Guide your teams to success and share your expertise
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                                <p className="text-slate-300 text-sm">Overall Rating</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-2xl font-bold">4.8</span>
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Assigned Teams</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{mentorStats.assignedTeams}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Pending Reviews</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{mentorStats.pendingReviews}</p>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Upcoming Meetings</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{mentorStats.upcomingMeetings}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Mentoring Hours</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{mentorStats.totalHours}h</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Toast */}
            {message && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-3">
                        <TrendingUp className="w-5 h-5" />
                        {message}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Teams Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900">Assigned Teams</h3>
                                <span className="text-sm text-slate-500">{teams.length} teams</span>
                            </div>

                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                    </div>
                                    <p className="mt-4 text-slate-500">Loading teams...</p>
                                </div>
                            ) : teams.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-500">No teams assigned yet.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {teams.map((team) => (
                                        <div key={team.id} className="p-6 hover:bg-slate-50 transition-colors">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="font-semibold text-slate-900">{team.name}</h4>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(team.status)}`}>
                                                            {team.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 mt-1">{team.project}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Users className="w-4 h-4" />
                                                            {team.members} members
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {team.lastActive}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="sm:w-48">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm text-slate-600">Progress</span>
                                                        <span className="text-sm font-medium text-slate-900">{team.progress}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(team.progress)}`}
                                                            style={{ width: `${team.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                                                <button
                                                    onClick={() => handleView(team)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                                >
                                                    <Users className="w-4 h-4" />
                                                    View
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleReview(team)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Review
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleMessage(team)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Schedule Meeting</p>
                                        <p className="text-sm text-slate-500">Book time with teams</p>
                                    </div>
                                </button>
                                
                                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                        <FileText className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Review Submissions</p>
                                        <p className="text-sm text-slate-500">5 pending reviews</p>
                                    </div>
                                </button>
                                
                                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors group">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Send Announcement</p>
                                        <p className="text-sm text-slate-500">Notify all teams</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Upcoming Meetings */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Meetings</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-xs text-blue-600 font-medium">FEB</span>
                                        <span className="text-lg font-bold text-blue-700">16</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Team Apollo Check-in</p>
                                        <p className="text-sm text-slate-500">2:00 PM - 2:30 PM</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-xs text-purple-600 font-medium">FEB</span>
                                        <span className="text-lg font-bold text-purple-700">18</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">HyperLoopers Review</p>
                                        <p className="text-sm text-slate-500">10:00 AM - 11:00 AM</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-xs text-emerald-600 font-medium">FEB</span>
                                        <span className="text-lg font-bold text-emerald-700">20</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Mentor Sync</p>
                                        <p className="text-sm text-slate-500">4:00 PM - 4:30 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
