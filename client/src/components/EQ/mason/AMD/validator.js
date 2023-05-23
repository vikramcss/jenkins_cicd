export const validator7th = (essentialQualifications, otherQualifications) => {
  let valid = true;
  let alertMessage;
  console.log("otherQualificaitons: ", otherQualifications);
  alertMessage = null;

  let found10th = essentialQualifications.find(
    (q) => q.qualification == "10th"
  );
  let found7th = essentialQualifications.find((q) => q.qualification == "7th");

  if (!found10th && !found7th) {
    alertMessage = alertMessage
      ? `${alertMessage} In Essential Qualification 7th or 10th is mandatory`
      : `In Essential Qualification 7th or 10th is mandatory`;
    valid = false;
  }

  return { valid, alertMessage };
};
