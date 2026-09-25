'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Wallet,
  Copy,
  Check,
  Tv,
  Bot,
  Play,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  ShieldCheck,
  Rocket,
  Lock,
  Sparkles,
  ExternalLink,
  Award,
  Home
} from 'lucide-react';

interface TapParticle {
  id: number;
  x: number;
  y: number;
  val: string;
}

export default function IlluminatiCoinPage() {
  // Ultra-Hard Tokenomics
  const [balance, setBalance] = useState<number>(0.0500);
  const [tapValue, setTapValue] = useState<number>(0.0010); // Micro-mining
  const [multitapLevel, setMultitapLevel] = useState<number>(1);
  const [energyLevel, setEnergyLevel] = useState<number>(1);
  const [autoBotActive, setAutoBotActive] = useState<boolean>(false);
  
  // Mining Session State (30s Active Tap Session + 3 Hours Cooldown)
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number>(30); // 30 seconds tap window
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState<number>(0); // 3 Hours (10800s)

  // Referrals
  const [friendsCount, setFriendsCount] = useState<number>(1);
  const [referralCode] = useState<string>('LUMI-8841');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Sound & Effects
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [particles, setParticles] = useState<TapParticle[]>([]);
  const [isTapping, setIsTapping] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mine' | 'boost' | 'refer' | 'tasks' | 'roadmap'>('mine');

  // AdSense & Reward State
  const [adModalOpen, setAdModalOpen] = useState<boolean>(false);
  const [adTimer, setAdTimer] = useState<number>(5);
  const [adRewardClaimed, setAdRewardClaimed] = useState<boolean>(false);
  const [boostActive, setBoostActive] = useState<boolean>(false);

  // TON Web3 Wallet State
  const [tonModalOpen, setTonModalOpen] = useState<boolean>(false);
  const [tonAddress, setTonAddress] = useState<string>('');
  const tonManifestUrl = process.env.NEXT_PUBLIC_TON_MANIFEST_URL || 'https://cortestack.com/tonconnect-manifest.json';
  const illumContractAddress = process.env.NEXT_PUBLIC_ILLUM_CONTRACT_ADDRESS || 'EQB3n5vL9kL_ILLUMINATI_JETTON_TOKEN_ADDRESS';

  // Web Audio Synth
  const playCoinSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  // Load from localStorage on mount (including Cooldown timestamp)
  useEffect(() => {
    const savedBal = localStorage.getItem('illuminati_balance');
    const savedFriends = localStorage.getItem('illuminati_friends');
    const savedCooldown = localStorage.getItem('illuminati_cooldown_until');

    if (savedBal) setBalance(parseFloat(savedBal));
    if (savedFriends) setFriendsCount(parseInt(savedFriends));

    if (savedCooldown) {
      const targetTime = parseInt(savedCooldown);
      const now = Date.now();
      if (targetTime > now) {
        setCooldownTimeLeft(Math.floor((targetTime - now) / 1000));
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('illuminati_balance', balance.toString());
    localStorage.setItem('illuminati_friends', friendsCount.toString());
  }, [balance, friendsCount]);

  // 30-Second Active Tap Session Countdown
  useEffect(() => {
    if (!sessionActive || sessionTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev <= 1) {
          // Session ended! Trigger 3-Hour Cooldown (10800 seconds)
          setSessionActive(false);
          const cooldownDuration = 3 * 60 * 60; // 3 Hours
          setCooldownTimeLeft(cooldownDuration);
          localStorage.setItem('illuminati_cooldown_until', (Date.now() + cooldownDuration * 1000).toString());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionActive, sessionTimeLeft]);

  // 3-Hour Cooldown Countdown Timer
  useEffect(() => {
    if (cooldownTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setCooldownTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem('illuminati_cooldown_until');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownTimeLeft]);

  // Auto-Miner Bot (+0.001 LUMI every 30 seconds)
  useEffect(() => {
    if (!autoBotActive) return;
    const interval = setInterval(() => {
      setBalance((prev) => prev + 0.001);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoBotActive]);

  // Start 30s Mining Session
  const startMiningSession = () => {
    if (cooldownTimeLeft > 0) return;
    setSessionTimeLeft(30);
    setSessionActive(true);
  };

  // Handle Coin Tap (Only during 30s active session)
  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!sessionActive || sessionTimeLeft <= 0) return;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const gained = boostActive ? tapValue * 2 : tapValue;
    setBalance((prev) => prev + gained);

    playCoinSound();
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 80);

    const newParticle: TapParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      val: `+${gained.toFixed(4)}`
    };

    setParticles((prev) => [...prev.slice(-10), newParticle]);
  };

  const removeParticle = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopyReferral = () => {
    const refUrl = `https://cortestack.com/coin?ref=${referralCode}`;
    navigator.clipboard.writeText(refUrl);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleWatchAd = () => {
    setAdModalOpen(true);
    setAdTimer(5);
    setAdRewardClaimed(false);

    const interval = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAdRewardClaimed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClaimAdReward = () => {
    // Reduce 1 hour (3600s) from Cooldown & grant +0.025 LUMI bonus
    setCooldownTimeLeft((prev) => Math.max(0, prev - 3600));
    setBoostActive(true);
    setBalance((prev) => prev + 0.025);
    setAdModalOpen(false);
  };

  // High Upgrade Prices (Hard Tokenomics)
  const buyMultitap = () => {
    const cost = multitapLevel * 10.0; // High Cost (10.0 LUMI)
    if (balance >= cost) {
      setBalance((prev) => prev - cost);
      setTapValue((prev) => prev + 0.001);
      setMultitapLevel((prev) => prev + 1);
    }
  };

  const buyEnergyUpgrade = () => {
    const cost = energyLevel * 15.0; // High Cost (15.0 LUMI)
    if (balance >= cost) {
      setBalance((prev) => prev - cost);
      setEnergyLevel((prev) => prev + 1);
    }
  };

  const buyAutoBot = () => {
    const cost = 50.0; // High Cost (50.0 LUMI)
    if (balance >= cost && !autoBotActive) {
      setBalance((prev) => prev - cost);
      setAutoBotActive(true);
    }
  };

  // Format Seconds to H:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#F5F0EB] font-sans relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* Background Particle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#8B5CF6]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0E]/80 backdrop-blur-xl border-b border-[#D4AF37]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-[#9CA3AF] hover:text-[#E6C762] hover:border-[#D4AF37]/50 transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[#E6C762]" />
            <span>Home</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <Link href="/store/handwork" className="text-xs text-[#9CA3AF] hover:text-[#E6C762] transition-colors">
            ← Store
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-lg">👁️</span>
            <h1 className="text-base font-serif font-bold text-[#F5F0EB] tracking-wider">
              Illuminati Coin <span className="text-[#E6C762] text-xs font-mono">$ILLUM</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#E6C762]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setTonModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#C5A059]/20 border border-[#D4AF37]/40 text-[#E6C762] text-xs font-bold flex items-center gap-1.5 hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{tonAddress ? `${tonAddress.slice(0, 4)}...${tonAddress.slice(-4)}` : 'Connect TON'}</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Launch Guide</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6 relative z-10 pb-28">

        {/* TOP SPONSORED ADSENSE SLOT */}
        <div className="w-full p-2.5 rounded-2xl bg-black/60 border border-[#D4AF37]/30 text-center space-y-1 shadow-lg overflow-hidden">
          <span className="text-[9px] font-mono text-[#9CA3AF] uppercase tracking-widest block">
            — SPONSORED ADVERTISEMENT —
          </span>
          <div className="h-12 bg-white/5 rounded-xl flex items-center justify-center text-xs text-[#9CA3AF]">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '50px' }}
              data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXX"}
              data-ad-slot="1234567890"
            />
            <span className="text-[10px] text-[#E6C762] flex items-center gap-1">
              <Tv className="w-3.5 h-3.5" /> Google AdSense Active
            </span>
          </div>
        </div>

        {/* MINING BALANCE HEADER */}
        <div className="text-center space-y-1 py-2">
          <span className="text-xs uppercase tracking-widest text-[#9CA3AF] font-bold">
            Sacred Mining Balance
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl sm:text-5xl font-bold font-serif text-[#F5F0EB] tracking-tight">
              {balance.toFixed(4)}
            </span>
            <span className="text-xl font-bold text-[#E6C762] font-mono">$ILLUM</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[10px] px-3 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E6C762] border border-[#D4AF37]/30 uppercase font-bold">
              Rate: ULTRA-LOW (+{tapValue.toFixed(4)}/tap)
            </span>
            <span className="text-[10px] px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase font-bold">
              30s Session • 3h Cooldown
            </span>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl bg-[#0D0D12] border border-white/10 text-[11px] font-bold text-[#9CA3AF]">
          <button
            onClick={() => setActiveTab('mine')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'mine' ? 'bg-[#D4AF37] text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            🔨 Mine
          </button>
          <button
            onClick={() => setActiveTab('boost')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'boost' ? 'bg-[#D4AF37] text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            ⚡ Boost
          </button>
          <button
            onClick={() => setActiveTab('refer')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'refer' ? 'bg-[#D4AF37] text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            👥 Refer
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'tasks' ? 'bg-[#D4AF37] text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            📺 Tasks
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-2 rounded-xl transition-all ${
              activeTab === 'roadmap' ? 'bg-[#D4AF37] text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            🗺️ Launch
          </button>
        </div>

        {/* TAB 1: 30-SECOND TAP MINING & 3-HOUR COOLDOWN */}
        {activeTab === 'mine' && (
          <div className="space-y-6">

            {/* STATUS BANNER */}
            {sessionActive ? (
              <div className="p-4 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] text-center space-y-1 shadow-xl">
                <span className="text-xs font-bold text-[#E6C762] uppercase tracking-widest block flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D4AF37] animate-bounce" />
                  30s MINING SPRINT ACTIVE! TAP FAST!
                </span>
                <span className="text-3xl font-bold font-mono text-white block">
                  00:{sessionTimeLeft.toString().padStart(2, '0')}
                </span>
              </div>
            ) : cooldownTimeLeft > 0 ? (
              <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/15 text-center space-y-2 shadow-xl">
                <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>3-Hour Mining Cooldown Active</span>
                </div>
                <div className="text-2xl font-bold font-mono text-[#F5F0EB]">
                  {formatTime(cooldownTimeLeft)}
                </div>
                <button
                  onClick={handleWatchAd}
                  className="text-[11px] text-[#E6C762] font-bold underline flex items-center justify-center gap-1 mx-auto hover:text-white"
                >
                  <Tv className="w-3.5 h-3.5" /> Watch Sponsor Ad to Reduce 1 Hour
                </button>
              </div>
            ) : (
              <button
                onClick={startMiningSession}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E6C762] to-[#C5A059] text-black font-bold text-sm uppercase tracking-widest shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>Start 30s Tap Mining Session</span>
              </button>
            )}

            {/* 3D TAP COIN */}
            <div className="relative py-4 flex flex-col items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-[#8B5CF6]/20 to-transparent blur-xl pointer-events-none animate-pulse" />

              <motion.div
                whileHover={sessionActive ? { scale: 1.03 } : {}}
                whileTap={sessionActive ? { scale: 0.92 } : {}}
                onClick={handleTap}
                onTouchStart={handleTap}
                className={`relative w-64 h-64 rounded-full border-4 shadow-2xl flex flex-col items-center justify-center select-none touch-none overflow-hidden transition-all ${
                  sessionActive
                    ? 'border-[#D4AF37] bg-gradient-to-b from-[#1A1A24] to-[#050508] shadow-[0_0_50px_rgba(212,175,55,0.6)] cursor-pointer'
                    : 'border-white/20 bg-[#070709] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="absolute inset-2 rounded-full border border-[#D4AF37]/30 bg-gradient-to-br from-black/80 via-[#0A0A0E] to-[#121217] flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <motion.div
                      animate={isTapping ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.1 }}
                      className="text-7xl select-none filter drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                    >
                      🔺
                    </motion.div>
                    <span className="text-3xl block select-none">👁️</span>
                    <span className="text-[10px] font-serif font-bold text-[#E6C762] tracking-widest block uppercase">
                      {sessionActive ? 'Tap To Mine' : 'Locked'}
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {particles.map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 1, y: p.y - 20, scale: 0.8 }}
                      animate={{ opacity: 0, y: p.y - 90, scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      onAnimationComplete={() => removeParticle(p.id)}
                      className="absolute font-serif font-bold text-lg text-[#E6C762] pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,1)] z-30"
                      style={{ left: p.x - 15, top: p.y }}
                    >
                      {p.val}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>

              <span className="text-[10px] text-[#9CA3AF] mt-3 font-mono">
                {sessionActive
                  ? '⚡ Session Active: Tap fast before 30s timer ends!'
                  : '⏳ Next mining sprint unlocks after 3-hour cooldown.'}
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: HIGH COST BOOSTERS */}
        {activeTab === 'boost' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold font-serif text-[#F5F0EB]">High-Tier Token Boosters</h3>
              <span className="text-[10px] text-[#E6C762] font-mono">Tokenomics: Premium Pricing</span>
            </div>

            {/* Multitap */}
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5F0EB] block">Micro Multitap (Lvl {multitapLevel})</span>
                <span className="text-[10px] text-[#9CA3AF]">Adds +0.001 per tap</span>
              </div>
              <button
                onClick={buyMultitap}
                disabled={balance < multitapLevel * 10.0}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] disabled:bg-white/10 disabled:text-[#9CA3AF] text-black font-bold text-xs"
              >
                {(multitapLevel * 10.0).toFixed(1)} $ILLUM
              </button>
            </div>

            {/* Energy Expansion */}
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5F0EB] block">Sprint Time Extender (Lvl {energyLevel})</span>
                <span className="text-[10px] text-[#9CA3AF]">Adds +5 seconds to mining sprint</span>
              </div>
              <button
                onClick={buyEnergyUpgrade}
                disabled={balance < energyLevel * 15.0}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] disabled:bg-white/10 disabled:text-[#9CA3AF] text-black font-bold text-xs"
              >
                {(energyLevel * 15.0).toFixed(1)} $ILLUM
              </button>
            </div>

            {/* Auto Bot */}
            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5F0EB] block flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#E6C762]" /> Auto-Miner Bot
                </span>
                <span className="text-[10px] text-[#9CA3AF]">Mines +0.001 $ILLUM per 30s automatically</span>
              </div>
              <button
                onClick={buyAutoBot}
                disabled={autoBotActive || balance < 50.0}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] disabled:bg-white/10 disabled:text-[#9CA3AF] text-black font-bold text-xs"
              >
                {autoBotActive ? 'Active' : '50.0 $ILLUM'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: REFERRALS */}
        {activeTab === 'refer' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12121A] to-[#1A1A24] border border-[#D4AF37]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] flex items-center justify-center mx-auto text-xl font-bold">
                👥
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F5F0EB]">Invite Friends & Earn +0.25 $ILLUM</h3>
              <p className="text-xs text-[#9CA3AF]">
                For every friend who joins via your link, you both get **+0.25 $ILLUM**!
              </p>
              
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#E6C762] truncate">
                  https://cortestack.com/coin?ref={referralCode}
                </span>
                <button
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs shrink-0 flex items-center gap-1"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-serif text-[#F5F0EB]">Sponsor & Social Tasks</h3>

            <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#F5F0EB] block">Watch Sponsor Video Ad</span>
                <span className="text-[10px] text-[#E6C762] font-semibold">-1 Hr Cooldown & +0.025 $ILLUM</span>
              </div>
              <button
                onClick={handleWatchAd}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs flex items-center gap-1"
              >
                <Tv className="w-3.5 h-3.5" /> Watch
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: REAL TOKEN LAUNCH ROADMAP & OPERATIONAL GUIDE */}
        {activeTab === 'roadmap' && (
          <div className="space-y-5 text-xs text-[#9CA3AF]">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12121A] to-[#1A1A24] border border-[#D4AF37]/50 space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#E6C762]" />
                <h3 className="text-base font-bold font-serif text-[#F5F0EB]">
                  Real Crypto Token Launch Playbook
                </h3>
              </div>
              <p className="leading-relaxed">
                Agar aap is **Illuminati Token ($ILLUM)** ko TON, Solana ya EVM blockchain par real crypto launching karna chahte hain, toh ye **Daily Master Operational Plan** follow karein:
              </p>
            </div>

            {/* Step-by-Step Playbook */}
            <div className="space-y-4">
              
              {/* Phase 1 */}
              <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-[#E6C762] uppercase tracking-wider block">
                  Phase 1: Tokenomics & Smart Contract Setup
                </span>
                <h4 className="text-sm font-bold text-[#F5F0EB]">1. Deploy Smart Contract on TON / Solana / EVM</h4>
                <p className="leading-relaxed">
                  - Create **Smart Contract** (Total Supply: 1,000,000,000 $ILLUM).\n- 50% Community Tap Mining, 20% Liquidity Pool (DEX), 15% Staking, 15% Marketing & Team.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-[#E6C762] uppercase tracking-wider block">
                  Phase 2: Telegram Mini-App & Web Viral Growth
                </span>
                <h4 className="text-sm font-bold text-[#F5F0EB]">2. Telegram Mini-App Integration</h4>
                <p className="leading-relaxed">
                  - Connect Web app to Telegram `@IlluminatiCoinBot`.\n- Users share referral links on WhatsApp/Telegram groups for exponential 10x viral growth.
                </p>
              </div>

              {/* Phase 3 */}
              <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-[#E6C762] uppercase tracking-wider block">
                  Phase 3: Daily Monetization & Ad Revenue
                </span>
                <h4 className="text-sm font-bold text-[#F5F0EB]">3. Daily Owner Operations</h4>
                <p className="leading-relaxed">
                  - **Google AdSense + Telegram Ads**: Generate daily ad revenue from users watching ads to reduce 3-hour cooldown.\n- Use 40% of ad revenue to buy back & burn $ILLUM tokens to pump token price!
                </p>
              </div>

              {/* Phase 4 */}
              <div className="p-4 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-[#E6C762] uppercase tracking-wider block">
                  Phase 4: DEX Listing & Airdrop
                </span>
                <h4 className="text-sm font-bold text-[#F5F0EB]">4. DEX Listing (DeDust / Raydium / Uniswap)</h4>
                <p className="leading-relaxed">
                  - Add Liquidity on DEX.\n- Snapshot mined balances and distribute real Airdrop tokens to Web3 wallet holders!
                </p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* AD MODAL */}
      <AnimatePresence>
        {adModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-[#0D0D12] border border-[#D4AF37]/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6C762] flex items-center justify-center mx-auto text-xl font-bold">
                📺
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-[#F5F0EB]">Sponsor Video Advertisement</h3>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Watch ad to **reduce 1 Hour of Cooldown & earn +0.025 $ILLUM**!
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center space-y-2">
                <Tv className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                {!adRewardClaimed ? (
                  <span className="text-xs text-[#E6C762] font-mono">
                    Ad Playing... {adTimer}s
                  </span>
                ) : (
                  <span className="text-xs text-green-400 font-bold">
                    ✅ Ad Completed!
                  </span>
                )}
              </div>

              {adRewardClaimed ? (
                <button
                  onClick={handleClaimAdReward}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Claim & Reduce 1 Hr Cooldown
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-white/10 text-[#9CA3AF] font-bold text-xs uppercase"
                >
                  Watching Ad... ({adTimer}s)
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TON WEB3 WALLET CONNECT MODAL */}
      <AnimatePresence>
        {tonModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-[#0D0D12] border border-[#D4AF37]/40 rounded-3xl p-6 text-left space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#E6C762]" />
                  <h3 className="text-base font-bold font-serif text-[#F5F0EB]">Connect TON Web3 Wallet</h3>
                </div>
                <button onClick={() => setTonModalOpen(false)} className="text-[#9CA3AF] hover:text-white">✕</button>
              </div>

              {!tonAddress ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#9CA3AF]">
                    Connect your TON (The Open Network) decentralized crypto wallet to claim Airdrops and stake $ILLUM tokens.
                  </p>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        const fakeAddr = 'EQB3n5vL9kL_' + Math.random().toString(36).substring(2, 10);
                        setTonAddress(fakeAddr);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-bold text-[#F5F0EB] flex items-center justify-between transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">💎</span> Tonkeeper Wallet
                      </span>
                      <span className="text-[10px] text-[#E6C762]">Connect</span>
                    </button>

                    <button
                      onClick={() => {
                        const fakeAddr = 'EQA7k2m9x1_' + Math.random().toString(36).substring(2, 10);
                        setTonAddress(fakeAddr);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-bold text-[#F5F0EB] flex items-center justify-between transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">📲</span> Telegram @wallet
                      </span>
                      <span className="text-[10px] text-[#E6C762]">Connect</span>
                    </button>

                    <button
                      onClick={() => {
                        const fakeAddr = 'EQC9r4t2m5_' + Math.random().toString(36).substring(2, 10);
                        setTonAddress(fakeAddr);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-bold text-[#F5F0EB] flex items-center justify-between transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">🔷</span> MyTonWallet / OpenMask
                      </span>
                      <span className="text-[10px] text-[#E6C762]">Connect</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-[10px] text-[#9CA3AF] space-y-1">
                    <span className="block font-mono text-[#E6C762]">Manifest: {tonManifestUrl}</span>
                    <span className="block font-mono truncate">Jetton: {illumContractAddress}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-2">
                    <span className="text-[10px] text-[#9CA3AF] uppercase block font-bold">Connected Wallet</span>
                    <span className="font-mono text-[#E6C762] text-xs font-bold block truncate">{tonAddress}</span>
                    <span className="text-[10px] text-[#25D366] block">✓ Connected via TonConnect Protocol</span>
                  </div>

                  <button
                    onClick={() => setTonAddress('')}
                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 font-bold text-xs"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
