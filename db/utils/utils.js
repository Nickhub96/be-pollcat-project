exports.formatAnswerDates = list => {
  /* This utility function should be able to take an array (`list`) of objects and return a new array. 
  Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
   */

  const formatDates = list.map(obj => {
    const copyObj = { ...obj };
    copyObj.timeSubmitted = new Date(copyObj.timeSubmitted);
    return copyObj;
  });
  return formatDates;
};

exports.formatQuestionDates = list => {
  /* This utility function should be able to take an array (`list`) of objects and return a new array. 
  Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
   */

  const formatDates = list.map(obj => {
    const copyObj = { ...obj };
    copyObj.startTime = new Date(copyObj.startTime);
    return copyObj;
  });
  return formatDates;
};
