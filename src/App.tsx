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
  RefreshCcw
} from 'lucide-react';
import { cn } from "@/components/ui/utils";

// --- TYPES ---

type View = 'HOME' | 'LOGIN' | 'DASHBOARD' | 'PROJECT_HUB' | 'PROJECT_WIZARD' | 'PROTOCOLS' | 'RESOURCES' | 'MOODBOARD';
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
  height = "h-32" 
}: { 
  id: string, 
  label: string, 
  placeholder: string, 
  hint?: string,
  height?: string 
}) => (
  <div className="border border-white/10 p-6 rounded-xl bg-white/5 relative group transition-all hover:border-white/20">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <div className="font-mono text-[10px] text-blue-400 mb-2 uppercase tracking-wider">
      [ {id} ]
    </div>
    <h3 className="text-lg font-bold mb-4 text-white">{label}</h3>
    
    <div className="relative">
      <textarea 
        className={`w-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-light text-white/90 focus:border-blue-500 outline-none transition-colors resize-none ${height}`}
        placeholder={placeholder}
      />
      <div className="absolute right-2 bottom-2">
        <button className="flex items-center gap-2 text-[10px] font-mono bg-white/5 hover:bg-blue-500/20 border border-white/10 px-2 py-1 rounded text-white/60 hover:text-blue-300 transition-colors">
          <Terminal className="w-3 h-3" /> AI_ASSIST
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

// --- GLOBAL LAYOUT WRAPPER ---
const Layout = ({ children, currentView, onViewChange }: { children: React.ReactNode, currentView: View, onViewChange: (v: View) => void }) => {
  
  const isLoggedInContext = ['DASHBOARD', 'PROJECT_WIZARD', 'PROJECT_HUB', 'MOODBOARD'].includes(currentView);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#FF7F50]/30 overflow-x-hidden font-sans flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 h-20">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewChange('HOME')}>
          {/* 3x3 Square Matrix Logo */}
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
                <button onClick={() => onViewChange('PROTOCOLS')} className={cn("hover:text-white transition-colors", currentView === 'PROTOCOLS' && "text-white")}>METHODOLOGY</button>
                <button onClick={() => onViewChange('RESOURCES')} className={cn("hover:text-white transition-colors", currentView === 'RESOURCES' && "text-white")}>RESOURCES</button>
                {isLoggedInContext && (
                    <button onClick={() => onViewChange('DASHBOARD')} className={cn("hover:text-white transition-colors font-bold", (currentView === 'DASHBOARD' || currentView === 'PROJECT_HUB' || currentView === 'MOODBOARD') && "text-[#FF7F50]")}>DASHBOARD</button>
                )}
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>

            <div className="flex items-center gap-6">
                {!isLoggedInContext && currentView !== 'LOGIN' && (
                    <button onClick={() => onViewChange('LOGIN')} className="font-mono text-xs px-4 py-2 border border-white/20 rounded-full text-white hover:border-[#FF7F50] hover:text-[#FF7F50] transition-colors flex items-center gap-2 group">
                    LOGIN <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}

                {isLoggedInContext && (
                    <div className="flex items-center gap-2">
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

       <footer className="relative z-10 border-t border-white/10 bg-[#020202] py-8 px-6 mt-auto">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-[#FF7F50]/20"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-white/40">
           <div className="mb-4 md:mb-0">
             © 2025 THRESHOLD_METHOD
           </div>
           <div className="flex gap-6">
             <span>[ SECURITY: ENCRYPTED ]</span>
             <span>[ LATENCY: 12ms ]</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

// 2. HOME VIEW 
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
            // SYSTEM STATUS: VALIDATED
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white pb-2">
            Threshold.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto font-light leading-relaxed">
            The rigorous methodology for AI-augmented creative workflows. 
            Moving beyond prompt engineering to <span className="text-white/90 font-medium">strategic integrity</span>.
          </p>
          <div className="pt-8">
            <button 
              onClick={() => onNavigate('LOGIN')}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm uppercase tracking-widest border border-white/20 rounded hover:border-[#FF7F50]/50 transition-all duration-300 bg-black/20 hover:bg-[#FF7F50]/10 overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-[#FFAB85] transition-colors flex items-center gap-2">
                [ INITIATE_PROTOCOL ] <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-[#FF7F50]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-32 max-w-5xl w-full border-t border-white/5 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 text-[#FF7F50] font-mono text-xs">
                    <Activity className="w-3 h-3" />
                    <span>// ENTROPY_MONITOR</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">Stop Generating Average.</h2>
                <p className="text-xl text-white/60 font-light leading-relaxed">
                    Standard AI models regress to the statistical mean. Threshold introduces <span className="text-white font-medium">strategic friction</span> to force distinctive output.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded border border-white/10 bg-white/5">
                        <div className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-wider">Without Threshold</div>
                        <div className="text-lg text-white/60 font-light">Generic Slop</div>
                    </div>
                    <div className="p-4 rounded border border-[#FF7F50]/20 bg-[#FF7F50]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <ShieldCheck className="w-8 h-8 text-[#FF7F50]" />
                        </div>
                        <div className="text-[10px] font-mono text-[#FF7F50] mb-2 uppercase tracking-wider">With Threshold</div>
                        <div className="text-lg text-white font-medium">Strategic Asset</div>
                    </div>
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

// 3. LOGIN VIEW
const LoginView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Authenticate.</h1>
          <p className="font-mono text-xs text-[#FF7F50] mt-2">// ENTER_CREDENTIALS</p>
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
            onClick={() => onNavigate('DASHBOARD')}
            className="w-full mt-8 py-3 border border-white/20 hover:border-[#FF7F50] text-white font-mono text-sm uppercase tracking-widest transition-all group relative overflow-hidden bg-white/5 hover:bg-[#FF7F50]/10"
          >
            <span className="relative z-10 group-hover:text-[#FFAB85]">Initiate Session -&gt;</span>
          </button>
        </div>
        <div className="mt-8 text-center border-t border-white/5 pt-4">
          <p className="font-mono text-[10px] text-white/30">&gt; SYSTEM_NOTE: DEMO_ENVIRONMENT_ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

// 4. DASHBOARD VIEW
const DashboardView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [activeTab, setActiveTab] = useState<ProjectStatus>('ACTIVE');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const projects = INITIAL_PROJECTS.filter(p => p.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="font-mono text-xs text-blue-400 mb-2">// WORKSPACE_OVERVIEW :: [USER_ASH]</div>
          <h1 className="text-4xl font-bold">Projects</h1>
        </div>
        <div className="hidden md:flex gap-2 font-mono text-xs">
          <button 
            onClick={() => setActiveTab('ACTIVE')}
            className={cn("px-3 py-1 rounded-full border transition-all", activeTab === 'ACTIVE' ? "bg-[#FF7F50]/20 text-[#FF7F50] border-[#FF7F50]/20" : "bg-white/5 text-white/40 border-white/10 hover:text-white")}
          >
            [ ACTIVE ]
          </button>
          <button 
            onClick={() => setActiveTab('ARCHIVED')}
            className={cn("px-3 py-1 rounded-full border transition-all", activeTab === 'ARCHIVED' ? "bg-[#FF7F50]/20 text-[#FF7F50] border-[#FF7F50]/20" : "bg-white/5 text-white/40 border-white/10 hover:text-white")}
          >
            [ ARCHIVED ]
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="relative w-full p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md group hover:border-white/20 transition-all">
            <div className="absolute top-2 left-2 text-white/20 text-[10px]">+</div>
            <div className="absolute top-2 right-2 text-white/20 text-[10px]">+</div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="block font-mono text-[10px] text-blue-400 mb-1 tracking-wider uppercase">
                  TYPE :: {project.type}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-white/5 bg-black/20">
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", project.status === 'ACTIVE' ? "bg-[#FF7F50]" : "bg-white/40")}></div>
                <span className="font-mono text-[10px] text-white/60">{project.status === 'ACTIVE' ? 'LIVE' : 'ARCHIVED'}</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-[10px] font-mono text-white/40 mb-2">
                <span>THRESHOLD 02/05</span>
                <span>{project.progress}% COMPLETE</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-[#FF7F50] relative"
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div className="text-[10px] font-mono text-white/30">
                LAST_EDIT :: {project.lastEdited}
              </div>
              <div className="flex items-center gap-4">
                  <div className="relative">
                      <button onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)} className="p-2 hover:bg-white/10 rounded">
                          <MoreHorizontal className="w-4 h-4 text-white/60" />
                      </button>
                      {activeMenuId === project.id && (
                          <div className="absolute bottom-full right-0 mb-2 w-32 bg-black border border-white/20 rounded-lg p-1 shadow-xl z-50">
                              <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Edit2 className="w-3 h-3"/> Edit</button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Archive className="w-3 h-3"/> Archive</button>
                              <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-white/10 rounded"><Trash2 className="w-3 h-3"/> Delete</button>
                          </div>
                      )}
                  </div>
                  <button 
                    onClick={() => onNavigate('PROJECT_HUB')}
                    className="flex items-center space-x-2 text-sm text-white hover:text-[#FF7F50] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span className="font-medium">Open Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </div>
        ))}

        <div 
           onClick={() => setShowNewProjectModal(true)}
           className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group"
        >
           <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#FF7F50] transition-colors">
              <Plus className="w-6 h-6 text-white/40 group-hover:text-[#FF7F50]" />
           </div>
           <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 group-hover:text-white">Initialize New Protocol</h3>
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

// NEW: PROJECT HUB VIEW (Updated Visuals Card)
const ProjectHubView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
      <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                  <button onClick={() => onNavigate('DASHBOARD')} className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white mb-4 transition-colors">
                      <ChevronLeft className="w-3 h-3" /> BACK_TO_DASHBOARD
                  </button>
                  <div className="font-mono text-xs text-[#FF7F50] mb-2">// PROJECT_HUB :: ID_01</div>
                  <h1 className="text-4xl font-bold">Pelvic Door Identity</h1>
              </div>
              <div className="flex gap-3 relative" ref={menuRef}>
                  <button onClick={() => onNavigate('PROJECT_WIZARD')} className="flex items-center gap-2 px-4 py-2 bg-[#FF7F50] text-black text-sm font-bold rounded hover:bg-[#FF7F50]/90 transition-colors">
                      <Play className="w-4 h-4 fill-current" /> CONTINUE WORKFLOW
                  </button>
                  <button onClick={() => setShowMenu(!showMenu)} className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-white/60 hover:text-white">
                      <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {showMenu && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-[#0A0A0A] border border-white/20 rounded-lg p-1 shadow-2xl z-50">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Edit2 className="w-3 h-3"/> Project Settings</button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded"><Download className="w-3 h-3"/> Export All Data</button>
                          <div className="h-[1px] bg-white/10 my-1"></div>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-white/10 rounded"><Archive className="w-3 h-3"/> Archive Project</button>
                      </div>
                  )}
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-6">
                  <div className="border border-white/10 rounded-xl bg-white/5 p-6 relative group hover:border-white/20 transition-all cursor-pointer" onClick={() => onNavigate('PROJECT_WIZARD')}>
                       <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-blue-500/10 rounded-lg"><FileText className="w-5 h-5 text-blue-400" /></div>
                               <h3 className="font-bold">Strategic Brief</h3>
                           </div>
                           <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 rounded">LOCKED</span>
                       </div>
                       <p className="text-sm text-white/60 mb-6 line-clamp-3">Primary Audience: Holistic wellness seekers. Core Message: Strength through vulnerability. Keywords: Organic, Resilient, Gateway.</p>
                       <button className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-2">VIEW DOCUMENT <ArrowRight className="w-3 h-3" /></button>
                  </div>

                   <div className="border border-white/10 rounded-xl bg-white/5 p-6 relative group hover:border-white/20 transition-all cursor-pointer" onClick={() => onNavigate('MOODBOARD')}>
                       <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-purple-500/10 rounded-lg"><Sparkles className="w-5 h-5 text-purple-400" /></div>
                               <h3 className="font-bold">Visuals & Research</h3>
                           </div>
                           <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 rounded">3 ASSETS</span>
                       </div>
                       
                       <div className="space-y-3 mb-6">
                           {['Moodboard', 'Competitor Audit', 'Market Trends'].map((item, i) => (
                               <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                                   <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                                   {item}
                               </div>
                           ))}
                       </div>

                       <div className="flex gap-2 mb-6">
                          {[1,2,3].map(i => (
                             <div key={i} className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-white/20"/></div>
                          ))}
                       </div>
                       <button className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-2">VIEW ASSETS <ArrowRight className="w-3 h-3" /></button>
                  </div>
              </div>

              <div className="space-y-6">
                  <div className="border border-white/10 rounded-xl bg-white/5 p-6 h-full relative group hover:border-white/20 transition-all flex flex-col">
                       <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-[#FF7F50]/10 rounded-lg"><Zap className="w-5 h-5 text-[#FF7F50]" /></div>
                               <h3 className="font-bold">Active Concepts</h3>
                           </div>
                           <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF7F50]/20 bg-[#FF7F50]/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse"></div>
                                <span className="font-mono text-[10px] text-[#FF7F50]">IN PROGRESS</span>
                          </div>
                       </div>
                       
                       <div className="flex-grow grid grid-cols-2 gap-4 mb-6">
                          {['Concept A: The Archway', 'Concept B: Organic Shield'].map((c, i) => (
                             <div key={i} className="aspect-square rounded-lg bg-black/40 border border-white/10 p-4 flex flex-col justify-end hover:bg-white/5 transition-colors cursor-pointer">
                                <span className="font-bold text-sm">{c}</span>
                                <span className="text-[10px] font-mono text-white/40">V2_REFINED</span>
                             </div>
                          ))}
                       </div>
                       <button onClick={() => onNavigate('PROJECT_WIZARD')} className="w-full py-3 border border-white/10 rounded bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center justify-center gap-2 transition-colors">
                           ENTER DESIGN WORKFLOW <ArrowRight className="w-3 h-3" />
                       </button>
                  </div>
              </div>

               <div className="space-y-6">
                  <div className="border border-white/10 rounded-xl bg-white/5 p-6 h-full relative group hover:border-white/20 transition-all flex flex-col opacity-50">
                       <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-green-500/10 rounded-lg"><FolderOpen className="w-5 h-5 text-green-400" /></div>
                               <h3 className="font-bold">Final Deliverables</h3>
                           </div>
                           <Lock className="w-4 h-4 text-white/40" />
                       </div>
                       <p className="text-sm text-white/40 flex-grow flex items-center justify-center text-center px-6">
                           Complete all 5 thresholds to unlock final asset generation and download package.
                       </p>
                  </div>
              </div>

          </div>
      </div>
  )
};

// NEW: MOODBOARD VIEW
const MoodboardView = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-8 flex items-center justify-between">
                <button onClick={() => onNavigate('PROJECT_HUB')} className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors">
                    <ChevronLeft className="w-3 h-3" /> BACK_TO_HUB
                </button>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded hover:border-[#FF7F50] transition-colors text-xs font-mono">
                        <Upload className="w-3 h-3" /> UPLOAD_IMAGE
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded hover:border-[#FF7F50] transition-colors text-xs font-mono">
                        <Sparkles className="w-3 h-3 text-[#FF7F50]" /> AI_GENERATE
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {/* Large Hero Image */}
                <div className="col-span-2 row-span-2 bg-white/5 border border-white/10 rounded-xl relative group overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20"><ImageIcon className="w-12 h-12"/></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-xs">HERO_REFERENCE_01</span>
                    </div>
                </div>
                {/* Standard Images */}
                {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl relative group overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-white/20"><ImageIcon className="w-8 h-8"/></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="font-mono text-[10px]">TEXTURE_REF_0{i}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// 5. PROJECT WORKFLOW 
const ProjectWizard = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [slidePosition, setSlidePosition] = useState(0);
  const [competitors, setCompetitors] = useState([1, 2, 3]); // Default 3
  
  // Stage 3 State
  const [designApproved, setDesignApproved] = useState(false);
  const [customDesignChecks, setCustomDesignChecks] = useState<string[]>([]);
  const [newDesignCheckInput, setNewDesignCheckInput] = useState("");
  const [designChecklist, setDesignChecklist] = useState({
      scalability: false,
      monochrome: false,
      cultural: false,
      production: false
  });

  // Stage 4 State
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([
      {role: 'ai', content: "I've analyzed your strategic brief and selected concepts. I can help draft talking points for stakeholders. What's your main concern for this presentation?"}
  ]);
  const [customPresChecks, setCustomPresChecks] = useState<string[]>([]);
  const [newPresCheckInput, setNewPresCheckInput] = useState("");
  const [presChecklist, setPresChecklist] = useState({
      context: false,
      brief: false,
      concepts: false,
      application: false,
      recommendation: false,
      nextSteps: false
  });

  // Stage 5 State
  const [governanceChecks, setGovernanceChecks] = useState({
      accessibility: false,
      technical: false,
      usage: false
  });


  // Handlers
  const toggleDesignCheck = (key: keyof typeof designChecklist) => {
      setDesignChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addCustomDesignCheck = () => {
      if (newDesignCheckInput.trim()) {
          setCustomDesignChecks([...customDesignChecks, newDesignCheckInput.trim()]);
          setNewDesignCheckInput("");
      }
  }

  const togglePresCheck = (key: keyof typeof presChecklist) => {
      setPresChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addCustomPresCheck = () => {
      if (newPresCheckInput.trim()) {
          setCustomPresChecks([...customPresChecks, newPresCheckInput.trim()]);
          setNewPresCheckInput("");
      }
  }

  const toggleGovernanceCheck = (key: keyof typeof governanceChecks) => {
      setGovernanceChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChatSend = () => {
      if(!chatInput.trim()) return;
      const newUserMsg = { role: 'user' as const, content: chatInput };
      setChatHistory([...chatHistory, newUserMsg]);
      setChatInput("");
      // Mock AI response
      setTimeout(() => {
          setChatHistory(prev => [...prev, { role: 'ai', content: "Acknowledged. Based on the 'Strength through Vulnerability' core message, emphasize how the organic line work in Concept B defies traditional corporate rigidity." }]);
      }, 1000);
  }
  
  const stages = [
    { id: 1, label: 'STRATEGIC FOUNDATION' },
    { id: 2, label: 'CONCEPTUAL CLARITY' },
    { id: 3, label: 'DESIGN INTEGRITY' },
    { id: 4, label: 'FINAL VALIDATION' },
    { id: 5, label: 'IMPLEMENTATION' }
  ];

  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSlidePosition(val);
    if (val > 95) {
      setGateUnlocked(true);
      setSlidePosition(100);
    }
  };

  const nextStage = () => {
    if (stage < 5) {
      setStage((s) => (s + 1) as Stage);
      setGateUnlocked(false);
      setSlidePosition(0);
      window.scrollTo(0,0);
    } else {
        // Navigate to Project Hub on completion
        onNavigate('PROJECT_HUB');
    }
  };

  const prevStage = () => {
      if (stage > 1) {
          setStage((s) => (s - 1) as Stage);
          setGateUnlocked(false);
          setSlidePosition(0);
          window.scrollTo(0,0);
      } else {
          onNavigate('DASHBOARD');
      }
  }

  const addCompetitor = () => {
      setCompetitors([...competitors, competitors.length + 1]);
  }

  const progressPercent = (stage / 5) * 100;

  return (
    <div className="min-h-screen pb-40 relative">
      
      {/* TOP GRADIENT PROGRESS BAR */}
      <div className="sticky top-[80px] left-0 right-0 h-[2px] bg-white/5 z-50">
          <div 
             className="h-full bg-gradient-to-r from-blue-500 to-[#FF7F50] transition-all duration-700 ease-out relative"
             style={{ width: `${progressPercent}%` }}
          >
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[4px]"></div>
          </div>
      </div>

      {/* Tape Measure Header */}
      <div className="sticky top-[82px] z-40 bg-[#050505]/95 backdrop-blur border-b border-white/10 py-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] px-6 relative">
          <div className="absolute left-6 right-6 top-1/2 h-[1px] bg-white/10 -z-10"></div>
          
          {stages.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 relative bg-[#050505] px-2 cursor-pointer" onClick={() => setStage(s.id as Stage)}>
              <div className={cn(
                "w-3 h-3 rounded-full border transition-all duration-500",
                s.id === stage ? "bg-white border-white scale-125" : 
                s.id < stage ? "bg-[#FF7F50] border-[#FF7F50]" : "bg-[#050505] border-white/30"
              )}></div>
              <span className={cn(
                "font-mono text-[10px] tracking-widest transition-colors duration-300",
                s.id === stage ? "text-white" : "text-white/30"
              )}>
                {`0${s.id}`} :: {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Content - ADDED EXTRA BOTTOM PADDING FOR FOOTER CLEARANCE */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-32">
        
        {/* STAGE 1 */}
        {stage === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             
             <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Strategic Foundation</h2>
                <p className="text-white/60 font-light">Define audience, core message, and strategic guardrails before generation.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock id="PARAM_01" label="Project Name" placeholder="Clear project identification..." hint="Be specific and descriptive." height="h-20" />
                <SpecBlock id="PARAM_02" label="Brand/Org Name" placeholder="Exact name as it will appear in the logo..." hint="Confirm capitalization." height="h-20" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock id="PARAM_03" label="Business Problem" placeholder="What business problem does this solve?" hint="Connect to measurable outcomes." />
                <SpecBlock id="PARAM_04" label="Desired Emotional Response" placeholder="How should the audience feel?" hint="E.g., 'Safe,' 'Understood,' 'Empowered'." />
             </div>

             <SpecBlock id="PARAM_05" label="Primary Audience & Insight" placeholder="Who are they? What do they value/fear?" hint="Demographics + Psychographics." />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock id="PARAM_06" label="Must-Embody Keywords" placeholder="Non-negotiable qualities (3-5)..." hint="Specific, defendable adjectives." />
                <SpecBlock id="PARAM_07" label="Must-Avoid Keywords" placeholder="Explicit guardrails (3-5)..." hint="What causes disengagement?" />
             </div>

             <SpecBlock id="PARAM_08" label="Sensitivity & Cultural Context" placeholder="What sensitive topics or identities must be handled with care?" hint="Trauma-informed, gender-inclusive, accessibility needs." />
          </div>
        )}

        {/* STAGE 2 (PATTERN EXTRACTION & SEMIOTICS) */}
        {stage === 2 && (
             <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Conceptual Clarity</h2>
                    <p className="text-white/60 font-light">Identify category clichés (AI), build visual context, and generate directions.</p>
                </div>

                {/* 1.5 SPLIT: AI PATTERN EXTRACTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="border border-white/10 rounded-xl bg-white/5 p-6">
                        <div className="flex items-center gap-2 mb-4 text-blue-400">
                            <BrainCircuit className="w-5 h-5" />
                            <h3 className="font-bold text-sm uppercase tracking-wider">AI :: Pattern Extraction</h3>
                        </div>
                        <p className="text-xs text-white/40 mb-6">Upload competitors to detect visual clichés and overused tropes.</p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-black/40 rounded flex items-center justify-center border border-white/5">
                                    <ImageIcon className="w-4 h-4 text-white/20" />
                                </div>
                            ))}
                            <button className="aspect-square bg-white/5 rounded flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors">
                                <Plus className="w-4 h-4 text-white/40" />
                            </button>
                        </div>

                        <div className="bg-black/40 rounded p-4 border border-white/5">
                            <div className="text-[10px] font-mono text-white/30 mb-2">DETECTED_CLICHES (AI_PREDICTION)</div>
                            <ul className="space-y-1 text-xs text-white/60">
                                <li>• Teal / Mint gradients</li>
                                <li>• Lotus flower motifs</li>
                                <li>• Thin, wispy script fonts</li>
                            </ul>
                        </div>
                    </div>

                    {/* 1.5 SPLIT: HUMAN SEMIOTIC INTERPRETATION */}
                    <div className="border border-[#FF7F50]/30 rounded-xl bg-[#FF7F50]/5 p-6">
                        <div className="flex items-center gap-2 mb-4 text-[#FF7F50]">
                            <Target className="w-5 h-5" />
                            <h3 className="font-bold text-sm uppercase tracking-wider">Human :: Semiotic Interpretation</h3>
                        </div>
                        <p className="text-xs text-white/40 mb-6">Define the symbolic territory *against* the detected clichés.</p>
                        
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#FF7F50] uppercase">Metaphor</label>
                                <input className="w-full bg-black/40 border border-[#FF7F50]/30 rounded px-3 py-2 text-sm outline-none" placeholder="e.g. Structural Biology" />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#FF7F50] uppercase">Visual Cues</label>
                                <input className="w-full bg-black/40 border border-[#FF7F50]/30 rounded px-3 py-2 text-sm outline-none" placeholder="e.g. Arches, Bone" />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-mono text-[#FF7F50] uppercase">Emotional Signal</label>
                                <input className="w-full bg-black/40 border border-[#FF7F50]/30 rounded px-3 py-2 text-sm outline-none" placeholder="e.g. Safety, Containment" />
                             </div>
                            
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => onNavigate('MOODBOARD')} className="flex-1 py-3 border border-[#FF7F50]/30 text-[#FF7F50] text-xs font-mono rounded hover:bg-[#FF7F50]/10 flex items-center justify-center gap-2">
                                    <Grid className="w-3 h-3" /> CREATE / EDIT MOODBOARD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONCEPT GENERATION CHOICES */}
                <div className="border-t border-white/10 pt-8">
                    <h3 className="font-bold mb-6">Concept Generation Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-white/10 p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group text-center py-12 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#FF7F50] transition-colors">
                                <Sparkles className="w-6 h-6 text-[#FF7F50]" />
                            </div>
                            <h3 className="font-bold mb-1">Generate with AI</h3>
                            <p className="text-white/40 text-xs mb-4">Based on defined territory.</p>
                            <button className="px-4 py-2 bg-[#FF7F50]/10 border border-[#FF7F50]/50 text-[#FF7F50] text-xs font-mono rounded hover:bg-[#FF7F50] hover:text-black transition-all">
                                INITIATE
                            </button>
                        </div>

                        <div className="border border-white/10 p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group text-center py-12 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-white transition-colors">
                                <Upload className="w-6 h-6 text-white/60" />
                            </div>
                            <h3 className="font-bold mb-1">Upload Sketches</h3>
                            <p className="text-white/40 text-xs mb-4">Import manual concepts.</p>
                            <button className="px-4 py-2 bg-white/5 border border-white/20 text-white text-xs font-mono rounded hover:bg-white hover:text-black transition-all">
                                SELECT_FILES
                            </button>
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* STAGE 3 (FIXED BUTTON ALIGNMENT) */}
        {stage === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Design Integrity</h2>
                    <p className="text-white/60 font-light">Refine and validate technical execution. AI assists with checks; you make strategic decisions.</p>
                </div>

                <div className="border border-white/10 p-6 rounded-xl bg-white/5 mb-8 relative">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-[#FF7F50]" />
                        <h3 className="font-bold text-lg">AI-Assisted Refinement</h3>
                    </div>
                    <div className="relative">
                        <textarea 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-light focus:border-[#FF7F50] outline-none min-h-[120px] resize-none placeholder-white/30"
                            placeholder="Describe the refinement needed (e.g., 'Make lines bolder for small sizes', 'Simplify the geometry')..."
                        />
                        {/* ALIGNED BUTTON INSIDE TEXTAREA */}
                        <div className="absolute right-2 bottom-2">
                            <button className="flex items-center gap-2 px-3 py-1 bg-[#FF7F50]/10 border border-[#FF7F50]/50 text-[#FF7F50] text-[10px] font-mono rounded hover:bg-[#FF7F50] hover:text-black transition-all">
                                <Sparkles className="w-3 h-3" /> GENERATE_VARIATIONS
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="font-mono text-xs text-[#FF7F50] mb-4">// TECHNICAL_VALIDATION_CHECKLIST</div>
                    <div className="grid gap-4">
                        {[
                            { id: 'scalability', label: 'Scalability Test (16px)', desc: 'Verifies legibility at favicon and app icon sizes.' },
                            { id: 'monochrome', label: 'Monochrome Integrity', desc: 'Ensures visual distinctiveness in single-color formats.' },
                            { id: 'cultural', label: 'Cultural Sensitivity Scan', desc: 'AI-assisted scan for unintended negative connotations.' },
                            { id: 'production', label: 'Production Feasibility', desc: 'Checks for gradients/lines that fail in embroidery/vinyl.' }
                        ].map((item) => (
                            <div key={item.id} onClick={() => toggleDesignCheck(item.id as any)} className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div>
                                    <span className="font-medium text-sm block mb-1">{item.label}</span>
                                    <span className="text-xs text-white/40 font-light">{item.desc}</span>
                                </div>
                                <div className={cn("w-4 h-4 rounded border mt-1 transition-colors flex items-center justify-center", designChecklist[item.id as keyof typeof designChecklist] ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                                    {designChecklist[item.id as keyof typeof designChecklist] && <Check className="w-3 h-3 text-black" />}
                                </div>
                            </div>
                        ))}
                        {/* Custom Checks */}
                        {customDesignChecks.map((check, i) => (
                             <div key={i} className="flex items-center justify-between p-5 border border-white/10 rounded-lg bg-white/5">
                                 <span className="font-medium text-sm">{check}</span>
                                 <div className={cn("w-4 h-4 rounded border flex items-center justify-center bg-[#FF7F50] border-[#FF7F50]")}>
                                     <Check className="w-3 h-3 text-black" />
                                 </div>
                             </div>
                        ))}

                        {/* Add Custom Check */}
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={newDesignCheckInput}
                                onChange={(e) => setNewDesignCheckInput(e.target.value)}
                                placeholder="Add agency-specific validation step..."
                                className="flex-grow bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-white/30"
                            />
                            <button onClick={addCustomDesignCheck} className="px-4 py-2 border border-white/10 rounded hover:bg-white/10 font-mono text-xs">ADD CHECK</button>
                        </div>
                    </div>
                </div>

                {/* HUMAN GATE */}
                <div className="mt-8 border border-[#FF7F50]/20 bg-[#FF7F50]/5 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="w-5 h-5 text-[#FF7F50]" />
                        <h4 className="font-bold text-[#FF7F50]">Human Approval Gate</h4>
                    </div>
                    <p className="text-sm text-white/60 mb-6">Before proceeding, confirm the refined design(s) meet all strategic criteria and technical requirements.</p>
                    <div onClick={() => setDesignApproved(!designApproved)} className="flex items-center gap-3 cursor-pointer">
                        <div className={cn("w-5 h-5 rounded border transition-colors flex items-center justify-center", designApproved ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/40")}>
                            {designApproved && <Check className="w-4 h-4 text-black" />}
                        </div>
                        <span className="text-sm text-white/80">I confirm the refined design maintains strategic alignment.</span>
                    </div>
                </div>
            </div>
        )}

        {/* STAGE 4 (RESTORED RESOURCES) */}
        {stage === 4 && (
             <div className="space-y-8 animate-in slide-in-from-right duration-500">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">Final Validation</h2>
                    <p className="text-white/60 font-light">Stakeholder review and approval. Prepare your concept presentation using AI-powered tools.</p>
                </div>

                {/* AI Presentation Coach */}
                 <div className="border border-white/10 p-6 rounded-xl bg-white/5 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <h3 className="font-bold text-lg">AI Presentation Coach</h3>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg h-48 p-4 mb-4 overflow-y-auto flex flex-col gap-4">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={cn("max-w-[80%] p-3 rounded-lg text-sm", msg.role === 'ai' ? "bg-white/10 self-start" : "bg-[#FF7F50]/20 self-end text-[#FF7F50]")}>
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask for talking points, rationale, or objection handling..."
                            className="flex-grow bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-white/30"
                        />
                        {/* CHANGED ARROW COLOR TO ORANGE */}
                        <button onClick={handleChatSend} className="px-4 py-2 border border-white/10 rounded hover:bg-[#FF7F50]/20 font-mono text-xs text-[#FF7F50] flex items-center justify-center"><Send className="w-4 h-4"/></button>
                    </div>
                    <div className="flex justify-end mt-2">
                         <button className="flex items-center gap-2 text-[10px] font-mono text-[#FF7F50] hover:underline">
                            <Eye className="w-3 h-3" /> RUN_CLARITY_SCAN
                         </button>
                    </div>
                </div>

                {/* Presentation Tools (RESTORED) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="border border-white/10 p-5 rounded-xl bg-white/5 hover:border-purple-500/50 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <Presentation className="w-6 h-6 text-purple-400" />
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                        </div>
                        <h4 className="font-bold mb-1">Gamma AI</h4>
                        <p className="text-xs text-white/40">Generate beautiful, editable slide decks instantly.</p>
                    </div>
                    <div className="border border-white/10 p-5 rounded-xl bg-white/5 hover:border-blue-500/50 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                        </div>
                        <h4 className="font-bold mb-1">NotebookLM</h4>
                        <p className="text-xs text-white/40">Turn your brief and concepts into presentation notes.</p>
                    </div>
                    <div className="border border-white/10 p-5 rounded-xl bg-white/5 hover:border-orange-500/50 transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <MessageSquare className="w-6 h-6 text-orange-400" />
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                        </div>
                        <h4 className="font-bold mb-1">Claude</h4>
                        <p className="text-xs text-white/40">Draft speaker notes and stakeholder talking points.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="font-mono text-xs text-[#FF7F50] mb-4">// PRESENTATION_CHECKLIST</div>
                    <div className="grid gap-3">
                        {[
                            'Context Slide: Project background and objectives',
                            'Brief Summary: Key strategic inputs and constraints',
                            'Concept Presentation: Visual + strategic rationale',
                            'Application Examples: Concepts in context',
                            'Recommendation: Which concept to move forward',
                            'Next Steps: Timeline and deliverables'
                        ].map((item, i) => (
                            <div key={i} onClick={() => togglePresCheck(Object.keys(presChecklist)[i] as any)} className="flex items-center gap-4 p-3 border border-white/5 rounded hover:bg-white/5 cursor-pointer">
                                <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-colors", Object.values(presChecklist)[i] ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                                    {Object.values(presChecklist)[i] && <Check className="w-3 h-3 text-black" />}
                                </div>
                                <span className="text-sm text-white/80">{item}</span>
                            </div>
                        ))}
                         {/* Custom Checks */}
                        {customPresChecks.map((check, i) => (
                             <div key={i} className="flex items-center gap-4 p-3 border border-white/5 rounded bg-white/5">
                                 <div className={cn("w-4 h-4 rounded border flex items-center justify-center bg-[#FF7F50] border-[#FF7F50]")}>
                                     <Check className="w-3 h-3 text-black" />
                                 </div>
                                 <span className="text-sm text-white/80">{check}</span>
                            </div>
                        ))}

                        {/* Add Custom Check */}
                        <div className="flex gap-2 mt-2">
                            <input 
                                type="text" 
                                value={newPresCheckInput}
                                onChange={(e) => setNewPresCheckInput(e.target.value)}
                                placeholder="Add custom presentation check..."
                                className="flex-grow bg-white/5 border border-white/10 rounded px-4 py-2 text-sm outline-none focus:border-white/30"
                            />
                            <button onClick={addCustomPresCheck} className="px-4 py-2 border border-white/10 rounded hover:bg-white/10 font-mono text-xs">ADD</button>
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* STAGE 5 (UPDATED TO IMPLEMENTATION PACKAGE) */}
        {stage === 5 && (
             <div className="text-center py-20 animate-in slide-in-from-right duration-500">
                 <ShieldCheck className="w-20 h-20 text-[#FF7F50] mx-auto mb-8" />
                 <h2 className="text-4xl font-bold mb-4">Implementation Package</h2>
                 <p className="text-white/60 mb-12 max-w-md mx-auto">
                    All strategic thresholds crossed. Protocols validated. 
                    Assets are compiled and ready for final export.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-8">
                     
                     {/* LEFT COLUMN: DOWNLOADS */}
                     <div className="space-y-4">
                         <div className="font-mono text-xs text-blue-400 mb-2">// GENERATED_DOCUMENTATION</div>
                         
                         <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between group hover:border-[#FF7F50]/50 transition-all cursor-pointer">
                             <div className="flex items-center gap-3">
                                 <FileText className="w-5 h-5 text-blue-400" />
                                 <div>
                                     <h4 className="font-bold">Strategic Brief PDF</h4>
                                     <p className="text-xs text-white/40">1.2 MB</p>
                                 </div>
                             </div>
                             <Download className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                         </div>

                         <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between group hover:border-[#FF7F50]/50 transition-all cursor-pointer">
                             <div className="flex items-center gap-3">
                                 <BookOpen className="w-5 h-5 text-green-400" />
                                 <div>
                                     <h4 className="font-bold">Brand Guidelines PDF</h4>
                                     <p className="text-xs text-white/40">Includes WCAG Rules</p>
                                 </div>
                             </div>
                             <Download className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                         </div>

                          <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between group hover:border-[#FF7F50]/50 transition-all cursor-pointer">
                             <div className="flex items-center gap-3">
                                 <ImageIcon className="w-5 h-5 text-orange-400" />
                                 <div>
                                     <h4 className="font-bold">Logo Asset Suite</h4>
                                     <p className="text-xs text-white/40">SVG, PNG, JPG</p>
                                 </div>
                             </div>
                             <Download className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                         </div>
                     </div>

                     {/* RIGHT COLUMN: GOVERNANCE CHECK */}
                     <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-fit">
                         <div className="font-mono text-xs text-[#FF7F50] mb-6 flex items-center gap-2">
                             <Lock className="w-3 h-3"/> GOVERNANCE_VERIFICATION
                         </div>
                         
                         <div className="space-y-4">
                             <div onClick={() => toggleGovernanceCheck('accessibility')} className="flex items-start gap-3 cursor-pointer group">
                                 <div className={cn("w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors mt-0.5", governanceChecks.accessibility ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20 group-hover:border-white/40")}>
                                    {governanceChecks.accessibility && <Check className="w-3 h-3 text-black" />}
                                 </div>
                                 <div>
                                     <span className="text-sm font-bold block">Accessibility Compliance</span>
                                     <span className="text-xs text-white/40">I have verified the assets against the WCAG guidelines in the generated PDF.</span>
                                 </div>
                             </div>

                             <div onClick={() => toggleGovernanceCheck('technical')} className="flex items-start gap-3 cursor-pointer group">
                                 <div className={cn("w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors mt-0.5", governanceChecks.technical ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20 group-hover:border-white/40")}>
                                    {governanceChecks.technical && <Check className="w-3 h-3 text-black" />}
                                 </div>
                                  <div>
                                     <span className="text-sm font-bold block">Technical Standards</span>
                                     <span className="text-xs text-white/40">Files meet all required formats and naming conventions.</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <button className="flex items-center justify-center gap-3 px-8 py-4 bg-[#FF7F50] text-black font-bold rounded hover:bg-[#FF7F50]/90 transition-colors mx-auto">
                        <Download className="w-5 h-5" /> DOWNLOAD FULL PROJECT PACKAGE (ZIP)
                 </button>
             </div>
        )}
      </div>

      {/* THE SLIDE GATE + BACK NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 p-6 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
            
            <button 
                onClick={() => onNavigate('PROJECT_HUB')}
                className="h-14 px-6 flex items-center gap-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all flex-shrink-0 font-mono text-xs"
            >
                <CornerUpLeft className="w-4 h-4" /> HUB
            </button>

            <div className="flex-1 relative">
                {!gateUnlocked ? (
                    <div className="relative h-14 bg-white/5 rounded-full overflow-hidden border border-white/10 select-none">
                        <div 
                            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-500 to-[#FF7F50] transition-all duration-75 ease-linear opacity-50"
                            style={{ width: `${slidePosition}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-white/40 pointer-events-none">
                            SLIDE_TO_VERIFY_RATIONALE &gt;&gt;
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={slidePosition} 
                            onChange={handleSlide}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                        />
                        <div 
                            className="absolute top-1 bottom-1 w-12 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none transition-all duration-75 ease-linear"
                            style={{ left: `calc(${slidePosition}% - ${slidePosition * 0.48}px)` }}
                        >
                            <ChevronRight className="text-black w-4 h-4" />
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={nextStage}
                        className="w-full h-14 bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-black font-bold tracking-widest uppercase rounded-full animate-in zoom-in duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_#FF7F50_50%]"
                    >
                        <Lock className="w-4 h-4" /> THRESHOLD UNLOCKED :: PROCEED
                    </button>
                )}
            </div>
        </div>
        
        <div className="text-center mt-3 max-w-3xl mx-auto">
            <span className="font-mono text-[10px] text-white/20">
                // BY PROCEEDING, YOU CERTIFY STRATEGIC ALIGNMENT
            </span>
        </div>
      </div>
    </div>
  );
};

// 6. PROTOCOLS VIEW
const ProtocolsView = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 border-b border-white/10 pb-8">
            <div className="font-mono text-xs text-[#FF7F50] mb-2">// THE_METHODOLOGY</div>
            <h1 className="text-4xl font-bold mb-4">Strategic Governance</h1>
            <p className="text-white/60 font-light text-lg mb-8">
                Threshold is not just a tool; it is a governance layer for high-stakes creative work.
                We operationalize the "Human-in-the-Loop" standard to ensure AI outputs remain strategic, safe, and distinct.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div>
                     <h3 className="font-bold text-white mb-2">Why Threshold?</h3>
                     <p className="text-sm text-white/60">
                         Generative AI models default to the statistical mean—creating "average" work by design. 
                         Without structural intervention, this leads to brand homogeneity and semiotic collapse.
                     </p>
                 </div>
                 <div>
                     <h3 className="font-bold text-white mb-2">The Solution</h3>
                     <p className="text-sm text-white/60">
                         We introduce intentional friction at critical decision points. By separating 
                         pattern recognition (AI) from meaning-making (Human), we preserve creative integrity.
                     </p>
                 </div>
            </div>
        </div>

        <div className="space-y-12">
            {[
                { 
                    id: '01', 
                    title: 'STRATEGY PRECEDES SYMBOL', 
                    desc: 'No generation shall occur until the Strategic Foundation is locked. We do not prompt into the void; we prompt into a framework.' 
                },
                { 
                    id: '02', 
                    title: 'CONSTRAIN THE LATENT SPACE', 
                    desc: 'Quality is defined by what you reject. Every brief must include "Must-Avoid" parameters to block clichés and corporate tropes.' 
                },
                { 
                    id: '03', 
                    title: 'FRICTION IS A FEATURE', 
                    desc: 'Velocity without verification is risk. The "Gate" is not a barrier; it is a quality filter. Engaging the gate is a binding contract of ownership.' 
                },
                 { 
                    id: '04', 
                    title: 'HUMAN INTENT, MACHINE VELOCITY', 
                    desc: 'AI is the engine; You are the steering wheel. Automation is permitted only after intent is established. The roles must never reverse.' 
                }
            ].map((p) => (
                <div key={p.id} className="flex gap-8 items-start group">
                    <div className="font-mono text-xl text-white/20 group-hover:text-[#FF7F50] transition-colors">{p.id}</div>
                    <div className="pt-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-white/90">{p.title}</h3>
                        <p className="text-white/50 leading-relaxed max-w-2xl">{p.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// 7. RESOURCES VIEW (Real Content)
const ResourcesView = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            
            {/* Header */}
            <div className="mb-12 border-b border-white/10 pb-8">
                <div className="font-mono text-xs text-[#FF7F50] mb-2">// KNOWLEDGE_BASE</div>
                <h1 className="text-4xl font-bold mb-4">Resources</h1>
                <p className="text-white/60 font-light text-lg">
                    Tools, templates, and guides to help you implement the Threshold Method in your creative practice.
                </p>
            </div>

            {/* Templates Section */}
            <div className="mb-16">
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
            <div className="mb-16">
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
            <div>
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
      {currentView === 'DASHBOARD' && <DashboardView onNavigate={setCurrentView} />}
      {currentView === 'PROJECT_HUB' && <ProjectHubView onNavigate={setCurrentView} />}
      {currentView === 'PROJECT_WIZARD' && <ProjectWizard onNavigate={setCurrentView} />}
      {currentView === 'PROTOCOLS' && <ProtocolsView />}
      {currentView === 'RESOURCES' && <ResourcesView />}
      {currentView === 'MOODBOARD' && <MoodboardView onNavigate={setCurrentView} />}
    </Layout>
  );
}
