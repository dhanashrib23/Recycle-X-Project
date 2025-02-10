import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/BackgroundImg.jpg";
import logo from "../assets/logo.webp";
import aboutImage from "../assets/about.jpg";
import servicesImage from "../assets/services.jpg";
import productsImage from "../assets/products.jpg";
import contactImage from "../assets/contact.jpg";
import { motion } from "framer-motion";
import "./Dashboard.css";

const sections = ["home", "about", "services", "products", "contact"];

const RotatingEarth = () => {
  const earthRef = useRef();
  useFrame(() => {
    earthRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load(logo)} />
    </mesh>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight } = scrollRef.current;
      const index = Math.round(scrollTop / clientHeight);
      window.history.replaceState(null, "", `#${sections[index]}`);
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const sectionData = {
    about: {
      image: aboutImage,
      title: "About Us",
      description:
        "Learn about our company, our mission, and our values. We are passionate about...",
    },
    services: {
      image: servicesImage,
      title: "Our Services",
      description:
        "We offer a wide range of services to meet your needs. These include...",
    },
    products: {
      image: productsImage,
      title: "Our Products",
      description: "Explore our innovative and high-quality products. From...",
    },
    contact: {
      image: contactImage,
      title: "Contact Us",
      description:
        "Get in touch with us for inquiries, support, or collaborations. We'd love to hear from you!...",
    },
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="RecycleX Logo" className="me-2" height="40" />
            <h1 className="fs-4 fw-bold text-success m-0">RecycleX</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {sections.map((section) => (
                <li className="nav-item" key={section}>
                  <a
                    href={`#${section}`}
                    className="nav-link text-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(section)
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
              <button
                className="btn btn-success ms-3"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div ref={scrollRef} className="scrollable-container">
        {sections.map((section, index) => (
          <section
            key={section}
            id={section}
            className={`section ${section === "home" ? "home-section" : ""}`}
            style={{
              backgroundImage:
                section === "home"
                  ? "none"
                  : `url(${
                      [
                        backgroundImage,
                        aboutImage,
                        servicesImage,
                        productsImage,
                        contactImage,
                      ][index]
                    })`,
            }}
          >
            <div className="section-content">
              {section === "home" && (
                <img
                  src={backgroundImage}
                  alt="Background"
                  className="home-background-image"
                />
              )}
              <div
                className="content-inner"
                style={{
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <div
                  className="image-container"
                  style={{ display: section === "home" ? "none" : "block" }}
                >
                  <img
                    src={
                      [
                        backgroundImage,
                        aboutImage,
                        servicesImage,
                        productsImage,
                        contactImage,
                      ][index]
                    }
                    alt={section}
                    className="section-image"
                  />
                </div>
                <div className="text-container">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                  >
                    {section === "home" ? (
                      <div>
                        <h1 className="display-4 fw-bold text-black">
                          Welcome to RecycleX
                        </h1>
                        <p className="lead text-black">
                          Transforming the Waste into Resources,
                          Rebuilding Nature...!
                        </p>
                        <Canvas className="earth-canvas">
                          <ambientLight intensity={0.5} />
                          <directionalLight position={[2, 2, 2]} />
                          <RotatingEarth />
                        </Canvas>
                      </div>
                    ) : (
                      <div>
                        <h1 className="display-4 fw-bold">
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </h1>
                        <p className="lead">
                          {sectionData[section].description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;