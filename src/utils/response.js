const resSuccess = (res) => {
  return {
    success: true,
    data: res.data,
  };
};

const resError = (res) => {
  return {
    success: false,
    error: res.error,
  };
};

export { resSuccess, resError };
