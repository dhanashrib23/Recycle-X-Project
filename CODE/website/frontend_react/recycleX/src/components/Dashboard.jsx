import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.webp";
import backgroundImage from "../assets/BackgroundImg.jpg";
import { useNavigate, Link } from "react-router-dom";

const RotatingEarth = () => {
  const earthRef = useRef();
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load(logo)} />
    </mesh>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="position-relative min-vh-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
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
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link text-dark">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link text-dark">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link text-dark">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-dark">
                  Contact Us
                </Link>
              </li>
            </ul>
            <form className="d-flex ms-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button
              className="btn btn-success ms-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section with 3D Earth */}
      <div className="container text-center mt-5">
        <h2 className="display-4 fw-bold text-success">Welcome to RecycleX</h2>
        <p className="lead text-secondary">
          Transforming the Waste into Resources, <br /> Rebuilding Nature...!
        </p>
        <div className="d-flex justify-content-center mt-4">
          <Canvas style={{ width: "100%", height: "300px", maxWidth: "500px" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <RotatingEarth />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
