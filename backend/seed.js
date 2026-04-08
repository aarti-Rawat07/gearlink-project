const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/gearlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  { name: "Bosch Brake Pads", price: 2500, image: "/assets/img/brake-pad.jpg" },
  { name: "Engine Oil Filter", price: 850, image: "/assets/img/oil-filter.jpg" },
  { name: "Car Battery 12V", price: 4500, image: "/assets/img/car-battery.jpg" },
  { name: "Shock Absorber", price: 3200, image: "/assets/img/shock-absorber.jpg" },
  { name: "Car Headlight Assembly", price: 2800, image: "/assets/img/headlight.jpg" },
  { name: "Clutch Plate Kit", price: 3900, image: "/assets/img/clutch-plate.jpg" },
  { name: "Car Radiator", price: 5200, image: "/assets/img/radiator.jpg" },
  { name: "Spark Plug Set", price: 1200, image: "/assets/img/spark-plug.jpg" },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded');
  mongoose.connection.close();
};

seedDB();