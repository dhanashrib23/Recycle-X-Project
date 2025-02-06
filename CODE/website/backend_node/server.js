// // cors
// // app.use((request, response, next) => {
// //   response.setHeader("Access-Control-Allow-Origin", "*");
// //   response.setHeader("Access-Control-Allow-Headers", "*");
// //   response.setHeader("Access-Control-Allow-Methods", "*");
// //   response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend origin
// // });

const express = require("express");
const { appendFileLogs } = require("./App/fileLogger");
const reply = require("./models/responseStructure");
const config = require("./App/appConfig");
const jwt = require("jsonwebtoken");
const app = express();
const commonRoutes = require("./routes/commanRoutes");
const consumerRoutes = require("./routes/consumerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const cors = require("cors");

// Middleware
app.use(appendFileLogs);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proper CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// Authentication Middleware
app.use((req, res, next) => {
  // Allow login & signup requests to pass without token verification
  if (req.url.includes("/signin") || req.url.includes("/signup")) {
    return next();
  }

  // Check if authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(403)
      .json(reply.onError(403, null, "Token required to access the APIs"));
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    const payload = jwt.verify(token, config.SECRET_KEY);

    if (payload && payload.status === "Active") {
      req.user = payload; // Attach user info to request
      return next();
    } else {
      return res
        .status(403)
        .json(reply.onError(403, null, "Invalid or inactive token"));
    }
  } catch (error) {
    return res
      .status(401)
      .json(reply.onError(401, null, "Invalid token or expired session"));
  }
});

// Routing
app.use("/supplier", supplierRoutes);
app.use("/consumer", consumerRoutes);
app.use("/common", commonRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
