import { useState, useEffect } from 'react'
import { 
  Dumbbell, 
  Activity, 
  HeartPulse, 
  Timer, 
  ChevronRight, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Award, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  Calendar,
  Users
} from 'lucide-react'
import './App.css'

// Inline SVG Social Icons for maximum reliability across Lucide versions
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-facebook"><path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0 -2 -2 2 2 0 0 0 -2 2v7h-4v-7a6 6 0 0 1 6 -6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)

// Logo and Generated Image Imports
import logoFull from './assets/logo_full.jpg'
import logoIcon from './assets/logo_icon.jpg'
import heroGym from './assets/hero_gym_interior.png'
import rateCard1 from './assets/rate_card_1.jpg'
import rateCard2 from './assets/rate_card_2.jpg'
import servicesTabImg from './assets/services_tab.jpg'
import navStrip from './assets/nav_strip.png'

// New Gallery Image Imports
import gallery1Img from './assets/gallery_1.jpg'
import gallery2Img from './assets/gallery_2.jpg'
import gallery3Img from './assets/gallery_3.jpg'
import gallery4Img from './assets/gallery_4.jpg'
import gallery5Img from './assets/gallery_5.jpg'
import upiQr from './assets/upi_qr.jpg'

// JSON Content Tables for all sections
const servicesData = {
  fitness: [
    { id: 'fit-1', title: 'Functional Training', desc: 'Movement-based exercises for real-world strength', icon: 'Activity' },
    { id: 'fit-2', title: 'Strength & Conditioning', desc: 'Progressive resistance training programs', icon: 'Dumbbell', highlight: true },
    { id: 'fit-3', title: 'Performance Coaching', desc: 'Expert guidance for athletic development', icon: 'Award' },
    { id: 'fit-4', title: 'Personalized Fitness', desc: 'Customized programs based on individual goals', icon: 'UserCheck' },
    { id: 'fit-5', title: 'HYROX Training', desc: 'Global fitness race format combining 8km running with 8 functional workout stations; builds endurance, strength, stamina & overall performance', icon: 'Timer' },
    { id: 'fit-6', title: 'Taekwondo Training', desc: 'Self-defense, fitness, flexibility, discipline & confidence through expert taekwondo training', icon: 'Sparkles' }
  ],
  physio: [
    { id: 'phys-1', title: 'Physiotherapy Session', desc: 'Manual therapy and specialized exercises for orthopaedic conditions.', icon: 'HeartPulse' },
    { id: 'phys-2', title: 'Electrotherapy', desc: 'Advanced modalities like ultrasound and TENS for active recovery.', icon: 'Activity' },
    { id: 'phys-3', title: 'Pain Resolution', desc: 'Targeted biomechanical assessment and rehab to resolve shoulder, back, or joint pain.', icon: 'Award' },
    { id: 'phys-4', title: 'Recovery-Focused Rehab', desc: 'Guided training protocols to accelerate post-injury return to strength.', icon: 'UserCheck' },
    { id: 'phys-5', title: 'Movement Restoration', desc: 'Biomechanical screen and active joint mobilization to restore fluid motion.', icon: 'Timer' }
  ]
};

const programsData = {
  fitness: [
    { id: 'prog-fit-1', title: '1 Month Foundation', desc: 'Get familiar with strength basics, correct structural imbalances, and jumpstart your training habit.', duration: '1 Month', targetPlan: '1 Month' },
    { id: 'prog-fit-2', title: '3 Month Transformation', desc: 'A focused progressive resistance block designed to build lean mass, boost metabolism, and transform power.', duration: '3 Months', targetPlan: '3 Months' },
    { id: 'prog-fit-3', title: '6 Month Performance Program', desc: 'The gold standard. Master compound lifts, build elite cardiorespiratory capacity, and secure athletic resilience.', duration: '6 Months', targetPlan: '6 Months' }
  ],
  physio: [
    { id: 'prog-phys-1', title: 'Short-Term Recovery', desc: 'Focused pain relief, localized inflammation management, and initial joint mobilization.', duration: '8–12 sessions', targetPlan: 'Short-Term Recovery' },
    { id: 'prog-phys-2', title: 'Mid-Term Rehab', desc: 'Bridging local healing with load loading. Restoring baseline biomechanics and stability.', duration: '20–30 sessions', targetPlan: 'Mid-Term Rehab' },
    { id: 'prog-phys-3', title: 'Long-Term Corrective Rehab', desc: 'Complete structural recovery. Addressing kinetic chain issues to prevent re-injury and build durability.', duration: '40–60 sessions', targetPlan: 'Long-Term Corrective Rehab' }
  ]
};

const whoWeHelpData = {
  fitness: [
    { title: 'Athletes', desc: 'Elite competitors looking to enhance power, speed, agility, and sport-specific physical resilience.' },
    { title: 'Fitness Enthusiasts', desc: 'Active individuals seeking science-backed progressive overload to break plateaus.' },
    { title: 'Beginners', desc: 'People starting their fitness journey who need professional guidance on mechanics and safety.' },
    { title: 'Weight Loss Clients', desc: 'Clients focused on high-energy conditioning blocks combined with metabolic functional lifts.' },
    { title: 'Sports Performance Clients', desc: 'Athletes requiring velocity-based training and kinetic chain enhancement.' }
  ],
  physio: [
    { title: 'Post-Injury Athletes', desc: 'Individuals returning from sprains, tears, or fractures needing guided load recovery.' },
    { title: 'Chronic Pain Clients', desc: 'People experiencing long-term back, shoulder, neck, or knee pain looking for mechanical solutions.' },
    { title: 'Post-Surgery Recovery', desc: 'Post-op specialized recovery programs focusing on joint mobility, safety, and progressive loading.' }
  ]
};

const rateCardData = [
  {
    id: 'sc-1',
    name: 'Personal One-on-One',
    sub: 'Strength & Conditioning',
    details: '1:1 coaching, customized program, private gym hour. You own the gym for 1 hour — no one else will enter or use.',
    prices: {
      '1 Month': { value: 9999 },
      '3 Months': { value: 23999, savings: 6000 },
      '6 Months': { value: 44999, savings: 15000 },
      '12 Months': { value: 84999, savings: 35000 }
    }
  },
  {
    id: 'sc-2',
    name: 'Semi Personal Training',
    sub: '3-4 on 1 Coaching',
    details: 'Train in a small group of 3-4 with a coach. Get personal attention with group motivation. Cost-effective & result-driven.',
    prices: {
      '1 Month': { value: 5999 },
      '3 Months': { value: 15999, savings: 2000, promoText: 'First 5 enrollments get flat ₹11,999!', promoValue: 11999 },
      '6 Months': { value: 29999, savings: 6000 },
      '12 Months': { value: 56999, savings: 15000 }
    }
  },
  {
    id: 'sc-4',
    name: 'HYROX Training – Semi Personal',
    sub: '3-4 on 1 Coaching',
    details: 'Small group training specifically focusing on HYROX race segments, endurance limits, and workout stations, with groups of 3-4 athletes.',
    prices: {
      '1 Month': { value: 5999 },
      '3 Months': { value: 15999, savings: 2000 },
      '6 Months': { value: 29999, savings: 6000 },
      '12 Months': { value: 56999, savings: 15000 }
    }
  },
  {
    id: 'sc-5',
    name: 'Game Specific',
    sub: 'Athletic Strength & Conditioning',
    details: 'Sport-specific training to improve speed, power, agility, strength, and injury resilience. Enhance performance in your game.',
    prices: {
      '1 Month': { value: 4999 },
      '3 Months': { value: 11999, savings: 2000 },
      '6 Months': { value: 22999, savings: 5000 },
      '12 Months': { value: 43999, savings: 12000 }
    }
  }
];

function App() {
  // Web3Forms free access key to receive automatic booking emails.
  // Obtain your free access key by typing your email at https://web3forms.com/
  const WEB3FORMS_ACCESS_KEY = "f64a405a-5402-4421-93cb-eb2479ba4f75";
  const UPI_ID = "vertex@oksbi";

  // Navigation & UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Interactive Toggle States
  const [activeServicesTab, setActiveServicesTab] = useState('fitness')
  const [activeProgramsTab, setActiveProgramsTab] = useState('fitness')
  const [activeWhoTab, setActiveWhoTab] = useState('fitness')
  
  // Rate Card interactive duration selector ('1 Month', '3 Months', '6 Months', '12 Months')
  const [rateCardDuration, setRateCardDuration] = useState('1 Month')
  
  // Gallery active filter state
  const [galleryFilter, setGalleryFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Program card flip state — tracks which card ID is currently flipped
  const [flippedCard, setFlippedCard] = useState(null)
  const toggleFlip = (id) => setFlippedCard(prev => prev === id ? null : id)
  
  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  
  // 3D Mouse Parallax offset state
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 })
  
  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1) // 1 = Details form, 2 = UPI checkout
  const [bookingForm, setBookingForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    program: 'Personal One-on-One (S&C)',
    plan: '1 Month',
    price: '₹9,999'
  })
  
  // Newsletter & Form Success Hooks
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingStatusMessage, setBookingStatusMessage] = useState('')

  // Scroll reveal system
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      checkScrollReveal()
    }

    const checkScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal:not(.reveal-active)')
      const triggerBottom = window.innerHeight * 0.95
      reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top
        if (revealTop < triggerBottom) {
          reveal.classList.add('reveal-active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    // Run initial reveal check
    const timer = setTimeout(() => {
      checkScrollReveal()
    }, 150)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [activeServicesTab, activeProgramsTab, activeWhoTab, rateCardDuration, galleryFilter])

  // 3D Parallax Mouse movement listener
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const xOffset = (e.clientX - cx) / cx
      const yOffset = (e.clientY - cy) / cy
      
      setHeroTilt({
        x: xOffset * 20,
        y: yOffset * 20,
        tiltX: yOffset * -6,
        tiltY: xOffset * 6
      })
    }
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  // Direct GPU-accelerated 3D Card mouse tilt handlers
  const handleCard3DTilt = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) - 0.5
    const py = (y / rect.height) - 0.5
    const tiltX = py * -15
    const tiltY = px * 15
    card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`
  }

  const handleCard3DReset = (e) => {
    const card = e.currentTarget
    card.style.transform = ''
  }

  // Flip-safe tilt: targets the outer flipper wrapper (not the inner rotating div)
  const handleFlipCardTilt = (e, isFlipped) => {
    if (isFlipped) return // don't tilt when flipped
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(1200px) rotateX(${py * -12}deg) rotateY(${px * 12}deg) translateY(-6px)`
  }

  const handleFlipCardTiltReset = (e, isFlipped) => {
    const card = e.currentTarget
    card.style.transform = ''
  }

  // Pre-fill booking helper
  const triggerBooking = (programName, durationText, priceText) => {
    setBookingForm(prev => ({
      ...prev,
      program: programName,
      plan: durationText,
      price: priceText
    }))
    setBookingStep(1)
    setBookingModalOpen(true)
    setBookingConfirmed(false)
  }

  const bookingNeedsQrStep = bookingForm.program === 'Taekwondo Training' || bookingForm.program.includes('Demo')

  // WhatsApp click-to-chat redirect builder
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    // Quick validation
    if (!bookingForm.name || !bookingForm.age || !bookingForm.phone) {
      alert("Please fill in all required fields.")
      return
    }
    
    if (bookingForm.phone.replace(/[^0-9]/g, '').length < 10) {
      alert("Please enter a valid 10-digit phone number.")
      return
    }

    setBookingStatusMessage("Sending enquiry details. Check your email in a few minutes for confirmation.")

    // Send form details automatically to the owner's email in the background (using Web3Forms free tier)
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Vertex Performance Booking: ${bookingForm.name}`);
    formData.append("name", bookingForm.name);
    formData.append("age", bookingForm.age);
    formData.append("gender", bookingForm.gender);
    formData.append("phone", bookingForm.phone);
    formData.append("program", bookingForm.program);
    formData.append("plan", bookingForm.plan);
    formData.append("price", bookingForm.price);
    formData.append("message", `Enquiry details:\nName: ${bookingForm.name}\nAge: ${bookingForm.age}\nGender: ${bookingForm.gender}\nPhone: ${bookingForm.phone}\nProgram: ${bookingForm.program}\nPlan: ${bookingForm.plan}\nPrice: ${bookingForm.price}`);
    
    if (bookingNeedsQrStep) {
      setBookingStep(2)
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log("Booking details sent automatically to email:", data);
      if (data.success) {
        setBookingStatusMessage("Enquiry sent—check your email soon for confirmation. If it does not arrive, please check spam.")
      } else {
        setBookingStatusMessage("Enquiry submitted. Email confirmation may take a few minutes.")
      }
    })
    .catch(err => {
      console.error("Error sending booking details automatically:", err);
      setBookingStatusMessage("Unable to send email confirmation automatically right now. Please continue on WhatsApp or retry.")
    });

    if (!bookingNeedsQrStep) {
      executeWhatsAppRedirect()
      setBookingModalOpen(false)
    }
  }

  const executeWhatsAppRedirect = () => {
    const greeting = `Hello Vertex! I would like to enquire about the "${bookingForm.program}" (${bookingForm.plan} at ${bookingForm.price}). My details are: Name - ${bookingForm.name}, Age - ${bookingForm.age}, Gender - ${bookingForm.gender}, Phone - ${bookingForm.phone}. Please help me with the next steps.`;
    window.open(`https://wa.me/918488862388?text=${encodeURIComponent(greeting)}`, '_blank');
    setBookingConfirmed(true);
  }

  const copyUpiId = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(UPI_ID)
        .then(() => setBookingStatusMessage("UPI ID copied to clipboard. Paste into your UPI app."))
        .catch(() => setBookingStatusMessage("Tap the UPI ID to copy it manually."))
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = UPI_ID
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setBookingStatusMessage("UPI ID copied to clipboard. Paste into your UPI app.")
      } catch {
        setBookingStatusMessage("Tap the UPI ID to copy it manually.")
      }
      document.body.removeChild(textArea)
    }
  }

  const renderServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Activity': return <Activity size={24} className="text-cyan" />
      case 'Dumbbell': return <Dumbbell size={24} className="text-cyan" />
      case 'Award': return <Award size={24} className="text-cyan" />
      case 'UserCheck': return <UserCheck size={24} className="text-cyan" />
      case 'Timer': return <Timer size={24} className="text-cyan" />
      case 'Sparkles': return <Sparkles size={24} className="text-cyan" />
      case 'HeartPulse': return <HeartPulse size={24} className="text-cyan" />
      default: return <Dumbbell size={24} className="text-cyan" />
    }
  }

  const galleryImages = [
    { url: gallery1Img, category: 'training', title: 'Strength Coaching & Olympic Lifts' },
    { url: gallery2Img, category: 'facility', title: 'Premium Free-Weight Dumbbell Station' },
    { url: gallery3Img, category: 'facility', title: 'Unified S&C Turf & Physical Therapy Floor' },
    { url: gallery4Img, category: 'facility', title: 'Functional Pull-Up Rig & Kettlebell Zone' },
    { url: gallery5Img, category: 'training', title: 'Athletic Motivation Wall & Powerlifting Rack' }
  ];

  const filteredGallery = galleryFilter === 'all' ? galleryImages : galleryImages.filter(img => img.category === galleryFilter);

  return (
    <>
      <div className="floating-orb orb-1" style={{ transform: `translate3d(${-heroTilt.x * 0.5}px, ${-heroTilt.y * 0.5}px, 0)` }}></div>
      <div className="floating-orb orb-2" style={{ transform: `translate3d(${heroTilt.x * 0.3}px, ${heroTilt.y * 0.3}px, 0)` }}></div>
      <div className="floating-orb orb-3" style={{ transform: `translate3d(${-heroTilt.x * 0.2}px, ${-heroTilt.y * 0.2}px, 0)` }}></div>

      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <a href="#home" className="logo-link">
            <img src={logoFull} alt="Vertex Performance Logo" className="logo-img-full" />
            <img src={logoIcon} alt="Vertex Performance Logo" className="logo-img-icon" />
          </a>
          <nav className="desktop-nav">
            <a href="#about" className="nav-item">About</a>
            <a href="#services" className="nav-item">Services</a>
            <a href="#programs" className="nav-item">Programs</a>
            <a href="#who-we-help" className="nav-item">Who We Help</a>
            <a href="#gallery" className="nav-item">Gallery</a>
            <a href="#contact" className="nav-item">Contact</a>
            <button onClick={() => triggerBooking('Demo Session', 'Single Session', '₹299')} className="nav-item btn btn-primary header-btn">Book Now</button>
          </nav>
          <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
          <a href="#who-we-help" onClick={() => setMobileMenuOpen(false)}>Who We Help</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); triggerBooking('Demo Session', 'Single Session', '₹299'); }}>Book Now</button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="perspective-grid-bg"></div>
        <div className="hero-bg-accent"></div>
        <div className="three-d-shape-container hero-sphere-1" style={{ transform: `translate3d(${heroTilt.x * 0.4}px, ${heroTilt.y * 0.4}px, 0)` }}>
          <div className="sphere-3d"><div className="ring ring-1"></div><div className="ring ring-2"></div><div className="ring ring-3"></div><div className="ring ring-4"></div></div>
        </div>
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge animate-hero-badge"><Sparkles size={16} className="text-cyan animate-pulse" /><span>Train. Perform. Transform.</span></div>
            <h1 className="animate-hero-title">YOUR GOALS. <br /> OUR EXPERTISE. <br /><span className="text-gradient">UNSTOPPABLE YOU.</span></h1>
            <p className="hero-subtitle animate-hero-subtitle">Elite athletic strength & conditioning, custom performance programming, and active physical rehabilitation. All unified under one roof.</p>
            <div className="hero-actions animate-hero-actions">
              <button onClick={() => triggerBooking('Demo Session', 'Single Session', '₹299')} className="btn btn-primary">Book a Session</button>
              <a href="#programs" className="btn btn-secondary">View Programs</a>
            </div>
            <div className="hero-stats animate-hero-stats">
              <div className="stat-card"><div className="stat-value">100%</div><div className="stat-label">Coached Sessions</div></div>
              <div className="stat-card"><div className="stat-value">1-on-1</div><div className="stat-label">Physio & Rehab</div></div>
              <div className="stat-card"><div className="stat-value">Elite</div><div className="stat-label">S&C Facility</div></div>
            </div>
          </div>
          <div className="hero-image-wrapper animate-hero-image">
            <div className="hero-image-frame" style={{ transform: `perspective(1200px) rotateX(${heroTilt.tiltX}deg) rotateY(${heroTilt.tiltY}deg)`, transformStyle: 'preserve-3d' }}>
              <img src={heroGym} alt="Vertex Performance Premium Facility" className="hero-image" />
              
              {/* Floating 3D Parallax Card 1 */}
              <div className="hero-image-card-parallax-wrapper card-1-wrapper" style={{ transform: 'translateZ(50px) scale(0.95)' }}>
                <div className="hero-image-card">
                  <div className="card-icon"><Dumbbell size={18} className="text-white" /></div>
                  <div>
                    <h4>Elite S&C Turf</h4>
                    <p>Coached Athletics</p>
                  </div>
                </div>
              </div>

              {/* Floating 3D Parallax Card 2 */}
              <div className="hero-image-card-parallax-wrapper card-2-wrapper" style={{ transform: 'translateZ(50px) scale(0.95)' }}>
                <div className="hero-image-card">
                  <div className="card-icon rehab"><Activity size={18} className="text-white" /></div>
                  <div>
                    <h4>Sports Physio</h4>
                    <p>Injury Rehabilitation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="highlights-section">
        <div className="perspective-grid-bg"></div>
        <div className="three-d-shape-container rehab-diamond-1" style={{ transform: `translate3d(${-heroTilt.x * 0.3}px, ${-heroTilt.y * 0.3}px, 0)` }}>
          <div className="diamond-3d"><div className="ring ring-center"></div><div className="ring ring-vert1"></div><div className="ring ring-vert2"></div></div>
        </div>
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">OUR PERFORMANCE ECOSYSTEM</h2>
            <p className="section-subtitle">We specialize in bridging the gap between rehabilitation therapy and athletic physical performance. No templates, only customized progression.</p>
          </div>
          <div className="highlight-showcase">
            <div className="highlight-content reveal">
              <div className="badge-pill">Sports Rehab & S&C</div>
              <h3>Physio + Fitness + Rehab Under One Roof</h3>
              <p>At Vertex Performance, we deliver specialized physiotherapy, movement recovery, and high-performance athletic strength coaching. Our unified facility ensures your physical rehabilitation transitions seamlessly into strength-building, overseen by expert coaches and certified physiotherapists.</p>
              <ul className="highlight-checklist">
                <li><div className="check-icon"><Check size={16} /></div><span><strong>Expert Coaches & Physiotherapists:</strong> Working collaboratively to optimize recovery and strength limits.</span></li>
                <li><div className="check-icon"><Check size={16} /></div><span><strong>Customized Performance Programming:</strong> Every block matches your specific joints, goals, and mobility screens.</span></li>
                <li><div className="check-icon"><Check size={16} /></div><span><strong>Objective Performance Tracking:</strong> Monitoring velocity, force outputs, and functional recovery rates.</span></li>
              </ul>
            </div>
            <div className="highlight-image-container reveal" onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
              <img src={gallery1Img} alt="Vertex Performance S&C Gym Floor" className="highlight-img" style={{ transition: 'transform 0.15s ease' }} />
              <div className="highlight-overlay-glow"></div>
            </div>
          </div>
          <div className="trust-badges-row reveal">
            <div className="trust-badge"><span className="badge-bullet"></span><span>Expert Care</span></div>
            <div className="trust-badge"><span className="badge-bullet"></span><span>Better Performance</span></div>
            <div className="trust-badge"><span className="badge-bullet"></span><span>Stronger You</span></div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="perspective-grid-bg"></div>
        <div className="services-bg-glow"></div>
        <div className="three-d-shape-container services-cylinder-1" style={{ transform: `translate3d(${heroTilt.x * -0.3}px, ${heroTilt.y * -0.3}px, 0)` }}>
          <div className="cylinder-3d"><div className="ring ring-top"></div><div className="ring ring-bottom"></div><div className="strut strut-1"></div><div className="strut strut-2"></div><div className="strut strut-3"></div><div className="strut strut-4"></div></div>
        </div>
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">OUR APPROACH</h2>
            <p className="section-subtitle">Toggle between our coaching and therapy disciplines to see how we build robust movement capacity.</p>
            <div className="toggle-tab-container">
              <button onClick={() => setActiveServicesTab('fitness')} className={`toggle-tab-btn ${activeServicesTab === 'fitness' ? 'active' : ''}`}>Fitness & Performance</button>
              <button onClick={() => setActiveServicesTab('physio')} className={`toggle-tab-btn ${activeServicesTab === 'physio' ? 'active' : ''}`}>Physio & Rehab</button>
            </div>
          </div>
          <div className="services-grid" key={activeServicesTab}>
            {servicesData[activeServicesTab].map((service, idx) => (
              <div key={service.id} className={`service-card reveal ${service.highlight ? 'sc-highlighted-card' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }} onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
                {service.highlight && <span className="sc-badge-banner">S&C SIGNATURE</span>}
                <div className="service-card-body">
                  <div className="service-icon-badge">{renderServiceIcon(service.icon)}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="programs-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">PROGRAM DURATION</h2>
            <p className="section-subtitle">Choose a structured program length tailored to establish habits, transform strength, or manage active recovery.</p>
            <div className="toggle-tab-container">
              <button onClick={() => setActiveProgramsTab('fitness')} className={`toggle-tab-btn ${activeProgramsTab === 'fitness' ? 'active' : ''}`}>Fitness Programs</button>
              <button onClick={() => setActiveProgramsTab('physio')} className={`toggle-tab-btn ${activeProgramsTab === 'physio' ? 'active' : ''}`}>Physio & Rehab tracks</button>
            </div>
          </div>
          <div className="programs-grid" key={activeProgramsTab}>
            {programsData[activeProgramsTab].map((prog) => {
              const isFlipped = flippedCard === prog.id
              // Pick the pricing row for this program
              const pricingRow = activeProgramsTab === 'fitness'
                ? rateCardData.filter(r => r.prices[prog.targetPlan])
                : []
              return (
                <div
                  key={prog.id}
                  className={`program-card-flipper reveal`}
                  onClick={() => toggleFlip(prog.id)}
                  onMouseMove={e => handleFlipCardTilt(e, isFlipped)}
                  onMouseLeave={e => handleFlipCardTiltReset(e, isFlipped)}
                >
                  {/* Rotating inner wrapper — this is what actually spins */}
                  <div className={`flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* FRONT FACE */}
                    <div className="flip-face flip-front">
                      <div className="program-header">
                        <span className="program-duration-tag">{prog.duration}</span>
                        <h3>{prog.title}</h3>
                      </div>
                      <p className="program-desc">{prog.desc}</p>
                      <div className="flip-hint">
                        <span>Tap to see pricing</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="flip-face flip-back">
                      <div className="flip-back-header">
                        <span className="program-duration-tag">{prog.duration}</span>
                        <h3>{prog.title}</h3>
                      </div>
                      {activeProgramsTab === 'fitness' ? (
                        <div className="flip-pricing-list">
                          {pricingRow.length > 0 ? pricingRow.map(row => (
                            <div key={row.id} className="flip-price-row">
                              <span className="flip-price-name">{row.name}</span>
                              <span className="flip-price-value">₹{row.prices[prog.targetPlan]?.value?.toLocaleString()}</span>
                            </div>
                          )) : (
                            <p className="flip-no-price">See rate card for pricing</p>
                          )}
                          <button
                            className="btn btn-primary flip-book-btn"
                            onClick={e => {
                              e.stopPropagation()
                              setRateCardDuration(prog.targetPlan)
                              setFlippedCard(null)
                              setTimeout(() => {
                                document.getElementById('rate-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              }, 300)
                            }}
                          >
                            View Full Details →
                          </button>
                        </div>
                      ) : (
                        <div className="flip-pricing-list">
                          <p className="flip-no-price">{prog.desc}</p>
                          <button onClick={e => { e.stopPropagation(); triggerBooking(prog.title, prog.duration, 'Variable Price') }} className="btn btn-primary flip-book-btn">Book Free Evaluation</button>
                        </div>
                      )}
                      <div className="flip-hint flip-hint-back">
                        <span>Tap to go back</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="program-cta-banner reveal">
            <h3>Ready to Transform Your Performance?</h3>
            <p>Speak to a coach today or try out our facility with a Demo Session.</p>
            <button onClick={() => triggerBooking('Demo Session', 'Single Session', '₹299')} className="btn btn-primary text-white">Start Your Program</button>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="who-we-help-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">WHO WE HELP</h2>
            <p className="section-subtitle">We guide a diverse group of individuals to push boundaries, regain fluid motion, and achieve dynamic athletic targets.</p>
            <div className="toggle-tab-container">
              <button onClick={() => setActiveWhoTab('fitness')} className={`toggle-tab-btn ${activeWhoTab === 'fitness' ? 'active' : ''}`}>Fitness & Athletic Track</button>
              <button onClick={() => setActiveWhoTab('physio')} className={`toggle-tab-btn ${activeWhoTab === 'physio' ? 'active' : ''}`}>Physiotherapy & Rehab Track</button>
            </div>
          </div>
          <div className="who-grid" key={activeWhoTab}>
            {whoWeHelpData[activeWhoTab].map((audience, idx) => (
              <div key={idx} className="who-card glass reveal" onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
                <h4>{audience.title}</h4>
                <p>{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-help" className="how-we-help-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">HOW WE HELP</h2>
            <p className="section-subtitle">Our structured biomechanical pipeline ensures you move from diagnostic checks to loaded physical capacity safely.</p>
          </div>
          <div className="how-checklist-container grid-2-columns">
            <div className="how-glass-panel glass reveal">
              <div className="panel-header"><Dumbbell className="text-cyan" size={24} /><h3>Fitness & Performance Path</h3></div>
              <ul className="how-list">
                <li><div className="check-bullet"><Check size={14} /></div><span>Dynamic force production screen to set training baselines.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Individually tailored training blocks emphasizing compound mechanics.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Velocity tracking to manage central nervous system loading.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Progressive loading blocks for power transfer and agility blocks.</span></li>
              </ul>
            </div>
            <div className="how-glass-panel glass reveal">
              <div className="panel-header"><HeartPulse className="text-cyan" size={24} /><h3>Physiotherapy & Recovery Path</h3></div>
              <ul className="how-list">
                <li><div className="check-bullet"><Check size={14} /></div><span>Advanced biomechanical joint scan to locate pain triggers.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Manual therapy, joint mobilization, and localized pain management.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Guided rehab training focusing on mobility and tendon recovery.</span></li>
                <li><div className="check-bullet"><Check size={14} /></div><span>Active return-to-sport testing under loading benchmarks.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="rate-card" className="rate-card-section">
        <div className="perspective-grid-bg"></div>
        <div className="three-d-shape-container calc-diamond-1" style={{ transform: `translate3d(${heroTilt.x * 0.4}px, ${heroTilt.y * 0.4}px, 0)` }}>
          <div className="diamond-3d"><div className="ring ring-center"></div><div className="ring ring-vert1"></div><div className="ring ring-vert2"></div></div>
        </div>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="badge-pill">Interactive Programs</div>
            <h2 className="text-gradient">Training Programs</h2>
            <p className="section-subtitle">Choose a plan that fits your goals. Tap any card to enquire about availability and next steps.</p>
            <div className="billing-toggle-container">
              {['1 Month', '3 Months', '6 Months', '12 Months'].map((d) => (
                <button key={d} onClick={() => setRateCardDuration(d)} className={`duration-selector-btn ${rateCardDuration === d ? 'active' : ''}`}>{d}</button>
              ))}
            </div>
          </div>
          <div className="rate-card-desktop-table-container glass reveal">
            <table className="rate-card-table">
              <thead>
                <tr>
                  <th>Programs</th>
                  <th>Details & Benefits</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {rateCardData.map((row) => {
                  const isSCHighlight = row.sub.toLowerCase().includes('strength');
                  return (
                    <tr key={row.id} className={isSCHighlight ? 'sc-highlighted-row' : ''}>
                      <td className="program-title-cell">
                        <div className="title-row-container">
                          <strong>{row.name}</strong>
                          {isSCHighlight && <span className="sc-table-badge">S&C FOCUS</span>}
                        </div>
                        <span className="program-sub">{row.sub}</span>
                      </td>
                      <td className="program-details-cell">{row.details}</td>
                      <td className="action-cell text-center">
                        <button onClick={() => triggerBooking(`${row.name} (${row.sub})`, rateCardDuration, `Enquire for ${rateCardDuration}`)} className="btn btn-primary btn-sm">
                          Enquire Now
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rate-card-mobile-grid" key={rateCardDuration}>
            {rateCardData.map((row) => {
              const isSCHighlight = row.sub.toLowerCase().includes('strength');
              return (
                <div key={row.id} className={`rate-card-mobile-card glass reveal ${isSCHighlight ? 'sc-highlighted-card' : ''}`}>
                  {isSCHighlight && <span className="sc-badge-banner">S&C FOCUS</span>}
                  <div className="card-top"><h4>{row.name}</h4><span className="sub">{row.sub}</span></div>
                  <p className="details">{row.details}</p>
                  <button onClick={() => triggerBooking(`${row.name} (${row.sub})`, rateCardDuration, `Enquire for ${rateCardDuration}`)} className="btn btn-primary btn-sm w-full mt-3">Enquire Now</button>
                </div>
              );
            })}
          </div>
          <div className="rate-card-standalone-row reveal">
            <div className="standalone-promo-card taekwondo-promo glass">
              <div className="promo-badge">MONTHLY COHORT</div>
              <h3>Taekwondo Training</h3>
              <p>Two batches available: 4–14 years kids and 14+ adults. Same rate for both batches.</p>
              <div className="price-tag"><span className="amount">₹2,999</span><span className="period">/ month</span></div>
              <button onClick={() => triggerBooking('Taekwondo Training', 'Monthly', '₹2,999')} className="btn btn-secondary w-full">Book Taekwondo Slot</button>
            </div>
            <div className="standalone-promo-card demo-promo glass">
              <div className="promo-badge trial">LOW COMMITMENT</div>
              <h3>Demo Session</h3>
              <p>Try a single coached session to evaluate our trainers, facility, and training approach.</p>
              <div className="price-tag"><span className="amount">₹299</span><span className="period">/ single session</span></div>
              <button onClick={() => triggerBooking('Trial Demo Session', 'Single Session', '₹299')} className="btn btn-primary text-white w-full">Book Demo Session</button>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">FACILITY & TRAINING GALLERY</h2>
            <p className="section-subtitle">Tour our elite S&C turf tracks, functional weight platforms, and physical therapy assessment rooms.</p>
            <div className="gallery-filters reveal">
              {['all', 'facility', 'training'].map(f => (
                <button key={f} onClick={() => setGalleryFilter(f)} className={`gallery-filter-btn ${galleryFilter === f ? 'active' : ''}`}>{f.toUpperCase().replace('-', ' ')}</button>
              ))}
            </div>
          </div>
          <div className="gallery-grid" key={galleryFilter}>
            {filteredGallery.map((img, idx) => (
              <div key={idx} className="gallery-item reveal" style={{ animationDelay: `${idx * 0.05}s` }} onClick={() => setLightboxIndex(idx)}>
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay"><h4>{img.title}</h4><span className="category">{img.category}</span></div>
              </div>
            ))}
          </div>
        </div>
        {lightboxIndex !== null && (
          <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}><X size={32} /></button>
            <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
              <img src={filteredGallery[lightboxIndex].url} alt={filteredGallery[lightboxIndex].title} className="lightbox-image animate-zoom-in" />
              <div className="lightbox-caption"><h3>{filteredGallery[lightboxIndex].title}</h3><p>Vertex Performance — {filteredGallery[lightboxIndex].category.toUpperCase()}</p></div>
            </div>
          </div>
        )}
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2 className="text-gradient">CONNECT WITH VERTEX</h2>
            <p className="section-subtitle">Ready to schedule an evaluation or tour our facility? Reach out to our team instantly via WhatsApp or phone.</p>
          </div>
          <div className="contact-interactive-grid reveal">
            <a href="https://wa.me/918488862388" target="_blank" rel="noopener noreferrer" className="contact-card whatsapp-card glass" onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
              <div className="card-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.277h.005c5.505 0 9.989-4.478 9.99-9.985A9.97 9.97 0 0 0 12.012 2zm4.773 13.916c-.22.617-1.285 1.205-1.77 1.302-.44.09-1 .15-2.99-.64a12.87 12.87 0 0 1-5.18-4.57 6.91 6.91 0 0 1-1.048-2.923c0-1.748.88-2.617 1.246-2.984.29-.29.58-.37.74-.37h.58c.15 0 .37.07.51.41.22.52.74 1.79.8 1.92.07.14.07.29 0 .43l-.36.62c-.08.15-.22.29-.37.37-.15.07-.22.15-.07.45a6.83 6.83 0 0 0 2.533 3.193 6.13 6.13 0 0 0 3.125 1.18c.3 0 .52-.15.74-.37l.44-.52c.22-.22.37-.22.59-.15s1.46.74 1.72.89c.22.07.36.22.44.29a2.38 2.38 0 0 1-.093 1.15z"/></svg>
              </div>
              <h3>Chat on WhatsApp</h3>
              <p>Chat directly with Adeep Mohammed S for dynamic scheduling and slot confirmations.</p>
              <span className="contact-action-link">Open Chat Thread →</span>
            </a>
            <div className="contact-card call-card glass" onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
              <div className="card-icon"><Phone size={24} className="text-white" /></div>
              <h3>Call Facility Desk</h3>
              <p>Speak to our administrative coordinators or S&C intake specialists.</p>
              <div className="phone-numbers"><a href="tel:+918488862388">+91 8488-862388</a></div>
            </div>
            <a href="https://www.instagram.com/vertex_performance_/" target="_blank" rel="noopener noreferrer" className="contact-card instagram-card glass" onMouseMove={handleCard3DTilt} onMouseLeave={handleCard3DReset}>
              <div className="card-icon"><InstagramIcon /></div>
              <h3>Instagram Handles</h3>
              <p>Follow @vertex_performance_ for biomechanical reels, client lifting metrics, and schedules.</p>
              <span className="contact-action-link">Follow @vertex_performance_ →</span>
            </a>
          </div>
          <div className="map-address-block glass reveal mt-5">
            <div className="map-embed-wrapper"><iframe title="Vertex Performance Location Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.757049441111!2d72.5936746760205!3d23.106883213596766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83ca51bfb6d5%3A0xe54d32a93c7746fd!2sIshan%20Square!5e0!3m2!1sen!2sin!4v1719876543210!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0, borderRadius: 'var(--radius-md)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
            <div className="address-details-panel">
              <MapPin size={24} className="text-cyan mb-2" />
              <h3>VERTEX FACILITY HEADQUARTERS</h3>
              <p className="address-text">#307, Ishan Square, Near Amrakunj Bungalow,<br />Chandkheda (M), Ahmedabad – 382424</p>
              <div className="hours-block mt-3"><h4>Working Hours</h4><p>Mon - Sat: 7:00 AM - 11:00 AM &amp; 4:00 PM - 8:00 PM</p><p>Sunday &amp; Afternoon: Available on advanced booking</p></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand">
              <div className="logo-link mb-3"><img src={logoFull} alt="Vertex Performance Logo" className="logo-img-full footer-logo-img" /></div>
              <p className="mb-4">Bridging athletic excellence and professional physiotherapy. Discover science-backed S&C programming tailored to unlock physical resilience.</p>
              <div className="footer-socials"><a href="https://www.instagram.com/vertex_performance_/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><InstagramIcon /></a><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><FacebookIcon /></a><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><LinkedinIcon /></a></div>
            </div>
            <div className="footer-links-grid">
              <div><h4>Company</h4><ul className="footer-links"><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#programs">Programs</a></li><li><a href="#who-we-help">Who We Help</a></li></ul></div>
              <div><h4>Support</h4><ul className="footer-links"><li><a href="#rate-card">Programs</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#contact">Contact</a></li><li><button onClick={() => triggerBooking('Demo Session', 'Single Session', '₹299')} className="btn-link">Book Now</button></li></ul></div>
              <div><h4>Facility Hub</h4><ul className="footer-contact-info"><li><MapPin size={14} className="text-cyan" /><span>#307, Ishan Square, Chandkheda, Ahmedabad</span></li><li><Phone size={14} className="text-cyan" /><span>+91 8488-862388</span></li></ul></div>
            </div>
            <div className="footer-newsletter">
              <h4>Subscribe to Vertex Intel</h4>
              <p className="newsletter-subtitle">Get science-backed S&C tips and injury rehabilitation guides direct to your inbox.</p>
              {newsletterSubmitted ? <div className="newsletter-success animate-fade-in-up"><Check size={16} className="text-cyan" /><span>Successfully subscribed! Welcome aboard.</span></div> : <form onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true) }} className="footer-newsletter-form"><input type="email" placeholder="Enter your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required /><button type="submit" className="btn btn-primary footer-newsletter-btn">Subscribe</button></form>}
            </div>
          </div>
          <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Vertex Performance Centre. All Rights Reserved.</p></div>
        </div>
      </footer>

      <a href="https://wa.me/918488862388" target="_blank" rel="noopener noreferrer" className="floating-whatsapp-bubble animate-bounce" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" className="whatsapp-svg-icon" xmlns="http://www.w3.org/2000/svg"><path d="M16 2a14 14 0 0 0-12.1 21L2 29.8l7-1.8A14 14 0 1 0 16 2zm6.9 19.3c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.2-4-.8a17.2 17.2 0 0 1-7-6.2c-.9-1.2-1.5-2.6-1.5-4 0-2.4 1.2-3.6 1.7-4.1.4-.4.8-.5 1-.5h.8c.2 0 .5 0 .7.5.3.6.9 2.2 1 2.4.1.2.1.4 0 .6l-.5.8c-.1.2-.3.4-.5.5s-.3.3-.1.7a9.3 9.3 0 0 0 3.4 4.3 8.3 8.3 0 0 0 4.2 1.6c.4 0 .7-.2 1-.4l.6-.7c.3-.3.5-.3.8-.2s1.7.8 2 1c.3.1.5.3.6.4s.2.7-.1 1.5z" fill="#FFF"/></svg>
      </a>

      {bookingModalOpen && (
        <div className="booking-modal-overlay" onClick={() => setBookingModalOpen(false)}>
          <div className="booking-modal-panel glass animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBookingModalOpen(false)}><X size={24} /></button>
            {bookingStep === 1 ? (
              <form onSubmit={handleBookingSubmit} className="booking-modal-form">
                <h3>Schedule Your Training Slot</h3>
                <p className="subtitle">Selected: <strong>{bookingForm.program}</strong> ({bookingForm.plan} @ {bookingForm.price})</p>
                {bookingStatusMessage && <div className="booking-status-note">{bookingStatusMessage}</div>}
                <div className="form-group"><label>Full Name *</label><input type="text" value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})} required /></div>
                <div className="form-group-row">
                  <div className="form-group"><label>Age *</label><input type="number" value={bookingForm.age} onChange={(e) => setBookingForm({...bookingForm, age: e.target.value})} required /></div>
                  <div className="form-group"><label>Gender *</label><select value={bookingForm.gender} onChange={(e) => setBookingForm({...bookingForm, gender: e.target.value})}><option>Male</option><option>Female</option><option>Other</option></select></div>
                </div>
                <div className="form-group"><label>Phone Number *</label><input type="tel" value={bookingForm.phone} onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})} required /></div>
                <button type="submit" className="btn btn-primary w-full mt-4">{bookingNeedsQrStep ? 'Proceed to UPI QR' : 'Continue on WhatsApp'}</button>
              </form>
            ) : (
              <div className="booking-modal-payment text-center">
                <h3>UPI Payment QR</h3>
                <p className="subtitle">Scan the QR code with your UPI app, then continue on WhatsApp to confirm your booking.</p>
                <div className="qr-code-frame">
                  <img src={upiQr} alt="Vertex UPI QR Code" className="qr-image" />
                </div>
                <div className="upi-fallback-row">
                  <span>UPI ID:</span>
                  <code>{UPI_ID}</code>
                  <button type="button" className="btn-copy-upi" onClick={copyUpiId}>Copy</button>
                </div>
                <div className="payment-details-box">
                  <p><strong>Program:</strong> {bookingForm.program}</p>
                  <p><strong>Plan:</strong> {bookingForm.plan}</p>
                  <p><strong>Price:</strong> {bookingForm.price}</p>
                </div>
                <button onClick={executeWhatsAppRedirect} className="btn btn-primary w-full mt-4">Open WhatsApp</button>
                <button type="button" onClick={() => setBookingStep(1)} className="btn btn-secondary btn-sm w-full mt-2">← Back to Details Form</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
