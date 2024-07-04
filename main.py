from fastapi import FastAPI , Query , Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field 

from utils import generate_question


from fastapi import FastAPI, HTTPException , status
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
from pymongo.server_api import ServerApi
from bson import ObjectId
import json
from datetime import datetime
from typing import Dict, Any
from pymongo import ReturnDocument


from dotenv import load_dotenv  # Import the load_dotenv function
import os
import pytz

load_dotenv() 

app = FastAPI()


class Question(BaseModel):
    category: str
    questionCount: int
    questionType: str
    difficulty: str

class URL_Question(BaseModel):
    article: str
    questionCount: int
    questionType: str
    difficulty: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MONGO_DETAILS = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_DETAILS, tlsAllowInvalidCertificates=True)

database = client['QuizDatabase']
collection = database["UserQuizzes"]

class Item(BaseModel):
    id: Optional[str]
    name: str
    description: str

def get_current_time_in_edt():
    edt = pytz.timezone("US/Eastern")
    return datetime.now(edt)

class QuizItem(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    timestamp: datetime = Field(default_factory=get_current_time_in_edt)
    user: str
    quiz: object
    is_active: bool = True  # New boolean field set to True by default

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class UpdateRequest(BaseModel):
    user: str
    to_update: Dict[str, Any]


# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    # print(e)
    print("error")


 
@app.get("/api")
async def read_root():
    return {"message": "Welcome to the FastAPI + MongoDB app"}


@app.get("/api/quiz", response_model=QuizItem)
async def get_active_quiz_item(user: str = Query(...)):
    # Retrieve a single document where is_active is True and user matches the query parameter
    quiz_item = await collection.find_one({"is_active": True, "user": user})

    if quiz_item is None:
        raise HTTPException(status_code=204, detail="No active quiz item found for the specified user")
    return quiz_item


@app.post("/api/quiz/article")
async def generate_quiz(user: str, url_question: URL_Question):
    quiz_string = generate_question(
        f"This is a URL from an article: {url_question.article}, number of questions: {url_question.questionCount}, questionType of quiz: {url_question.questionType}, difficulty: {url_question.difficulty}, please JUST provide the data in the object form."
    )
    print(quiz_string)
    try: # Convert the quiz string to an object
        quiz_object = json.loads(quiz_string)
        print(quiz_object)
    except json.JSONDecodeError:
        return {"error": "Invalid quiz data received"}
    # Create a QuizItem instance
    
    if user != 'null':
        quiz_item = QuizItem(user=user, quiz=quiz_object)
        # Convert the QuizItem instance to a dictionary
        quiz_item_dict = quiz_item.dict(by_alias=True)  # Use by_alias=True to map `id` to `_id`
        # Insert the document into the MongoDB collection
        db_response = await collection.insert_one(quiz_item_dict)

        # Get the inserted_id from the db_response
        inserted_id = db_response.inserted_id
    
        # Retrieve the inserted document from the database
        inserted_document = await collection.find_one({"_id": inserted_id})
        return inserted_document
    else:
        return quiz_object
    



@app.post("/api/quiz/{_id}")
async def update_item(_id: str, body: UpdateRequest = Body(...)):
    user = body.user
    to_update = body.to_update
    
    print("ID:", _id)
    print("User:", user)
    print("To Update:", to_update)

    quiz_item = await collection.find_one({"_id": _id, "user": user})
    
    if not quiz_item:
        raise HTTPException(status_code=404, detail="Item not found")
    

    # update_data = {"$set": to_update }
    await collection.find_one_and_update({"_id": _id, "user": user}, {"$set": to_update })

    return Response(status_code=status.HTTP_200_OK)


@app.post("/api/quiz")
async def generate_quiz(user: str, question: Question):
    # Generate the quiz based on the question
    quiz_string = generate_question(
        f"Question category: {question.category}, number of questions: {question.questionCount}, questionType of quiz: {question.questionType}, difficulty: {question.difficulty}"
    )
    
    try: # Convert the quiz string to an object
        quiz_object = json.loads(quiz_string)
    except json.JSONDecodeError:
        return {"error": "Invalid quiz data received"}
    # Create a QuizItem instance
    

    if user != 'null':
        quiz_item = QuizItem(user=user, quiz=quiz_object)
        # Convert the QuizItem instance to a dictionary
        quiz_item_dict = quiz_item.dict(by_alias=True)  # Use by_alias=True to map `id` to `_id`
        # Insert the document into the MongoDB collection
        db_response = await collection.insert_one(quiz_item_dict)

        # Get the inserted_id from the db_response
        inserted_id = db_response.inserted_id
    
        # Retrieve the inserted document from the database
        inserted_document = await collection.find_one({"_id": inserted_id})
        return inserted_document
    else:
        return quiz_object



@app.get("/api/archives/{user}")
async def get_user_archives(user: str):
    quiz_cursor = collection.find({"is_active": False, "user": user})
    quiz_items = await quiz_cursor.to_list(length=None)
    if not quiz_items:
        raise HTTPException(status_code=204, detail="No archived quiz items found for the specified user")
    return quiz_items



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)






