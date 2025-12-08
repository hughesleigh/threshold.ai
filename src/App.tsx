import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  LayoutGrid, 
  FileText, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Search, 
  AlertCircle, 
  X, 
  Play, 
  MousePointer2, 
  Image as ImageIcon, 
  Upload, 
  Sparkles, 
  Zap, 
  Layout as LayoutIcon, 
  Presentation, 
  BookOpen, 
  MessageSquare, 
  Trash2, 
  Archive, 
  Edit2, 
  FileBox, 
  GraduationCap, 
  Wrench, 
  Send, 
  FolderOpen, 
  File, 
  Grid, 
  BarChart3, 
  Eye, 
  BrainCircuit, 
  Target, 
  CornerUpLeft, 
  RefreshCcw,
  UserPlus,
  ArrowUp
} from 'lucide-react';
import { cn } from "@/components/ui/utils";

// --- TYPES ---

type View = 'HOME' | 'LOGIN' | 'WELCOME' | 'DASHBOARD' | 'PROJECT_HUB' | 'PROJECT_WIZARD' | 'PROTOCOLS' | 'RESOURCES' | 'MOODBOARD';
type Stage = 1 | 2 | 3 | 4 | 5;
type ProjectStatus = 'ACTIVE' | 'ARCHIVED';

interface Project {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: ProjectStatus;
  lastEdited: string;
}

// --- MOCK DATA ---

const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Pelvic Door Identity', type: 'BRAND_IDENTITY', progress: 40, status: 'ACTIVE', lastEdited: '2h ago' },
  { id: '2', name: 'Nexus Architecture', type: 'WEB_DESIGN', progress: 20, status: 'ACTIVE', lastEdited: '1d ago' },
  { id: '3', name: 'Legacy Banking Rebrand', type: 'BRAND_IDENTITY', progress: 100, status: 'ARCHIVED', lastEdited: '3mo ago' },
];

// --- HELPER COMPONENTS ---

const SpecBlock = ({ 
  id, 
  label, 
  placeholder, 
  hint, 
  height = "h-32",
  value,
  onChange
}: { 
  id: string, 
  label: string, 
  placeholder: string, 
  hint?: string,
  height?: string,
  value?: string,
  onChange?: (val: string) => void
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); 
  };

  return (
    <div className="border border-white/10 p-6 rounded-xl bg-white/5 relative group transition-all hover:border-white/20">
      <div className={cn("absolute top-0 left-0 w-1 h-full rounded-l-xl transition-all duration-500", isSaved ? "bg-green-500" : "bg-blue-500 opacity-50 group-hover:opacity-100")}></div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">{label}</h3>
        <div className="font-mono text-[10px] text-blue-400 uppercase tracking-wider">
          [ {id} ]
        </div>
      </div>
      
      <div className="relative">
        <textarea 
          className={`w-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-light text-white/90 focus:border-blue-500 outline-none transition-colors resize-none ${height}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        
        <div className="absolute right-2 bottom-2 flex gap-2">
          <button 
            onClick={handleSave}
            className={cn(
              "flex items-center gap-2 text-[10px] font-mono border px-3 py-1.5 rounded transition-all",
              isSaved 
                ? "bg-green-500/20 border-green-500 text-green-400" 
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            {isSaved ? <Check className="w-3 h-3" /> : <CornerUpLeft className="w-3 h-3" />}
            {isSaved ? "SAVED" : "ENTER"}
          </button>

          <button className="flex items-center gap-2 text-[10px] font-mono bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded text-blue-400 hover:text-blue-300 transition-colors">
            <Sparkles className="w-3 h-3" /> AI_ASSIST
          </button>
        </div>
      </div>
      
      {hint && (
        <div className="mt-3 flex items-start gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <Activity className="w-3 h-3 text-[#FF7F50] mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-white/60 font-mono leading-tight">{hint}</p>
        </div>
      )}
    </div>
  );
};

// --- GLOBAL LAYOUT WRAPPER ---
const Layout = ({ children, currentView, onViewChange }: { children: React.ReactNode, currentView: View, onViewChange: (v: View) => void }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isLoggedInContext = ['DASHBOARD', 'PROJECT_WIZARD', 'PROJECT_HUB', 'MOODBOARD', 'WELCOME'].includes(currentView);

  // Scroll Reset Logic
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Scroll Listener for "Back to Top" arrow
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#FF7F50]/30 overflow-x-hidden font-sans flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 h-20">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewChange('HOME')}>
          <div className="grid grid-cols-3 gap-[3px]">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight">THRESHOLD</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 font-mono text-xs text-white/60">
                <button onClick={() => onViewChange('HOME')} className={cn("hover:text-white transition-colors", currentView === 'HOME' && "text-white")}>HOME</button>
                <button onClick={() => onViewChange('PROTOCOLS')} className={cn("hover:text-white transition-colors", currentView === 'PROTOCOLS' && "text-white")}>HOW IT WORKS</button>
                <button onClick={() => onViewChange('RESOURCES')} className={cn("hover:text-white transition-colors", currentView === 'RESOURCES' && "text-white")}>RESOURCES</button>
                {isLoggedInContext && (
                    <button onClick={() => onViewChange('DASHBOARD')} className={cn("hover:text-white transition-colors font-bold", (currentView === 'DASHBOARD' || currentView === 'PROJECT_HUB' || currentView === 'MOODBOARD') && "text-[#FF7F50]")}>DASHBOARD</button>
                )}
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-6">
                {!isLoggedInContext && currentView !== 'LOGIN' && (
                    <button onClick={() => onViewChange('LOGIN')} className="font-mono text-xs px-4 py-2 border border-white/20 rounded-full text-white hover:border-[#FF7F50] hover:text-[#FF7F50] transition-colors flex items-center gap-2 group">
                    LOGIN / JOIN <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}

                {isLoggedInContext && (
                    <div className="flex items-center gap-2">
                        <div className="hidden md:block text-[10px] font-mono text-green-400 border border-green-900/50 bg-green-900/20 px-2 py-1 rounded">
                            AI_ASSISTANT: READY
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-mono text-xs font-bold ring-1 ring-white/20 cursor-pointer hover:ring-[#FF7F50] transition-all">
                        AH
                        </div>
                    </div>
                )}
            </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow">
        {children}
      </main>

      {/* STICKY SCROLL TO TOP */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-[#FF7F50] text-black rounded-full shadow-[0_0_20px_rgba(255,127,80,0.4)] hover:scale-110 transition-all animate-in fade-in zoom-in"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

       <footer className="relative z-10 border-t border-white/10 bg-[#020202] py-8 px-6 mt-auto">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-[#FF7F50]/20"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-white/40">
           <div className="mb-4 md:mb-0">
             © 2025 THRESHOLD
           </div>
           <div className="flex gap-6">
             <span>// STRATEGIC_FRAMEWORK: LOADED</span>
             <span>// LATENCY: 12ms</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

// 2. HOME VIEW (UPDATED COPY & SECTIONS)
const HomeView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-32 px-4">
      <div className="relative w-full max-w-3xl p-8 md:p-20 border border-white/10 rounded-3xl backdrop-blur-xl bg-white/5 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-[#FF7F50] opacity-70"></div>
        <div className="absolute top-4 left-4 text-white/20 text-xs">+</div>
        <div className="absolute top-4 right-4 text-white/20 text-xs">+</div>
        <div className="absolute bottom-4 left-4 text-white/20 text-xs">+</div>
        <div className="absolute bottom-4 right-4 text-white/20 text-xs">+</div>

        <div className="text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded text-[10px] font-mono tracking-widest text-[#FF7F50]/80 mb-2">
            // AI_ASSISTANT: READY
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white pb-2">
            Threshold.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto font-light leading-relaxed">
            The AI creative assistant for high-stakes <span className="text-white">creative</span> work. 
            Co-create strategic briefs, validate at critical checkpoints, and prevent generic outputs before they happen.
          </p>
          <div className="pt-8">
            <button 
              onClick={() => onNavigate('LOGIN')}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-widest border border-white/20 rounded hover:border-[#FF7F50]/50 transition-all duration-300 bg-black/20 hover:bg-[#FF7F50]/10 overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-[#FFAB85] transition-colors flex items-center gap-2">
                ENTER WORKSPACE <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-[#FF7F50]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* CLARITY SECTION: THE 3 PROCESS CARDS */}
      <div className="mt-20 max-w-5xl mx-auto text-center space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 hover:border-white/10 transition-colors text-left relative group">
                  <ShieldCheck className="w-8 h-8 text-[#FF7F50] mb-4" />
                  <h3 className="text-xl font-bold mb-2">1. Co-Create Your Brief</h3>
                  <p className="text-white/50 text-sm mb-4">Build strategic parameters with AI assistance. Define must-embody keywords and constraints. Lock in your framework.</p>
                  <div className="text-[10px] font-mono text-[#FF7F50] uppercase tracking-wider">⚡ Strategy Precedes Symbol</div>
              </div>
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 hover:border-white/10 transition-colors text-left relative group">
                  <Wrench className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">2. AI Explores, You Interpret</h3>
                  <p className="text-white/50 text-sm mb-4">AI extracts visual patterns. You interpret meaning and define territories. Checkpoints ensure outputs stay distinct.</p>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">⚡ AI expands data; humans expand meaning</div>
              </div>
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 hover:border-white/10 transition-colors text-left relative group">
                  <Lock className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">3. Gates Before Advancement</h3>
                  <p className="text-white/50 text-sm mb-4">Mandatory validation at five critical stages. Each gate must pass before work continues.</p>
                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">⚡ Human-in-the-Loop, not Human-in-the-Way</div>
              </div>
          </div>
      </div>

      {/* NEW SECTION: HOW IT ACTUALLY WORKS */}
      <div className="mt-32 max-w-4xl mx-auto border border-white/10 rounded-2xl bg-white/5 p-8 md:p-12">
          <div className="inline-flex items-center gap-2 text-[#FF7F50] font-mono text-xs mb-6">
              <Terminal className="w-3 h-3" />
              <span>// HOW_IT_ACTUALLY_WORKS</span>
          </div>
          <h2 className="text-3xl font-bold mb-8">From Brief to Deliverable</h2>
          
          <div className="space-y-8">
              <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-sm">1</div>
                  <div>
                      <h4 className="font-bold text-white mb-1">Strategic Foundation</h4>
                      <p className="text-white/60 text-sm">Upload your brief. AI extracts constraints and positioning. You validate parameters before generation begins.</p>
                  </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 ml-4"></div>
              
              <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400 text-sm">2</div>
                  <div>
                      <h4 className="font-bold text-white mb-1">Conceptual Development</h4>
                      <p className="text-white/60 text-sm">AI generates visual research. You interpret patterns and define creative direction.</p>
                  </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 ml-4"></div>

              <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF7F50]/20 flex items-center justify-center font-bold text-[#FF7F50] text-sm">3</div>
                  <div>
                      <h4 className="font-bold text-white mb-1">Design & Validation</h4>
                      <p className="text-white/60 text-sm">Assistant creates options. You validate concepts against brief requirements. Refine selected direction with AI support.</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="mt-32 max-w-5xl w-full border-t border-white/5 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 text-[#FF7F50] font-mono text-xs">
                    <Activity className="w-3 h-3" />
                    <span>// QUALITY_CONTROL_MONITOR</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Stop Generating Average.</h2>
                <p className="text-xl text-white/60 font-light leading-relaxed">
                    Standard AI makes everything look 'average' (the statistical mean). Threshold introduces strict rules—or <span className="text-white font-medium">strategic friction</span>—to force the AI to create something unique.
                </p>
                <div className="mt-4 text-white/80 font-medium">
                    The result? Work that's distinctly yours, executed at AI speed.
                </div>
            </div>

            <div className="relative h-[400px] rounded-2xl border border-white/10 overflow-hidden select-none group cursor-ew-resize shadow-2xl bg-black">
                <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl font-bold text-white/5 blur-sm tracking-tighter scale-110">AVERAGE</span>
                      </div>
                      <div className="absolute bottom-6 left-6 font-mono text-xs text-white/30">
                        [ STATUS: UNSTRUCTURED ]
                      </div>
                </div>

                <div 
                    className="absolute inset-0 bg-[#050505] border-r border-[#FF7F50] flex items-center justify-center overflow-hidden"
                    style={{ width: `${sliderVal}%` }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter whitespace-nowrap z-10">DISTINCT</span>
                    </div>
                    <div className="absolute bottom-6 right-6 font-mono text-xs text-[#FF7F50] bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-[#FF7F50]/20">
                        [ STATUS: VALIDATED ]
                    </div>
                </div>

                <div 
                    className="absolute top-0 bottom-0 w-1 bg-[#FF7F50] cursor-ew-resize shadow-[0_0_30px_#FF7F50]"
                    style={{ left: `${sliderVal}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FF7F50] rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
                        <MousePointer2 className="w-5 h-5 fill-current rotate-[-15deg]" />
                    </div>
                </div>

                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderVal} 
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

// 3. LOGIN VIEW (WITH ORANGE TOGGLES)
const LoginView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md p-10 border border-white/10 rounded-2xl backdrop-blur-xl bg-black/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-coral-500 opacity-80"></div>
        <div className="absolute top-4 left-4 text-white/20 text-xs">+</div>
        <div className="absolute top-4 right-4 text-white/20 text-xs">+</div>
        <div className="absolute bottom-4 left-4 text-white/20 text-[10px] font-mono">SECURE_CONNECTION</div>

        <div className="text-center mb-10">
          <div className="mx-auto mb-6 w-fit">
            <div className="grid grid-cols-3 gap-[3px]">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white/10 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? 'Create Account.' : 'Authenticate.'}
          </h1>
          <p className="font-mono text-xs text-[#FF7F50] mt-2">
            {isSignUp ? '// INITIALIZE_NEW_USER' : '// ENTER_CREDENTIALS'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block font-mono text-[10px] text-white/50 mb-1 tracking-wider uppercase">[ EMAIL_ID ]</label>
            <input type="email" className="w-full bg-white/5 border-b border-white/10 focus:border-blue-500 text-white px-3 py-3 outline-none transition-colors font-sans placeholder-white/20" placeholder="user@agency.com" />
          </div>
          <div className="group">
            <label className="block font-mono text-[10px] text-white/50 mb-1 tracking-wider uppercase">[ PASSWORD ]</label>
            <input type="password" className="w-full bg-white/5 border-b border-white/10 focus:border-[#FF7F50] text-white px-3 py-3 outline-none transition-colors font-sans placeholder-white/20" placeholder="••••••••" />
          </div>
          
          <button 
            onClick={() => onNavigate('WELCOME')} 
            className="w-full mt-4 py-3 border border-white/20 hover:border-[#FF7F50] text-white font-mono text-sm uppercase tracking-widest transition-all group relative overflow-hidden bg-white/5 hover:bg-[#FF7F50]/10"
          >
            <span className="relative z-10 group-hover:text-[#FFAB85]">
                {isSignUp ? 'Initialize Account ->' : 'Initiate Session ->'}
            </span>
          </button>

          <div className="text-center pt-4">
             <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-[#FF7F50] hover:text-[#FFAB85] transition-colors font-bold tracking-wide">
                {isSignUp ? 'Already have an account? Login' : 'Need an account? Create one'}
             </button>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-white/5 pt-4">
          <p className="font-mono text-[10px] text-white/30">&gt; SYSTEM_NOTE: DEMO_ENVIRONMENT_ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

// 3.5 WELCOME SPLASH VIEW
const WelcomeView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in zoom-in duration-700">
        
        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative group">
           <div className="absolute inset-0 bg-[#FF7F50]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <BrainCircuit className="w-8 h-8 text-white group-hover:text-[#FF7F50] transition-colors" />
        </div>

        <div className="space-y-4">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
             System Online.
           </h1>
           <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
             You have accessed <span className="text-white font-medium">Threshold</span>: The professional operating system for <span className="text-[#FF7F50]">AI-assisted design</span>.
           </p>
           <p className="text-sm text-white/40 font-mono">
             // PROTOCOL: HUMAN_LED_STRATEGY :: AI_POWERED_SPEED
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left py-8 border-y border-white/5">
           <div className="p-4 rounded bg-white/5 border border-white/5">
              <div className="text-[#FF7F50] mb-2"><ShieldCheck className="w-5 h-5"/></div>
              <h3 className="font-bold text-sm mb-1">Strategic Integrity</h3>
              <p className="text-xs text-white/50">Prevent generic AI slop by locking in your constraints first.</p>
           </div>
           <div className="p-4 rounded bg-white/5 border border-white/5">
              <div className="text-blue-400 mb-2"><Zap className="w-5 h-5"/></div>
              <h3 className="font-bold text-sm mb-1">Velocity</h3>
              <p className="text-xs text-white/50">Draft professional concepts in minutes, not days.</p>
           </div>
           <div className="p-4 rounded bg-white/5 border border-white/5">
              <div className="text-purple-400 mb-2"><Lock className="w-5 h-5"/></div>
              <h3 className="font-bold text-sm mb-1">Audit Trail</h3>
              <p className="text-xs text-white/50">Document every decision to defend your work to clients.</p>
           </div>
        </div>

        <button 
          onClick={() => onNavigate('DASHBOARD')}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest bg-[#FF7F50] text-black rounded hover:bg-[#FF7F50]/90 transition-all w-full md:w-auto"
        >
          <span className="flex items-center gap-2">
            Enter Workspace <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

// 4. UPDATED DASHBOARD VIEW (HERO LAYOUT WITH BOTTOM-RIGHT MENU)
const DashboardView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const heroMenuRef = useRef<HTMLDivElement>(null);
  
  const activeProject = INITIAL_PROJECTS[0];
  const otherProjects = INITIAL_PROJECTS.slice(1);

  // Close hero menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (heroMenuRef.current && !heroMenuRef.current.contains(event.target as Node)) {
        setShowHeroMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [heroMenuRef]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="font-mono text-xs text-blue-400 mb-2">// WELCOME_BACK :: [USER_ASH]</div>
          <h1 className="text-4xl font-bold">Mission Control</h1>
        </div>
        <button 
           onClick={() => setShowNewProjectModal(true)}
           className="flex items-center gap-2 px-4 py-2 bg-[#FF7F50] text-black text-xs font-bold font-mono rounded hover:bg-[#FF7F50]/90 transition-colors"
        >
           <Plus className="w-4 h-4" /> INITIALIZE_NEW
        </button>
      </div>

      {/* 1. HERO CARD (Focus Hierarchy) */}
      <div className="mb-12">
        <h2 className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Active Directive</h2>
        <div className="relative w-full p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-black group hover:border-[#FF7F50]/30 transition-all">
            
            {/* HERO MENU BUTTON (BOTTOM RIGHT) */}
            <div className="absolute bottom-6 right-6 z-20" ref={heroMenuRef}>
                <button 
                    onClick={() => setShowHeroMenu(!showHeroMenu)}
                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>
                {/* MENU OPENS UPWARDS */}
                {showHeroMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-[#0A0A0A] border border-white/20 rounded-lg p-1 shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Edit2 className="w-3 h-3"/> Edit Project</button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Archive className="w-3 h-3"/> Archive</button>
                        <div className="h-[1px] bg-white/10 my-1"></div>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-white/10 rounded"><Trash2 className="w-3 h-3"/> Delete</button>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <span className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono mb-3 border border-blue-500/20">
                        {activeProject.type}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">{activeProject.name}</h3>
                    <p className="text-white/60 text-sm max-w-lg">
                        Strategic brand identity development focusing on trauma-informed design principles.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-[#FF7F50]">{activeProject.progress}%</div>
                    <div className="text-[10px] font-mono text-white/40">COMPLETION_RATE</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-gradient-to-r from-blue-500 to-[#FF7F50]" style={{ width: `${activeProject.progress}%` }}></div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => onNavigate('PROJECT_HUB')}
                    className="px-6 py-3 bg-white text-black font-bold text-sm rounded hover:bg-white/90 transition-colors flex items-center gap-2"
                >
                    CONTINUE WORKFLOW <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-white/40">
                    LAST_EDIT :: {activeProject.lastEdited}
                </div>
            </div>
        </div>
    </div>

      {/* 2. SECONDARY LIST (Reduced Visual Noise) */}
      <div>
        <h2 className="text-xs font-mono text-white/40 mb-4 uppercase tracking-widest">Project Archive</h2>
        <div className="grid gap-4">
            {otherProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${p.status === 'ACTIVE' ? 'bg-green-500' : 'bg-white/20'}`}></div>
                        <div>
                            <h4 className="font-bold text-white group-hover:text-[#FF7F50] transition-colors">{p.name}</h4>
                            <div className="text-[10px] font-mono text-white/40">{p.type} • Last edited {p.lastEdited}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-white/40">{p.progress}%</span>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {showNewProjectModal && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative">
                  <button onClick={() => setShowNewProjectModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
                  <div className="font-mono text-xs text-[#FF7F50] mb-4">// START_NEW_PROJECT</div>
                  <h2 className="text-3xl font-bold mb-8">Choose a Project Type</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                          { id: '01', title: 'Logo Design', desc: 'Create a distinctive brand mark with strategic clarity.' },
                          { id: '02', title: 'Brand Identity', desc: 'Develop a comprehensive brand system with guidelines.' },
                          { id: '03', title: 'Web Design', desc: 'Design comprehensive website experiences.', locked: true },
                          { id: '04', title: 'Social Content', desc: 'Create engaging social media campaigns.', locked: true },
                          { id: '05', title: 'Publication', desc: 'Design books, magazines, and reports.', locked: true },
                          { id: '06', title: 'Copywriting', desc: 'Craft compelling brand messaging.', locked: true },
                      ].map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => {
                                if(!item.locked) {
                                    setShowNewProjectModal(false);
                                    onNavigate('PROJECT_WIZARD');
                                }
                            }}
                            className={cn(
                                "p-6 border rounded-xl transition-all relative group",
                                item.locked ? "border-white/5 opacity-50 cursor-not-allowed" : "border-white/10 bg-white/5 hover:border-white/30 cursor-pointer hover:bg-white/10"
                            )}
                          >
                              <div className="font-mono text-[10px] text-[#FF7F50] mb-3">{item.id} / PROJECT TYPE</div>
                              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                              <p className="text-sm text-white/50 mb-6">{item.desc}</p>
                              {item.locked ? (
                                  <div className="inline-block border border-white/10 px-2 py-1 rounded text-[10px] font-mono">COMING SOON</div>
                              ) : (
                                  <div className="flex items-center gap-2 text-sm font-medium group-hover:text-[#FF7F50] transition-colors">
                                      <Plus className="w-4 h-4" /> NEW PROJECT
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

// 6. PROTOCOLS VIEW (REWRITTEN FOR CLARITY WITH 5 GATES + GRID PRINCIPLES)
const ProtocolsView = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 border-b border-white/10 pb-8">
            <div className="font-mono text-xs text-[#FF7F50] mb-2">// HOW_IT_WORKS</div>
            <h1 className="text-4xl font-bold mb-4">AI Speed + Human Oversight</h1>
            <p className="text-white/60 font-light text-lg mb-8">
                Threshold is an AI design assistant with mandatory quality control. You set the creative strategy, the AI executes within those boundaries, and built-in validation gates ensure outputs match your brief.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div>
                     <h3 className="font-bold text-white mb-2">Why Standard AI Fails</h3>
                     <p className="text-sm text-white/60 leading-relaxed">
                         Generative AI models default to the statistical mean—creating "average" work by design. 
                         Without guidance, this leads to brand homogeneity and generic logos.
                     </p>
                 </div>
                 <div>
                     <h3 className="font-bold text-white mb-2">The Threshold Solution</h3>
                     <p className="text-sm text-white/60 leading-relaxed">
                         We introduce intentional pauses at decision points where meaning matters most. 
                         By separating pattern recognition (AI) from strategy (Human), we preserve creative integrity.
                     </p>
                 </div>
            </div>
        </div>

        {/* --- THE 5 GATES --- */}
        <div className="mb-20 border border-white/10 rounded-xl bg-white/5 p-8">
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-[#FF7F50]" />
                <h2 className="text-2xl font-bold">The Five Validation Gates</h2>
            </div>
            <p className="text-white/60 mb-8 max-w-2xl">
                Professional creative workflows follow a universal pattern validated across leading agencies (IDEO, Pentagram, Landor, Wolff Olins). Threshold operationalizes this through five mandatory checkpoints:
            </p>
            
            <div className="grid gap-6">
                {[
                    { id: 1, title: "Strategic Foundation", desc: "Co-create brief parameters with AI assistance. Define audience, constraints, and must-embody/must-avoid keywords. Lock in before generation begins." },
                    { id: 2, title: "Conceptual Clarity", desc: "AI extracts visual patterns (2A). You interpret meanings and define symbolic territories (2B—human-only). Prevents LLM semiotic collapse." },
                    { id: 3, title: "Design Integrity", desc: "Validate concepts against strategic alignment, distinctiveness, emotional accuracy, and technical quality. Minor refinements loop to iteration; major failures return to concept generation." },
                    { id: 4, title: "Final Validation", desc: "Professional responsibility check. Could you defend this to the client? No hallucinated facts, copyright violations, or unsupported claims." },
                    { id: 5, title: "Implementation Readiness", desc: "Comprehensive technical delivery ensures consistent execution across all media. All file formats, color models, variations, and usage guidelines prepared for real-world implementation." }
                ].map((gate) => (
                    <div key={gate.id} className="flex gap-4 p-4 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/5 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#FF7F50]/20 text-[#FF7F50] rounded-full flex items-center justify-center font-bold text-sm border border-[#FF7F50]/30">
                            {gate.id}
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">Gate {gate.id}: {gate.title}</h4>
                            <p className="text-sm text-white/50 leading-relaxed">{gate.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- OUR CORE PRINCIPLES (GRID) --- */}
        <div className="space-y-8">
            <h3 className="text-2xl font-bold">Our Core Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { 
                        id: '01', 
                        title: 'STRATEGY PRECEDES SYMBOL', 
                        desc: 'Don’t guess. Define the creative rules before the AI assistant generates anything. We don’t prompt into the void; we prompt into a framework.' 
                    },
                    { 
                        id: '02', 
                        title: 'DEFINE BOUNDARIES FIRST', 
                        desc: 'Great design is about what you leave out. We block generic AI defaults upfront, forcing the assistant to explore only within your defined creative territory.' 
                    },
                    { 
                        id: '03', 
                        title: 'QUALITY CONTROL IS MANDATORY', 
                        desc: 'Speed without validation is risky. Built-in "Gates" force you to pause and verify AI outputs match your strategy before moving to the next stage.' 
                    },
                    { 
                        id: '04', 
                        title: 'TECHNICAL DELIVERY ENSURES LONGEVITY', 
                        desc: 'Beautiful concepts fail without proper technical execution. We mandate comprehensive file delivery: 10+ formats across 4 color models with all required variations. Built for real-world use.' 
                    }
                ].map((p) => (
                    <div key={p.id} className="p-6 border border-white/10 rounded-xl bg-white/5 hover:border-white/20 transition-colors group">
                        <div className="font-mono text-xl text-white/20 group-hover:text-[#FF7F50] transition-colors mb-4">{p.id}</div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors text-white/90">{p.title}</h3>
                        <p className="text-white/50 leading-relaxed text-sm">{p.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

// 7. RESOURCES VIEW (Real Content)
const ResourcesView = () => {
    // Helper to scroll to section
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 relative">
            
            {/* Header */}
            <div className="mb-8 border-b border-white/10 pb-8">
                <div className="font-mono text-xs text-[#FF7F50] mb-2">// KNOWLEDGE_BASE</div>
                <h1 className="text-4xl font-bold mb-4">Resources</h1>
                <p className="text-white/60 font-light text-lg">
                    Tools, templates, and guides to help you implement the Threshold Method in your creative practice.
                </p>
            </div>

            {/* STICKY SUB-NAV (Horizontal Pill Menu) */}
            <div className="sticky top-24 z-40 bg-[#050505]/90 backdrop-blur-md border-y border-white/10 py-3 mb-12 flex gap-6 overflow-x-auto no-scrollbar items-center">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mr-2">JUMP TO:</span>
                <button onClick={() => scrollTo('downloads')} className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF7F50] hover:text-[#FF7F50] transition-all whitespace-nowrap flex items-center gap-2 bg-white/5">
                    <Download className="w-3 h-3" /> DOWNLOADS
                </button>
                <button onClick={() => scrollTo('learning')} className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF7F50] hover:text-[#FF7F50] transition-all whitespace-nowrap flex items-center gap-2 bg-white/5">
                    <BookOpen className="w-3 h-3" /> GUIDES
                </button>
                <button onClick={() => scrollTo('tools')} className="font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF7F50] hover:text-[#FF7F50] transition-all whitespace-nowrap flex items-center gap-2 bg-white/5">
                    <Wrench className="w-3 h-3" /> TOOLBELT
                </button>
            </div>

            {/* Templates Section */}
            <div id="downloads" className="mb-24 scroll-mt-40">
                <div className="flex items-center gap-2 mb-6 text-white/40 uppercase tracking-widest font-mono text-xs">
                    <FileBox className="w-4 h-4" /> Downloads
                </div>
                <h2 className="text-2xl font-bold mb-6">Templates & Downloads</h2>
                <div className="space-y-4">
                    {[
                        { title: 'Strategic Brief Template', desc: 'Complete fillable PDF for offline strategic brief completion.', type: 'PDF' },
                        { title: 'Project SOP Template', desc: 'Standard Operating Procedure for agency integration.', type: 'DOCX' },
                        { title: 'Concept Evaluation Rubric', desc: 'Scoring framework for objective concept evaluation.', type: 'PDF' },
                        { title: 'Project Timeline Template', desc: 'Excel template with recommended threshold timelines.', type: 'XLSX' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                            <div>
                                <h3 className="font-bold text-white group-hover:text-[#FF7F50] transition-colors">{item.title}</h3>
                                <p className="text-sm text-white/40">{item.desc}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-[10px] text-white/30">{item.type}</span>
                                <Download className="w-4 h-4 text-white/40 group-hover:text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Section */}
            <div id="learning" className="mb-24 scroll-mt-40">
                <div className="flex items-center gap-2 mb-6 text-white/40 uppercase tracking-widest font-mono text-xs">
                    <GraduationCap className="w-4 h-4" /> Learning
                </div>
                <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                <div className="grid gap-6">
                    <div className="border border-white/10 p-6 rounded-xl bg-white/5 hover:border-white/20 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                            <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Best Practices Guide</h3>
                        <p className="text-sm text-white/60 mb-4">Learn how to write effective must-embody and must-avoid keywords, craft strategic prompts, and evaluate AI outputs against your brief.</p>
                        <button className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-2">READ GUIDE <ArrowRight className="w-3 h-3" /></button>
                    </div>
                    
                    <div className="border border-white/10 p-6 rounded-xl bg-white/5 hover:border-white/20 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Implementation Checklist</h3>
                        <p className="text-sm text-white/60 mb-4">Step-by-step checklist for integrating Threshold into your existing workflow. Covers team onboarding, client communication, and quality control.</p>
                        <button className="text-xs font-mono text-purple-400 hover:text-white flex items-center gap-2">DOWNLOAD CHECKLIST <ArrowRight className="w-3 h-3" /></button>
                    </div>
                </div>
            </div>

            {/* AI Tools Section */}
            <div id="tools" className="mb-24 scroll-mt-40">
                <div className="flex items-center gap-2 mb-6 text-white/40 uppercase tracking-widest font-mono text-xs">
                    <Wrench className="w-4 h-4" /> Toolbelt
                </div>
                <h2 className="text-2xl font-bold mb-6">Recommended AI Tools</h2>
                <div className="grid gap-4">
                    {[
                        { name: 'Claude', desc: 'Strategic copywriting, concept development, and design rationale.' },
                        { name: 'ChatGPT', desc: 'Brainstorming, brief refinement, and presentation outlines.' },
                        { name: 'Gamma', desc: 'AI-powered presentation builder for stakeholder presentations.' },
                        { name: 'NotebookLM', desc: 'Generate study guides, FAQs, and presentation notes from your brief.' },
                        { name: 'Midjourney', desc: 'Visual concept generation and stylistically aligned imagery.' },
                        { name: 'Figma AI', desc: 'AI-powered design assistance for rapid prototyping.' }
                    ].map((tool, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                            <div className="flex items-baseline gap-4">
                                <h3 className="font-bold text-white w-24">{tool.name}</h3>
                                <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{tool.desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white -rotate-45" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('HOME');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'HOME' && <HomeView onNavigate={setCurrentView} />}
      {currentView === 'LOGIN' && <LoginView onNavigate={setCurrentView} />}
      {currentView === 'WELCOME' && <WelcomeView onNavigate={setCurrentView} />}
      {currentView === 'DASHBOARD' && <DashboardView onNavigate={setCurrentView} />}
      {currentView === 'PROJECT_HUB' && <ProjectHubView onNavigate={setCurrentView} />}
      {currentView === 'PROJECT_WIZARD' && <ProjectWizard onNavigate={setCurrentView} />}
      {currentView === 'PROTOCOLS' && <ProtocolsView />}
      {currentView === 'RESOURCES' && <ResourcesView />}
      {currentView === 'MOODBOARD' && <MoodboardView onNavigate={setCurrentView} />}
    </Layout>
  );
}
 
