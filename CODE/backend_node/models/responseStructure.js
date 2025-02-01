function onSuccess(stCode, data, msg) {
  return { statusCode: stCode, status: "success", data, message: msg };
}

function onLoginSuccess(stCode, token, message) {
  return { statusCode: stCode, status: "success", token, message };
}

function onError(stCode, error, msg) {
  return { statusCode: stCode, status: "error", error, message: msg };
}

module.exports = { onSuccess, onError, onLoginSuccess };
