const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/gearlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  { name: "Premium Brake Pads", brand: "Brembo", category: "Brakes", price: 2500, oldPrice: 3000, rating: 4.8, stock: "In Stock", image: "brake-pad.jpg" },
  { name: "High Performance Oil Filter", brand: "K&N", category: "Engine", price: 850, rating: 4.5, stock: "In Stock", image: "oil-filter.jpg" },
  { name: "Heavy Duty Car Battery", brand: "Bosch", category: "Battery", price: 4500, oldPrice: 5000, rating: 4.9, stock: "In Stock", image: "car-battery.jpg" },
  { name: "Gas Shock Absorber", brand: "Monroe", category: "Suspension", price: 3200, rating: 4.2, stock: "Out of Stock", image: "shock-absorber.jpg" },
  { name: "LED Headlight Bulbs", brand: "Philips", category: "Lights", price: 2800, oldPrice: 3500, rating: 4.7, stock: "In Stock", image: "headlight.jpg" },
  { name: "Performance Clutch Kit", brand: "Exedy", category: "Transmission", price: 8900, rating: 4.6, stock: "In Stock", image: "clutch-plate.jpg" },
  { name: "Aluminum Radiator", brand: "Mishimoto", category: "Engine", price: 5200, oldPrice: 6000, rating: 4.4, stock: "In Stock", image: "radiator.jpg" },
  { name: "Iridium Spark Plugs", brand: "NGK", category: "Engine", price: 1200, rating: 4.8, stock: "In Stock", image: "spark-plug.jpg" },
  { name: "Synthetic Motor Oil 5W-40", brand: "Castrol", category: "Engine", price: 2100, rating: 4.9, stock: "In Stock", image: "oil-filter.jpg" },
  { name: "Wiper Blades Set", brand: "Bosch", category: "Accessories", price: 600, rating: 4.3, stock: "In Stock", image: "brake-pad.jpg" },
  { name: "Alternator Assembly", brand: "Denso", category: "Electrical", price: 6500, oldPrice: 7200, rating: 4.5, stock: "In Stock", image: "car-battery.jpg" },
  { name: "Timing Belt Kit", brand: "Gates", category: "Engine", price: 2500, rating: 4.6, stock: "Out of Stock", image: "radiator.jpg" },
  { name: "Fuel Pump Module", brand: "Bosch", category: "Engine", price: 3500, rating: 4.4, stock: "In Stock", image: "clutch-plate.jpg" },
  { name: "Cabin Air Filter", brand: "K&N", category: "Accessories", price: 900, rating: 4.7, stock: "In Stock", image: "oil-filter.jpg" },
  { name: "Ignition Coil", brand: "NGK", category: "Electrical", price: 1800, rating: 4.6, stock: "In Stock", image: "spark-plug.jpg" },
  { name: "Brake Rotors Pair", brand: "Brembo", category: "Brakes", price: 5500, oldPrice: 6200, rating: 4.8, stock: "In Stock", image: "brake-pad.jpg" },
  { name: "Suspension Control Arm", brand: "Moog", category: "Suspension", price: 2800, rating: 4.3, stock: "In Stock", image: "shock-absorber.jpg" },
  { name: "Tail Light Assembly", brand: "Hella", category: "Lights", price: 3100, rating: 4.5, stock: "In Stock", image: "headlight.jpg" },
  { name: "Manual Transmission Fluid", brand: "Castrol", category: "Transmission", price: 1100, rating: 4.7, stock: "In Stock", image: "oil-filter.jpg" },
  { name: "Racing Steering Wheel", brand: "Momo", category: "Accessories", price: 8500, oldPrice: 9500, rating: 4.9, stock: "Out of Stock", image: "clutch-plate.jpg" },
  { name: "Performance Exhaust System", brand: "MagnaFlow", category: "Engine", price: 12500, oldPrice: 14000, rating: 4.9, stock: "In Stock", image: "radiator.jpg" },
  { name: "All-Weather Floor Mats", brand: "WeatherTech", category: "Accessories", price: 4500, rating: 4.8, stock: "In Stock", image: "brake-pad.jpg" },
  { name: "Ceramic Brake Pads", brand: "Bosch", category: "Brakes", price: 3200, rating: 4.6, stock: "In Stock", image: "brake-pad.jpg" },
  { name: "Dashboard Camera 4K", brand: "Garmin", category: "Accessories", price: 9500, oldPrice: 11000, rating: 4.7, stock: "In Stock", image: "headlight.jpg" },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('24 Products seeded successfully!');
  mongoose.connection.close();
};

seedDB();