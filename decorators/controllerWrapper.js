const controllerWrapper = (controller) => {
  const f = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return f;
};

module.exports = controllerWrapper;
