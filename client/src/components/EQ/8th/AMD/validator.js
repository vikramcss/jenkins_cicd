export const validator8th = (essentialQualifications, otherQualifications) => {
  let valid = true;
  let alertMessage;
  console.log("otherQualificaitons: ", otherQualifications);
  alertMessage = null;

  let found10th = essentialQualifications.find(
    (q) => q.qualification == "10th"
  );
  let found8th = essentialQualifications.find((q) => q.qualification == "8th");

  if (!found10th && !found8th) {
    alertMessage = alertMessage
      ? `${alertMessage} In Essential Qualification 8th or 10th is mandatory`
      : `In Essential Qualification 8th or 10th is mandatory`;
    valid = false;
  }

  return { valid, alertMessage };
};
