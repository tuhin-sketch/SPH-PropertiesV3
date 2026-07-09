"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  MapPin,
  Building,
  Maximize,
  TrendingUp,
  Calculator,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Search,
  Filter,
  X,
  Check,
  ChevronLeft,
  ArrowLeft,
  Menu,
  FileText,
  User,
  Shield,
  Plane,
  Award,
  BookOpen
} from "lucide-react";

// Types
interface Room {
  id: string;
  name: string;
  area: string;
  finish: string;
  description: string;
  x: number; // Percent coordinates for SVG blueprint visualization
  y: number;
  width: number;
  height: number;
}

interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: number; // Percent coordinates for Virtual Tour
  y: number;
  material: string;
}

interface MarketData {
  region: string;
  growthRate: string;
  averageSqM: string;
  stampDutyEst: string;
  yieldPotential: string;
  lastTxPrice: string;
}

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  region: string;
  price: number;
  priceFormatted: string;
  area: string;
  plotSize: string;
  completion: string;
  ownership: string;
  image: string;
  tagline: string;
  description: string;
  blueprintRooms: Room[];
  virtualTourHotspots: Hotspot[];
  marketMetrics: MarketData;
}

// Portfolio Data
const PROPERTIES: Property[] = [
  {
    id: "monolith",
    name: "MONOLITH HOUSE",
    type: "Coastal Brutalist",
    location: "Cornwall Cliffs, UK",
    region: "Cornwall",
    price: 3850000,
    priceFormatted: "£3,850,000",
    area: "170 M²",
    plotSize: "0.12 HA",
    completion: "Q4 2026",
    ownership: "Freehold",
    image: "/images/monolith_house.jpg",
    tagline: "THE INFINITE PRECISION OF COASTAL BRUTALISM",
    description: "Suspended dynamically over the rugged granite cliffs of North Cornwall, Monolith House is an architectural masterclass. Structured in textured, board-marked concrete and engineered with pristine cantilever geometries, the residence creates an uncompromised structural alignment with the raw landscape and the Celtic Sea.",
    blueprintRooms: [
      { id: "atrium", name: "Atrium Deck", area: "35 M²", finish: "Board-Marked Concrete", description: "Seamless glass border with direct cliffside views and tectonic rock integration.", x: 10, y: 15, width: 35, height: 40 },
      { id: "living", name: "Cantilevered Living", area: "45 M²", finish: "Honed Quartz & Cement", description: "Suspended 12 meters over the sheer cliff face with a massive floating fireplace.", x: 45, y: 15, width: 45, height: 35 },
      { id: "master", name: "Master Suite Wing", area: "30 M²", finish: "Charred Oak & Raw Silk", description: "Oriented due west for sunset views, featuring a private rock-cut soak bath.", x: 10, y: 55, width: 35, height: 35 },
      { id: "pool", name: "Infinity Pool Basin", area: "60 M²", finish: "Basalt Tiles & Sea Glass", description: "A saltwater-filtered thermal basin seamlessly vanishing into the ocean horizon.", x: 45, y: 50, width: 45, height: 40 }
    ],
    virtualTourHotspots: [
      { id: "facade", name: "Bespoke Concrete Facade", material: "Self-healing raw concrete & oxidized steel", description: "The heavy, linear facade provides protection from sea winds while anchoring the structure securely into the granite cliffs.", x: 25, y: 35 },
      { id: "atrium_view", name: "The Oceanic Atrium", material: "Extra-clear tempered structural glazing", description: "A massive, custom-engineered glass wall without visible frames, ensuring an absolute connection with the coastal waters below.", x: 65, y: 45 },
      { id: "fireplace", name: "Floating Basalt Fireplace", material: "Honed local grey basalt & cast iron", description: "A dramatic architectural centerpoint, suspended gracefully from the ceiling to warm the ocean-facing concrete lounge.", x: 48, y: 72 }
    ],
    marketMetrics: {
      region: "Cornwall Coast Sector",
      growthRate: "+8.4% YoY",
      averageSqM: "£22,640 / M²",
      stampDutyEst: "£360,000",
      yieldPotential: "5.8% (Luxury Let)",
      lastTxPrice: "£3,620,000"
    }
  },
  {
    id: "rectory",
    name: "THE RECTORY",
    type: "Heritage Cotswold Manor",
    location: "Gloucestershire, Cotswolds, UK",
    region: "Cotswolds",
    price: 6200000,
    priceFormatted: "£6,200,000",
    area: "450 M²",
    plotSize: "1.50 HA",
    completion: "Completed",
    ownership: "Freehold",
    image: "/images/rectory_manor.jpg",
    tagline: "HERITAGE COTSWOLD STONE MEETS STRUCTURAL GLASS",
    description: "An elegant conversion of a Grade II listed 18th-century Cotswold stone rectory. SPH has introduced a spectacular, ultra-minimal steel and glass pavilion that expands the historic manor into manicured, private gardens—redefining country living with luxurious transparency and spatial flow.",
    blueprintRooms: [
      { id: "glass_pavilion", name: "Glass Garden Pavilion", area: "95 M²", finish: "Anodized Bronze & Limecrete", description: "A breathtaking living room extension with 4-meter slim-profile glass doors.", x: 45, y: 15, width: 45, height: 45 },
      { id: "great_hall", name: "Heritage Great Hall", area: "120 M²", finish: "Reclaimed Oak & Ashlar", description: "The historic core of the estate, featuring original timber trusses and restored stone carvings.", x: 10, y: 15, width: 35, height: 40 },
      { id: "master_suite", name: "The Garden Master Suite", area: "45 M²", finish: "Hand-honed Stone & Linen", description: "A tranquil private wing offering elevated views across the private estate meadows.", x: 10, y: 55, width: 35, height: 35 },
      { id: "wine_cellar", name: "Subterranean Crypt Cellar", area: "30 M²", finish: "Cotswold Rubble & Slate", description: "Climate-controlled original stone cellars optimized for collector-grade storage.", x: 45, y: 60, width: 45, height: 30 }
    ],
    virtualTourHotspots: [
      { id: "stone_facade", name: "Ashlar Stone Core", material: "18th-century local Cotswold limestone", description: "Original hand-cut honey stone, carefully restored with lime mortar to preserve breathability and the historic UK countryside aesthetic.", x: 30, y: 30 },
      { id: "glass_joint", name: "The Minimalist Glass Pavilion", material: "Triple-glazed low-iron solar glass", description: "Sleek, bronze-anodized steel framing merges the classic stone facade with the extensive garden views seamlessly.", x: 70, y: 40 },
      { id: "terrace_deck", name: "Limestone Floating Terrace", material: "Honed English limestone slabs", description: "Floating outdoor terrace tiles positioned perfectly over a hidden drainage grid, creating a flush threshold between indoor and outdoor dining.", x: 50, y: 78 }
    ],
    marketMetrics: {
      region: "Gloucestershire Luxury Belt",
      growthRate: "+6.2% YoY",
      averageSqM: "£13,770 / M²",
      stampDutyEst: "£640,000",
      yieldPotential: "4.5% (High-Yield)",
      lastTxPrice: "£5,950,000"
    }
  },
  {
    id: "terra",
    name: "TERRA PENTHOUSE",
    type: "Urban Brutalist Penthouse",
    location: "Thames Bank, London, UK",
    region: "London",
    price: 8950000,
    priceFormatted: "£8,950,000",
    area: "320 M²",
    plotSize: "N/A (Urban)",
    completion: "Q2 2027",
    ownership: "Leasehold (999 Years)",
    image: "/images/terra_penthouse.jpg",
    tagline: "BRUTALIST MONUMENT IN THE LONDON SKYLINE",
    description: "Hovering high above the South Bank of the River Thames, Terra Penthouse is a split-level modernist monolith. Designed around board-marked concrete columns, industrial bronze finishes, and private sky decks, the penthouse delivers uninterrupted dramatic views of the London city skyline.",
    blueprintRooms: [
      { id: "sky_deck", name: "Panoramic Sky Terrace", area: "65 M²", finish: "Charred Larch & Steel", description: "Equipped with a custom concrete fire basin and panoramic river views.", x: 45, y: 55, width: 45, height: 35 },
      { id: "salon", name: "Double-Height Atrium Salon", area: "80 M²", finish: "Micro-Cement & Brass Panels", description: "6-meter ceiling clearance featuring brutalist columns and sculptural concrete stairways.", x: 10, y: 15, width: 35, height: 45 },
      { id: "master_loft", name: "Master Loft Suite", area: "55 M²", finish: "Dark Oak & Polished Plaster", description: "Elevated on the concrete mezzanine with private panoramic skylights.", x: 10, y: 60, width: 35, height: 30 },
      { id: "kitchen_pantry", name: "Monolithic Brass Kitchen", area: "40 M²", finish: "Raw Acid-Washed Brass", description: "Sculptured kitchen island with professional appliances hidden behind bronze panels.", x: 45, y: 15, width: 45, height: 35 }
    ],
    virtualTourHotspots: [
      { id: "concrete_column", name: "Board-Marked Concrete Columns", material: "High-density concrete cast in timber moulds", description: "Tectonic structural elements with prominent wood grain textures, displaying the honest brutalist heritage of the building.", x: 28, y: 50 },
      { id: "river_glazing", name: "Frameless Skyline Glazing", material: "Acoustically insulated structural glass", description: "Double-height glass panels with low-emissivity coating that shield city noises while maximizing views of the River Thames.", x: 72, y: 35 },
      { id: "brass_island", name: "Monolithic Kitchen Island", material: "Acid-washed hand-beaten brass & Belgian fossil stone", description: "A dramatic central feature designed to patinate and age beautifully, reflecting the soft industrial evening light of London.", x: 50, y: 70 }
    ],
    marketMetrics: {
      region: "Prime Central London (PCL)",
      growthRate: "+11.2% YoY",
      averageSqM: "£27,960 / M²",
      stampDutyEst: "£980,000",
      yieldPotential: "6.2% (Prime Let)",
      lastTxPrice: "£8,450,000"
    }
  },
  {
    id: "echo",
    name: "ECHO RETREAT",
    type: "Highlands Timber Lodge",
    location: "Cairngorms, Scottish Highlands, UK",
    region: "Highlands",
    price: 4500000,
    priceFormatted: "£4,500,000",
    area: "1,250 M²",
    plotSize: "4.80 HA",
    completion: "Completed",
    ownership: "Freehold",
    image: "/images/echo_retreat.jpg",
    tagline: "HIGH-ALTITUDE TIMBER LODGE IN WILD SCENERY",
    description: "Nestled in the remote peaks of the Cairngorms, Echo Retreat is a private mountain sanctuary. Built with high-strength structural timber frames and wrapped in heat-insulated triple glazing, the property balances vast open spaces with a warm, intimate atmosphere surrounded by ancient pine forests.",
    blueprintRooms: [
      { id: "pine_gallery", name: "Forest Living Gallery", area: "150 M²", finish: "Douglas Fir & Slate Tiles", description: "Widescreen pine structural frames enclosing a floating suspended black wood stove.", x: 45, y: 15, width: 45, height: 40 },
      { id: "atrium_peak", name: "Peak-View Atrium", area: "120 M²", finish: "Glued Laminated Timber & Glass", description: "A majestic three-story glass peak oriented towards the wild mountain ridges.", x: 10, y: 15, width: 35, height: 45 },
      { id: "spa_house", name: "Thermal Spa Bathhouse", area: "80 M²", finish: "Aromatic Cedar & River Rock", description: "Geothermally heated stone pool with integrated cedar sauna and outdoor plunge tub.", x: 10, y: 60, width: 35, height: 30 },
      { id: "master_wing", name: "Master Wing Retreat", area: "70 M²", finish: "Hand-Carved Larch & Cashmere", description: "Featuring a custom stone hearth and panoramic glass balcony opening to alpine pines.", x: 45, y: 55, width: 45, height: 35 }
    ],
    virtualTourHotspots: [
      { id: "timber_beams", name: "Douglas Fir Structure", material: "Bespoke Glulam (Glued Laminated Timber)", description: "Heavy-timber posts engineered for extreme wind resistance, displaying beautiful organic textures that warm the alpine space.", x: 35, y: 25 },
      { id: "hearth_stone", name: "Central River Rock Hearth", material: "Hand-selected highland river stones & heavy steel", description: "An immersive central thermal mass that stores wood-stove heat and naturally radiates warmth through the lodge.", x: 50, y: 65 },
      { id: "glazing_wall", name: "High-Altitude Triple Glazing", material: "Argon-filled low-iron structural glass", description: "Advanced insulation technology that locks in heat even in sub-zero winter storms while remaining crystal clear without condensation.", x: 75, y: 45 }
    ],
    marketMetrics: {
      region: "Highland Luxury Estate Sector",
      growthRate: "+5.1% YoY",
      averageSqM: "£3,600 / M²",
      stampDutyEst: "£410,000",
      yieldPotential: "7.1% (Exclusive Rental)",
      lastTxPrice: "£4,200,000"
    }
  }
];

export default function Page() {
  // Navigation & Page State
  const [currentView, setCurrentView] = useState<"home" | "portfolio" | "about" | "services" | "detail">("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("monolith");
  
  // Active Hero Slide for Home Screen
  const [activeHeroId, setActiveHeroId] = useState<string>("monolith");
  
  // Portfolio search and filtering state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterBudget, setFilterBudget] = useState<string>("ANY");
  const [filterLocation, setFilterLocation] = useState<string>("ANY");

  // Property Details Page Interactive States
  const [detailTab, setDetailTab] = useState<"blueprint" | "tour" | "market">("blueprint");
  const [mediaMode, setMediaMode] = useState<Record<string, "visual" | "blueprint">>({});
  const [hoveredBlueprintRoomId, setHoveredBlueprintRoomId] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [hotspotLoading, setHotspotLoading] = useState<boolean>(false);
  const [hotspotAnalysis, setHotspotAnalysis] = useState<string>("");
  const [marketLoading, setMarketLoading] = useState<boolean>(false);
  const [marketAnalysis, setMarketAnalysis] = useState<string>("");
  const [buyerType, setBuyerType] = useState<"standard" | "second" | "non-resident">("standard");

  // VIP Booking Form State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingCustom, setBookingCustom] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Derive currently viewed detailed property
  const activeDetailProperty = PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];
  const activeHeroProperty = PROPERTIES.find((p) => p.id === activeHeroId) || PROPERTIES[0];

  const navigateToView = (view: "home" | "portfolio" | "about" | "services" | "detail") => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToDetail = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView("detail");
    setMarketAnalysis("");
    setSelectedHotspot(null);
    setHotspotAnalysis("");
    setDetailTab("blueprint");
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Automatically switch the active hero slide every 3 seconds (3000ms)
  useEffect(() => {
    if (currentView !== "home") return;

    const interval = setInterval(() => {
      setActiveHeroId((prevId) => {
        const currentIndex = PROPERTIES.findIndex((p) => p.id === prevId);
        const nextIndex = (currentIndex + 1) % PROPERTIES.length;
        return PROPERTIES[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentView]);

  // Handle slide transitions in the landing hero
  const handleNextHero = () => {
    const currentIndex = PROPERTIES.findIndex((p) => p.id === activeHeroId);
    const nextIndex = (currentIndex + 1) % PROPERTIES.length;
    setActiveHeroId(PROPERTIES[nextIndex].id);
  };

  const handlePrevHero = () => {
    const currentIndex = PROPERTIES.findIndex((p) => p.id === activeHeroId);
    const prevIndex = (currentIndex - 1 + PROPERTIES.length) % PROPERTIES.length;
    setActiveHeroId(PROPERTIES[prevIndex].id);
  };

  // Fetch bespoke AI details for virtual tour hotspot
  const selectHotspot = async (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setHotspotLoading(true);
    setHotspotAnalysis("");

    try {
      const res = await fetch("/app/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "hotspot_details",
          propertyName: activeDetailProperty.name,
          region: activeDetailProperty.location,
          hotspotId: hotspot.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setHotspotAnalysis(data.text);
      } else {
        setHotspotAnalysis(data.text || "Architectural review briefly unavailable. Indeed, please attempt once more.");
      }
    } catch (e) {
      setHotspotAnalysis("I apologize, our direct line to the design studio is currently restricted. Please try again.");
    } finally {
      setHotspotLoading(false);
    }
  };

  // Fetch region-specific market forecast from Gemini
  const fetchMarketAnalysis = async () => {
    setMarketLoading(true);
    setMarketAnalysis("");
    try {
      const res = await fetch("/app/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "market_analysis",
          propertyName: activeDetailProperty.name,
          region: activeDetailProperty.region
        })
      });
      const data = await res.json();
      if (data.success) {
        setMarketAnalysis(data.text);
      } else {
        setMarketAnalysis("Apologies, valuation modeling could not be completed at this time.");
      }
    } catch (e) {
      setMarketAnalysis("Apologies, valuation modeling could not be completed due to a temporary network lag.");
    } finally {
      setMarketLoading(false);
    }
  };

  // SDLT (Stamp Duty Land Tax) Calculator (UK Luxury rules 2026)
  const calculateSDLT = (price: number, type: "standard" | "second" | "non-resident") => {
    let surcharge = 0;
    if (type === "second") surcharge = 0.03;
    if (type === "non-resident") surcharge = 0.02;

    let tax = 0;
    const bands = [
      { limit: 250000, rate: 0 },
      { limit: 925000, rate: 0.05 },
      { limit: 1500000, rate: 0.10 },
      { limit: Infinity, rate: 0.12 }
    ];

    let remaining = price;
    let prevLimit = 0;

    for (const band of bands) {
      const bandCap = band.limit - prevLimit;
      const taxableInBand = Math.min(remaining, bandCap);
      if (taxableInBand <= 0) break;
      
      tax += taxableInBand * (band.rate + surcharge);
      remaining -= taxableInBand;
      prevLimit = band.limit;
    }

    return Math.round(tax);
  };

  const currentSDLT = calculateSDLT(activeDetailProperty.price, buyerType);

  // VIP Booking handler
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setBookingName("");
      setBookingEmail("");
      setBookingDate("");
      setBookingTime("");
      setBookingCustom("");
    }, 3500);
  };

  // Filter properties based on complex filter controls
  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "ALL" || p.type.toUpperCase().includes(filterType);
    
    let matchesBudget = true;
    if (filterBudget === "UNDER_5M") matchesBudget = p.price < 5000000;
    if (filterBudget === "ABOVE_5M") matchesBudget = p.price >= 5000000;

    let matchesLoc = true;
    if (filterLocation !== "ANY") {
      matchesLoc = p.region.toLowerCase().includes(filterLocation.toLowerCase()) || 
                   p.location.toLowerCase().includes(filterLocation.toLowerCase());
    }

    return matchesSearch && matchesType && matchesBudget && matchesLoc;
  });

  return (
    <div id="sph-properties-root" className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-[#f5f3ef]">
      
      {/* Top Header & Navigation Bar */}
      <header id="sph-header" className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-[#e5e2dd] bg-white/75 px-4 sm:px-5 py-2.5 shadow-[0_12px_28px_rgba(10,11,13,0.08)] backdrop-blur-xl ring-1 ring-white/70 pointer-events-auto">
          <div 
            onClick={() => navigateToView("home")} 
            className="flex min-w-0 items-center space-x-3 cursor-pointer group"
          >
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/newUpdatedFinalLogo.png"
                alt="SPH Properties logo"
                fill
                priority
                sizes="(max-width: 640px) 40px, 44px"
                className="rounded-full object-cover"
              />
            </div>
            <span className="hidden md:inline font-display text-base lg:text-lg tracking-[0.18em] text-luxury-charcoal uppercase select-none font-semibold whitespace-nowrap">
              SPH Properties
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-luxury-charcoal/70">
            <button 
              onClick={() => navigateToView("home")} 
              className={`rounded-full px-3.5 py-2 transition-all duration-300 hover:bg-[#f5f3ef] hover:text-luxury-charcoal ${currentView === "home" ? "bg-[#f5f3ef] text-luxury-charcoal shadow-[0_4px_10px_rgba(10,11,13,0.08)]" : ""}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateToView("portfolio")} 
              className={`rounded-full px-3.5 py-2 transition-all duration-300 hover:bg-[#f5f3ef] hover:text-luxury-charcoal ${currentView === "portfolio" ? "bg-[#f5f3ef] text-luxury-charcoal shadow-[0_4px_10px_rgba(10,11,13,0.08)]" : ""}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => navigateToView("services")} 
              className={`rounded-full px-3.5 py-2 transition-all duration-300 hover:bg-[#f5f3ef] hover:text-luxury-charcoal ${currentView === "services" ? "bg-[#f5f3ef] text-luxury-charcoal shadow-[0_4px_10px_rgba(10,11,13,0.08)]" : ""}`}
            >
              Bespoke Services
            </button>
            <button 
              onClick={() => navigateToView("about")} 
              className={`rounded-full px-3.5 py-2 transition-all duration-300 hover:bg-[#f5f3ef] hover:text-luxury-charcoal ${currentView === "about" ? "bg-[#f5f3ef] text-luxury-charcoal shadow-[0_4px_10px_rgba(10,11,13,0.08)]" : ""}`}
            >
              Our Heritage
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto lg:ml-0">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:flex items-center space-x-2 rounded-full bg-luxury-charcoal px-4 sm:px-5 py-2 text-[10px] font-bold tracking-[0.18em] uppercase text-white shadow-[0_8px_18px_rgba(10,11,13,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-luxury-gold"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Private Viewing</span>
            </button>

            {/* Hamburger button for mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex-shrink-0 rounded-full border border-[#e5e2dd] bg-white px-3 py-2 text-luxury-charcoal shadow-sm transition hover:bg-[#f5f3ef]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#e5e2dd] px-6 py-4 flex flex-col space-y-4 text-xs font-bold tracking-widest text-luxury-charcoal uppercase"
          >
            <button onClick={() => navigateToView("home")} className={`text-left py-2 hover:text-luxury-gold ${currentView === "home" ? "text-luxury-gold" : ""}`}>Home</button>
            <button onClick={() => navigateToView("portfolio")} className={`text-left py-2 hover:text-luxury-gold ${currentView === "portfolio" ? "text-luxury-gold" : ""}`}>Portfolio</button>
            <button onClick={() => navigateToView("services")} className={`text-left py-2 hover:text-luxury-gold ${currentView === "services" ? "text-luxury-gold" : ""}`}>Bespoke Services</button>
            <button onClick={() => navigateToView("about")} className={`text-left py-2 hover:text-luxury-gold ${currentView === "about" ? "text-luxury-gold" : ""}`}>Our Heritage</button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full bg-luxury-charcoal text-white text-center py-3 text-[10px] tracking-widest uppercase mt-2 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Private Viewing</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Page Views Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === "home" && (
          <div>
            {/* Immersive Cinematic Carousel Hero Section */}
            <section id="hero" className="relative h-[88vh] sm:h-[80vh] md:h-[85vh] bg-black text-white flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroProperty.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeHeroProperty.image}
                      alt={activeHeroProperty.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Huge Bold Architecture Display Typography */}
              <div className="z-10 px-4 sm:px-6 md:px-12 flex flex-col justify-end h-full pb-6 sm:pb-12">
                <div className="max-w-4xl text-left space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden sm:block text-[9px] sm:text-[10px] md:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] text-luxury-gold uppercase font-bold"
                  >
                    SPH ARCHITECTURAL MARVELS • {activeHeroProperty.type}
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={activeHeroProperty.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="font-display text-[2.6rem] sm:text-5xl md:text-8xl tracking-tighter leading-[0.88] sm:leading-[0.95] uppercase text-white font-black select-none max-w-[8ch] sm:max-w-none"
                    >
                      {activeHeroProperty.name}
                    </motion.h1>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeHeroProperty.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="hidden sm:block text-white/80 text-xs md:text-sm max-w-xl leading-relaxed tracking-wide font-sans font-medium"
                    >
                      {activeHeroProperty.tagline}. {activeHeroProperty.description.split(".")[0]}.
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Carousel Controllers integrated at bottom bar */}
              <div className="z-10 hidden sm:flex w-full bg-black/80 backdrop-blur-md border-t border-white/10 p-4 sm:p-5 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-left">
                  <div>
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">ACTIVE RESIDENCE</span>
                    <span className="text-sm font-bold uppercase tracking-wide text-luxury-gold">{activeHeroProperty.location}</span>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-white/10" />
                  <div className="hidden md:block">
                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest block">BESPOKE VALUE</span>
                    <span className="text-sm font-bold font-mono">{activeHeroProperty.priceFormatted}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-start sm:justify-end gap-4 sm:space-x-4">
                  {/* Left & Right Arrows */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrevHero}
                      className="w-9 h-9 rounded-full border border-white/20 hover:border-luxury-gold hover:bg-white/10 flex items-center justify-center transition text-white"
                      title="Previous Residence"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextHero}
                      className="w-9 h-9 rounded-full border border-white/20 hover:border-luxury-gold hover:bg-white/10 flex items-center justify-center transition text-white"
                      title="Next Residence"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Overlapping Quick-Switch Thumbnails */}
                  <div className="flex items-center -space-x-2.5 overflow-x-auto no-scrollbar max-w-[12rem] sm:max-w-none pb-1 sm:pb-0">
                    {PROPERTIES.map((p) => {
                      const isActive = p.id === activeHeroProperty.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setActiveHeroId(p.id)}
                          className={`relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                            isActive ? "border-luxury-gold scale-110 z-20 shadow-md" : "border-white/25 hover:border-white/60 z-10"
                          }`}
                          title={`View ${p.name}`}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* REDESIGNED SIGNATURE PORTFOLIO SECTION: Staggered alternating editorial showcase with dynamic media toggle */}
            <section className="py-24 px-6 max-w-7xl mx-auto text-left">
              <div className="mb-16 border-b border-[#e5e2dd] pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.4em] text-luxury-gold uppercase font-bold block mb-2">
                    The Signature Collection
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-luxury-charcoal font-light">
                    Our Portfolio <span className="font-normal text-luxury-gold">at a glance</span>
                  </h2>
                  <p className="text-xs text-luxury-charcoal/70 leading-relaxed mt-3 max-w-2xl font-medium font-sans">
                    Exploring the thin threshold between uncompromised luxury and clean physical engineering. Select a showcase structure below to view either its high-fidelity render or raw blueprint wireframe schema.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => navigateToView("portfolio")}
                    className="inline-flex items-center space-x-3 text-xs font-bold tracking-[0.2em] text-luxury-gold hover:text-luxury-charcoal uppercase transition-all duration-300 group border-b border-luxury-gold/30 pb-2"
                  >
                    <span>View Entire Registry ({PROPERTIES.length})</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Alternating Staggered Layout for Featured properties */}
              <div className="space-y-28">
                {PROPERTIES.slice(0, 3).map((property, idx) => {
                  const isEven = idx % 2 === 0;
                  const activeMode = mediaMode[property.id] || "visual";

                  return (
                    <div 
                      key={property.id}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                    >
                      {/* Media Column (Takes 7 columns) */}
                      <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0b0d] group border border-[#e5e2dd] rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500">
                          
                          {/* Ambient background blur accent under the image */}
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.08),transparent_70%)] pointer-events-none" />

                          {/* Media Content Container */}
                          <div className="w-full h-full relative">
                            <AnimatePresence mode="wait">
                              {activeMode === "visual" ? (
                                <motion.div
                                  key="visual"
                                  initial={{ opacity: 0, scale: 1.02 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  transition={{ duration: 0.4 }}
                                  className="w-full h-full relative"
                                >
                                  <img
                                    src={property.image}
                                    alt={property.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition duration-300" />
                                  
                                  {/* Immersive Dark Gradient Accent overlay */}
                                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                  
                                  {/* Price Tag Overlay with dynamic gold frame */}
                                  <div className="absolute bottom-6 left-6 bg-luxury-charcoal/90 backdrop-blur-md text-white px-4 py-2 font-mono text-xs font-semibold tracking-wider border-l-2 border-luxury-gold flex items-center space-x-2">
                                    <span className="text-white/60 text-[10px]">EST. VALUE /</span>
                                    <span className="text-luxury-gold">{property.priceFormatted}</span>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="blueprint"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.4 }}
                                  className="w-full h-full bg-[#0a0b0d] p-6 lg:p-8 flex flex-col justify-between relative"
                                >
                                  {/* Fine schematic blueprints background details */}
                                  <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(197,168,128,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.07)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a880_1.5px,transparent_1.5px)] [background-size:12px_12px] pointer-events-none" />

                                  <div className="flex justify-between items-center w-full z-10 border-b border-white/10 pb-3">
                                    <span className="text-[8px] font-mono text-white/50 tracking-[0.25em] uppercase">SPH TECLINE SCHEMA / VER 1.09</span>
                                    <span className="text-[8px] font-mono text-luxury-gold font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">{property.type}</span>
                                  </div>

                                  {/* SVG Drawing of the layout - interactive on hover */}
                                  <div className="flex-1 flex items-center justify-center py-4 z-10">
                                    <svg viewBox="0 0 100 100" className="w-full max-h-52 opacity-95 drop-shadow-[0_0_20px_rgba(197,168,128,0.15)]">
                                      <rect x="2" y="2" width="96" height="96" fill="none" stroke="#1d2026" strokeWidth="0.5" strokeDasharray="3,3" />
                                      {property.blueprintRooms.map((room) => (
                                        <g key={room.id} className="group/room cursor-pointer">
                                          <rect
                                            x={room.x}
                                            y={room.y}
                                            width={room.width}
                                            height={room.height}
                                            fill="none"
                                            stroke="#c5a880"
                                            strokeWidth="0.75"
                                            className="transition duration-300 group-hover/room:fill-luxury-gold/5 group-hover/room:stroke-white"
                                          />
                                          <text
                                            x={room.x + room.width / 2}
                                            y={room.y + room.height / 2}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#ffffff"
                                            fontSize="2.4"
                                            className="font-mono tracking-wider font-bold transition-all duration-300 group-hover/room:fill-luxury-gold opacity-60 group-hover/room:opacity-100"
                                          >
                                            {room.name.toUpperCase()}
                                          </text>
                                          <text
                                            x={room.x + room.width / 2}
                                            y={room.y + room.height / 2 + 4}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#c5a880"
                                            fontSize="1.8"
                                            className="font-mono tracking-wider transition-all duration-300 opacity-40 group-hover/room:opacity-80"
                                          >
                                            {room.area}
                                          </text>
                                        </g>
                                      ))}
                                    </svg>
                                  </div>

                                  <div className="border-t border-white/10 pt-3 flex justify-between text-[8px] font-mono text-white/40 z-10">
                                    <span>SCALE 1:100 / PLOT SIZE: {property.plotSize}</span>
                                    <span>{property.area} ATRIUM PLAN</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Floating Custom Mode Toggles */}
                          <div className="absolute top-4 right-4 z-20 flex bg-luxury-charcoal/90 backdrop-blur-md p-1 border border-white/10 shadow-lg">
                            <button
                              onClick={() => setMediaMode((prev) => ({ ...prev, [property.id]: "visual" }))}
                              className={`px-3 py-1.5 text-[8px] font-mono tracking-widest uppercase transition-all duration-300 ${
                                activeMode === "visual"
                                  ? "bg-luxury-gold text-luxury-charcoal font-bold"
                                  : "text-white/60 hover:text-white"
                              }`}
                            >
                              01 / RENDER
                            </button>
                            <button
                              onClick={() => setMediaMode((prev) => ({ ...prev, [property.id]: "blueprint" }))}
                              className={`px-3 py-1.5 text-[8px] font-mono tracking-widest uppercase transition-all duration-300 ${
                                activeMode === "blueprint"
                                  ? "bg-luxury-gold text-luxury-charcoal font-bold"
                                  : "text-white/60 hover:text-white"
                              }`}
                            >
                              02 / SCHEMA
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Info Column (Takes 5 columns) */}
                      <div className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-luxury-gold font-bold uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                            <span>{property.location}</span>
                          </div>
                          
                          <h3 className="font-display text-4xl lg:text-5xl font-light tracking-tight text-luxury-charcoal uppercase">
                            {property.name.split(" ")[0]} <span className="font-normal text-luxury-gold">{property.name.split(" ").slice(1).join(" ")}</span>
                          </h3>
                          
                          <p className="text-[10px] font-mono tracking-[0.2em] text-luxury-charcoal/40 uppercase font-semibold">
                            {property.tagline}
                          </p>
                        </div>

                        <p className="text-sm text-luxury-charcoal/70 leading-relaxed font-sans font-medium">
                          {property.description}
                        </p>

                        {/* Fine Grid Specifications */}
                        <div className="grid grid-cols-2 gap-4 border-t border-b border-[#e5e2dd] py-5">
                          <div>
                            <span className="text-[8px] font-mono text-luxury-charcoal/40 uppercase tracking-widest block mb-1">PLOT SIZE</span>
                            <span className="text-xs font-bold text-luxury-charcoal font-mono uppercase">{property.plotSize}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-luxury-charcoal/40 uppercase tracking-widest block mb-1">COMPLETION</span>
                            <span className="text-xs font-bold text-luxury-charcoal font-mono uppercase">{property.completion}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-luxury-charcoal/40 uppercase tracking-widest block mb-1">OWNER TENURE</span>
                            <span className="text-xs font-bold text-luxury-charcoal font-mono uppercase">{property.ownership}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-luxury-charcoal/40 uppercase tracking-widest block mb-1">INTERNAL AREA</span>
                            <span className="text-xs font-bold text-luxury-gold font-mono uppercase">{property.area}</span>
                          </div>
                        </div>

                        {/* Explore Case Study button */}
                        <div className="pt-2">
                          <button 
                            onClick={() => navigateToDetail(property.id)}
                            className="inline-flex items-center space-x-4 bg-luxury-charcoal hover:bg-luxury-gold text-white text-[10px] font-bold tracking-[0.2em] uppercase py-4 px-6 transition duration-300 w-full lg:w-auto shadow-md group rounded-sm"
                          >
                            <span>Explore Full Case Study & AI Review</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Elegant central bottom pagination pointer */}
              <div className="mt-24 text-center border-t border-[#e5e2dd] pt-12">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-luxury-charcoal/40 mb-6">
                  Ready to view the absolute catalogue?
                </p>
                <button
                  onClick={() => navigateToView("portfolio")}
                  className="inline-flex items-center space-x-3 bg-transparent hover:bg-luxury-charcoal border border-luxury-charcoal/30 text-luxury-charcoal hover:text-white px-10 py-4 font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-sm group"
                >
                  <span>Enter Architectural Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </section>

            {/* SPH HERITAGE & ARCHITECTURAL PHILOSOPHY */}
            <section className="bg-luxury-charcoal text-white py-24 px-6 text-left">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <span className="text-[10px] font-mono tracking-[0.4em] text-luxury-gold uppercase font-bold block">
                    Our Heritage & Craft
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl tracking-tighter uppercase font-black text-white leading-[0.95]">
                    Marrying Natural Topography with Brutalist Concrete
                  </h2>
                  <div className="w-16 h-1 bg-luxury-gold" />
                  
                  <p className="text-white/70 text-sm leading-relaxed font-sans font-medium">
                    SPH Properties is a private real estate agency and architectural consultancy registered in England & Wales. We operate from our private executive office at 42 Berkeley Square, Mayfair, London.
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed font-sans">
                    Our philosophy focuses on uncompromised structural honesty. We actively curate properties designed around honest raw materials: self-healing concrete cast in hand-selected wood timber molds, triple-glazed low-iron structural glass, and Douglas Fir structural frames engineered for severe high-altitude wind loads.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 font-medium">
                    <div>
                      <span className="text-[8px] font-mono text-white/40 uppercase block">Private Mayfair Operations</span>
                      <span className="font-display text-2xl font-black text-luxury-gold block mt-1">42 Berkeley Sq.</span>
                      <span className="text-[10px] text-white/50 block font-sans">Bespoke portfolio management office</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-white/40 uppercase block">Discreet Representation</span>
                      <span className="font-display text-2xl font-black text-luxury-gold block mt-1">100% Secure</span>
                      <span className="text-[10px] text-white/50 block font-sans">Complete off-market privacy</span>
                    </div>
                  </div>
                </div>

                {/* Staggered Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#14161a] p-6 border border-white/5 space-y-4">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg uppercase font-bold text-white tracking-wide">
                      Tectonic Siting
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      Our portfolio integrates structural designs with rugged cliff faces, historic stone rectory expansions, and skyline penthouses.
                    </p>
                  </div>

                  <div className="bg-[#14161a] p-6 border border-white/5 space-y-4 sm:translate-y-6">
                    <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg uppercase font-bold text-white tracking-wide">
                      Planning S106 Expertise
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      We guide international investors through Section 106 agreements, Grade II historical listing restrictions, and local planning laws.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* BESPOKE CONCIERGE PATRON SERVICES */}
            <section className="py-24 px-6 bg-white text-left">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-2">
                    Bespoke Concierge Offerings
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl tracking-tighter uppercase font-black text-luxury-charcoal">
                    Private Patron Advisory
                  </h2>
                  <p className="text-xs text-luxury-charcoal/60 max-w-lg mt-2 font-medium">
                    Tailored luxury services ensuring seamless architectural inspections, legal compliance, and personalized structural modifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-6 border border-[#e5e2dd] space-y-3 hover:border-luxury-gold transition duration-300">
                    <Plane className="w-6 h-6 text-luxury-gold" />
                    <h3 className="text-xs font-bold tracking-wider uppercase text-luxury-charcoal">Heli & Jet Logistics</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed">
                      We organize private flight coordinates and luxury transport for seamless and completely confidential property visits.
                    </p>
                  </div>

                  <div className="p-6 border border-[#e5e2dd] space-y-3 hover:border-luxury-gold transition duration-300">
                    <Shield className="w-6 h-6 text-luxury-gold" />
                    <h3 className="text-xs font-bold tracking-wider uppercase text-luxury-charcoal">Off-Market Acquisition</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed">
                      Representing buyers in acquiring premium, unlisted residential real estate across Mayfair, Belgravia, and coastal estates.
                    </p>
                  </div>

                  <div className="p-6 border border-[#e5e2dd] space-y-3 hover:border-luxury-gold transition duration-300">
                    <Award className="w-6 h-6 text-luxury-gold" />
                    <h3 className="text-xs font-bold tracking-wider uppercase text-luxury-charcoal">Grade II Consultancy</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed">
                      Our in-house legal team handles historic preservation applications, local UK council mandates, and planning permissions.
                    </p>
                  </div>

                  <div className="p-6 border border-[#e5e2dd] space-y-3 hover:border-luxury-gold transition duration-300">
                    <Building className="w-6 h-6 text-luxury-gold" />
                    <h3 className="text-xs font-bold tracking-wider uppercase text-luxury-charcoal">Custom Upgrades</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed">
                      Enabling clients to commission physical upgrades: custom concrete infinity pools, solar microgrids, or thermal cedar saunas.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PORTFOLIO VIEW */}
        {currentView === "portfolio" && (
          <div className="py-16 px-6 max-w-7xl mx-auto text-left">
            <div className="mb-12">
              <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-2">
                Curated UK Landmarks
              </span>
              <h1 className="font-display text-4xl md:text-6xl tracking-tighter uppercase font-black text-luxury-charcoal">
                SPH Signature Portfolio
              </h1>
              <p className="text-xs text-luxury-charcoal/60 mt-2 max-w-xl font-medium">
                Search and analyze our ultra-exclusive selection of brutalist concrete masterpieces, mountain timber retreats, and listing-exempt heritage manors.
              </p>
            </div>

            {/* Filter Navigation & Search Bar */}
            <div className="bg-white border border-[#e5e2dd] p-6 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center shadow-sm">
              
              {/* Search Bar (4 Cols) */}
              <div className="lg:col-span-4 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-luxury-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f3ef] text-xs font-medium pl-10 pr-4 py-2.5 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold"
                />
              </div>

              {/* Category Filter (3 Cols) */}
              <div className="lg:col-span-3 flex items-center space-x-2">
                <Filter className="w-4 h-4 text-luxury-gold shrink-0" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-[#f5f3ef] text-xs font-bold py-2.5 px-3 border border-[#e5e2dd] text-luxury-charcoal focus:outline-none"
                >
                  <option value="ALL">ALL ARCHITECTURAL TYPES</option>
                  <option value="COASTAL">COASTAL BRUTALIST</option>
                  <option value="HERITAGE">HERITAGE MANOR</option>
                  <option value="BRUTALIST">URBAN BRUTALIST</option>
                  <option value="MOUNTAIN">MOUNTAIN LODGE</option>
                </select>
              </div>

              {/* Budget Sorter (2.5 Cols) */}
              <div className="lg:col-span-2.5">
                <select
                  value={filterBudget}
                  onChange={(e) => setFilterBudget(e.target.value)}
                  className="w-full bg-[#f5f3ef] text-xs font-bold py-2.5 px-3 border border-[#e5e2dd] text-luxury-charcoal focus:outline-none"
                >
                  <option value="ANY">ANY BUDGET</option>
                  <option value="UNDER_5M">UNDER £5,000,000</option>
                  <option value="ABOVE_5M">£5,000,000 +</option>
                </select>
              </div>

              {/* Region Sorter (2.5 Cols) */}
              <div className="lg:col-span-2.5">
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full bg-[#f5f3ef] text-xs font-bold py-2.5 px-3 border border-[#e5e2dd] text-luxury-charcoal focus:outline-none"
                >
                  <option value="ANY">ANY REGION</option>
                  <option value="Cornwall">CORNWALL</option>
                  <option value="Cotswolds">COTSWOLDS</option>
                  <option value="London">LONDON CENTRAL</option>
                  <option value="Highlands">SCOTTISH HIGHLANDS</option>
                </select>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => navigateToDetail(p.id)}
                  className="bg-white border border-[#e5e2dd] group cursor-pointer hover:shadow-lg transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-luxury-charcoal/90 text-white text-[9px] font-mono tracking-widest uppercase py-1 px-2.5">
                      {p.type}
                    </div>
                  </div>

                  <div className="p-6 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[9px] font-mono text-luxury-gold tracking-widest uppercase font-bold">{p.location}</p>
                          <h3 className="font-display text-2xl font-black text-luxury-charcoal uppercase mt-1">
                            {p.name}
                          </h3>
                        </div>
                        <span className="font-display text-lg font-bold text-luxury-gold font-mono">{p.priceFormatted}</span>
                      </div>
                      <p className="text-xs text-luxury-charcoal/60 font-sans mt-3 leading-relaxed font-medium">
                        {p.tagline}. {p.description.split(".")[0]}.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-[#e5e2dd] pt-4 mt-6 text-left">
                      <div>
                        <span className="text-[7px] font-mono text-luxury-charcoal/50 uppercase block">AREA</span>
                        <span className="text-[10px] font-mono font-bold text-luxury-charcoal">{p.area}</span>
                      </div>
                      <div>
                        <span className="text-[7px] font-mono text-luxury-charcoal/50 uppercase block">PLOT</span>
                        <span className="text-[10px] font-mono font-bold text-luxury-charcoal">{p.plotSize}</span>
                      </div>
                      <div>
                        <span className="text-[7px] font-mono text-luxury-charcoal/50 uppercase block">STATUS</span>
                        <span className="text-[10px] font-mono font-bold text-luxury-gold uppercase">{p.completion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProperties.length === 0 && (
                <div className="col-span-2 py-16 text-center border border-dashed border-[#e5e2dd] text-luxury-charcoal/50 text-xs font-mono">
                  No ultra-luxury properties match your criteria. Try adjusting the filter matrices.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: BESPOKE SERVICES VIEW */}
        {currentView === "services" && (
          <div className="py-16 px-6 max-w-7xl mx-auto text-left">
            <div className="mb-16">
              <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-2">
                Specialist Architectural Expertise
              </span>
              <h1 className="font-display text-4xl md:text-6xl tracking-tighter uppercase font-black text-luxury-charcoal">
                SPH Bespoke Advisory
              </h1>
              <p className="text-xs text-luxury-charcoal/60 mt-2 max-w-xl font-medium">
                Our scope spans beyond traditional brokerages. SPH operates as a comprehensive material consultancy, planning advisor, and developer liaison.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="bg-white p-8 border border-[#e5e2dd] space-y-4">
                <div className="w-12 h-12 rounded-none bg-luxury-charcoal flex items-center justify-center text-luxury-gold rotate-45">
                  <Building className="-rotate-45 w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase font-black text-luxury-charcoal pt-2">
                  Structural Design & Craft
                </h3>
                <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-sans">
                  We consult directly with master architects to draft bespoke structural frameworks. Whether designing cantilever concrete formations, acoustic skylights, or local stone restorations, we ensure uncompromised precision in layout calculations and material integrity.
                </p>
                <ul className="text-xs text-luxury-charcoal/80 space-y-2 pt-2 font-semibold">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Board-Marked Concrete Casting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Low-iron Triple Glazing Integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Geothermal Basin Filtration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border border-[#e5e2dd] space-y-4">
                <div className="w-12 h-12 rounded-none bg-luxury-charcoal flex items-center justify-center text-luxury-gold rotate-45">
                  <Shield className="-rotate-45 w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase font-black text-luxury-charcoal pt-2">
                  Grade II Historic Compliance
                </h3>
                <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-sans">
                  Renovating or adding structural glass pavilions to Grade II listed UK manors requires meticulous compliance. Our private advisory handles all communications with planning committees, historic preservation boards, and Section 106 legal councils.
                </p>
                <ul className="text-xs text-luxury-charcoal/80 space-y-2 pt-2 font-semibold">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Cotswold Limestone Restorations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Historical Timber Frame Conversions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Conservation Trust Negotiations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border border-[#e5e2dd] space-y-4">
                <div className="w-12 h-12 rounded-none bg-luxury-charcoal flex items-center justify-center text-luxury-gold rotate-45">
                  <TrendingUp className="-rotate-45 w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase font-black text-luxury-charcoal pt-2">
                  Tax & Capital Restructuring
                </h3>
                <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-sans">
                  Private acquisitions involve complex international tax structures. Our financial partners specialize in UK Stamp Duty Land Tax (SDLT) optimization, offshore ownership portfolios, and bespoke mortgage structures for ultra-high-net-worth patrons.
                </p>
                <ul className="text-xs text-luxury-charcoal/80 space-y-2 pt-2 font-semibold">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Bespoke SDLT Computations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Private Trust Asset Siting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                    <span>Exquisite Leasehold restructurings</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Request service button */}
            <div className="bg-[#0a0b0d] text-white p-8 rounded-none border border-white/10 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <span className="text-[10px] font-mono text-luxury-gold uppercase block tracking-widest font-bold">DISCREET COMMUNICATIONS</span>
                <h3 className="font-display text-xl uppercase text-white font-black mt-1">Request Private Mayfair Consultation</h3>
                <p className="text-xs text-white/50 leading-relaxed mt-1">Our executive directors are available for off-market portfolio walkthroughs in Mayfair or direct site reviews.</p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-white hover:bg-luxury-gold text-luxury-charcoal hover:text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition duration-300 shadow-md"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: ABOUT US (OUR HERITAGE) VIEW */}
        {currentView === "about" && (
          <div className="py-16 px-6 max-w-7xl mx-auto text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
              
              {/* Left narrative (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase font-bold block">
                  Private Office Heritage
                </span>
                <h1 className="font-display text-4xl md:text-6xl tracking-tighter uppercase font-black text-luxury-charcoal leading-[0.95]">
                  SPH Properties Mayfair
                </h1>
                <div className="w-16 h-1 bg-luxury-gold" />
                
                <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-sans font-medium">
                  Established in 1998, SPH Properties caters specifically to the world&apos;s most discerning patrons of progressive residential architecture. Operating from our discrete private office in Mayfair, London, we assist global clients in acquiring, planning, and physically customizing homes of extraordinary design and scale.
                </p>

                <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-sans">
                  We believe that architectural beauty is not ornamental; it is structural. True craft arises from architectural honesty—allowing raw materials to speak with clear geometries. We restrict our portfolio to no more than ten properties at any given time, ensuring that each monument receives uncompromised advisory focus.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="bg-white p-4 border border-[#e5e2dd]">
                    <h3 className="text-xs font-bold uppercase text-luxury-charcoal tracking-wider">Discreet Sourcing</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed mt-1">We represent buyers with complete off-market confidentiality, securing premier estates before public listing.</p>
                  </div>
                  <div className="bg-white p-4 border border-[#e5e2dd]">
                    <h3 className="text-xs font-bold uppercase text-luxury-charcoal tracking-wider">Material Advisory</h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed mt-1">We actively consult with clients regarding custom thermal basin designs, solar grids, and concrete finishing styles.</p>
                  </div>
                </div>
              </div>

              {/* Right Booking/Contact Block (5 Cols) */}
              <div className="lg:col-span-5 bg-white border border-[#e5e2dd] p-6 lg:p-8 shadow-sm text-left">
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-luxury-gold uppercase block tracking-widest font-bold">PRIVATE OFFICE INQUIRY</span>
                  <h3 className="font-display text-2xl uppercase text-luxury-charcoal font-black mt-1">Schedule Mayfair Meeting</h3>
                  <p className="text-xs text-luxury-charcoal/60 leading-relaxed mt-1">Book a secure meeting at our Mayfair office to inspect property blueprints, planning dossiers, and tax forecasting models.</p>
                </div>

                {bookingSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                    <Check className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto" />
                    <h4 className="font-display text-base uppercase font-bold text-emerald-800">Inquiry Received</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">Thank you. SPH Private Coordinator will contact you momentarily to confirm meeting arrangements.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="text-[8px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Sir Alistair Sterling"
                        className="w-full text-xs px-3 py-2 bg-[#f5f3ef] border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Private Email</label>
                      <input
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="alistair@sterlingholdings.com"
                        className="w-full text-xs px-3 py-2 bg-[#f5f3ef] border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Proposed Meeting Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#f5f3ef] border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-luxury-charcoal hover:bg-luxury-gold text-white text-[10px] font-bold tracking-widest uppercase py-3 transition duration-300"
                    >
                      Request Secure Calendar Link
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 5: PROPERTY DETAILS VIEW (IMMERSIVE CASE STUDY) */}
        {currentView === "detail" && (
          <div className="py-10 px-6 max-w-7xl mx-auto text-left">
            
            {/* Header / Back Navigation Button */}
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => setCurrentView("portfolio")} 
                className="flex items-center space-x-2 text-xs font-bold text-luxury-charcoal/70 hover:text-luxury-gold transition uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4 text-luxury-gold" />
                <span>Back to Portfolio</span>
              </button>
              
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest bg-white border border-[#e5e2dd] px-3 py-1 font-bold">
                Case Study • SPH-{activeDetailProperty.id.toUpperCase()}
              </span>
            </div>

            {/* Giant Property Headline */}
            <div className="mb-10">
              <p className="text-xs font-mono text-luxury-gold font-bold uppercase tracking-[0.2em]">
                {activeDetailProperty.type}
              </p>
              <h1 className="font-display text-4xl md:text-7xl font-black uppercase text-luxury-charcoal tracking-tighter mt-1 leading-[0.95]">
                {activeDetailProperty.name}
              </h1>
              <p className="text-sm text-luxury-charcoal/60 mt-3 max-w-2xl font-medium">
                {activeDetailProperty.tagline}. Suspended on a structural landscape nexus, offering absolute geometric precision.
              </p>
            </div>

            {/* Big Cinematic Banner Image */}
            <div className="relative aspect-video lg:h-[480px] w-full overflow-hidden border border-[#e5e2dd] mb-12 shadow-md">
              <img
                src={activeDetailProperty.image}
                alt={activeDetailProperty.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 flex items-center space-x-6 border border-white/10">
                <div>
                  <span className="text-[7px] font-mono text-white/50 block">ESTIMATED ASSET PRICE</span>
                  <span className="text-lg font-bold text-luxury-gold font-mono">{activeDetailProperty.priceFormatted}</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <span className="text-[7px] font-mono text-white/50 block">PHYSICAL TENURE</span>
                  <span className="text-xs font-bold uppercase tracking-wide">{activeDetailProperty.ownership}</span>
                </div>
              </div>
            </div>

            {/* Double Column Interactive Layout: Left Side Details, Right Side Interactive blueprint & calculations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Descriptive Story & Virtual Tour (5 Cols) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Section A: SPH Design Statement */}
                <div className="bg-white p-6 border border-[#e5e2dd]">
                  <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest block font-bold mb-1.5">DESIGN CONSULTANCY INSIGHTS</span>
                  <h3 className="font-display text-lg uppercase font-black text-luxury-charcoal border-b border-[#e5e2dd] pb-2 mb-3">Architectural Philosophy</h3>
                  <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-sans font-medium">
                    {activeDetailProperty.description}
                  </p>
                  <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-sans mt-3">
                    Every joint, concrete panel casting line, and triple-pane steel framework has been designed to align seamlessly with natural lighting vectors, framing the natural topography of {activeDetailProperty.location} flawlessly.
                  </p>
                </div>

                {/* Section B: Virtual Tour HUD */}
                <div className="bg-white p-6 border border-[#e5e2dd] flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg uppercase font-black text-luxury-charcoal mb-1">
                      Visual Tour Hotspot HUD
                    </h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed mb-4">
                      Click the pulsing hotspots on the visual canvas below to launch an instant material analysis generated directly via SPH design offices.
                    </p>
                  </div>

                  {/* Canvas Viewport */}
                  <div className="relative aspect-video bg-black overflow-hidden border border-[#e5e2dd] group">
                    <img
                      src={activeDetailProperty.image}
                      alt={activeDetailProperty.name}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />

                    {/* Hotspot Markers */}
                    {activeDetailProperty.virtualTourHotspots.map((hotspot) => {
                      const isSelected = selectedHotspot?.id === hotspot.id;
                      return (
                        <button
                          key={hotspot.id}
                          onClick={() => selectHotspot(hotspot)}
                          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none"
                        >
                          <span className="relative flex h-8 w-8 items-center justify-center">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                              isSelected ? "bg-white" : "bg-luxury-gold"
                            }`}></span>
                            <span className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center text-[10px] font-bold text-white shadow-md ${
                              isSelected ? "bg-white text-luxury-charcoal" : "bg-luxury-gold"
                            }`}>
                              +
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hotspot details output box */}
                  <div className="mt-4 bg-[#f5f3ef] p-4 border border-[#e5e2dd] min-h-[120px]">
                    {selectedHotspot ? (
                      <div>
                        <div className="flex justify-between items-start border-b border-[#e5e2dd] pb-2 mb-2">
                          <div>
                            <span className="text-[8px] font-mono text-luxury-gold uppercase block font-bold">SELECTED ZONE</span>
                            <h4 className="font-display text-sm font-bold uppercase text-luxury-charcoal">{selectedHotspot.name}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] font-mono text-luxury-charcoal/50 block">MATERIAL FINISH</span>
                            <span className="text-[9px] font-bold uppercase text-luxury-charcoal font-mono max-w-[150px] truncate block">{selectedHotspot.material}</span>
                          </div>
                        </div>

                        {hotspotLoading ? (
                          <div className="flex items-center space-x-2 py-2">
                            <div className="w-3.5 h-3.5 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-luxury-charcoal/60">Lead Architect analyzing raw materials...</span>
                          </div>
                        ) : (
                          <div className="bg-white p-3 border border-[#e5e2dd]">
                            <div className="flex items-start space-x-2">
                              <Sparkles className="w-4 h-4 text-luxury-gold mt-0.5 shrink-0" />
                              <div>
                                <span className="text-[8px] font-mono text-luxury-gold uppercase block font-bold">AI Structural Statement</span>
                                <p className="text-xs text-luxury-charcoal leading-relaxed mt-0.5 font-medium">
                                  &ldquo;{hotspotAnalysis || selectedHotspot.description}&rdquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-luxury-charcoal/40 text-xs font-mono">
                        Select any pulsing hotspot on the stage above to read details.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Blueprint Selector & Investments/SDLT (7 Cols) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Tab selector for blueprint/investment */}
                <div className="flex border-b border-[#e5e2dd] bg-[#f5f3ef]">
                  <button
                    onClick={() => setDetailTab("blueprint")}
                    className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase border-r border-[#e5e2dd] transition duration-300 flex items-center justify-center space-x-2 ${
                      detailTab === "blueprint"
                        ? "bg-white text-luxury-charcoal border-b-2 border-b-luxury-gold"
                        : "text-luxury-charcoal/50 hover:text-luxury-charcoal hover:bg-white/40"
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Interactive Blueprint</span>
                  </button>
                  <button
                    onClick={() => setDetailTab("market")}
                    className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition duration-300 flex items-center justify-center space-x-2 ${
                      detailTab === "market"
                        ? "bg-white text-luxury-charcoal border-b-2 border-b-luxury-gold"
                        : "text-luxury-charcoal/50 hover:text-luxury-charcoal hover:bg-white/40"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Market Appraisal & Tax</span>
                  </button>
                </div>

                {/* Tab content area */}
                <div className="p-6 bg-white border border-[#e5e2dd] min-h-[360px]">
                  
                  {/* Tab Content A: Interactive Wireframe blueprint */}
                  {detailTab === "blueprint" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-display text-lg uppercase font-black text-luxury-charcoal">Interactive layout Blueprint</h3>
                          <p className="text-xs text-luxury-charcoal/60">Hover over the layout zones to display specific space finishes.</p>
                        </div>
                        <span className="text-[8px] font-mono text-luxury-gold border border-luxury-gold px-2 py-0.5">SCALE 1:100</span>
                      </div>

                      {/* SVG Canvas */}
                      <div className="relative aspect-video bg-[#0a0b0d] p-4 border border-[#212328] overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14161a_1px,transparent_1px),linear-gradient(to_bottom,#14161a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                        
                        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 opacity-90">
                          <rect x="5" y="10" width="90" height="80" fill="none" stroke="#2a2e37" strokeWidth="0.5" strokeDasharray="3,3" />
                          {activeDetailProperty.blueprintRooms.map((room) => {
                            const isHovered = hoveredBlueprintRoomId === room.id;
                            return (
                              <g key={room.id}>
                                <rect
                                  x={room.x}
                                  y={room.y}
                                  width={room.width}
                                  height={room.height}
                                  fill={isHovered ? "rgba(197, 168, 128, 0.15)" : "none"}
                                  stroke={isHovered ? "#c5a880" : "#4a5160"}
                                  strokeWidth={isHovered ? "1.5" : "0.75"}
                                  className="transition-all duration-300 cursor-pointer"
                                  onMouseEnter={() => setHoveredBlueprintRoomId(room.id)}
                                  onMouseLeave={() => setHoveredBlueprintRoomId(null)}
                                />
                                <text
                                  x={room.x + room.width / 2}
                                  y={room.y + room.height / 2}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fill={isHovered ? "#c5a880" : "#6c7589"}
                                  fontSize="3"
                                  className="font-mono uppercase tracking-wider font-bold pointer-events-none select-none transition-colors duration-300"
                                >
                                  {room.name.split(" ")[0]}
                                </text>
                              </g>
                            );
                          })}
                        </svg>

                        <div className="absolute top-3 left-3 text-left">
                          <span className="text-[7px] font-mono text-white/30 block">LAND REGISTER ARCHIVE</span>
                          <span className="text-[9px] font-mono text-white/70 font-bold block">{activeDetailProperty.name}</span>
                        </div>
                      </div>

                      {/* Room specs drawer */}
                      <div className="bg-[#f5f3ef] p-4 border border-[#e5e2dd]">
                        {hoveredBlueprintRoomId ? (
                          (() => {
                            const r = activeDetailProperty.blueprintRooms.find((room) => room.id === hoveredBlueprintRoomId);
                            if (!r) return null;
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                  <span className="text-[8px] font-mono text-luxury-gold uppercase block font-bold">ZONE DETAILS</span>
                                  <h4 className="font-display text-sm font-black text-luxury-charcoal uppercase">{r.name}</h4>
                                  <p className="text-xs text-luxury-charcoal/70 leading-relaxed mt-1 font-medium">{r.description}</p>
                                </div>
                                <div className="bg-white p-3 border border-[#e5e2dd] flex flex-col justify-between">
                                  <div>
                                    <span className="text-[7px] font-mono text-luxury-charcoal/50 block">FINISH QUALITY</span>
                                    <span className="text-[9px] font-bold uppercase text-luxury-charcoal block truncate">{r.finish}</span>
                                  </div>
                                  <div className="border-t border-[#e5e2dd] pt-1.5 mt-1.5">
                                    <span className="text-[7px] font-mono text-luxury-charcoal/50 block">TOTAL AREA</span>
                                    <span className="text-xs font-mono font-black text-luxury-gold block">{r.area}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          <div className="text-center py-4 text-luxury-charcoal/40 text-xs font-mono">
                            Hover over any layout zone above to inspect specifications.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab Content B: Valuation appraisal & SDLT Tax calculations */}
                  {detailTab === "market" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-display text-lg uppercase font-black text-luxury-charcoal">Market Valuation Appraisal</h3>
                          <p className="text-xs text-luxury-charcoal/60">Simulate Stamp Duty Land Tax (SDLT) obligations and predict capital yields.</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 border border-emerald-200 px-2 py-0.5">{activeDetailProperty.marketMetrics.growthRate} YoY</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        
                        {/* SDLT Calculator */}
                        <div className="bg-[#0a0b0d] text-white p-4 rounded-xs border border-[#212328]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest font-bold">Stamp Duty Calculator</span>
                            <Calculator className="w-4 h-4 text-luxury-gold" />
                          </div>

                          <div className="flex space-x-1 mb-4 bg-white/5 p-1 rounded-sm">
                            {(["standard", "second", "non-resident"] as const).map((type) => (
                              <button
                                key={type}
                                onClick={() => setBuyerType(type)}
                                className={`flex-1 py-1 text-[8px] font-mono uppercase tracking-wider font-semibold transition ${
                                  buyerType === type
                                    ? "bg-luxury-gold text-white"
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                {type === "standard" ? "Primary" : type === "second" ? "Second Home" : "Non-UK Resident"}
                              </button>
                            ))}
                          </div>

                          <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                            <span className="text-[9px] font-mono text-white/50">ESTIMATED STAMP DUTY:</span>
                            <span className="text-base font-bold font-mono text-luxury-gold">£{currentSDLT.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Metrics specs */}
                        <div className="bg-[#f5f3ef] p-4 border border-[#e5e2dd] space-y-3">
                          <div>
                            <span className="text-[8px] font-mono text-luxury-charcoal/50 block">SECTOR INDEX REGION</span>
                            <span className="text-xs font-bold uppercase text-luxury-charcoal font-mono block">{activeDetailProperty.marketMetrics.region}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 border-t border-[#e5e2dd] pt-2">
                            <div>
                              <span className="text-[7px] font-mono text-luxury-charcoal/50 block">AVG PRICE/M²</span>
                              <span className="text-xs font-bold font-mono text-luxury-charcoal">{activeDetailProperty.marketMetrics.averageSqM}</span>
                            </div>
                            <div>
                              <span className="text-[7px] font-mono text-luxury-charcoal/50 block">YIELD POTENTIAL</span>
                              <span className="text-xs font-bold font-mono text-luxury-gold">{activeDetailProperty.marketMetrics.yieldPotential}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Gemini predictive forecast */}
                      <div className="border-t border-[#e5e2dd] pt-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-mono text-luxury-gold uppercase tracking-widest font-bold flex items-center space-x-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Bespoke AI Region Appraisal</span>
                          </span>
                          <button
                            onClick={fetchMarketAnalysis}
                            className="text-[8px] font-mono text-luxury-charcoal/60 hover:text-luxury-gold uppercase underline"
                          >
                            Refresh Report
                          </button>
                        </div>

                        {marketLoading ? (
                          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                            <div className="w-4 h-4 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-luxury-charcoal/50">Drafting capital appreciation report...</span>
                          </div>
                        ) : (
                          <div className="text-xs text-luxury-charcoal/80 leading-relaxed max-h-[160px] overflow-y-auto bg-[#f5f3ef] p-3 border border-[#e5e2dd] no-scrollbar">
                            {marketAnalysis ? (
                              <div className="whitespace-pre-line font-sans space-y-3 font-medium">
                                {marketAnalysis}
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <p className="text-luxury-charcoal/50 mb-3">No active appraisal loaded.</p>
                                <button
                                  onClick={fetchMarketAnalysis}
                                  className="bg-luxury-charcoal hover:bg-luxury-gold text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 transition"
                                >
                                  Generate Regional Forecast
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>

                {/* Secure viewing coordinator box */}
                <div className="bg-luxury-charcoal text-white p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[8px] font-mono text-white/50 block">MAYFAIR COORDINATOR ASSIGNMENT</span>
                    <h3 className="font-display text-sm uppercase text-luxury-gold font-bold mt-1">Ready for private site inspections</h3>
                    <p className="text-xs text-white/60 leading-relaxed mt-0.5">We can arrange chauffeured luxury transport or private helicopter flight coordinates directly to {activeDetailProperty.location}.</p>
                  </div>
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-white hover:bg-luxury-gold text-luxury-charcoal hover:text-white px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition duration-300"
                  >
                    Request Viewing
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Brand Values Showcase */}
      <section id="brand-showcase-values" className="bg-[#0a0b0d] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase font-bold block">
              Architectural Ethos
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter uppercase font-black text-white leading-[0.95]">
              The Infinite Precision of Design
            </h2>
            <p className="text-white/60 text-xs leading-relaxed max-w-lg font-sans">
              We collaborate with standard-shattering architects to present spaces defined by absolute proportions, honest raw concrete finishing, and natural landscape siting. Every joint represents uncompromised craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#14161a] p-5 border border-white/5 space-y-2">
              <Shield className="w-5 h-5 text-luxury-gold" />
              <h3 className="text-xs font-bold uppercase text-white tracking-wider">Uncompromised Discretion</h3>
              <p className="text-[11px] text-white/50 leading-relaxed">All acquisitions are facilitated off-market, assuring pristine levels of transaction security.</p>
            </div>
            <div className="bg-[#14161a] p-5 border border-white/5 space-y-2">
              <Compass className="w-5 h-5 text-luxury-gold" />
              <h3 className="text-xs font-bold uppercase text-white tracking-wider">Topographic Integrity</h3>
              <p className="text-[11px] text-white/50 leading-relaxed">Every property remains securely integrated with its natural geological surroundings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer logotype and credentials */}
      <footer id="sph-footer-bottom" className="bg-[#f5f3ef] border-t border-[#e5e2dd] py-16 px-6 text-luxury-charcoal/70">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-luxury-charcoal rotate-45 transform flex items-center justify-center rounded-xs">
                <div className="w-2.5 h-2.5 bg-white rounded-xs" />
              </div>
              <span className="font-display text-xl tracking-wider text-luxury-charcoal uppercase select-none font-bold">
                SPH Properties
              </span>
            </div>
            <p className="text-xs text-luxury-charcoal/60 leading-relaxed max-w-sm">
              SPH Properties is a private real estate agency registered in England & Wales. Catering to the world&apos;s most discerning patrons of residential architecture and design.
            </p>
            <div className="text-[10px] font-mono text-luxury-charcoal/40 pt-4">
              © 2026 SPH Properties Ltd. Mayfair, London. Registered UK Office. All rights reserved.
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-luxury-charcoal mb-4">
              UK Portfolios
            </h4>
            <ul className="space-y-2 text-xs text-luxury-charcoal/60 font-medium">
              <li><button onClick={() => navigateToDetail("monolith")} className="hover:text-luxury-gold cursor-pointer transition text-left">Cornwall Coastal Brutalist</button></li>
              <li><button onClick={() => navigateToDetail("rectory")} className="hover:text-luxury-gold cursor-pointer transition text-left">Cotswolds Heritage Manor</button></li>
              <li><button onClick={() => navigateToDetail("terra")} className="hover:text-luxury-gold cursor-pointer transition text-left">London Modern Penthouse</button></li>
              <li><button onClick={() => navigateToDetail("echo")} className="hover:text-luxury-gold cursor-pointer transition text-left">Scottish Highlands Lodge</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-luxury-charcoal mb-4">
              Private Operations
            </h4>
            <p className="text-xs text-luxury-charcoal/60 leading-relaxed">
              SPH Private Offices<br />
              42 Berkeley Square, Mayfair<br />
              London, W1J 5AW<br />
              <span className="text-luxury-gold font-mono text-[11px] block mt-2 font-bold">concierge@sphproperties.co.uk</span>
            </p>
          </div>

        </div>
      </footer>

      {/* Private Viewing Booking Overlay Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div id="booking-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-[#e5e2dd] max-w-xl w-full p-8 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-luxury-charcoal/50 hover:text-luxury-charcoal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase block mb-1">
                  Private Office Booking
                </span>
                <h3 className="font-display text-2xl tracking-tight uppercase text-luxury-charcoal font-black">
                  Coordinate VIP Viewing
                </h3>
                <p className="text-xs text-luxury-charcoal/60 leading-relaxed mt-1">
                  Book a private chauffeured excursion or helicopter flight coordinates to inspect your prospective home. Discretion assured.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg uppercase font-bold text-emerald-800">Booking Scheduled</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                    Pleasure, indeed. Your VIP coordinate request has been secured. SPH Mayfair Private office will contact you momentarily to verify private transport and logistics details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Select Property</label>
                      <select
                        value={selectedPropertyId}
                        onChange={(e) => setSelectedPropertyId(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#e5e2dd] bg-luxury-sand text-luxury-charcoal font-semibold focus:outline-none focus:border-luxury-gold"
                      >
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Sir Alistair Sterling"
                        className="w-full text-xs px-3 py-2 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Private Email</label>
                      <input
                        type="email"
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="alistair@sterlingholdings.com"
                        className="w-full text-xs px-3 py-2 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full text-xs px-2 py-2 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Time</label>
                        <input
                          type="text"
                          required
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          placeholder="e.g. 14:00"
                          className="w-full text-xs px-2 py-2 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono text-luxury-charcoal/50 uppercase block mb-1">Bespoke Requirements (Optional)</label>
                    <textarea
                      value={bookingCustom}
                      onChange={(e) => setBookingCustom(e.target.value)}
                      placeholder="e.g. Heli-pad coordinates, translation services, specific asset valuation portfolios..."
                      className="w-full h-20 text-xs p-3 border border-[#e5e2dd] focus:outline-none focus:border-luxury-gold font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-luxury-charcoal hover:bg-luxury-gold text-white py-3 text-xs font-bold tracking-widest uppercase transition duration-300"
                  >
                    Confirm Private Excursion Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
