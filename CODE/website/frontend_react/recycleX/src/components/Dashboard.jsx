import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.webp";
import backgroundImage from "../assets/BackgroundImg.jpg";
import { useNavigate } from "react-router-dom";

const RotatingEarth = () => {
  const earthRef = useRef();
  // Slowed down the rotation speed
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.01; // Slower rotation speed
    }
  });

  return (
    <mesh ref={earthRef}>
      {/* Increased size of the sphere */}
      <sphereGeometry args={[2, 32, 32]} /> {/* Increased radius */}
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
        backgroundSize: "cover", // Ensure background fits the screen
        backgroundPosition: "center center", // Center the background image
        backgroundAttachment: "fixed", // Keep the background fixed during scrolling
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} alt="RecycleX Logo" className="me-2" height="40" />
            <h1 className="fs-4 fw-bold text-success m-0">RecycleX</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {["Home", "About Us", "Services", "Products", "Contact Us"].map(
                (item) => (
                  <li className="nav-item" key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                      className="nav-link text-dark"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
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
          <Canvas style={{ width: "300px", height: "300px" }}>
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
