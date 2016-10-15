import pymongo

#gets you the handler on the mongo client
client = pymongo.MongoClient()

#choose the data base. client.Surveys = pymongo.MongoCliet().Surveys
db = client.Surveys

#choose the collection
collection = db.usersurveystemp

#example code
def InsertRecords(username, email, color, food, vacation, valuebefore, valueafter):
	collection.insert({'Username': username, 'Email': email, 'Color': color, 'Food': food })

# this will return all the individual documents in collection
def display():
	return collection