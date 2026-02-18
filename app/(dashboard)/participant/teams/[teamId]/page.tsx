'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    Users,
    Calendar,
    Clock,
    Trophy,
    FileText,
    Copy,
    Check,
    ArrowLeft,
    Github,
    ExternalLink,
    Edit,
    Save,
    Trash2
} from "lucide-react";
import { Input, Label } from "@/components/ui/form"; // Assuming these exist

export default function TeamManagePage() {
    const params = useParams();
    const teamId = params?.teamId;
    const { data: session, status } = useSession();
    const router = useRouter();

    const [team, setTeam] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inviteCodeCopied, setInviteCodeCopied] = useState(false);

    // Submission Form State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [repoLink, setRepoLink] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [showSubmitForm, setShowSubmitForm] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            fetchTeamData();
        } else if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, teamId]);

    const fetchTeamData = async () => {
        try {
            setLoading(true);
            // 1. Fetch Team Details
            const teamRes = await fetch(`/api/teams/${teamId}`);
            if (!teamRes.ok) {
                if (teamRes.status === 404) {
                    // Handle not found
                    console.error("Team not found");
                }
                throw new Error("Failed to fetch team");
            }
            const teamData = await teamRes.json();
            setTeam(teamData.team);

            // 2. Fetch Project Submission
            const subRes = await fetch(`/api/submissions?teamId=${teamId}`);
            if (subRes.ok) {
                const subData = await subRes.json();
                if (subData.submissions && subData.submissions.length > 0) {
                    setSubmission(subData.submissions[0]);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyInviteCode = (code) => {
        if (code) {
            navigator.clipboard.writeText(code);
            setInviteCodeCopied(true);
            setTimeout(() => setInviteCodeCopied(false), 2000);
        }
    };

    const handleSubmitProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: team.event._id,
                    team: team._id,
                    title: projectTitle,
                    description: projectDesc,
                    repoLink,
                    demoLink
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmission(data.submission);
                setShowSubmitForm(false);
                // Reset form
                setProjectTitle("");
                setProjectDesc("");
                setRepoLink("");
                setDemoLink("");
            } else {
                alert(data.error || "Failed to submit project");
            }
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("Failed to submit project");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!team) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-slate-800">Team not found</h1>
                <Link href="/participant" className="mt-4 text-blue-600 hover:underline">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    const isLeader = team.leader?._id === session?.user?.id;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/participant" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                {team.name}
                            </h1>
                            <p className="text-sm text-slate-500">
                                Event: <Link href={`/events/${team.event?._id}`} className="text-blue-600 hover:underline">{team.event?.title}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* INVITE CODE CARD */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Team Invite Code
                    </h2>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Share this code with teammates to verify membership:</p>
                            <code className="text-2xl font-mono font-bold text-slate-900 tracking-wider">
                                {team.inviteCode}
                            </code>
                        </div>
                        <button
                            onClick={() => copyInviteCode(team.inviteCode)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-slate-700"
                        >
                            {inviteCodeCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            {inviteCodeCopied ? "Copied!" : "Copy Code"}
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* MEMBERS LIST */}
                    <div className="lg:col-span-1 space-y-6">
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-slate-500" />
                                Members ({(team.members?.length || 0) + (team.leader ? 1 : 0)})
                            </h2>
                            <div className="space-y-4">
                                {/* Leader */}
                                {team.leader && (
                                    <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg border border-amber-100">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold border border-amber-200">
                                            {team.leader.name?.charAt(0) || "L"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{team.leader.name} <span className="text-xs text-amber-600 font-normal">(Leader)</span></p>
                                            <p className="text-xs text-slate-500 truncate">{team.leader.email}</p>
                                        </div>
                                        <span title="Team Leader">
                                            <Trophy className="w-4 h-4 text-amber-500" />
                                        </span>
                                    </div>
                                )}

                                {/* Members */}
                                {team.members?.map((member) => (
                                    <div key={member._id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {member.name?.charAt(0) || "U"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{member.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{member.email}</p>
                                        </div>
                                    </div>
                                ))}

                                {(!team.members || team.members.length === 0) && (
                                    <p className="text-sm text-slate-500 italic text-center py-2">No other members yet.</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* PROJECT STATUS */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-purple-600" />
                                    Project Status
                                </h2>
                                {submission ? (
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200 flex items-center gap-1">
                                        <Check className="w-3 h-3" /> Submitted
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">
                                        Not Submitted
                                    </span>
                                )}
                            </div>

                            {submission ? (
                                <div className="space-y-6 animate-in fade-in">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{submission.title}</h3>
                                        <p className="text-slate-600 mt-2 whitespace-pre-wrap">{submission.description}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <a
                                            href={submission.repoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                                        >
                                            <Github className="w-5 h-5 text-slate-700 group-hover:text-black" />
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-black">View Repository</span>
                                            <ExternalLink className="w-4 h-4 text-slate-400 ml-auto group-hover:text-slate-600" />
                                        </a>
                                        {submission.demoLink && (
                                            <a
                                                href={submission.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                                            >
                                                <ExternalLink className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                                                <span className="text-sm font-medium text-slate-700 group-hover:text-black">View Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {!showSubmitForm ? (
                                        <div className="text-center py-10">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FileText className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h3 className="text-slate-900 font-medium mb-1">Ready to submit?</h3>
                                            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                                                Once your project is ready, submit your repository and details here. Only one submission per team is allowed.
                                            </p>
                                            <button
                                                onClick={() => setShowSubmitForm(true)}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                            >
                                                Submit Project
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmitProject} className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                            <div>
                                                <Label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Project Title <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    required
                                                    value={projectTitle}
                                                    onChange={(e) => setProjectTitle(e.target.value)}
                                                    placeholder="e.g. EcoTracker AI"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div>
                                                <Label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Description <span className="text-red-500">*</span>
                                                </Label>
                                                <textarea
                                                    required
                                                    value={projectDesc}
                                                    onChange={(e) => setProjectDesc(e.target.value)}
                                                    placeholder="Describe your project, tech stack, and features..."
                                                    rows={5}
                                                    className="w-full rounded-md border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label className="block text-sm font-medium text-slate-700 mb-1">
                                                    GitHub Repository <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    type="url"
                                                    required
                                                    value={repoLink}
                                                    onChange={(e) => setRepoLink(e.target.value)}
                                                    placeholder="https://github.com/..."
                                                    className="w-full"
                                                />
                                            </div>
                                            <div>
                                                <Label className="block text-sm font-medium text-slate-700 mb-1">
                                                    Demo Link (Optional)
                                                </Label>
                                                <Input
                                                    type="url"
                                                    value={demoLink}
                                                    onChange={(e) => setDemoLink(e.target.value)}
                                                    placeholder="https://..."
                                                    className="w-full"
                                                />
                                            </div>

                                            <div className="flex items-center gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSubmitForm(false)}
                                                    className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? "Submitting..." : "Submit Project"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
