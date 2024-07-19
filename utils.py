

import openai 

from dotenv import load_dotenv  # Import the load_dotenv function
import os
import json
load_dotenv() 


OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")
openai.api_key = OPEN_AI_KEY

def generate_question(input):
  chat_completion = openai.chat.completions.create(
      messages=[
            {
                "role": "user",
                "content": f"""As a quiz creator, I want to create an engaging quiz of a set amount of questions with a varying level of difficulty based on the users input value of difficulty. Here is the format I need the data in.
                              The response should be an array with the following structure:
                              [
                                {{
                                  "question": "string",
                                  "answers": ["example1", "example2", "example3"],
                                  "moreDetailsUrl" : "actual url to answer",
                                  "correctAnswer" : "correctAnswer"
                                }},
                                ...
                              ]
                              Please ensure that it is just an array of questions and not an object with any other keys, as this tends to break the code.
                """},
            {"role": "user", "content": input}
        ],
      
      model="gpt-3.5-turbo",
  )
  response = chat_completion.choices[0].message.content

 # Validate the response format
  try:
      data = json.loads(response)
      if isinstance(data, list) and all(
          isinstance(item, dict) and
          "question" in item and
          "answers" in item and isinstance(item["answers"], list) and
          "moreDetailsUrl" in item and
          "correctAnswer" in item
          for item in data
      ):
          print("Format is correct")
      else:
          print("Format is incorrect")
  except json.JSONDecodeError:
      print("Response is not valid JSON")
  
  return response

    