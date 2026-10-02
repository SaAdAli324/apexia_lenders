export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number; // 1-5
  loanType: string;
}

// Placeholder testimonials — to be replaced with real ones from the client
export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Sydney, NSW",
    quote:
      "Apexia Lending made my first home buying experience so much easier. They found me a rate I couldn't believe and handled everything from start to finish.",
    rating: 5,
    loanType: "First Home Buyer",
  },
  {
    name: "James & Priya K.",
    location: "Melbourne, VIC",
    quote:
      "We refinanced through Apexia and are saving over $400 a month. The process was seamless and the team kept us informed every step of the way.",
    rating: 5,
    loanType: "Refinancing",
  },
  {
    name: "David L.",
    location: "Brisbane, QLD",
    quote:
      "As an investor, I needed a broker who understood the numbers. Apexia structured my loans perfectly and helped me grow my portfolio with confidence.",
    rating: 5,
    loanType: "Investment Property",
  },
];
