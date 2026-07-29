export type PropertyPurpose = 'For Sale' | 'For Rent' | 'PG' | 'Commercial' | 'Industrial' | 'Agriculture'

export type PropertyCategory =
  | 'Luxury Villas'
  | 'Apartments'
  | 'Commercial Buildings'
  | 'Land'
  | 'Farm Houses'
  | 'Builder Floors'
  | 'Penthouse'
  | 'Office Space'

export type FurnishingStatus = 'Furnished' | 'Semi Furnished' | 'Unfurnished'

export interface PropertyLocation {
  country: string
  state: string
  district: string
  city: string
  area: string
  locality: string
  pincode: string
  landmark?: string
  street?: string
  houseNumber?: string
  latitude: number
  longitude: number
}

export interface PropertyOwner {
  id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  avatar: string
  agency?: string
  isVerified: boolean
}

export interface PropertyAnalytics {
  views: number
  dailyViews: number[]
  monthlyViews: number[]
  whatsappClicks: number
  callClicks: number
  emailClicks: number
}

export interface PropertyItem {
  id: string
  ownerId: string
  title: string
  slug: string
  category: PropertyCategory
  purpose: PropertyPurpose
  price: number
  currency: string
  pricePerSqFt?: number
  areaSqFt: number
  bedrooms: number
  bathrooms: number
  balcony: number
  kitchen: number
  parking: number
  facing: string
  floor: number
  totalFloors: number
  propertyAgeYears: number
  furnishing: FurnishingStatus
  description: string
  location: PropertyLocation
  amenities: string[]
  images: string[]
  coverImage: string
  virtualTour360Url?: string
  floorPlanUrl?: string
  videoUrl?: string
  pdfBrochureUrl?: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  status: 'Published' | 'Draft' | 'Pending' | 'Sold' | 'Rented'
  createdAt: string
  updatedAt: string
  isFeatured: boolean
  isVerified: boolean
  analytics: PropertyAnalytics
  owner: PropertyOwner
}

export interface PropertyFilter {
  searchQuery?: string
  purpose?: string
  category?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  minArea?: number
  maxArea?: number
  furnishing?: string
  amenities?: string[]
  readyToMove?: boolean
  verifiedOnly?: boolean
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc' | 'popularity'
}
