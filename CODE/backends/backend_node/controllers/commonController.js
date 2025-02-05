const db = require("../DBUtils/connection");
const { common, consumer, supplier } = require("../DBUtils/constants");
const reply = require("../models/responseStructure");

// Common Contoller
const getAllServiceZones = (request, response) => {
  const statement = `SELECT * FROM ${common.SERVICE_ZONES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length == 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No service zones are available at this time."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Service zones retrieved successfully."
            )
          );
      }
    }
  });
};

const findServiceByPincode = (request, response) => {
  const pincode = request.body.pincode;
  const statement = `SELECT * FROM ${common.SERVICE_ZONES} WHERE pincode = ${pincode}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length == 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No service zones found for the provided pincode."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Service zones retrieved successfully for the provided pincode."
            )
          );
      }
    }
  });
};

const getAllTrashCategories = (request, response) => {
  const statement = `SELECT * FROM ${supplier.TRASH_CATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length == 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No trash categories are available at this time."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Trash categories retrieved successfully."
            )
          );
      }
    }
  });
};

const getAllTrashSubCategories = (request, response) => {
  const statement = `SELECT * FROM ${supplier.TRASH_SUBCATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length === 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No trash subcategories are available at this time."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Trash subcategories retrieved successfully."
            )
          );
      }
    }
  });
};

const getAllRecyclingCategories = (request, response) => {
  const statement = `SELECT * FROM ${consumer.RECYCLING_CATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length === 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No recycling categories are available at this time."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Recycling categories retrieved successfully."
            )
          );
      }
    }
  });
};


const getAllRecyclingSubCategories = (request, response) => {
  const statement = `SELECT * FROM ${consumer.RECYCLING_SUBCATEGORIES}`;
  db.execute(statement, (error, result) => {
    if (error) {
      response
        .status(500)
        .json(
          reply.onError(
            500,
            error,
            "An error occurred while accessing the database. The requested table or view might not exist."
          )
        );
    } else {
      if (result.length === 0) {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "No recycled subcategories are available at this time."
            )
          );
      } else {
        response
          .status(200)
          .json(
            reply.onSuccess(
              200,
              result,
              "Recycled subcategories retrieved successfully."
            )
          );
      }
    }
  });
};


module.exports = {
  getAllServiceZones,
  findServiceByPincode,
  getAllTrashCategories,
  getAllTrashSubCategories,
  getAllRecyclingCategories,
  getAllRecyclingSubCategories,
};
