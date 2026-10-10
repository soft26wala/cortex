/**
 * Validation & Sanitization functions for Jeenu Soni Ad Lead submissions & content management
 */

export interface LeadValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: {
    clientName: string;
    phone: string;
    location: string;
    businessName: string;
    advertisementType: string;
    budget: string;
    message: string;
    contactMethod: string;
  };
}

export function validateAdLeadForm(body: any): LeadValidationResult {
  const errors: Record<string, string> = {};

  const clientName = (body?.clientName || "").trim();
  const phone = (body?.phone || "").trim();
  const location = (body?.location || "").trim();
  const businessName = (body?.businessName || "").trim();
  const advertisementType = (body?.advertisementType || "").trim();
  const budget = (body?.budget || "").trim();
  const message = (body?.message || "").trim();
  const contactMethod = (body?.contactMethod || "WhatsApp").trim();
  const honeypot = (body?.website_hp || "").trim();

  // Honeypot spam check
  if (honeypot.length > 0) {
    return {
      isValid: false,
      errors: { _form: "Spam submission detected." },
    };
  }

  // Client Name validation
  if (!clientName) {
    errors.clientName = "Client / Contact Name is required.";
  } else if (clientName.length < 2) {
    errors.clientName = "Name must be at least 2 characters.";
  } else if (clientName.length > 100) {
    errors.clientName = "Name cannot exceed 100 characters.";
  }

  // Phone validation (numeric / international format e.g. +91 9876543210 or 9876543210)
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
  if (!phone) {
    errors.phone = "Mobile / Phone number is required.";
  } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
    errors.phone = "Please enter a valid mobile number (min 8 digits, optional + country code).";
  }

  // Location validation
  if (!location) {
    errors.location = "City / Location is required.";
  } else if (location.length > 100) {
    errors.location = "Location cannot exceed 100 characters.";
  }

  // Optional fields length checks
  if (businessName.length > 150) {
    errors.businessName = "Business name cannot exceed 150 characters.";
  }

  if (message.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  // Basic HTML sanitization helper
  const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    sanitizedData: {
      clientName: sanitize(clientName),
      phone: sanitize(phone),
      location: sanitize(location),
      businessName: sanitize(businessName),
      advertisementType: sanitize(advertisementType || "Brand Sponsorship"),
      budget: sanitize(budget || "Flexible"),
      message: sanitize(message),
      contactMethod: sanitize(contactMethod || "WhatsApp"),
    },
  };
}
