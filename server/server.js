require("dotenv").config();
require('./models');
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const journalistRoutes = require("./routes/journalistRoutes");
const articleRoutes = require("./routes/articleRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const connectDB = require("./config/db");
//heba
// const newsRoutes = require("./routes/newsRoutes");

const radioRoutes = require("./routes/radioRoutes");

const mostViewRoute = require("./routes/mostViewRoute");
///////////////////////////////////
const videoRoutes = require('./routes/videoRoutes');

const adminRoutes = require('./routes/adminRoutes');
const contactMessage = require("./routes/contactMessageRoutes");
const paymentRoutes = require('./routes/PaymentRoutes'); // ربط الـ API بـ paymentRoutes
// const radioRoutes = require("./routes/radioRoutes");

const bookmarkRoutes = require("./routes/bookMarkRoute");///////////////////////


const path = require("path");
const app = express();



app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
connectDB();

app.use("/user", bookmarkRoutes);////////////////
app.use('/api', paymentRoutes); /////////////////

app.use("/auth", authRoutes);
app.use("/api", contactMessage);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/journalist", journalistRoutes);
app.use("/api/videos", videoRoutes); // تمت إضافة Video Routes
app.use('/admin', adminRoutes);
app.use("/api/radios", radioRoutes);
app.use('/uploads', express.static('uploads'));

//heba 
// app.use("/api/news", newsRoutes);
app.use("/api", mostViewRoute);
app.use("/api/radios", radioRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
