from fastapi import FastAPI, HTTPException, status, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from bson import ObjectId
from datetime import datetime
import json
import os
import pytz
from dotenv import load_dotenv

from utils import generate_question

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for initial setup
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_DETAILS = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_DETAILS, tlsAllowInvalidCertificates=True)

database = client['QuizDatabase']
collection = database["UserQuizzes"]



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


async def generate_and_insert_quiz(user: str, quiz_string: str) -> Any:
    try:
        quiz_object = json.loads(quiz_string)
    except json.JSONDecodeError:
        return {"error": "Invalid quiz data received"}

    print(user)
    if user != 'null':
        quiz_item = QuizItem(user=user, quiz=quiz_object)
        quiz_item_dict = quiz_item.dict(by_alias=True)
        db_response = await collection.insert_one(quiz_item_dict)
        inserted_document = await collection.find_one({"_id": db_response.inserted_id})
        return inserted_document
    else:
        return quiz_object


 
@app.get("/api/quiz", response_model=QuizItem)
async def get_active_quiz_item(user: str = Query(...)):
    # Retrieve a single document where is_active is True and user matches the query parameter
    quiz_item = await collection.find_one({"is_active": True, "user": user})
    print(quiz_item)

    if quiz_item is None:
        raise HTTPException(status_code=204, detail="No active quiz item found for the specified user")
    return quiz_item


@app.post("/api/quiz/article")
async def generate_quiz_from_article(user: str, url_question: URL_Question):
    quiz_string = generate_question(
        f"This is a URL from an article: {url_question.article}, number of questions: {url_question.questionCount}, questionType of quiz: {url_question.questionType}, difficulty: {url_question.difficulty}, please JUST provide the data in the object form."
    )
    return await generate_and_insert_quiz(user, quiz_string)


@app.post("/api/quiz")
async def generate_quiz(user: str, question: Question):
    quiz_string = generate_question(
        f"Question category: {question.category}, number of questions: {question.questionCount}, questionType of quiz: {question.questionType}, difficulty: {question.difficulty}"
    )
    return await generate_and_insert_quiz(user, quiz_string)

    
@app.post("/api/quiz/{_id}")
async def update_item(_id: str, body: UpdateRequest = Body(...)):
    user = body.user
    to_update = body.to_update

    quiz_item = await collection.find_one({"_id": _id, "user": user})
    if not quiz_item:
        raise HTTPException(status_code=404, detail="Item not found")

    await collection.find_one_and_update({"_id": _id, "user": user}, {"$set": to_update})
    return Response(status_code=status.HTTP_200_OK)

@app.get("/api/archives/{user}")
async def get_user_archives(user: str):
    quiz_cursor = collection.find({"is_active": False, "user": user})
    quiz_items = await quiz_cursor.to_list(length=None)
    if not quiz_items:
        raise HTTPException(status_code=204, detail="No archived quiz items found for the specified user")
    return quiz_items

@app.delete("/api/quiz/{_id}")
async def remove_item(_id: str, user: str = Query(...)):
    quiz_item = await collection.delete_one({"_id": _id, "user": user})
    if quiz_item.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return Response(status_code=status.HTTP_200_OK)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)