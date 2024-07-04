

import openai 

from dotenv import load_dotenv  # Import the load_dotenv function
import os
load_dotenv() 

OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")
openai.api_key = OPEN_AI_KEY

def generate_question(input):
  chat_completion = openai.chat.completions.create(
      messages=[
          {
         "role": "user",
         "content": f""" As a quiz creator, I want to create an engaging quiz of a set amount of questions. Here is the format I need the data in.
                     The response should be an array with the following structure:
                           "question": "string",
                           "answers": ["example1"],["example2"],["example3"],
                           "moreDetailsUrl" : actual url to answer
                           "correctAnswer" : "correctAnswer" 

                           this should return an array of questions
              \n"""},
         {"role": "user", "content": f"{input}"}
      ]
      ,
      model="gpt-3.5-turbo",
  )
  return chat_completion.choices[0].message.content

