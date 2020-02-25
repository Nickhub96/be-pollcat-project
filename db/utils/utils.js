exports.formatAnswerDates = list => {
  /* This utility function should be able to take an array (`list`) of objects and return a new array. 
  Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
   */
  const formatDates = list.map(obj => {
    const copyObj = { ...obj };
    copyObj.timePosted = new Date(copyObj.timePosted);
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

exports.questionRefObj = list => {
  const newObj = {};
  list.forEach(data => {
    newObj[data.question] = data.question_id;
  });
  // console.log(newObj);
  return newObj;
};

// exports.userRefObj = list => {
//   const newObj = {};
//   list.forEach(data => {
//     newObj[data.username] = data.user_id;
//   });
//   // console.log(newObj);
//   return newObj;
// };

exports.answerFormatter = (list, questionRef) => {
  // question -> question_id

  const newAnswer = [];
  list.forEach(data => {
    const duplicate = { ...data };
    duplicate.question_id = questionRef[duplicate.question];
    delete duplicate.question;
    // duplicate.user_id = userRef[duplicate.username];
    // delete duplicate.username;
    newAnswer.push(duplicate);
  });
  return newAnswer;
};
