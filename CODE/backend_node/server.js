const express = require("express");
const { appendFileLogs } = require("./App/fileLogger");
const reply = require("./models/responseStructure");
const config = require("./App/appConfig");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const path = require("path");
const commonRoutes = require("./routes/commanRoutes");
const consumerRoutes = require("./routes/consumerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(appendFileLogs);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

app.use((req, res, next) => {
  const excludedPaths = ["/supplier/signin", "/supplier/signup", "/supplier/verifyEmail", "/consumer/signin", "/consumer/signup", "/consumer/verifyEmail", "/common/signin", "/common/signup", "/common/verifyEmail"]; // Add other excluded paths

  if (excludedPaths.includes(req.path)) {
    next();
  } else {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json(reply.onError(403, null, "Bearer token required"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, config.SECRET_KEY);
      if (!payload || payload.status !== "Active") {
        return res.status(403).json(reply.onError(403, null, "Invalid or expired token"));
      }
      req.user = payload;
      next();
    } catch (err) {
      return res.status(403).json(reply.onError(403, null, "Invalid or expired token"));
    }
  }
});

// Routing
app.use("/supplier", supplierRoutes);
app.use("/consumer", consumerRoutes);
app.use("/common", commonRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(reply.onError(500, null, "Something went wrong!"));
});

app.listen(5000, () => {
  console.log("Server started on PORT 5000");
});