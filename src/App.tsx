import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download, Check, Menu, X, ArrowRight, Palette, Layers, LogIn, LogOut, Plus, FolderOpen, Star, AlertCircle, ArrowLeft, Sparkles, Upload, ExternalLink, Target, Lightbulb, CheckCircle, Rocket, MoreVertical, Archive } from 'lucide-react';
import { MagneticElement } from './components/MagneticElement';

const ThresholdAI = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // App state
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentThreshold, setCurrentThreshold] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({});
  const [expandedHelp, setExpandedHelp] = useState({});
  const [generatingConcepts, setGeneratingConcepts] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [refinementRequests, setRefinementRequests] = useState([]);
  const [deliverySpecs, setDeliverySpecs] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValidation, setFieldValidation] = useState({});

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('thresholdAI_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    const savedUser = localStorage.getItem('thresholdAI_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('thresholdAI_projects', JSON.stringify(projects));
    }
  }, [projects]);

  // Auto-rotate carousel on home page
  useEffect(() => {
    if (currentPage === 'home') {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % 5);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  // Close dropdown menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      dropdowns.forEach(dropdown => {
        const button = dropdown.previousElementSibling;
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const thresholds = [
    {
      id: 1,
      name: 'Strategic Foundation',
      description: 'Define your strategic intent and audience',
      icon: 'target'
    },
    {
      id: 2,
      name: 'Conceptual Clarity',
      description: 'Generate and evaluate concept directions',
      icon: 'lightbulb'
    },
    {
      id: 3,
      name: 'Design Integrity',
      description: 'Refine and validate technical execution',
      icon: 'sparkles'
    },
    {
      id: 4,
      name: 'Final Validation',
      description: 'Stakeholder review and approval',
      icon: 'check-circle'
    },
    {
      id: 5,
      name: 'Implementation Readiness',
      description: 'Prepare delivery specifications',
      icon: 'rocket'
    }
  ];

  const briefQuestions = {
    sectionA: [
      {
        id: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
        help: {
          purpose: 'Clear project identification for organization and reference.',
          examples: ['Good: "The Pelvic Door Healthcare Brand Identity"', 'Avoid: "Logo project"'],
          tips: 'Be specific and descriptive.'
        }
      },
      {
        id: 'audience',
        label: 'Primary Audience',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'Who needs to connect with this work? Understanding the audience shapes every creative decision.',
          examples: [
            'Good: "Women aged 30-50 experiencing pelvic floor issues, seeking evidence-based treatment without stigma"',
            'Avoid: "Everyone" or "General public"'
          ],
          tips: 'Include demographics, psychographics, pain points, and aspirations.'
        }
      },
      {
        id: 'coreMessage',
        label: 'Core Message',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'The single most important thing this work should communicate.',
          examples: [
            'Good: "Pelvic floor health is essential healthcare that deserves expert, compassionate treatment"',
            'Avoid: "We\'re the best"'
          ],
          tips: 'One clear sentence that couldn\'t describe a competitor.'
        }
      },
      {
        id: 'mustEmbody',
        label: 'Must-Embody Keywords (3-5)',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'Non-negotiable qualities that create a quality filter.',
          examples: ['Good: "Evidence-based, compassionate, empowering, professional, approachable"'],
          tips: 'Choose specific, defendable adjectives unique to your strategy.'
        }
      },
      {
        id: 'mustAvoid',
        label: 'Must-Avoid Keywords (3-5)',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'Explicit guardrails that prevent strategic misalignment.',
          examples: ['Good: "Clinical, sterile, patronizing, overly medical, embarrassing"'],
          tips: 'What would cause your audience to disengage?'
        }
      }
    ],
    logoOnly: [
      {
        id: 'brandName',
        label: 'Brand/Organization Name',
        type: 'text',
        required: true,
        help: {
          purpose: 'Exact name as it will appear in the logo.',
          tips: 'Confirm capitalization with client.'
        }
      },
      {
        id: 'symbolism',
        label: 'Symbolic Territory',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'What concepts, objects, or metaphors align with your message?',
          examples: ['Good: "Doorways/thresholds, anatomical accuracy, flowing/organic forms"']
        }
      },
      {
        id: 'applications',
        label: 'Primary Applications',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'Where will this logo live?',
          examples: ['Good: "Website header, business cards, medical forms, social media, embroidered lab coats"']
        }
      }
    ],
    brandIdentity: [
      {
        id: 'brandName',
        label: 'Brand/Organization Name',
        type: 'text',
        required: true
      },
      {
        id: 'symbolism',
        label: 'Symbolic Territory',
        type: 'textarea',
        required: true
      },
      {
        id: 'applications',
        label: 'Primary Applications',
        type: 'textarea',
        required: true
      },
      {
        id: 'brandVoice',
        label: 'Brand Voice & Tone',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'How should this brand sound in written communication?',
          examples: ['Good: "Warm and conversational but authoritative. Uses plain language without being condescending."']
        }
      },
      {
        id: 'colorDirection',
        label: 'Color Direction',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'What color palette supports your strategy?',
          examples: ['Good: "Calming blues/teals (trust, medical) with warm coral accent (approachable, feminine without being stereotypical)"']
        }
      },
      {
        id: 'typographyDirection',
        label: 'Typography Direction',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'What typographic style supports your message?',
          examples: ['Good: "Contemporary sans-serif with soft, open letterforms. Professional but not cold."']
        }
      },
      {
        id: 'brandApplications',
        label: 'Brand System Applications',
        type: 'textarea',
        required: true,
        help: {
          purpose: 'What touchpoints need brand system guidelines?',
          examples: ['Good: "Website, patient materials, business cards, signage, social media templates, email signatures"']
        }
      }
    ]
  };

  // Authentication
  const handleLogin = (email, password) => {
    // Simple mock auth
    const user = { email, name: email.split('@')[0] };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('thresholdAI_user', JSON.stringify(user));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('thresholdAI_user');
    setCurrentPage('home');
  };

  // Project management
  const createNewProject = (type) => {
    const newProject = {
      id: Date.now(),
      type: type,
      name: '',
      createdAt: new Date().toISOString(),
      currentThreshold: 1,
      thresholdData: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
      }
    };
    setCurrentProject(newProject);
    setProjects([...projects, newProject]);
    setCurrentThreshold(1);
    setFormData({});
    setCurrentPage('threshold');
  };

  const saveProjectProgress = () => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        thresholdData: {
          ...currentProject.thresholdData,
          [currentThreshold]: formData
        },
        name: formData.projectName || currentProject.name || 'Untitled Project'
      };
      
      const updatedProjects = projects.map(p => 
        p.id === currentProject.id ? updatedProject : p
      );
      
      setProjects(updatedProjects);
      setCurrentProject(updatedProject);
      
      // Show save confirmation
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2000);
    }
  };

  const completeThreshold = () => {
    saveProjectProgress();
    
    if (currentThreshold < 5) {
      const updatedProject = {
        ...currentProject,
        currentThreshold: currentThreshold + 1
      };
      setCurrentProject(updatedProject);
      setCurrentThreshold(currentThreshold + 1);
      setFormData(updatedProject.thresholdData[currentThreshold + 1] || {});
    } else {
      // Complete the project
      completeProject();
    }
  };

  const goToPreviousThreshold = () => {
    if (currentThreshold > 1) {
      saveProjectProgress();
      setCurrentThreshold(currentThreshold - 1);
      setFormData(currentProject.thresholdData[currentThreshold - 1] || {});
    }
  };

  const jumpToThreshold = (thresholdNum) => {
    // Can only jump to current or completed thresholds
    if (thresholdNum <= currentProject.currentThreshold) {
      saveProjectProgress();
      setCurrentThreshold(thresholdNum);
      setFormData(currentProject.thresholdData[thresholdNum] || {});
    }
  };

  const generateAIConcepts = async () => {
    setGeneratingConcepts(true);
    
    // Build the prompt from the brief
    const briefData = currentProject.thresholdData[1];
    const prompt = `You are a professional brand designer. Based on this creative brief, generate 3 distinct logo concept directions.

PROJECT: ${briefData.projectName || 'Brand Project'}

AUDIENCE: ${briefData.audience || 'Not specified'}

CORE MESSAGE: ${briefData.coreMessage || 'Not specified'}

MUST EMBODY: ${briefData.mustEmbody || 'Not specified'}

MUST AVOID: ${briefData.mustAvoid || 'Not specified'}

SYMBOLIC TERRITORY: ${briefData.symbolism || 'Not specified'}

For each concept, provide:
1. Concept Name (2-3 words)
2. Visual Description (detailed)
3. Strategic Rationale (how it supports the brief)
4. Technical Notes (style, complexity, applications)

Format each concept clearly with headers. Be specific and professional.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      const conceptText = data.content[0].text;
      
      // Parse the concepts (simple parsing - could be improved)
      const conceptSections = conceptText.split(/Concept \d+:/i).filter(s => s.trim());
      const parsedConcepts = conceptSections.map((section, idx) => ({
        id: idx + 1,
        name: `Concept ${idx + 1}`,
        description: section.trim(),
        score: 0,
        selected: false
      }));

      setConcepts(parsedConcepts);
    } catch (error) {
      console.error('Error generating concepts:', error);
      // Fallback to mock concepts
      setConcepts([
        {
          id: 1,
          name: 'The Open Door',
          description: 'A stylized doorway created from organic, flowing lines that suggest anatomical forms without being literal. The negative space forms a subtle pelvic shape. Clean, contemporary, professional yet warm.',
          note: 'For best results, complete all brief sections including target audience, brand positioning, and competitive landscape before finalizing design development.',
          score: 0,
          selected: false
        },
        {
          id: 2,
          name: 'Threshold Mark',
          description: 'An abstract mark combining a door threshold with feminine anatomical curves. Uses soft, rounded geometry to convey approachability. Single-color design ensures versatility across applications.',
          note: 'For best results, complete all brief sections including target audience, brand positioning, and competitive landscape before finalizing design development.',
          score: 0,
          selected: false
        },
        {
          id: 3,
          name: 'Wellness Gateway',
          description: 'Minimalist arch/portal shape with subtle interior detail suggesting transformation and care. Contemporary sans-serif wordmark. Balances medical authority with emotional warmth.',
          note: 'For best results, complete all brief sections including target audience, brand positioning, and competitive landscape before finalizing design development.',
          score: 0,
          selected: false
        }
      ]);
    }
    
    setGeneratingConcepts(false);
  };

  const toggleConceptSelection = (conceptId) => {
    setSelectedConcepts(prev => 
      prev.includes(conceptId) 
        ? prev.filter(id => id !== conceptId)
        : [...prev, conceptId]
    );
  };

  const generateDeliverySpecs = () => {
    const briefData = currentProject.thresholdData[1];
    const clientName = (briefData.brandName || briefData.projectName || 'Client').replace(/\s+/g, '');
    const projectType = currentProject.type === 'logo' ? 'Logo' : 'Brand';
    
    const specs = {
      projectName: briefData.projectName || 'Project',
      clientName: clientName,
      fileFormats: [
        { format: 'AI', description: 'Adobe Illustrator source file (editable)', required: true },
        { format: 'EPS', description: 'Encapsulated PostScript (print-ready vector)', required: true },
        { format: 'SVG', description: 'Scalable Vector Graphics (web-optimized)', required: true },
        { format: 'PNG', description: 'Transparent background (3000x3000px, 300 DPI)', required: true },
        { format: 'PNG', description: 'White background (3000x3000px, 300 DPI)', required: true },
        { format: 'JPG', description: 'Web preview (1200x1200px, 72 DPI)', required: true },
        { format: 'PDF', description: 'Print-ready PDF (outlined fonts)', required: true }
      ],
      colorSpecs: {
        primary: ['RGB: Will be defined in final files', 'CMYK: Will be defined in final files', 'HEX: Will be defined in final files'],
        note: 'Pantone colors can be specified if needed for brand consistency'
      },
      sizeRequirements: {
        minimum: '0.5 inches (print) / 32px (digital)',
        maximum: 'Scalable to any size',
        clearSpace: 'Minimum clear space equal to the height of one letter'
      },
      usageGuidelines: [
        'DO use approved color variations only',
        'DO maintain minimum clear space',
        'DO use provided file formats',
        'DON\'T distort, rotate, or modify proportions',
        'DON\'T add effects, shadows, or outlines',
        'DON\'T use low-resolution files for print'
      ],
      fileNaming: {
        pattern: `${clientName}_${projectType}_[Variation]_[Format]`,
        examples: [
          `${clientName}_${projectType}_Brief.pdf`,
          `${clientName}_${projectType}_FullColor.png`,
          `${clientName}_${projectType}_OneColor.svg`,
          `${clientName}_BrandGuidelines.pdf`
        ]
      }
    };
    setDeliverySpecs(specs);
  };

  const completeProject = () => {
    saveProjectProgress();
    const updatedProject = {
      ...currentProject,
      completed: true,
      completedAt: new Date().toISOString()
    };
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    setCurrentPage('completion');
  };

  const loadProject = (project) => {
    setCurrentProject(project);
    setCurrentThreshold(project.currentThreshold);
    setFormData(project.thresholdData[project.currentThreshold] || {});
    setCurrentPage('threshold');
  };

  const archiveProject = (projectId) => {
    const updatedProjects = projects.map(p => 
      p.id === projectId ? { ...p, archived: true } : p
    );
    setProjects(updatedProjects);
  };

  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('thresholdAI_projects', JSON.stringify(updatedProjects));
    }
  };

  const duplicateProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      name: `${project.name} (Copy)`,
      createdAt: new Date().toISOString(),
      completed: false,
      currentThreshold: 1
    };
    setProjects(prev => [newProject, ...prev]);
  };

  // UI Helpers
  const toggleHelp = (questionId) => {
    setExpandedHelp(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleInputChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error when user starts typing
    if (fieldErrors[questionId]) {
      setFieldErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
    
    // Validate field
    if (value && value.trim().length > 0) {
      setFieldValidation(prev => ({
        ...prev,
        [questionId]: true
      }));
    } else {
      setFieldValidation(prev => ({
        ...prev,
        [questionId]: false
      }));
    }
  };

  const validateField = (question) => {
    const value = formData[question.id];
    if (question.required && (!value || value.trim().length === 0)) {
      setFieldErrors(prev => ({
        ...prev,
        [question.id]: 'This field is required'
      }));
      return false;
    }
    return true;
  };

  const renderQuestion = (question) => {
    const hasError = fieldErrors[question.id];
    const isValid = fieldValidation[question.id];
    const inputClasses = `w-full px-4 py-3 bg-[#0A0A0A] border rounded text-white text-[14px] focus:outline-none transition-all placeholder:text-white/30 ${
      hasError 
        ? 'border-red-500/50 focus:border-red-500' 
        : isValid 
        ? 'border-green-500/30 focus:border-[#FF7A1A]'
        : 'border-white/10 focus:border-[#FF7A1A] focus:shadow-[0_0_0_3px_rgba(255,122,26,0.1)]'
    }`;
    
    return (
      <div key={question.id} className="mb-8">
        <label className="block text-white mb-3 text-[14px]">
          {question.label}
          {question.required && <span className="text-[#FF7A1A] ml-1">*</span>}
        </label>
        
        {/* Persistent helper text instead of toggle */}
        {question.help && question.help.purpose && (
          <div className="mb-3 p-4 bg-white/[0.02] border border-white/[0.05] rounded-md">
            <p className="text-[12px] text-white/60 leading-relaxed">
              {question.help.purpose}
            </p>
            {question.help.tips && (
              <p className="text-[11px] text-white/50 mt-2 italic">
                💡 {question.help.tips}
              </p>
            )}
          </div>
        )}
        
        <div className="relative">
          {question.type === 'textarea' ? (
            <textarea
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              onBlur={() => question.required && validateField(question)}
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder={`Enter ${question.label.toLowerCase()}...`}
            />
          ) : (
            <input
              type="text"
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              onBlur={() => question.required && validateField(question)}
              className={inputClasses}
              placeholder={`Enter ${question.label.toLowerCase()}...`}
            />
          )}
          
          {/* Validation indicator */}
          {isValid && !hasError && (
            <div className="absolute right-3 top-3">
              <Check size={18} className="text-green-500" />
            </div>
          )}
        </div>
        
        {/* Error message */}
        {hasError && (
          <p className="mt-2 text-[12px] text-red-400 flex items-center gap-1">
            <AlertCircle size={14} />
            {hasError}
          </p>
        )}
        
        {/* Examples - collapsible */}
        {question.help && question.help.examples && (
          <details className="mt-3">
            <summary className="cursor-pointer mono text-[10px] text-white/50 hover:text-white/70 uppercase tracking-wider transition-colors">
              View Examples
            </summary>
            <ul className="text-[12px] text-white/60 space-y-1.5 ml-4 mt-2">
              {question.help.examples.map((ex, i) => (
                <li key={i} className="before:content-['—'] before:mr-2 before:text-white/40">{ex}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    );
  };

  // Navigation Component
  const NavBar = () => (
    <nav className="sticky top-0 left-0 right-0 nav-blur z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity group"
          >
            {/* Minimal threshold symbol logo */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all">
              <path d="M4 4L4 20M20 4L20 20M8 4L8 20M16 4L16 20" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
              <path d="M8 12L16 12" stroke="#FF7A1A" strokeWidth="1.5" strokeLinecap="square" className="group-hover:drop-shadow-[0_0_6px_rgba(255,122,26,0.8)]"/>
            </svg>
            <span className="text-[14px] font-semibold tracking-wide">THRESHOLD</span>
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  HOME
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  FRAMEWORK
                </button>
                <button 
                  onClick={() => setCurrentPage('resources')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  RESOURCES
                </button>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="login-pill text-white/80 hover:text-white transition-all text-[13px] mono"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  HOME
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  FRAMEWORK
                </button>
                <button 
                  onClick={() => setCurrentPage('resources')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  RESOURCES
                </button>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-white/60 hover:text-white transition-colors text-[13px] mono"
                >
                  DASHBOARD
                </button>
                <button 
                  onClick={handleLogout}
                  className="login-pill text-white/80 hover:text-white transition-all flex items-center gap-2"
                >
                  <LogOut size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  // Page Components
  const HomePage = () => (
    <div>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      <section className="relative overflow-hidden bg-[#000000] py-32 px-4 min-h-[90vh] flex items-center">
        {/* Subtle light accents */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-white"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 70%)' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="mb-12">
              <div className="threshold-line max-w-md mx-auto mb-8"></div>
            </div>
            <h1 className="text-white mb-8 text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none" style={{ letterSpacing: '-0.03em' }}>
              Threshold
            </h1>
            <p className="text-white/90 mb-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
              Intentional checkpoints. Creative integrity.
            </p>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-12 text-sm">
              AI-augmented creative workflows with built-in strategic guardrails. 
              Five validated thresholds ensure your creative work stays aligned with strategy.
            </p>
            <div className="flex flex-col items-center gap-4">
              <MagneticElement strength={3}>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#FF7A1A] text-white rounded-md hover:bg-[#FF7A1A]/90 transition-all text-base font-medium shadow-[0_0_20px_rgba(255,122,26,0.3)] hover:shadow-[0_0_30px_rgba(255,122,26,0.5)]"
                >
                  Start Your Project
                  <ArrowRight size={20} />
                </button>
              </MagneticElement>
              <button 
                onClick={() => setCurrentPage('about')}
                className="text-white/70 hover:text-white transition-colors text-sm underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
              >
                Learn how it works
              </button>
            </div>
            <div className="mt-16">
              <div className="threshold-line max-w-md mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#000000] relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white mb-4 text-center text-3xl md:text-4xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Five Thresholds to Creative Success</h2>
          
          {/* LED Progress Indicator */}
          <div className="led-progress justify-center mb-8">
            {thresholds.map((threshold, index) => (
              <div key={threshold.id} className="flex items-center gap-2">
                <button 
                  onClick={() => setCarouselIndex(index)}
                  className="transition-all hover:scale-110"
                >
                  <div className={`led-dot ${index === carouselIndex ? 'active' : ''}`}></div>
                </button>
                {index < thresholds.length - 1 && <div className="w-16 h-[1px] bg-white/10"></div>}
              </div>
            ))}
          </div>
          
          <p className="text-center text-white/50 mb-12 mono text-xs uppercase tracking-wider">Sequential validation checkpoints</p>
          
          {/* Animated Carousel */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative h-[200px] overflow-hidden">
              {thresholds.map((threshold, index) => {
                const isActive = index === carouselIndex;
                const isPrev = index === (carouselIndex - 1 + 5) % 5;
                const isNext = index === (carouselIndex + 1) % 5;
                
                return (
                  <div 
                    key={threshold.id} 
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : isPrev
                        ? 'opacity-0 -translate-y-12 scale-95'
                        : isNext
                        ? 'opacity-0 translate-y-12 scale-95'
                        : 'opacity-0 translate-y-0 scale-95'
                    }`}
                  >
                    <div className="group flex items-start gap-6 p-6 dark-card">
                      <div className={`flex-shrink-0 mono tracking-wider font-medium leading-none transition-all duration-500 ${
                        isActive ? 'text-[#FF7A1A]' : 'text-white/40'
                      }`} style={{ fontSize: '48px' }}>
                        0{threshold.id}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-semibold tracking-tight mb-2">
                          {threshold.name}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">{threshold.description}</p>
                      </div>
                      <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-3 transition-all duration-500 ${
                        isActive 
                          ? 'bg-[#FF7A1A] shadow-[0_0_8px_rgba(255,122,26,0.6)]' 
                          : 'bg-white/20'
                      }`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation dots */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-center gap-2">
              {thresholds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`w-1 h-1 rounded-full transition-all ${
                    index === carouselIndex ? 'bg-[#FF7A1A] w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#000000] relative">
        <div className="threshold-line absolute top-0 left-0 right-0"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4 text-3xl md:text-4xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Ready to build with confidence?</h2>
          <p className="text-white/60 mb-10 text-base">Join creative professionals using validated AI workflows.</p>
          <MagneticElement strength={3}>
            <button 
              onClick={() => setCurrentPage('login')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black rounded-md hover:bg-white/90 transition-all text-base font-medium btn-light ripple-effect"
            >
              Start Your First Project
              <ArrowRight size={20} />
            </button>
          </MagneticElement>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] gradient-border-top py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h4 className="text-white mb-4 font-semibold text-[14px]">Product</h4>
              <div className="space-y-2.5">
                <button onClick={() => setCurrentPage('about')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Framework</button>
                <button onClick={() => setCurrentPage('resources')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Templates</button>
                <button onClick={() => setCurrentPage('login')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Pricing</button>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-4 font-semibold text-[14px]">Company</h4>
              <div className="space-y-2.5">
                <button onClick={() => setCurrentPage('about')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">About</button>
                <a href="#" className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Blog</a>
                <a href="#" className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-4 font-semibold text-[14px]">Resources</h4>
              <div className="space-y-2.5">
                <button onClick={() => setCurrentPage('resources')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Documentation</button>
                <button onClick={() => setCurrentPage('resources')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Guides</button>
                <button onClick={() => setCurrentPage('resources')} className="block text-white/50 hover:text-white/80 transition-colors text-[13px]">Case Studies</button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6">
            <p className="text-white/40 text-[12px] text-center mono">© 2025 Threshold. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-[#000000] flex items-center px-4 relative">
        <div className="noise-overlay" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #FF7A1A 0%, transparent 70%)' }}></div>
        
        <div className="max-w-md mx-auto w-full relative z-10">
          <div className="glass-panel p-10">
            <div className="text-center mb-8">
              {/* Threshold symbol */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
                <path d="M4 4L4 20M20 4L20 20M8 4L8 20M16 4L16 20" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
                <path d="M8 12L16 12" stroke="#FF7A1A" strokeWidth="1.5" strokeLinecap="square" className="drop-shadow-[0_0_8px_rgba(255,122,26,0.8)]"/>
              </svg>
              <h1 className="text-white mb-3 text-[28px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Welcome to Threshold</h1>
              <p className="text-white/60 text-[14px]">Sign in to access your projects</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block mono text-white/80 mb-2">EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:ring-1 focus:ring-[#FF7A1A] focus:border-[#FF7A1A] text-white placeholder-white/30 text-[14px] transition-all"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block mono text-white/80 mb-2">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:ring-1 focus:ring-[#FF7A1A] focus:border-[#FF7A1A] text-white placeholder-white/30 text-[14px] transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <MagneticElement strength={2}>
                <button
                  onClick={() => handleLogin(email, password)}
                  className="w-full px-6 py-3.5 bg-white text-black rounded-md hover:bg-white/90 transition-all font-medium text-[14px] mt-6 btn-light ripple-effect"
                >
                  SIGN IN
                </button>
              </MagneticElement>
              
              <p className="text-[12px] text-center text-white/50 pt-2 mono">
                DEMO: ENTER ANY EMAIL AND PASSWORD
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => (
    <div className="min-h-screen bg-[#000000] relative">
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-16">
        <div className="mb-12">
          <div className="threshold-line max-w-xs mb-6"></div>
          <h1 className="text-white mb-2 text-[40px] font-semibold tracking-tight leading-none" style={{ letterSpacing: '-0.02em' }}>My Projects</h1>
          <p className="text-white/60 text-[14px]">Continue where you left off or start something new</p>
        </div>

        {projects.length > 0 && (
          <div className="mb-16">
            <span className="mono text-[#FF7A1A] text-[10px] tracking-wider mb-4 block">RECENT ACTIVITY</span>
            <h2 className="text-white mb-8 text-[24px] font-semibold">Recent Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.filter(p => !p.archived).map((project) => (
                <MagneticElement key={project.id} strength={3}>
                  <div
                    className="recent-card relative"
                  >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-[16px] mb-1 truncate">
                        {project.name || 'Untitled Project'}
                      </h3>
                      <p className="mono text-[11px] text-[#FF7A1A] uppercase tracking-wide">
                        {project.type === 'logo' ? 'Logo Design' : 'Brand Identity'}
                      </p>
                    </div>
                    {project.completed ? (
                      <span className="status-pill complete flex-shrink-0">COMPLETE</span>
                    ) : (
                      <span className="status-pill in-progress flex-shrink-0">ACTIVE</span>
                    )}
                  </div>
                  
                  {!project.completed && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="mono text-[11px] text-white/50 uppercase tracking-wide">Progress</span>
                        <span className="mono text-[11px] text-white/70">{Math.round((project.currentThreshold / 5) * 100)}%</span>
                      </div>
                      <div className="bg-white/5 rounded-sm h-1">
                        <div
                          className="bg-[#FF7A1A] h-1 rounded-sm transition-all"
                          style={{ 
                            width: `${(project.currentThreshold / 5) * 100}%`,
                            boxShadow: '0 0 8px rgba(255, 122, 26, 0.6)'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (project.completed) {
                          setCurrentProject(project);
                          setCurrentPage('project-detail');
                        } else {
                          loadProject(project);
                        }
                      }}
                      className="flex-1 px-4 py-2.5 glass-panel text-white rounded-md transition-all text-[13px] font-medium mono btn-light"
                    >
                      {project.completed ? 'VIEW' : 'CONTINUE'}
                    </button>
                    
                    {/* Project actions menu */}
                    <div className="relative">
                      <button
                        className="px-3 py-2.5 glass-panel text-white rounded-md transition-all hover:border-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          const menu = e.currentTarget.nextElementSibling;
                          menu.classList.toggle('hidden');
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      <div className="dropdown-menu hidden absolute right-0 top-full mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-md overflow-hidden z-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateProject(project);
                            e.currentTarget.parentElement.classList.add('hidden');
                          }}
                          className="w-full px-4 py-2.5 text-left text-white/70 hover:text-white hover:bg-white/5 transition-colors text-[12px]"
                        >
                          Duplicate Project
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            archiveProject(project.id);
                            e.currentTarget.parentElement.classList.add('hidden');
                          }}
                          className="w-full px-4 py-2.5 text-left text-white/70 hover:text-white hover:bg-white/5 transition-colors text-[12px]"
                        >
                          Archive Project
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                            e.currentTarget.parentElement.classList.add('hidden');
                          }}
                          className="w-full px-4 py-2.5 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-[12px]"
                        >
                          Delete Project
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                </MagneticElement>
              ))}
            </div>
            {/* View Archived Link */}
            {projects.filter(p => p.archived).length > 0 && (
              <div className="mt-8">
                <button
                  onClick={() => setCurrentPage('archived')}
                  className="flex items-center gap-3 group"
                >
                  <span className="mono text-white/40 text-[10px] tracking-wider uppercase group-hover:text-[#FF7A1A] transition-colors">Archived</span>
                  <Archive size={16} className="text-white/40 group-hover:text-[#FF7A1A] transition-colors" />
                </button>
              </div>
            )}
            <div className="threshold-line mt-16 mb-12"></div>
          </div>
        )}

        <span className="mono text-[#FF7A1A] text-[10px] tracking-wider mb-4 block">START NEW PROJECT</span>
        <h2 className="text-white mb-8 text-[24px] font-semibold">Choose a Project Type</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <MagneticElement>
            <button
              onClick={() => createNewProject('logo')}
              className="project-card text-left group w-full"
            >
              <span className="mono text-[#FF7A1A] text-[10px] tracking-wider mb-2 block">01 / PROJECT TYPE</span>
              <h3 className="text-white mb-3 text-[20px] font-semibold">Logo Design</h3>
              <p className="text-white/60 mb-6 text-[14px] leading-relaxed">Create a distinctive brand mark with strategic clarity</p>
              <div className="flex items-center gap-1.5 text-white/70 font-medium text-[13px] mono">
                <Plus size={16} strokeWidth={2} />
                <span>NEW PROJECT</span>
              </div>
            </button>
          </MagneticElement>

          <MagneticElement>
            <button
              onClick={() => createNewProject('brand')}
              className="project-card text-left group w-full"
            >
              <span className="mono text-[#FF7A1A] text-[10px] tracking-wider mb-2 block">02 / PROJECT TYPE</span>
              <h3 className="text-white mb-3 text-[20px] font-semibold">Brand Identity</h3>
              <p className="text-white/60 mb-6 text-[14px] leading-relaxed">Develop a comprehensive brand system with guidelines</p>
              <div className="flex items-center gap-1.5 text-white/70 font-medium text-[13px] mono">
                <Plus size={16} strokeWidth={2} />
                <span>NEW PROJECT</span>
              </div>
            </button>
          </MagneticElement>

          <div className="project-card dimmed text-left">
            <span className="mono text-white/30 text-[10px] tracking-wider mb-2 block">03 / PROJECT TYPE</span>
            <h3 className="text-white/50 mb-3 text-[20px] font-semibold">Web Design</h3>
            <p className="text-white/40 mb-6 text-[14px] leading-relaxed">Design comprehensive website experiences</p>
            <span className="status-pill inline-block">Coming Soon</span>
          </div>

          <div className="project-card dimmed text-left">
            <span className="mono text-white/30 text-[10px] tracking-wider mb-2 block">04 / PROJECT TYPE</span>
            <h3 className="text-white/50 mb-3 text-[20px] font-semibold">Social Media Content</h3>
            <p className="text-white/40 mb-6 text-[14px] leading-relaxed">Create engaging social media campaigns</p>
            <span className="status-pill inline-block">Coming Soon</span>
          </div>

          <div className="project-card dimmed text-left">
            <span className="mono text-white/30 text-[10px] tracking-wider mb-2 block">05 / PROJECT TYPE</span>
            <h3 className="text-white/50 mb-3 text-[20px] font-semibold">Publication Design</h3>
            <p className="text-white/40 mb-6 text-[14px] leading-relaxed">Design books, magazines, and reports</p>
            <span className="status-pill inline-block">Coming Soon</span>
          </div>

          <div className="project-card dimmed text-left">
            <span className="mono text-white/30 text-[10px] tracking-wider mb-2 block">06 / PROJECT TYPE</span>
            <h3 className="text-white/50 mb-3 text-[20px] font-semibold">Copywriting</h3>
            <p className="text-white/40 mb-6 text-[14px] leading-relaxed">Craft compelling brand messaging</p>
            <span className="status-pill inline-block">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CompletionPage = () => (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-[#000000] relative">
      <div className="noise-overlay" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <h1 className="text-white mb-6 text-[32px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Project Complete</h1>
          <div className="inline-flex w-20 h-20 wireframe-circle active mb-6">
            <CheckCircle size={32} className="text-white" strokeWidth={1.5} />
          </div>
          <p className="text-white/70 mb-2 text-[15px]">
            {currentProject?.name || 'Your project'} is ready for delivery
          </p>
          <p className="mono text-white/40 text-[10px] uppercase tracking-wider">
            Completed {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="glass-panel p-8 mb-8 text-left">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="mono text-[#FF7A1A] text-[10px] uppercase tracking-wider">Package</span>
            <div className="threshold-line flex-1"></div>
          </div>
          <h2 className="text-white mb-6 text-[20px] font-semibold">Your Complete Package Includes:</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Check className="text-white/70 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="text-white text-[15px]">Strategic Brief</div>
                <div className="text-[13px] text-white/60">Complete strategic foundation and project requirements</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="text-white/70 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="text-white text-[15px]">Concept Development</div>
                <div className="text-[13px] text-white/60">AI-generated concepts with evaluation criteria</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="text-white/70 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="text-white text-[15px]">Refined Design Assets</div>
                <div className="text-[13px] text-white/60">Technically validated and refined final designs</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="text-white/70 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="text-white text-[15px]">Presentation Materials</div>
                <div className="text-[13px] text-white/60">Stakeholder presentation templates and rationale</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Check className="text-white/70 mt-1 flex-shrink-0" size={20} strokeWidth={1.5} />
              <div>
                <div className="text-white text-[15px]">Delivery Specifications</div>
                <div className="text-[13px] text-white/60">Complete technical specs, file formats, and usage guidelines</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded hover:bg-white/90 transition-all btn-light text-[14px] font-medium">
            <Download size={18} />
            Download Documentation
          </button>
          <button 
            onClick={() => {
              setCurrentProject(projects.find(p => p.id === currentProject.id));
              setCurrentPage('project-detail');
            }}
            className="px-8 py-3.5 border border-white/10 text-white rounded hover:border-white/20 transition-all text-[14px]"
          >
            View Project Details
          </button>
        </div>

        <div className="mt-12 p-6 dark-card">
          <p className="text-[13px] text-white/70">
            <span className="text-white">What&apos;s next?</span> Review your completed project anytime from your dashboard, or start a new project to continue building with Threshold.
          </p>
        </div>
      </div>
    </div>
  );

  const ArchivedPage = () => (
    <div className="pt-24 pb-16 px-4 min-h-screen bg-[#000000] relative">
      <div className="noise-overlay" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <span className="mono text-white/40 text-[10px] tracking-wider mb-4 block">ARCHIVED</span>
            <h1 className="text-white mb-2 text-[32px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Archived Projects</h1>
            <p className="text-white/60 text-[14px]">Projects you've archived are stored here</p>
          </div>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-4 py-2.5 glass-panel text-white rounded-md transition-all text-[13px] font-medium mono btn-light"
          >
            ← BACK TO DASHBOARD
          </button>
        </div>

        {projects.filter(p => p.archived).length === 0 ? (
          <div className="text-center py-24">
            <Archive size={48} className="text-white/20 mx-auto mb-6" />
            <p className="text-white/40 text-[14px]">No archived projects</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.filter(p => p.archived).map((project) => (
              <div key={project.id} className="recent-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-[16px] mb-1 truncate">
                      {project.name || 'Untitled Project'}
                    </h3>
                    <p className="mono text-[11px] text-white/40 uppercase tracking-wide">
                      {project.type === 'logo' ? 'Logo Design' : 'Brand Identity'}
                    </p>
                  </div>
                  <Archive size={16} className="text-white/40" />
                </div>
                
                {!project.completed && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="mono text-[10px] text-white/40 uppercase tracking-wider">Progress</span>
                      <span className="mono text-[10px] text-white/60">{project.currentThreshold}/5</span>
                    </div>
                    <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#FF7A1A] transition-all"
                        style={{ 
                          width: `${(project.currentThreshold / 5) * 100}%`,
                          boxShadow: '0 0 8px rgba(255, 122, 26, 0.6)'
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (project.completed) {
                        setCurrentProject(project);
                        setCurrentPage('project-detail');
                      } else {
                        loadProject(project);
                      }
                    }}
                    className="flex-1 px-4 py-2.5 glass-panel text-white rounded-md transition-all text-[13px] font-medium mono btn-light"
                  >
                    VIEW
                  </button>
                  
                  <button
                    onClick={() => archiveProject(project.id)}
                    className="px-4 py-2.5 glass-panel text-white rounded-md transition-all text-[13px] font-medium hover:border-[#FF7A1A] hover:text-[#FF7A1A]"
                  >
                    RESTORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ProjectDetailPage = () => {
    if (!currentProject) return null;

    const briefData = currentProject.thresholdData[1] || {};
    const conceptData = currentProject.thresholdData[2] || {};
    const refinementData = currentProject.thresholdData[3] || {};
    const presentationData = currentProject.thresholdData[4] || {};
    const deliveryData = currentProject.thresholdData[5] || {};

    const components = [
      {
        id: 'brief',
        title: 'Strategic Brief',
        icon: Target,
        description: 'Complete strategic foundation and project requirements',
        hasData: Object.keys(briefData).length > 0,
        fileName: 'Strategic_Brief.pdf'
      },
      {
        id: 'concepts',
        title: 'Concept Directions',
        icon: Lightbulb,
        description: 'AI-generated concepts with evaluation criteria',
        hasData: Object.keys(conceptData).length > 0,
        fileName: 'Concept_Directions.pdf'
      },
      {
        id: 'refinements',
        title: 'Design Refinements',
        icon: Sparkles,
        description: 'Technical validation and refined design assets',
        hasData: Object.keys(refinementData).length > 0,
        fileName: 'Design_Refinements.pdf'
      },
      {
        id: 'presentation',
        title: 'Presentation Materials',
        icon: CheckCircle,
        description: 'Stakeholder presentation and validation',
        hasData: Object.keys(presentationData).length > 0,
        fileName: 'Presentation_Materials.pdf'
      },
      {
        id: 'delivery',
        title: 'Delivery Specifications',
        icon: Rocket,
        description: 'Technical specs, file formats, and usage guidelines',
        hasData: Object.keys(deliveryData).length > 0,
        fileName: 'Delivery_Specifications.pdf'
      },
      {
        id: 'documentation',
        title: 'Project Documentation',
        icon: FolderOpen,
        description: 'Complete project notes, decisions, and process documentation',
        hasData: currentProject.completed,
        fileName: 'Project_Documentation.pdf'
      }
    ];

    return (
      <div className="pt-24 pb-16 px-4 min-h-screen bg-[#000000] relative">
        <div className="noise-overlay" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Project Header */}
          <div className="mb-12">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-2 text-[#FF7A1A] hover:text-[#FF9A4A] mb-6 transition-colors text-[14px]"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  {currentProject.type === 'logo' ? (
                    <Palette className="text-white/70" size={28} strokeWidth={1.5} />
                  ) : (
                    <Layers className="text-white/70" size={28} strokeWidth={1.5} />
                  )}
                  <h1 className="text-white text-[32px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                    {currentProject.name || 'Untitled Project'}
                  </h1>
                  {currentProject.completed && (
                    <span className="px-3 py-1.5 border border-white/20 text-white rounded flex items-center gap-1.5 text-[12px]">
                      <Check size={14} strokeWidth={1.5} />
                      Complete
                    </span>
                  )}
                </div>
                <p className="mono text-white/50 text-[10px] uppercase tracking-wider">
                  {currentProject.type === 'logo' ? 'Logo Design' : 'Brand Identity'} • 
                  Created {new Date(currentProject.createdAt).toLocaleDateString()}
                  {currentProject.completed && ` • Completed ${new Date(currentProject.completedAt).toLocaleDateString()}`}
                </p>
              </div>
              
              {!currentProject.completed && (
                <button
                  onClick={() => {
                    loadProject(currentProject);
                    setCurrentPage('threshold');
                  }}
                  className="px-6 py-3 bg-white text-black rounded hover:bg-white/90 transition-all btn-light text-[14px] font-medium"
                >
                  Continue Working
                </button>
              )}
            </div>
          </div>

          {/* Project Components Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {components.map((component) => {
              return (
                <div
                  key={component.id}
                  className={`dark-card ${!component.hasData ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">
                        {component.title}
                      </h3>
                      <p className="text-sm text-white/60">
                        {component.description}
                      </p>
                    </div>
                  </div>
                  {component.hasData && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          if (component.id !== 'documentation') {
                            const thresholdMap = {
                              'brief': 1,
                              'concepts': 2,
                              'refinements': 3,
                              'presentation': 4,
                              'delivery': 5
                            };
                            setCurrentThreshold(thresholdMap[component.id]);
                            setFormData(currentProject.thresholdData[thresholdMap[component.id]] || {});
                            setCurrentPage('threshold');
                          }
                        }}
                        disabled={component.id === 'documentation'}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-panel text-white rounded-md transition-all text-[13px] font-medium mono ${
                          component.id === 'documentation'
                            ? 'opacity-50 cursor-not-allowed'
                            : 'btn-light'
                        }`}
                      >
                        <ArrowRight size={16} />
                        View
                      </button>
                      <button
                        onClick={() => {
                          // Download individual file
                          console.log(`Downloading ${component.fileName}`);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-all text-[13px] font-medium mono btn-light"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Download Options */}
          {currentProject.completed && (
            <div className="dark-card bg-white/5">
              <h2 className="text-white mb-4">Download All Project Files</h2>
              <p className="text-white/70 mb-6">
                Download a complete ZIP package containing all project deliverables: strategic brief, concepts, refinements, presentation materials, delivery specifications, and project documentation.
              </p>
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-md hover:bg-white/90 transition-all btn-light">
                <Download size={24} />
                Download Project Files
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div>
      <section className="gradient-banner py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-white mb-6 text-[48px] md:text-[56px] font-bold tracking-tight leading-none">About Threshold</h1>
            <p className="text-white/80 max-w-3xl mx-auto leading-relaxed text-[17px]">
              A strategic framework for AI-augmented creative work that preserves human judgment at critical decision points.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-white mb-6">The Problem We Solve</h2>
            <p className="text-white/70 mb-4 leading-relaxed">
              AI tools promise to accelerate creative work, but without strategic guardrails, they often produce generic, 
              misaligned outputs that require extensive revision. Creative professionals need a way to harness AI's power 
              while maintaining creative integrity and strategic alignment.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-white mb-6">The Threshold Method</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              The Threshold Method introduces five intentional checkpoints—or "thresholds"—that require human validation 
              before AI assistance can proceed. Each threshold serves as a quality gate, ensuring that AI outputs align 
              with strategic intent at every stage of the creative process.
            </p>
            
            <div className="space-y-6">
              <div className="dark-card flex items-start gap-6">
                <div className="mono text-[#FF7A1A] tracking-wider font-medium leading-none flex-shrink-0" style={{ fontSize: '48px' }}>
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[18px] font-semibold">
                    Strategic Foundation
                  </h3>
                  <p className="text-white/60 text-[14px]">
                    Define audience, core message, and strategic guardrails before any AI generation begins. 
                    This prevents the "garbage in, garbage out" problem.
                  </p>
                </div>
              </div>

              <div className="dark-card flex items-start gap-6">
                <div className="mono text-[#FF7A1A] tracking-wider font-medium leading-none flex-shrink-0" style={{ fontSize: '48px' }}>
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[18px] font-semibold">
                    Conceptual Clarity
                  </h3>
                  <p className="text-white/60 text-[14px]">
                    Generate and evaluate concept directions against your strategic brief. AI proposes; humans decide.
                  </p>
                </div>
              </div>

              <div className="dark-card flex items-start gap-6">
                <div className="mono text-[#FF7A1A] tracking-wider font-medium leading-none flex-shrink-0" style={{ fontSize: '48px' }}>
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[18px] font-semibold">
                    Design Integrity
                  </h3>
                  <p className="text-white/60 text-[14px]">
                    Validate technical execution and refine selected concepts. AI assists with technical variations 
                    while humans ensure strategic alignment.
                  </p>
                </div>
              </div>

              <div className="dark-card flex items-start gap-6">
                <div className="mono text-[#FF7A1A] tracking-wider font-medium leading-none flex-shrink-0" style={{ fontSize: '48px' }}>
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[18px] font-semibold">
                    Final Validation
                  </h3>
                  <p className="text-white/60 text-[14px]">
                    Stakeholder review and approval with AI-powered presentation tools. Strategic rationale remains 
                    human-authored.
                  </p>
                </div>
              </div>

              <div className="dark-card flex items-start gap-6">
                <div className="mono text-[#FF7A1A] tracking-wider font-medium leading-none flex-shrink-0" style={{ fontSize: '48px' }}>
                  05
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[18px] font-semibold">
                    Implementation Readiness
                  </h3>
                  <p className="text-white/60 text-[14px]">
                    Generate comprehensive delivery specifications. AI handles technical documentation; humans verify completeness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-white mb-6">Core Principles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="dark-card">
                <h3 className="text-white mb-3">Human-Led Strategy</h3>
                <p className="text-white/60">
                  AI assists with execution, but strategic decisions—audience understanding, message clarity, 
                  concept selection—remain human responsibilities.
                </p>
              </div>

              <div className="dark-card">
                <h3 className="text-white mb-3">Intentional Checkpoints</h3>
                <p className="text-white/60">
                  Each threshold requires explicit human validation before proceeding. No automation without verification.
                </p>
              </div>

              <div className="dark-card">
                <h3 className="text-white mb-3">Quality Filters</h3>
                <p className="text-white/60">
                  Must-embody and must-avoid keywords create clear criteria for evaluating AI outputs against strategic intent.
                </p>
              </div>

              <div className="dark-card">
                <h3 className="text-white mb-3">Documented Rationale</h3>
                <p className="text-white/60">
                  Every decision is documented, creating a clear audit trail from strategic input to final deliverable.
                </p>
              </div>
            </div>
          </div>

          <div className="dark-card bg-white/5">
            <h2 className="text-white mb-4">Built for Creative Professionals</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Threshold is designed for designers, brand strategists, and creative directors who want to leverage 
              AI without sacrificing creative integrity. Whether you're an independent practitioner or part of an agency, 
              our framework ensures your work remains strategically sound and authentically yours.
            </p>
            <button 
              onClick={() => setCurrentPage('login')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-white/90 transition-all btn-light ripple-effect"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ResourcesPage = () => (
    <div className="bg-[#000000] min-h-screen relative">
      <div className="noise-overlay" />
      
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="threshold-line max-w-md mx-auto mb-8"></div>
            <h1 className="text-white mb-4 text-[40px] md:text-[48px] font-semibold tracking-tight leading-none" style={{ letterSpacing: '-0.02em' }}>Resources</h1>
            <p className="text-white/60 max-w-3xl mx-auto leading-relaxed text-[14px]">
              Tools, templates, and guides to help you implement the Threshold Method in your creative practice.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <div className="threshold-line absolute top-0 left-0 right-0"></div>
        <div className="max-w-6xl mx-auto">
          {/* AI Tools */}
          <div className="mb-16">
            <span className="mono text-white/40 text-[10px] tracking-wider mb-4 block uppercase">Recommended Tools</span>
            <h2 className="text-white mb-4 text-[24px] font-semibold">AI Tools</h2>
            <p className="text-white/60 mb-8 text-[14px]">
              Curated AI tools that work well within the Threshold Method framework.
            </p>
            <div className="space-y-0">
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Claude</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Strategic copywriting, concept development, and design rationale
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://chat.openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">ChatGPT</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Brainstorming, brief refinement, and presentation outlines
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://gamma.app"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Gamma</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    AI-powered presentation builder for stakeholder presentations
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://notebooklm.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">NotebookLM</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Generate study guides, FAQs, and presentation notes from your brief
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.midjourney.com"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Midjourney</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Visual concept generation and stylistically aligned imagery
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.figma.com/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Figma AI</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    AI-powered design assistance for rapid prototyping
                  </p>
                </div>
                <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Templates */}
          <div className="mb-16">
            <div className="threshold-line mb-12"></div>
            <span className="mono text-white/40 text-[10px] tracking-wider mb-4 block uppercase">Downloads</span>
            <h2 className="text-white mb-4 text-[24px] font-semibold">Templates & Downloads</h2>
            <p className="text-white/60 mb-8 text-[14px]">
              Ready-to-use templates for implementing the Threshold Method in your workflow.
            </p>
            <div className="space-y-0">
              <button className="resource-card flex items-center gap-6 group text-left w-full">
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Strategic Brief Template</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Complete fillable PDF for offline strategic brief completion
                  </p>
                  <span className="mono text-white/40 text-[10px] uppercase tracking-wider">PDF</span>
                </div>
                <Download size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </button>

              <button className="resource-card flex items-center gap-6 group text-left w-full">
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Project SOP Template</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Standard Operating Procedure for agency integration
                  </p>
                  <span className="mono text-white/40 text-[10px] uppercase tracking-wider">DOCX</span>
                </div>
                <Download size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </button>

              <button className="resource-card flex items-center gap-6 group text-left w-full">
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Concept Evaluation Rubric</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Scoring framework for objective concept evaluation
                  </p>
                  <span className="mono text-white/40 text-[10px] uppercase tracking-wider">PDF</span>
                </div>
                <Download size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </button>

              <button className="resource-card flex items-center gap-6 group text-left w-full">
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-white text-[16px] font-semibold">Project Timeline Template</h3>
                  <p className="text-white/60 text-[13px] flex-1">
                    Excel template with recommended threshold timelines
                  </p>
                  <span className="mono text-white/40 text-[10px] uppercase tracking-wider">XLSX</span>
                </div>
                <Download size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="mb-16">
            <div className="threshold-line mb-12"></div>
            <span className="mono text-white/40 text-[10px] tracking-wider mb-4 block uppercase">Learning</span>
            <h2 className="text-white mb-8 text-[24px] font-semibold">Learning Resources</h2>
            <div className="space-y-0">
              <div className="resource-card flex items-start gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 border border-white/10 rounded flex items-center justify-center">
                  <Lightbulb className="text-white/70" size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[16px] font-semibold">Best Practices Guide</h3>
                  <p className="text-[13px] text-white/60 mb-3">
                    Learn how to write effective must-embody and must-avoid keywords, craft strategic prompts, 
                    and evaluate AI outputs against your brief.
                  </p>
                  <button className="text-[12px] text-white/70 hover:text-white transition-colors">
                    Read Guide &rarr;
                  </button>
                </div>
              </div>

              <div className="resource-card flex items-start gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 border border-white/10 rounded flex items-center justify-center">
                  <Target className="text-white/70" size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[16px] font-semibold">Case Studies</h3>
                  <p className="text-[13px] text-white/60 mb-3">
                    Real-world examples of the Threshold Method in action. See how creative professionals 
                    use the framework for logo design, brand identity, and web projects.
                  </p>
                  <button className="text-[12px] text-white/70 hover:text-white transition-colors">
                    View Case Studies &rarr;
                  </button>
                </div>
              </div>

              <div className="resource-card flex items-start gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 border border-white/10 rounded flex items-center justify-center">
                  <CheckCircle className="text-white/70" size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-2 text-[16px] font-semibold">Implementation Checklist</h3>
                  <p className="text-[13px] text-white/60 mb-3">
                    Step-by-step checklist for integrating Threshold into your existing workflow. 
                    Covers team onboarding, client communication, and quality control.
                  </p>
                  <button className="text-[12px] text-white/70 hover:text-white transition-colors">
                    Download Checklist &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-10 glass-panel text-center">
            <h2 className="text-white mb-3 text-[24px] font-semibold">Ready to get started?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto text-[14px]">
              Sign in to Threshold and start your first project using these resources and tools.
            </p>
            <button 
              onClick={() => setCurrentPage('login')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded hover:bg-white/90 transition-all btn-light text-[14px] font-medium"
            >
              Get Started
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const ThresholdPage = () => {
    if (!currentProject) return null;

    const questions = currentThreshold === 1
      ? [...briefQuestions.sectionA, ...(currentProject.type === 'brand' ? briefQuestions.brandIdentity : briefQuestions.logoOnly)]
      : [];

    return (
      <div className="min-h-screen bg-[#000000] relative">
        {/* Top Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <div 
            className="h-full bg-[#FF7A1A] transition-all duration-500"
            style={{ 
              width: `${(currentThreshold / 5) * 100}%`,
              boxShadow: '0 0 10px rgba(255, 122, 26, 0.6)'
            }}
          ></div>
        </div>
        
        <div className="noise-overlay" />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Stage Label */}
            <div className="mb-4 text-center">
              <span className="mono text-white/40 text-[10px] uppercase tracking-wider">
                STAGE {currentThreshold} OF 5
              </span>
            </div>
            
            {/* LED-Style Progress Navigation */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                {thresholds.map((t, index) => {
                  const isAccessible = t.id <= currentProject.currentThreshold;
                  const isCurrent = t.id === currentThreshold;
                  const isCompleted = currentThreshold > t.id;
                  return (
                    <React.Fragment key={t.id}>
                      <button
                        onClick={() => isAccessible && jumpToThreshold(t.id)}
                        disabled={!isAccessible}
                        className={`flex flex-col items-center gap-2 transition-all group ${
                          isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                        }`}
                      >
                        <div className={`mono tracking-wider font-medium leading-none transition-all ${
                          isCurrent ? 'text-[#FF7A1A] text-[48px]' : isCompleted ? 'text-white/70 text-[48px]' : 'text-white/30 text-[48px]'
                        }`}>
                          0{t.id}
                        </div>
                        <div className="text-center">
                          <div className={`text-[13px] transition-all mb-1 ${
                            isCurrent ? 'text-white' : isCompleted ? 'text-white/70' : 'text-white/40'
                          }`}>
                            {t.name}
                          </div>
                          {isCurrent && (
                            <div className="mono text-[10px] text-[#FF7A1A]">
                              {Math.round((currentThreshold / 5) * 100)}%
                            </div>
                          )}
                        </div>
                      </button>
                      {index < thresholds.length - 1 && (
                        <div className="flex-1 flex items-start pt-6">
                          <div className={`w-full h-[1px] transition-all ${
                            currentThreshold > t.id + 1 ? 'bg-white/20 line-animate' : 'bg-white/10'
                          }`}></div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <p className="mono text-[10px] text-white/40 text-center uppercase tracking-wider">
                Click completed thresholds to review
              </p>
            </div>
          </div>

          {/* Threshold Content */}
          <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 mb-8">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="mono text-[#FF7A1A] text-sm tracking-wider">THRESHOLD 0{currentThreshold}</span>
              <div className="threshold-line flex-1"></div>
            </div>
            <h1 className="text-white mb-3 text-[28px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              {thresholds[currentThreshold - 1].name}
            </h1>
            <p className="text-white/60 mb-8 text-[14px]">
              {thresholds[currentThreshold - 1].description}
            </p>

            {currentThreshold === 1 && (
              <div className="space-y-6">
                {questions.map(renderQuestion)}
              </div>
            )}

            {currentThreshold === 2 && (
              <div className="space-y-6">
                <div className="dark-card dark-card-no-hover">
                  <h3 className="text-white mb-2">💡 AI Concept Generation</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Generate logo concepts using AI based on your strategic brief, or upload your own concepts to evaluate.
                  </p>
                  
                  {concepts.length === 0 ? (
                    <div className="space-y-4">
                      <MagneticElement strength={2}>
                        <button
                          onClick={generateAIConcepts}
                          disabled={generatingConcepts}
                          className="flex items-center gap-2 px-6 py-3 bg-[#FF7A1A] text-white rounded-md hover:bg-[#FF9A4A] transition-all disabled:opacity-50 btn-light"
                        >
                          <Sparkles size={20} />
                          {generatingConcepts ? 'Generating Concepts...' : 'Generate Concepts with AI'}
                        </button>
                      </MagneticElement>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-sm text-white/50">or</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                      </div>
                      
                      <button className="flex items-center gap-2 px-6 py-3 glass-panel text-white rounded-md transition-all btn-light">
                        <Upload size={20} />
                        Upload Your Own Concepts
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 mt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-slate-900">Generated Concepts</h4>
                        <button
                          onClick={() => setConcepts([])}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Generate New Concepts
                        </button>
                      </div>
                      
                      {concepts.map((concept) => (
                        <div
                          key={concept.id}
                          className={`p-6 border-2 rounded-lg transition-all ${
                            selectedConcepts.includes(concept.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h5 className="text-slate-900 mb-2">
                                {concept.name}
                              </h5>
                              <p className="text-slate-700 whitespace-pre-wrap">{concept.description}</p>
                            </div>
                            <button
                              onClick={() => toggleConceptSelection(concept.id)}
                              className={`ml-4 px-4 py-2 rounded-lg transition-all ${
                                selectedConcepts.includes(concept.id)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              {selectedConcepts.includes(concept.id) ? '✓ Selected' : 'Select'}
                            </button>
                          </div>
                          
                          <div className="border-t border-slate-200 pt-4 mt-4">
                            <p className="text-sm text-slate-700 mb-3">Evaluate against brief:</p>
                            <div className="space-y-2">
                              <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" className="rounded" />
                                <span>Aligns with core message</span>
                              </label>
                              <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" className="rounded" />
                                <span>Embodies required keywords</span>
                              </label>
                              <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" className="rounded" />
                                <span>Avoids forbidden territory</span>
                              </label>
                              <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" className="rounded" />
                                <span>Works across applications</span>
                              </label>
                              <label className="flex items-center gap-3 text-sm">
                                <input type="checkbox" className="rounded" />
                                <span>Distinctive from competitors</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {selectedConcepts.length > 0 && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            ✓ {selectedConcepts.length} concept{selectedConcepts.length > 1 ? 's' : ''} selected for development
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentThreshold === 3 && (
              <div className="space-y-6">
                <div className="dark-card dark-card-no-hover">
                  <h3 className="text-white mb-2">✨ Design Refinement & Technical Validation</h3>
                  <p className="text-sm text-white/70">
                    Validate technical execution and refine selected concepts. AI assists with technical checks while you make strategic decisions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="dark-card dark-card-no-hover">
                    <h4 className="text-white mb-4">Technical Validation Checklist</h4>
                    <p className="text-sm text-white/70 mb-4">Verify design works across all required applications</p>
                    
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">Scalability Test</div>
                            <div className="text-sm text-white/60">Works at minimum size (0.5&quot; / 32px) without detail loss</div>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">One-Color Version</div>
                            <div className="text-sm text-white/60">Design maintains integrity in single color (black or white)</div>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">Reverse/Knockout Test</div>
                            <div className="text-sm text-white/60">Works on light and dark backgrounds</div>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">Application Context Test</div>
                            <div className="text-sm text-white/60">Mocked up in primary use cases (business card, website header, etc.)</div>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">Production Feasibility</div>
                            <div className="text-sm text-white/60">No technical barriers for required formats (print, digital, embroidery, etc.)</div>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <label className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 rounded" />
                          <div>
                            <div className="text-white">Strategic Alignment</div>
                            <div className="text-sm text-white/60">Still aligns with brief after refinements</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="dark-card">
                    <h4 className="text-white mb-4">AI-Assisted Refinement</h4>
                    <p className="text-sm text-white/70 mb-4">Request technical variations while maintaining strategic intent</p>
                    
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-white mb-2"><strong>What AI Can Do:</strong></p>
                        <ul className="text-sm text-white/70 space-y-1 pl-4">
                          <li>• Generate weight/proportion variations (&quot;Make letterforms slightly bolder&quot;)</li>
                          <li>• Create application mockups (business cards, website headers, signage)</li>
                          <li>• Test technical variations (one-color, reverse, small size)</li>
                          <li>• Identify potential production issues</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-white mb-2"><strong>What Requires Human Decision:</strong></p>
                        <ul className="text-sm text-white/70 space-y-1 pl-4">
                          <li>• Strategic direction choices</li>
                          <li>• Symbolic interpretation</li>
                          <li>• Final concept selection</li>
                          <li>• Brand alignment verification</li>
                        </ul>
                      </div>

                      <textarea
                        placeholder="Example: 'Generate a version with slightly heavier weight for better legibility at small sizes' or 'Show this logo on a business card mockup'"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-lg focus:ring-2 focus:ring-[#FF7A1A] focus:border-transparent resize-none"
                        rows={3}
                      />
                      <button className="flex items-center gap-2 px-6 py-3 bg-[#FF7A1A] text-white rounded-md hover:bg-[#FF7A1A]/90 transition-all shadow-[0_0_20px_rgba(255,122,26,0.3)]">
                        <Sparkles size={20} />
                        Generate Refinement
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-[#FF7A1A]/10 border border-[#FF7A1A] rounded-lg" style={{ boxShadow: '0 0 20px rgba(255, 122, 26, 0.2)' }}>
                    <h4 className="text-[#FF7A1A] mb-2 font-semibold">✓ Human Approval Gate</h4>
                    <p className="text-sm text-white/70 mb-4">
                      Before proceeding, confirm the refined design(s) meet all strategic criteria and technical requirements.
                    </p>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-white">
                        I confirm the refined design maintains strategic alignment and passes all technical validations
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentThreshold === 4 && (
              <div className="space-y-6">
                <div className="dark-card dark-card-no-hover mb-6">
                  <h3 className="text-white mb-2">✓ Stakeholder Presentation</h3>
                  <p className="text-sm text-white/70">
                    Prepare your concept presentation using AI-powered tools. Select a tool below to get started.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="https://gamma.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group dark-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white">Gamma AI</h4>
                      <ExternalLink size={20} className="text-white/60 group-hover:text-[#FF7A1A]" />
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Generate beautiful presentations instantly. AI-powered design with editable slides.
                    </p>
                    <div className="text-sm text-[#FF7A1A]">
                      Create Presentation →
                    </div>
                  </a>

                  <a
                    href="https://notebooklm.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group dark-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white">NotebookLM</h4>
                      <ExternalLink size={20} className="text-white/60 group-hover:text-[#FF7A1A]" />
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Turn your brief and concepts into presentation notes. AI research assistant by Google.
                    </p>
                    <div className="text-sm text-[#FF7A1A]">
                      Generate Notes →
                    </div>
                  </a>

                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group dark-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white">Claude</h4>
                      <ExternalLink size={20} className="text-white/60 group-hover:text-[#FF7A1A]" />
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Draft presentation copy, speaker notes, and stakeholder talking points.
                    </p>
                    <div className="text-sm text-[#FF7A1A]">
                      Write with Claude →
                    </div>
                  </a>

                  <a
                    href="https://chat.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group dark-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white">ChatGPT</h4>
                      <ExternalLink size={20} className="text-white/60 group-hover:text-[#FF7A1A]" />
                    </div>
                    <p className="text-sm text-white/70 mb-3">
                      Generate presentation outlines, design rationales, and Q&A preparation.
                    </p>
                    <div className="text-sm text-[#FF7A1A]">
                      Chat with GPT →
                    </div>
                  </a>
                </div>

                <div className="dark-card dark-card-no-hover">
                  <h4 className="text-white mb-3">Presentation Checklist</h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Context slide:</strong> Project background and objectives
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Brief summary:</strong> Key strategic inputs and constraints
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Concept presentation:</strong> Visual + strategic rationale for each
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Application examples:</strong> Show concepts in context
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Recommendation:</strong> Which concept(s) to move forward with and why
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 rounded" />
                      <span className="text-sm text-white/70">
                        <strong className="text-white">Next steps:</strong> Timeline and deliverables for development
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentThreshold === 5 && (
              <div className="space-y-6">
                <div className="p-6 bg-[#FF7A1A]/10 border border-[#FF7A1A] rounded-lg" style={{ boxShadow: '0 0 20px rgba(255, 122, 26, 0.2)' }}>
                  <h3 className="text-[#FF7A1A] mb-2 font-semibold">🚀 Final Delivery Package</h3>
                  <p className="text-sm text-white/70">
                    Generate comprehensive delivery specifications and file package for implementation.
                  </p>
                </div>

                {!deliverySpecs ? (
                  <div className="text-center py-12">
                    <button
                      onClick={generateDeliverySpecs}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF7A1A] text-white rounded-md hover:bg-[#FF9A4A] transition-all btn-light"
                    >
                      <Download size={24} />
                      Generate Delivery Specifications
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="dark-card">
                      <h4 className="text-white mb-4">File Formats Package</h4>
                      <div className="space-y-2">
                        {deliverySpecs.fileFormats.map((file, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded">
                            <Check className="text-[#FF7A1A] mt-0.5 flex-shrink-0" size={20} />
                            <div>
                              <div className="text-white">{file.format}</div>
                              <div className="text-sm text-white/60">{file.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dark-card">
                      <h4 className="text-white mb-4">Color Specifications</h4>
                      <div className="space-y-2">
                        {deliverySpecs.colorSpecs.primary.map((spec, idx) => (
                          <div key={idx} className="p-3 bg-white/5 rounded text-sm text-white/70">
                            {spec}
                          </div>
                        ))}
                        <p className="text-sm text-white/60 italic mt-2">{deliverySpecs.colorSpecs.note}</p>
                      </div>
                    </div>

                    <div className="dark-card">
                      <h4 className="text-white mb-4">Size & Clear Space Requirements</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-sm text-white">Minimum Size</div>
                          <div className="text-sm text-white/60">{deliverySpecs.sizeRequirements.minimum}</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-sm text-white">Maximum Size</div>
                          <div className="text-sm text-white/60">{deliverySpecs.sizeRequirements.maximum}</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <div className="text-sm text-white">Clear Space</div>
                          <div className="text-sm text-white/60">{deliverySpecs.sizeRequirements.clearSpace}</div>
                        </div>
                      </div>
                    </div>

                    <div className="dark-card">
                      <h4 className="text-white mb-4">Usage Guidelines</h4>
                      <div className="space-y-2">
                        {deliverySpecs.usageGuidelines.map((guideline, idx) => {
                          const isDo = guideline.startsWith('DO');
                          return (
                            <div key={idx} className={`flex items-start gap-3 p-3 rounded ${
                              isDo ? 'bg-white/5 border border-white/10' : 'bg-white/5 border border-white/10'
                            }`}>
                              {isDo ? (
                                <Check className="text-[#FF7A1A] flex-shrink-0 mt-0.5" size={18} />
                              ) : (
                                <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                              )}
                              <div className="text-sm text-white/70">{guideline}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="text-white mb-4">File Naming Convention</h4>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg mb-3">
                        <div className="text-white/70 mb-2">Pattern:</div>
                        <div className="mono text-sm text-white mb-4">
                          {deliverySpecs.fileNaming.pattern}
                        </div>
                        <div className="text-white/70 mb-2">Examples:</div>
                        <div className="space-y-1">
                          {deliverySpecs.fileNaming.examples.map((example, idx) => (
                            <div key={idx} className="mono text-xs text-white/60">
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-white/50">
                        Use this convention for all project deliverables to maintain consistency
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <p className="text-sm text-white/70">
                        <strong className="text-white">Note:</strong> The File Formats Package above specifies what files you should create externally (in Illustrator, Figma, etc.). 
                        The downloads below provide the specifications document and your complete project documentation.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#FF7A1A] text-white rounded-lg hover:bg-[#FF9A4A] transition-all">
                        <Download size={20} />
                        Download Delivery Specifications
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black rounded-lg hover:bg-white/90 transition-all">
                        <Download size={20} />
                        Download Project Documentation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentThreshold > 1 && (
              <button
                onClick={goToPreviousThreshold}
                className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white rounded hover:border-white/20 transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-[14px]">Previous</span>
              </button>
            )}
            <button
              onClick={saveProjectProgress}
              className="px-6 py-3 border border-white/10 text-white rounded hover:border-white/20 transition-colors text-[14px]"
            >
              Save Progress
            </button>
            <button
              onClick={completeThreshold}
              disabled={currentThreshold === 2 && concepts.length > 0 && selectedConcepts.length === 0}
              className="flex-1 px-8 py-3 bg-white text-black rounded hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[14px] font-medium btn-light"
            >
              {currentThreshold < 5 ? `Continue to Threshold ${currentThreshold + 1}` : 'Complete Project'} →
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <NavBar />
      
      {/* Save Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-6 z-50">
          <div className="bg-[#111111] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <Check size={18} className="text-[#FF7A1A]" />
            <span className="font-medium text-[14px]">Progress saved!</span>
          </div>
        </div>
      )}
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'resources' && <ResourcesPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'threshold' && <ThresholdPage />}
      {currentPage === 'completion' && <CompletionPage />}
      {currentPage === 'archived' && <ArchivedPage />}
      {currentPage === 'project-detail' && <ProjectDetailPage />}
    </div>
  );
};

export default ThresholdAI;
