export interface Hotel {
  id: string;
  name: string;
  stars: number;
  neighbourhood: string;
  distance: string;
  image: string;
  otaPrices: { ota: string; price: number }[];
  estimatedNegotiatedPrice: number;
  negotiationPotential: "High" | "Medium";
}

export const mockHotels: Hotel[] = [
  {
    id: "1", name: "The Kensington", stars: 5, neighbourhood: "South Kensington",
    distance: "0.3 mi from search", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 280 }, { ota: "Expedia", price: 295 }, { ota: "Hotels.com", price: 288 }],
    estimatedNegotiatedPrice: 224, negotiationPotential: "High",
  },
  {
    id: "2", name: "Mondrian Shoreditch", stars: 4, neighbourhood: "Shoreditch",
    distance: "1.2 mi from search", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 195 }, { ota: "Expedia", price: 205 }, { ota: "Hotels.com", price: 198 }],
    estimatedNegotiatedPrice: 156, negotiationPotential: "High",
  },
  {
    id: "3", name: "The Hoxton, Holborn", stars: 4, neighbourhood: "Holborn",
    distance: "0.8 mi from search", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 220 }, { ota: "Expedia", price: 230 }, { ota: "Hotels.com", price: 225 }],
    estimatedNegotiatedPrice: 178, negotiationPotential: "Medium",
  },
  {
    id: "4", name: "Pan Pacific London", stars: 5, neighbourhood: "City of London",
    distance: "1.5 mi from search", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 380 }, { ota: "Expedia", price: 395 }, { ota: "Hotels.com", price: 385 }],
    estimatedNegotiatedPrice: 308, negotiationPotential: "High",
  },
  {
    id: "5", name: "citizenM Tower of London", stars: 4, neighbourhood: "Tower Hill",
    distance: "2.0 mi from search", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 160 }, { ota: "Expedia", price: 168 }, { ota: "Hotels.com", price: 162 }],
    estimatedNegotiatedPrice: 128, negotiationPotential: "Medium",
  },
  {
    id: "6", name: "The Ned", stars: 5, neighbourhood: "City of London",
    distance: "1.4 mi from search", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 420 }, { ota: "Expedia", price: 440 }, { ota: "Hotels.com", price: 428 }],
    estimatedNegotiatedPrice: 340, negotiationPotential: "High",
  },
  {
    id: "7", name: "The Zetter Townhouse", stars: 4, neighbourhood: "Clerkenwell",
    distance: "1.1 mi from search", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 245 }, { ota: "Expedia", price: 255 }, { ota: "Hotels.com", price: 248 }],
    estimatedNegotiatedPrice: 198, negotiationPotential: "Medium",
  },
  {
    id: "8", name: "Mama Shelter London", stars: 3, neighbourhood: "Shoreditch",
    distance: "1.3 mi from search", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 130 }, { ota: "Expedia", price: 138 }, { ota: "Hotels.com", price: 132 }],
    estimatedNegotiatedPrice: 105, negotiationPotential: "High",
  },
  {
    id: "9", name: "Sea Containers London", stars: 5, neighbourhood: "South Bank",
    distance: "1.8 mi from search", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 310 }, { ota: "Expedia", price: 325 }, { ota: "Hotels.com", price: 315 }],
    estimatedNegotiatedPrice: 252, negotiationPotential: "Medium",
  },
  {
    id: "10", name: "Treehouse Hotel London", stars: 4, neighbourhood: "Marylebone",
    distance: "0.5 mi from search", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    otaPrices: [{ ota: "Booking.com", price: 265 }, { ota: "Expedia", price: 278 }, { ota: "Hotels.com", price: 270 }],
    estimatedNegotiatedPrice: 215, negotiationPotential: "High",
  },
];

export type NegotiationStatus = "queued" | "calling" | "negotiating" | "awaiting_confirmation" | "deal_ready" | "no_deal";

export interface NegotiationResult {
  hotelId: string;
  status: NegotiationStatus;
  negotiatedPrice?: number;
  fee?: number;
}

export const tradeOffOptions = [
  { id: "room_type", label: "Room type flexibility", description: "I'm open to a different room category (e.g. standard instead of superior) if the price is right.", icon: "🛏️" },
  { id: "breakfast", label: "Breakfast exclusion", description: "I'm happy to skip breakfast if it means a lower rate.", icon: "🥐" },
  { id: "non_refundable", label: "Non-refundable rate", description: "I'll accept a non-refundable booking for a better price.", icon: "📋" },
  { id: "checkin_checkout", label: "Early check-in / late check-out", description: "I don't need early check-in or late check-out.", icon: "🕐" },
  { id: "loyalty", label: "Loyalty points", description: "I don't need loyalty points to be included.", icon: "⭐" },
];
