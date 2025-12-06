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
  Sparkles
} from 'lucide-react';
import { cn } from "@/components/ui/utils";

// --- TYPES ---

type View = 'HOME' | 'LOGIN' | 'DASHBOARD' | 'PROJECT_WIZARD' | 'PROTOCOLS';
type Stage = 1 | 2 | 3 | 4 | 5;

interface Project {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';
  lastEdited: string;
}

// --- MOCK DATA ---

const PROJECTS: Project[] = [
  { id: '1', name: 'Pelvic Door Identity', type: 'BRAND_IDENTITY', progress: 40, status: 'ACTIVE', lastEdited: '2h ago' },
  { id: '2', name: 'Nexus Architecture', type: 'WEB_DESIGN', progress: 20, status: 'ACTIVE', lastEdited: '1d ago' },
];

// --- HELPER COMPONENTS ---

// The "Spec Block" Input Field - Reusable Component for Stage 1
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
  
  const isLoggedInContext = currentView === 'DASHBOARD' || currentView === 'PROJECT_WIZARD';

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#FF7F50]/30 overflow-x-hidden font-sans">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Navigation / Status Bar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewChange('HOME')}>
          <div className="grid grid-cols-3 gap-[2px]">
            <div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white/10 rounded-full"></div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight">THRESHOLD</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <button onClick={() => onViewChange('PROTOCOLS')} className="hidden md:block font-mono text-xs text-white/60 hover:text-white transition-colors">
            // PROTOCOLS
           </button>
           
           <div className="hidden md:flex items-center gap-2 border border-white/10 px-3 py-1 rounded-full bg-white/5">
            <div className="w-1.5 h-1.5 bg-[#FF7F50] rounded-full animate-pulse"></div>
            <span className="font-mono text-[10px] text-white/60">SYSTEM: ONLINE</span>
          </div>

          {!isLoggedInContext && currentView !== 'LOGIN' && (
            <button onClick={() => onViewChange('LOGIN')} className="font-mono text-xs text-white hover:text-[#FF7F50] transition-colors">
              // LOGIN
            </button>
          )}

          {isLoggedInContext && (
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-mono text-xs font-bold ring-1 ring-white/20">
                  AH
                </div>
             </div>
          )}
        </div>
      </nav>

      <main className="relative z-10 min-h-[calc(100vh-80px)]">
        {children}
      </main>

       {/* Footer */}
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
      {/* The Glass HUD */}
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

      {/* INTERACTIVE DIFFERENCE ENGINE */}
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
            <label className="block font-mono text-[10px] text-white/50 mb-1 tracking-wider uppercase">[ SECURITY_KEY ]</label>
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
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="font-mono text-xs text-blue-400 mb-2">// WORKSPACE_OVERVIEW :: [USER_ASH]</div>
          <h1 className="text-4xl font-bold">Projects</h1>
        </div>
        <div className="hidden md:flex gap-2 font-mono text-xs">
          <span className="bg-[#FF7F50]/20 text-[#FF7F50] px-3 py-1 rounded-full border border-[#FF7F50]/20">[ 2 ACTIVE ]</span>
          <span className="bg-white/5 text-white/40 px-3 py-1 rounded-full border border-white/10">[ 1 ARCHIVED ]</span>
        </div>
      </div>

      <div className="grid gap-6">
        {PROJECTS.map((project) => (
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
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse"></div>
                <span className="font-mono text-[10px] text-white/60">LIVE</span>
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
              <button 
                onClick={() => onNavigate('PROJECT_WIZARD')}
                className="flex items-center space-x-2 text-sm text-white hover:text-[#FF7F50] transition-colors group-hover:translate-x-1 duration-300"
              >
                <span className="font-medium">Resume Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <div 
           onClick={() => onNavigate('PROJECT_WIZARD')}
           className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group"
        >
           <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#FF7F50] transition-colors">
              <Plus className="w-6 h-6 text-white/40 group-hover:text-[#FF7F50]" />
           </div>
           <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 group-hover:text-white">Initialize New Protocol</h3>
        </div>
      </div>
    </div>
  );
};

// 5. PROJECT WORKFLOW (Expanded Stage 1 & 1.5)
const ProjectWizard = ({ onNavigate }: { onNavigate: (v: View) => void }) => {
  const [stage, setStage] = useState<Stage>(1);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [slidePosition, setSlidePosition] = useState(0);
  
  const [checklist, setChecklist] = useState({
      scalability: false,
      monochrome: false,
      cultural: false,
      production: false
  });

  const toggleCheck = (key: keyof typeof checklist) => {
      setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
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
        onNavigate('DASHBOARD');
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

      {/* Stage Content */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        
        {/* === STAGE 1: STRATEGIC FOUNDATION (EXPANDED) === */}
        {stage === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             
             {/* Header */}
             <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Strategic Foundation</h2>
                <p className="text-white/60 font-light">Define audience, core message, and strategic guardrails before generation.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock 
                    id="PARAM_01" 
                    label="Project Name" 
                    placeholder="Clear project identification..." 
                    hint="Be specific and descriptive."
                    height="h-20"
                />
                <SpecBlock 
                    id="PARAM_02" 
                    label="Brand/Org Name" 
                    placeholder="Exact name as it will appear in the logo..." 
                    hint="Confirm capitalization with client."
                    height="h-20"
                />
             </div>

             <SpecBlock 
                id="PARAM_03" 
                label="Primary Audience" 
                placeholder="Who needs to connect with this work?" 
                hint="Include demographics, psychographics, pain points, and aspirations."
             />

             <SpecBlock 
                id="PARAM_04" 
                label="Core Message" 
                placeholder="The single most important thing this work should communicate..." 
                hint="One clear sentence that couldn't describe a competitor."
             />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock 
                    id="PARAM_05" 
                    label="Must-Embody Keywords" 
                    placeholder="Non-negotiable qualities (3-5)..." 
                    hint="Choose specific, defendable adjectives."
                />
                <SpecBlock 
                    id="PARAM_06" 
                    label="Must-Avoid Keywords" 
                    placeholder="Explicit guardrails (3-5)..." 
                    hint="What would cause your audience to disengage?"
                />
             </div>

             <SpecBlock 
                id="PARAM_07" 
                label="Symbolic Territory" 
                placeholder="What concepts, objects, or metaphors align with your message?" 
                hint="Example: 'Structural Biology' or 'Digital Fortifications'."
             />

             <SpecBlock 
                id="PARAM_08" 
                label="Primary Applications" 
                placeholder="Where will this logo live?" 
                hint="Example: App Icon, Building Signage, Uniforms."
             />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecBlock 
                    id="PARAM_09" 
                    label="Brand Voice & Tone" 
                    placeholder="How should this brand sound?" 
                    hint="Example: 'Clinical but compassionate'."
                />
                <SpecBlock 
                    id="PARAM_10" 
                    label="Color Direction" 
                    placeholder="What palette supports your strategy?" 
                    hint="Example: 'Deep Teals with Signal Orange'."
                />
             </div>

             {/* === STAGE 1.5: VISUAL INTELLIGENCE MODULE === */}
             <div className="mt-16 pt-16 border-t border-white/10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="font-mono text-xs text-[#FF7F50] mb-2">[ 1.5 :: VISUAL_INTELLIGENCE ]</div>
                        <h3 className="text-xl font-bold">Competitor & Visual Research</h3>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded hover:border-[#FF7F50]/50 transition-colors text-xs font-mono">
                        <Sparkles className="w-3 h-3 text-[#FF7F50]" /> AUTO_ANALYZE_MARKET
                    </button>
                </div>

                {/* Research Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Upload Slot */}
                    <div className="aspect-square border border-dashed border-white/20 rounded-lg bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group">
                        <Upload className="w-6 h-6 text-white/40 group-hover:text-white mb-2" />
                        <span className="text-[10px] font-mono text-white/40 uppercase">Upload Reference</span>
                    </div>
                    
                    {/* Placeholder Research Items */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square border border-white/10 rounded-lg bg-black/40 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
                            {/* Fake image placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/60 bg-black/80 px-1 rounded">
                                COMPETITOR_0{i}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        )}

        {/* STAGE 2: CONCEPTUAL CLARITY */}
        {stage === 2 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right duration-500">
                <div className="col-span-full border border-white/10 p-8 rounded-xl bg-white/5 text-center py-16">
                     <div className="w-16 h-16 rounded-full border border-white/10 mx-auto flex items-center justify-center mb-6 animate-pulse">
                        <div className="w-12 h-12 bg-white/5 rounded-full blur-md"></div>
                     </div>
                     <h3 className="text-xl font-bold mb-2">Concept Generation</h3>
                     <p className="text-white/40 text-sm max-w-md mx-auto mb-8">
                        AI models are currently generating directions based on your strategic constraints.
                     </p>
                     <div className="flex gap-4 justify-center">
                        <div className="w-24 h-32 bg-white/5 border border-white/10 rounded"></div>
                        <div className="w-24 h-32 bg-white/5 border border-white/10 rounded"></div>
                        <div className="w-24 h-32 bg-white/5 border border-white/10 rounded"></div>
                     </div>
                </div>
             </div>
        )}

        {/* STAGE 3: DESIGN INTEGRITY */}
        {stage === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right duration-500">
                <div className="font-mono text-xs text-[#FF7F50] mb-4">// INTEGRITY_CHECKLIST</div>
                <div className="grid gap-4">
                    <div onClick={() => toggleCheck('scalability')} className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div>
                            <span className="font-medium text-sm block mb-1">Scalability Test (16px)</span>
                            <span className="text-xs text-white/40 font-light">Verifies legibility at favicon and app icon sizes.</span>
                        </div>
                        <div className={cn("w-4 h-4 rounded border mt-1 transition-colors flex items-center justify-center", checklist.scalability ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                            {checklist.scalability && <Check className="w-3 h-3 text-black" />}
                        </div>
                    </div>

                     <div onClick={() => toggleCheck('monochrome')} className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div>
                            <span className="font-medium text-sm block mb-1">Monochrome Integrity</span>
                            <span className="text-xs text-white/40 font-light">Ensures visual distinctiveness in single-color formats.</span>
                        </div>
                        <div className={cn("w-4 h-4 rounded border mt-1 transition-colors flex items-center justify-center", checklist.monochrome ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                            {checklist.monochrome && <Check className="w-3 h-3 text-black" />}
                        </div>
                    </div>

                    <div onClick={() => toggleCheck('cultural')} className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div>
                            <span className="font-medium text-sm block mb-1">Cultural Sensitivity Scan</span>
                            <span className="text-xs text-white/40 font-light">AI-assisted scan for unintended negative connotations.</span>
                        </div>
                        <div className={cn("w-4 h-4 rounded border mt-1 transition-colors flex items-center justify-center", checklist.cultural ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                            {checklist.cultural && <Check className="w-3 h-3 text-black" />}
                        </div>
                    </div>

                     <div onClick={() => toggleCheck('production')} className="flex items-start justify-between p-5 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div>
                            <span className="font-medium text-sm block mb-1">Production Feasibility</span>
                            <span className="text-xs text-white/40 font-light">Checks for gradients/lines that fail in embroidery/vinyl.</span>
                        </div>
                        <div className={cn("w-4 h-4 rounded border mt-1 transition-colors flex items-center justify-center", checklist.production ? "bg-[#FF7F50] border-[#FF7F50]" : "border-white/20")}>
                            {checklist.production && <Check className="w-3 h-3 text-black" />}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* STAGE 4/5: VALIDATION & EXPORT */}
        {stage >= 4 && (
             <div className="text-center py-20 animate-in slide-in-from-right duration-500">
                 <ShieldCheck className="w-16 h-16 text-[#FF7F50] mx-auto mb-6" />
                 <h2 className="text-3xl font-bold mb-4">Ready for Implementation</h2>
                 <p className="text-white/40 mb-8">All protocols validated. Assets are ready for export.</p>
                 <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded hover:bg-white/10 font-mono text-sm">
                    <Download className="w-4 h-4" /> EXPORT_PACKAGE.ZIP
                 </button>
             </div>
        )}
      </div>

      {/* THE SLIDE GATE + BACK NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 p-6 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
            
            <button 
                onClick={prevStage}
                className="h-14 w-14 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all flex-shrink-0"
            >
                <ChevronLeft className="w-5 h-5" />
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
            <div className="font-mono text-xs text-[#FF7F50] mb-2">// FIELD_MANUAL</div>
            <h1 className="text-4xl font-bold mb-4">Operational Directives</h1>
            <p className="text-white/60 font-light text-lg">
                The Threshold Method is not just a tool; it is a governance layer. 
                Adherence to these protocols ensures semiotic integrity.
            </p>
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

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('HOME');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'HOME' && <HomeView onNavigate={setCurrentView} />}
      {currentView === 'LOGIN' && <LoginView onNavigate={setCurrentView} />}
      {currentView === 'DASHBOARD' && <DashboardView onNavigate={setCurrentView} />}
      {currentView === 'PROJECT_WIZARD' && <ProjectWizard onNavigate={setCurrentView} />}
      {currentView === 'PROTOCOLS' && <ProtocolsView />}
    </Layout>
  );
}
