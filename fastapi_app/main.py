from fastapi import FastAPI

app=FastAPI()

@app.get("/")
def landingpage():
    return("Hello Welcome to FastAPI World")