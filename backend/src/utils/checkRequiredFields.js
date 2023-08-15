const checkRequiredFields = (receivedFields, requiredFields) => {
  for (let i = 0; i < requiredFields.length; i += 1) {
    const currentField = requiredFields[i];
    if (!(currentField in receivedFields)) {
      return `"${currentField}" is required`;
    }
  }
};

module.exports = checkRequiredFields;