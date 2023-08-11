let RESET_API_RESPONSE = {
  message: "",
  status: "",
  visible: false,
};

let SUCCESS_API_RESPONSE = {
  message: "",
  severity: "success",
  visible: true,
};

let FAILURE_API_RESPONSE = {
  message: "",
  severity: "error",
  visible: true,
};

function getSuccessApiResponse(response) {
  let data = { ...SUCCESS_API_RESPONSE };
  data.message = response?.message;
  return data;
}

function getFailureApiResponse(response) {
  let data = { ...FAILURE_API_RESPONSE };
  data.message = response?.response?.data?.message;
  return data;
}

export { RESET_API_RESPONSE, getSuccessApiResponse, getFailureApiResponse };
