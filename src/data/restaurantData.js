export const restaurantData = {
  name: "Luna Bistro",
  tagline: "Modern Indian Flavors",
  subtitle: "A contemporary Indian dining experience blending tradition and innovation. Seasonal ingredients, crafted cocktails and warm hospitality.",
  intro: {
    title: "A Note From Luna",
    description: "At Luna Bistro, dishes are crafted to share. The menu is inspired by regional Indian flavors with contemporary plating and balanced spice. Perfect for intimate dinners and celebrations."
  },
  heroImage: "https://images.unsplash.com/photo-1541542684-6e85f0a3c1a1?w=900&q=80&auto=format&fit=crop",
  featuredDishes: [
    {
      id: "featured-1",
      title: "Smoky Tandoori Cauliflower",
      description: "Charred, spiced, and finished with citrus and curry leaf oil.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80&auto=format&fit=crop"
    },
    {
      id: "featured-2",
      title: "Heritage Butter Chicken",
      description: "Creamy, balanced and aromatic — served with house naan.",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&q=80&auto=format&fit=crop"
    },
    {
      id: "featured-3",
      title: "Saffron & Rose Panna Cotta",
      description: "Delicate, floral finish with pistachio crumb.",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop"
    }
  ],
  menuCategories: [
    { id: "starters", label: "Starters" },
    { id: "mains", label: "Mains" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" }
  ],
  menuItems: {
    starters: [
      {
        id: "s1",
        name: "Crisp Paneer Chaat",
        price: "₹320",
        description: "Spiced paneer, tamarind, mint chutney."
      },
      {
        id: "s2",
        name: "Tandoori Cauliflower",
        price: "₹380",
        description: "Smoky, saffron yogurt, curry leaf oil."
      },
      {
        id: "s3",
        name: "Prawn Pepper Fry",
        price: "₹420",
        description: "Black pepper, curry leaf and lemon."
      }
    ],
    mains: [
      {
        id: "m1",
        name: "Heritage Butter Chicken",
        price: "₹520",
        description: "Tomato, fenugreek and cream — house naan included."
      },
      {
        id: "m2",
        name: "Goan Fish Curry",
        price: "₹560",
        description: "Coconut and kokum — steamed rice."
      },
      {
        id: "m3",
        name: "Masala Dosa",
        price: "₹280",
        description: "Crisp crepe with spiced potato — sambar & chutneys."
      }
    ],
    desserts: [
      {
        id: "d1",
        name: "Saffron & Rose Panna Cotta",
        price: "₹260",
        description: "Pistachio crumb and citrus gel."
      },
      {
        id: "d2",
        name: "Gulab Jamun Cheesecake",
        price: "₹290",
        description: "A playful fusion dessert."
      }
    ],
    drinks: [
      {
        id: "dr1",
        name: "House Cocktails",
        price: "₹380",
        description: "Seasonal curated cocktails."
      },
      {
        id: "dr2",
        name: "Masala Chai",
        price: "₹120",
        description: "Traditional Indian spiced tea."
      }
    ]
  },
  about: {
    title: "About Us",
    paragraphs: [
      "Luna Bistro is dedicated to sourcing seasonal produce and celebrating regional Indian techniques. The dining room is designed for intimate conversation, soft lighting and tasteful service."
    ],
    quote: "An elevated, approachable Indian menu",
    quoteAuthor: "Food Journal"
  },
  gallery: [
    {
      id: "g1",
      thumb: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
      alt: "Dining interior"
    },
    {
      id: "g2",
      thumb: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop",
      alt: "Chef Plating"
    },
    {
      id: "g3",
      thumb: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1200&q=80&auto=format&fit=crop",
      alt: "Curry Closeup"
    },
    {
      id: "g4",
      thumb: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80&auto=format&fit=crop",
      full: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80&auto=format&fit=crop",
      alt: "Dessert Plate"
    }
  ],
  reviews: [
    {
      id: "r1",
      quote: "Amazing flavors and thoughtful presentation. The service was wonderful.",
      author: "Priya R."
    },
    {
      id: "r2",
      quote: "Perfect place for date night. Lovely cocktails.",
      author: "Rahul K."
    },
    {
      id: "r3",
      quote: "Creative menu and great vegetarian options.",
      author: "Anjali S."
    }
  ],
  hours: [
    { days: "Mon–Thu", time: "11:00 — 22:30" },
    { days: "Fri–Sat", time: "11:00 — 23:30" },
    { days: "Sun", time: "10:00 — 21:30" }
  ],
  contact: {
    address: "123 Moon St, Bengaluru, KA 560001",
    phone: "+91 98765 43210",
    phoneUrl: "tel:+919876543210",
    mapEmbedUrl: "https://www.google.com/maps?q=Bengaluru+India&output=embed"
  }
};
