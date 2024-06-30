

import openai 

# Ensure you use a valid API key
openai.api_key = "sk-proj-BwxcasLCc2PdIgUTP3KLT3BlbkFJMCWEOHDocINerXpAxy92"

def generate_question(input):
  chat_completion = openai.chat.completions.create(
      messages=[
          {
         "role": "user",
         "content": f""" As a quiz creator, I want to create an engaging quiz of a set amount of questions. Here is the format I need the data in. Each question will be an object within an array of objects, the question will be the first key within the object with the key of 'question' and the value of the provided question. For the answers I want them on the key 'answers' as an array. The third key will be the correct answer on the key 'correctAnswer' and the last key value pair will be a url if the user would like more details. \n"""},
         {"role": "user", "content": f"{input}"}
      ]
      ,
      model="gpt-3.5-turbo",
  )
      
      
  return chat_completion.choices[0].message.content


