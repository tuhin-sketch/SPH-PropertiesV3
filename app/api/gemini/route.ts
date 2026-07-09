import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini SDK with named parameters as instructed in the skill guidelines.
// Telemetry header is added as recommended.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { mode, propertyName, region, messages, hotspotId, customPrompt } = await req.json();

    if (mode === "market_analysis") {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Provide a highly analytical, prestigious, and realistic real estate market forecast for the area of ${region} in the UK (with reference to ${propertyName}). 
        Adopt the persona of an ultra-high-end UK property strategist at SPH Properties.
        Focus on structural growth drivers, tax considerations like Stamp Duty Land Tax (SDLT), yield potential for luxury leases, and local high-net-worth migration.
        Structure the response with 3-4 sections including:
        1. Current Valuation Context
        2. Architectural Capital Appreciation Outlook
        3. Tax & Transaction Considerations
        4. SPH Advisor Verdict
        Keep the tone incredibly professional, authoritative, and sophisticated. Use British spelling (e.g. valuation, capital, appreciation, luxury).`,
      });

      return NextResponse.json({ success: true, text: response.text });
    }

    if (mode === "hotspot_details") {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Act as the Lead Architect of SPH Properties. Analyze this virtual tour hotspot: "${hotspotId}" in "${propertyName}" located in ${region}.
        Write a short, luxurious, and highly detailed design statement (2-3 sentences) detailing the material craft, spatial flow, and emotional design intent of this specific feature.
        Use sophisticated architectural jargon (e.g., "brutalist concrete textures", "honed limestone", "frameless structural glazing", "axis of light", "tectonic rhythm").
        Speak directly to a wealthy, design-literate prospective buyer.`,
      });

      return NextResponse.json({ success: true, text: response.text });
    }

    // Default: SPH Bespoke Concierge Chat
    const recentMessages = messages || [];
    const conversationHistory = recentMessages.map((msg: any) => {
      return `${msg.role === "user" ? "Client" : "SPH Advisor"}: ${msg.content}`;
    }).join("\n");

    const systemPrompt = `You are "SPH Bespoke Advisor", the dedicated, ultra-exclusive AI concierge for SPH Properties—the UK's premier architectural luxury real estate agency.
    You possess flawless, refined manners, speaking with sophisticated British eloquence (e.g., using "pleasure", "indeed", "splendid", "bespoke", "property portfolio").
    You have extensive expertise in high-end UK property law, Stamp Duty Land Tax (SDLT), structural engineering, premium architectural styles (brutalist, heritage Cotswold, minimalist glazing), and private wealth investment structures.

    The client is viewing our exclusive portfolio which includes:
    1. MONOLITH HOUSE (Cornwall): Coastal brutalist concrete masterpiece embedded in ocean cliffs (£3,850,000 Freehold).
    2. THE RECTORY (Cotswolds): 18th-century heritage Cotswold stone estate with floor-to-ceiling glass pavilions (£6,200,000 Freehold).
    3. TERRA PENTHOUSE (London): Split-level brutalist penthouse overlooking the Thames (£8,950,000 Leasehold - 999 years).
    4. ECHO RETREAT (Scottish Highlands): Majestic high-altitude structural timber and glass lodge in wild scenery (£4,500,000 Freehold).

    Guidelines:
    - Never break persona. Speak like an expert high-end estate director in Mayfair, London.
    - Offer practical advice about structural customisations, nearby elite amenities, private heliports, or investment planning.
    - If asked about custom modifications (e.g., adding an infinity pool or solar microgrid), discuss the structural planning permissions (Section 106, Grade II listings for Heritage) with profound technical authority.
    - Do not invent properties not listed here. Stick to SPH Properties.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `${systemPrompt}\n\nConversation History:\n${conversationHistory}\n\nClient: ${customPrompt || "Could you introduce SPH Properties and walk me through your architectural portfolio?"}\nSPH Advisor:`,
    });

    return NextResponse.json({ success: true, text: response.text });

  } catch (error: any) {
    console.error("Gemini API error in route:", error);
    return NextResponse.json({ 
      success: false, 
      text: "I do apologise, indeed. My connection to the SPH private network seems briefly interrupted. Do try again shortly." 
    }, { status: 500 });
  }
}
