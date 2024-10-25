


const Validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(404).json({ message: error.details[0].message });
    }
    next();
  };
};

export default Validate;
