"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  ShieldCheck,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Crown,
  Search,
  ExternalLink,
  Save,
  X,
  Linkedin,
  Twitter,
  Github,
  Mail,
  FolderKanban,
  Check,
  RefreshCw,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  primaryRole: string;
  badge: string;
  roles: string[];
  image: string;
  bio: string;
  stats?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  highlight?: boolean;
  order?: number;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New member state
  const [name, setName] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");
  const [badge, setBadge] = useState("");
  const [rolesStr, setRolesStr] = useState("");
  const [image, setImage] = useState("/images/hero/anmolin.png");
  const [bio, setBio] = useState("");
  const [stats, setStats] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMembers(json.data);
      }
    } catch (err) {
      console.error("Failed to load team data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const notifyChange = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cortex_team_updated"));
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !primaryRole) return;

    try {
      const roles = rolesStr
        ? rolesStr.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Engineering"];

      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          primaryRole,
          badge: badge || "Core Team",
          roles,
          image: image || "/images/hero/anmolin.png",
          bio,
          stats,
          highlight,
          socials: {
            linkedin: linkedin || undefined,
            twitter: twitter || undefined,
            github: github || undefined,
            email: email ? (email.startsWith("mailto:") ? email : `mailto:${email}`) : undefined,
          },
        }),
      });

      const json = await res.json();
      if (json.success) {
        setIsCreateModalOpen(false);
        resetCreateForm();
        await fetchTeam();
        notifyChange();
      } else {
        alert(json.error || "Failed to create team member");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating team member");
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      const res = await fetch(`/api/team/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });

      const json = await res.json();
      if (json.success) {
        setEditingMember(null);
        await fetchTeam();
        notifyChange();
      } else {
        alert(json.error || "Failed to update team member");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating team member");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (json.success) {
        setDeletingId(null);
        await fetchTeam();
        notifyChange();
      } else {
        alert(json.error || "Failed to delete team member");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting team member");
    }
  };

  const resetCreateForm = () => {
    setName("");
    setPrimaryRole("");
    setBadge("");
    setRolesStr("");
    setImage("/images/hero/anmolin.png");
    setBio("");
    setStats("");
    setHighlight(false);
    setLinkedin("");
    setTwitter("");
    setGithub("");
    setEmail("");
  };

  const filteredMembers = members.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.primaryRole.toLowerCase().includes(q) ||
      m.badge.toLowerCase().includes(q)
    );
  });

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-[#6C63FF]/15 via-[#00D4FF]/10 to-transparent blur-[180px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl space-y-8">
        {/* Navigation Tabs (Projects vs Team) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B0B0F] border border-white/[0.08] w-fit">
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-all"
          >
            <FolderKanban size={16} /> Client Projects
          </Link>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all"
          >
            <Users size={16} /> Team & Leadership Console
          </button>
        </div>

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-3 py-1 rounded-full border border-[#00D4FF]/20 mb-2">
              <ShieldCheck size={14} className="text-[#6C63FF]" />
              Super Admin Leadership Management
            </div>
            <h1 className="text-3xl font-black text-white">Engineers & Visionaries Control Panel</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Add new team members, update leadership profiles, roles, badges, bio, and social links displayed on the home page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="py-2.5 px-4 rounded-xl bg-[#14141F] hover:bg-[#1C1C2B] text-zinc-300 text-xs font-bold border border-white/[0.1] flex items-center gap-2 transition-all"
            >
              <ExternalLink size={14} /> View Live Home Page
            </Link>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all"
            >
              <Plus size={16} /> Add New Team Member
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Total Team Members</div>
            <div className="text-2xl font-black text-white">{members.length}</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Featured / Founders</div>
            <div className="text-2xl font-black text-amber-400">
              {members.filter((m) => m.highlight).length}
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] space-y-1">
            <div className="text-xs text-zinc-400">Core Engineering & Leads</div>
            <div className="text-2xl font-black text-[#00D4FF]">
              {members.filter((m) => !m.highlight).length}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0B0B0F]/90 border border-white/[0.08] flex items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search team by name, role, badge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
          <button
            onClick={fetchTeam}
            className="p-2.5 rounded-xl bg-[#14141F] hover:bg-[#1C1C2B] text-zinc-300 border border-white/[0.08] text-xs font-bold flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Team Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`relative rounded-3xl p-6 bg-[#0B0B0F]/90 border transition-all duration-300 flex flex-col justify-between ${
                member.highlight
                  ? "border-[#6C63FF]/40 shadow-[0_0_30px_rgba(108,99,255,0.1)]"
                  : "border-white/[0.08]"
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                    {member.highlight ? (
                      <Crown size={12} className="text-amber-400" />
                    ) : (
                      <ShieldCheck size={12} className="text-[#00D4FF]" />
                    )}
                    {member.badge}
                  </span>

                  {member.stats && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      {member.stats}
                    </span>
                  )}
                </div>

                {/* Avatar & Details */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-950 border border-white/20 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{member.name}</h3>
                    <p className="text-xs font-semibold text-[#6C63FF] mt-0.5">
                      {member.primaryRole}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Role tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {member.roles.map((r, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#14141A] text-zinc-300 border border-white/[0.06]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  {member.socials.linkedin && <Linkedin size={14} className="hover:text-white" />}
                  {member.socials.twitter && <Twitter size={14} className="hover:text-white" />}
                  {member.socials.github && <Github size={14} className="hover:text-white" />}
                  {member.socials.email && <Mail size={14} className="hover:text-white" />}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingMember(member)}
                    className="px-3 py-1.5 rounded-lg bg-[#14141F] hover:bg-[#6C63FF] text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    onClick={() => setDeletingId(member.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#14141F] hover:bg-rose-600 text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE TEAM MEMBER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B0B0F] border border-white/[0.1] rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white">Add New Team Member</h3>
                <p className="text-xs text-zinc-400">Create a member card to display in Leadership section</p>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Full Name (Required)</label>
                  <input
                    type="text"
                    placeholder="e.g. Vikramaditya Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Primary Role (Required)</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Mobile Architect"
                    value={primaryRole}
                    onChange={(e) => setPrimaryRole(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Mobile Lead / Architect"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Stats Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ Yrs iOS & Android"
                    value={stats}
                    onChange={(e) => setStats(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Profile Image Path / URL</label>
                <input
                  type="text"
                  placeholder="e.g. /images/hero/anmolin.png or https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Bio Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of experience, expertise, and leadership impact..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Skill Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React Native, Flutter, Swift, Kotlin"
                  value={rolesStr}
                  onChange={(e) => setRolesStr(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#14141F] border border-white/[0.06] space-y-3">
                <div className="font-bold text-white">Social Links (Optional)</div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Github URL"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Email (e.g. alex@cortex.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="highlightToggle"
                  checked={highlight}
                  onChange={(e) => setHighlight(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#6C63FF]"
                />
                <label htmlFor="highlightToggle" className="text-zinc-300 font-bold cursor-pointer">
                  Highlight as Founder / Key Leader (Glowing Card)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save & Publish Member
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-3.5 rounded-xl bg-[#14141F] text-zinc-300 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEAM MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B0B0F] border border-white/[0.1] rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Member: {editingMember.name}</h3>
                <p className="text-xs text-zinc-400">Update member role, avatar, bio, and socials</p>
              </div>
              <button onClick={() => setEditingMember(null)} className="p-2 text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Primary Role</label>
                  <input
                    type="text"
                    value={editingMember.primaryRole}
                    onChange={(e) => setEditingMember({ ...editingMember, primaryRole: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingMember.badge}
                    onChange={(e) => setEditingMember({ ...editingMember, badge: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Stats Tag</label>
                  <input
                    type="text"
                    value={editingMember.stats || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, stats: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Profile Image URL</label>
                <input
                  type="text"
                  value={editingMember.image}
                  onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Bio Description</label>
                <textarea
                  rows={3}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Skill Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={editingMember.roles ? editingMember.roles.join(", ") : ""}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      roles: e.target.value.split(",").map((r) => r.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-[#14141F] border border-white/[0.08] text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#14141F] border border-white/[0.06] space-y-3">
                <div className="font-bold text-white">Social Links</div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={editingMember.socials?.linkedin || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socials: { ...editingMember.socials, linkedin: e.target.value },
                      })
                    }
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={editingMember.socials?.twitter || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socials: { ...editingMember.socials, twitter: e.target.value },
                      })
                    }
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Github URL"
                    value={editingMember.socials?.github || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socials: { ...editingMember.socials, github: e.target.value },
                      })
                    }
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={editingMember.socials?.email || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socials: { ...editingMember.socials, email: e.target.value },
                      })
                    }
                    className="p-2.5 rounded-lg bg-[#0B0B0F] border border-white/[0.08] text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editHighlightToggle"
                  checked={Boolean(editingMember.highlight)}
                  onChange={(e) => setEditingMember({ ...editingMember, highlight: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#6C63FF]"
                />
                <label htmlFor="editHighlightToggle" className="text-zinc-300 font-bold cursor-pointer">
                  Highlight as Founder / Key Leader
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-6 py-3.5 rounded-xl bg-[#14141F] text-zinc-300 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0B0F] border border-rose-500/30 rounded-3xl p-6 max-w-sm w-full space-y-4">
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Trash2 className="text-rose-500" size={20} /> Delete Team Member?
            </div>
            <p className="text-xs text-zinc-400">
              Are you sure you want to delete this team member? They will be removed from the main Leadership section.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2.5 rounded-xl bg-[#14141F] text-zinc-300 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
