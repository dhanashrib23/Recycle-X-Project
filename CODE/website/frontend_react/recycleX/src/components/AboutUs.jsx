import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Recycle X: Transforming the Waste into Resources, Rebuilding Nature...!
      </h1>
      <h2 className="text-xl font-semibold mb-2">Team Members</h2>
      <p className="mb-4">Introduction</p>
      <p className="mb-4">
        Recycle X is a comprehensive waste management system designed to be a
        one-stop solution for all types of garbage management. The project aims
        to address the growing challenge of waste disposal by providing a
        structured platform for consumers, suppliers, and administrators to
        interact seamlessly. It is divided into three main phases:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <strong>Supplier Side:</strong> Collection of dry waste, metal, and
          other materials by waste pickers.
        </li>
        <li>
          <strong>Processing Side:</strong> Segregating waste, cutting it into
          small pieces, and storing it as resins using specialized machinery.
        </li>
        <li>
          <strong>Selling Products:</strong> Selling the processed materials to
          businesses and industries.
        </li>
      </ol>
    </div>
  );
};

export default AboutUs;
