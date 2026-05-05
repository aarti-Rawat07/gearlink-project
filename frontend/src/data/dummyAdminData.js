export const categories = [
  { id: 1, name: "Engine Parts", count: 120 },
  { id: 2, name: "Brakes & Suspension", count: 85 },
  { id: 3, name: "Exterior Accessories", count: 45 },
  { id: 4, name: "Interior Accessories", count: 30 },
  { id: 5, name: "Lighting & Electrical", count: 60 }
];

export const products = [
  { id: 1, name: "High Performance Brake Pads", brand: "Brembo", category: "Brakes & Suspension", price: 120.00, stock: 45, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Brake+Pads" },
  { id: 2, name: "Synthetic Motor Oil 5W-30", brand: "Castrol", category: "Engine Parts", price: 35.50, stock: 5, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Motor+Oil" }, // Low stock
  { id: 3, name: "LED Headlight Bulbs", brand: "Philips", category: "Lighting & Electrical", price: 45.99, stock: 120, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=LED+Bulbs" },
  { id: 4, name: "All-Weather Floor Mats", brand: "WeatherTech", category: "Interior Accessories", price: 85.00, stock: 20, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Floor+Mats" },
  { id: 5, name: "Performance Exhaust System", brand: "MagnaFlow", category: "Engine Parts", price: 550.00, stock: 8, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Exhaust" }, // Low stock
  { id: 6, name: "Spark Plugs (Set of 4)", brand: "NGK", category: "Engine Parts", price: 25.00, stock: 200, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Spark+Plugs" },
  { id: 7, name: "Car Battery 12V", brand: "Optima", category: "Lighting & Electrical", price: 180.00, stock: 0, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Battery" }, // Out of stock
  { id: 8, name: "Sport Steering Wheel", brand: "MOMO", category: "Interior Accessories", price: 220.00, stock: 15, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Steering+Wheel" },
  { id: 9, name: "Coilover Suspension Kit", brand: "KW", category: "Brakes & Suspension", price: 1100.00, stock: 4, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Suspension" }, // Low stock
  { id: 10, name: "Roof Rack Cross Bars", brand: "Thule", category: "Exterior Accessories", price: 250.00, stock: 25, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Roof+Rack" },
  { id: 11, name: "Air Filter Replacement", brand: "K&N", category: "Engine Parts", price: 45.00, stock: 150, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Air+Filter" },
  { id: 12, name: "Windshield Wipers", brand: "Bosch", category: "Exterior Accessories", price: 22.00, stock: 300, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Wipers" },
  { id: 13, name: "Ceramic Brake Rotors", brand: "EBC Brakes", category: "Brakes & Suspension", price: 320.00, stock: 12, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Rotors" },
  { id: 14, name: "Custom Seat Covers", brand: "Coverking", category: "Interior Accessories", price: 150.00, stock: 35, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Seat+Covers" },
  { id: 15, name: "Fog Lights Kit", brand: "Hella", category: "Lighting & Electrical", price: 95.00, stock: 50, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Fog+Lights" },
  { id: 16, name: "Turbocharger Upgrade", brand: "Garrett", category: "Engine Parts", price: 1250.00, stock: 2, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Turbocharger" }, // Low stock
  { id: 17, name: "Alloy Wheels 18-inch", brand: "Enkei", category: "Exterior Accessories", price: 800.00, stock: 16, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Alloy+Wheels" },
  { id: 18, name: "Car Cover Waterproof", brand: "OxGord", category: "Exterior Accessories", price: 65.00, stock: 80, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Car+Cover" },
  { id: 19, name: "Dashboard Camera", brand: "Garmin", category: "Interior Accessories", price: 140.00, stock: 0, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Dashcam" }, // Out of stock
  { id: 20, name: "Alternator 150 Amp", brand: "ACDelco", category: "Lighting & Electrical", price: 210.00, stock: 18, image: "https://via.placeholder.com/150/000000/FFFFFF/?text=Alternator" }
];

export const inquiries = [
  { id: 1, name: "John Doe", phone: "+1234567890", message: "Do you have the Brembo brakes in stock?", date: "2026-04-29", status: "Pending" },
  { id: 2, name: "Jane Smith", phone: "+0987654321", message: "Looking for a custom exhaust for my Mustang.", date: "2026-04-28", status: "Replied" },
  { id: 3, name: "Mike Johnson", phone: "+1122334455", message: "Need a battery replacement urgently.", date: "2026-04-29", status: "Pending" }
];

export const dashboardStats = {
  totalProducts: products.length,
  totalCategories: categories.length,
  lowStockCount: products.filter(p => p.stock > 0 && p.stock <= 10).length,
  outOfStockCount: products.filter(p => p.stock === 0).length,
  totalInquiries: inquiries.length
};
