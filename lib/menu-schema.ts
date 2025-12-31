// Server-side utility for generating menu schema
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export function generateMenuSchema(menuItems: MenuItem[]) {
  const menuItemsSchema = menuItems.map((item) => ({
    "@type": "MenuItem",
    "name": item.name,
    "description": item.description,
    "offers": {
      "@type": "Offer",
      "price": item.price.toFixed(2),
      "priceCurrency": "GBP"
    },
    "image": `https://chuchos.co.uk${item.image}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Chuchos Menu",
    "description": "Authentic Mexican street food with bold flavors and fresh ingredients",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Main Menu",
        "hasMenuItem": menuItemsSchema
      }
    ]
  };
}
