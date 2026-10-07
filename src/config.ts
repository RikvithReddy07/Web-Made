/**
 * WebMade Agency Configuration
 * 
 * Edit your contact details in this ONE central location.
 * All WhatsApp buttons, phone links, email addresses, and messages
 * throughout the entire website will automatically update from here.
 */

export const WEBMADE_CONFIG = {
  // Brand details
  brandName: "WebMade",
  tagline: "Websites & Apps Made for Your Business.",
  altHeadline: "Your Business Deserves a Better Digital Presence.",
  
  // WhatsApp Configuration
  whatsappNumber: "917013234749",
  
  // Contact Information
  email: "webmade001@gmail.com",
  phone: "+91 7013234749",
  displayPhone: "+91 70132 34749",
  businessHours: "Monday – Saturday",
  businessHoursDetails: "9:00 AM – 8:00 PM IST",
  location: "India",

  // Social Links
  socials: {
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://linkedin.com/company/yourhandle",
    github: "https://github.com/yourhandle",
    twitter: "https://twitter.com/yourhandle"
  },

  // Pre-filled WhatsApp messages for different conversion points
  messages: {
    general: "Hi WebMade, I am interested in getting a website/app for my business.",
    hero: "Hi WebMade! I saw your website and would like to build a project for my business.",
    contactCard: "Hi WebMade, I am interested in getting a website/app for my business.",
    ideaCta: "Hi WebMade! I would like to discuss a project.",
    pricingWebsiteStarter: "Hi WebMade! I am interested in the Starter Website package (₹7,999). Could we discuss the details?",
    pricingWebsiteBusiness: "Hi WebMade! I want to get started with the Business Website package (₹14,999). Please tell me the next steps.",
    pricingWebsitePremium: "Hi WebMade! I need the Premium Website package (₹29,999+). Let's schedule a discussion.",
    pricingAppBasic: "Hi WebMade! I am interested in the Basic Mobile App package (Starting ₹29,999).",
    pricingAppBusiness: "Hi WebMade! I want to discuss the Business App package (Starting ₹59,999) for Android & iOS.",
    pricingAppCustom: "Hi WebMade! We have a custom mobile app requirement (Starting ₹99,999+). Let's discuss.",
    serviceInquiry: (serviceName: string) => `Hi WebMade! I am interested in your ${serviceName} service. Can you provide more details?`,
    portfolioInquiry: (projectName: string) => `Hi WebMade! I checked out the ${projectName} demo project and want something similar for my business.`,
    comparisonInquiry: (recommendation: string) => `Hi WebMade! I am looking for a ${recommendation} for my business. Can you guide me on the next steps?`,
    customQuote: (data: { type: string; pages: string; features: string; estimate: string }) => 
      `Hi WebMade! I used your Project Estimator:\n• Project: ${data.type}\n• Pages/Screens: ${data.pages}\n• Features: ${data.features}\n• Estimated Budget: ${data.estimate}\nLet's discuss my project!`
  },

  // Helper method to generate WhatsApp URLs with encoded messages
  getWhatsAppUrl(messageKeyOrCustom: string, isCustom = false) {
    let rawMsg: string;
    if (isCustom) {
      rawMsg = messageKeyOrCustom;
    } else {
      const msg = (this.messages as any)[messageKeyOrCustom];
      rawMsg = typeof msg === "function" ? msg() : (msg || this.messages.general);
    }
    const encodedMsg = encodeURIComponent(rawMsg);
    return `https://wa.me/${this.whatsappNumber}?text=${encodedMsg}`;
  }
};

// Also expose globally on window for inline scripts if needed
if (typeof window !== 'undefined') {
  (window as any).WEBMADE_CONFIG = WEBMADE_CONFIG;
}
