"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
    ArrowLeft,
    Settings,
    Users,
    Calendar,
    Trophy,
    MessageSquare,
    Edit,
    Trash2,
    Check,
    X,
    Search
} from "lucide-react";

export default function EventDashboard() {
    const params = useParams(); // useParams returns a readonly object, not a Promise in Client Components
    const { id } = params;
    const { data: session } = useSession();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    const fetchEventDetails = async () => {
        try {
            // In a real app, you'd have a specific GET /api/events/[id] endpoint
            // For now, we reuse the list endpoint or you should create a specific one
            // But let's assume valid data for now, implementing the fetch logic
            const res = await fetch(`/api/events/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setEvent(data.event);
            } else {
                // Handle error
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Event Not Found</h2>
                <Link href="/organizer" className="text-indigo-600 hover:underline">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/organizer"
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-500" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">{event.title}</h1>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize`}>
                                        {event.status}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors">
                                <Edit className="w-4 h-4" />
                                Edit Event
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 mt-4">
                        {["overview", "participants", "judges", "submissions"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Total Teams</p>
                                    <p className="text-2xl font-bold text-slate-900">0</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Participants</p>
                                    <p className="text-2xl font-bold text-slate-900">0</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-sm font-medium text-slate-500 mb-1">Submissions</p>
                                    <p className="text-2xl font-bold text-slate-900">0</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">About Event</h3>
                                <p className="text-slate-600 whitespace-pre-line">{event.description}</p>
                            </div>

                            {/* Tracks */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Tracks</h3>
                                <div className="flex flex-wrap gap-2">
                                    {event.tracks?.length > 0 ? (
                                        event.tracks.map((track, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                                {track}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 italic">No tracks defined.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Rules */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Rules</h3>
                                <ul className="space-y-2">
                                    {event.rules?.length > 0 ? (
                                        event.rules.map((rule, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                                {rule}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 italic">No rules defined.</p>
                                    )}
                                </ul>
                            </div>

                            {/* Team Limits */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Constraints</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Min Team Size</span>
                                        <span className="font-semibold">{event.minTeamSize}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Max Team Size</span>
                                        <span className="font-semibold">{event.maxTeamSize}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
