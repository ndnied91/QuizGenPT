export const formatData = (data) => {
  console.log(data);
  // const jsonString = data.quiz.replace(/```json|```/g, '').trim();
  const parsedQuiz = JSON.parse(jsonString);
  return parsedQuiz;
};
