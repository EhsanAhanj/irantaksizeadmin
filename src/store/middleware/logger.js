const logger = (store) => (next) => (action) => {
  // console.log(store);
  // console.log(next);
  console.log(action);

  next(action);
};

export default logger;
