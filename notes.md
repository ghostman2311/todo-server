## Full Stack project setup

1. Install @babel/core @babel/node @babel/preset-env, npx babel-node src/server.js
2. Install express, nodemon. create server now.

1:18, 2:18

## Create a Read endpoint and Load data from client side

1. Return title, id and content on get request('/notes')
2. Add proxy on frontend.

## Add a create endpoint and make request from the client side

1. What is use of app.use(express.json()). Create post request

## Add Update and Delete endpoints

1. Difference between put and patch.

## Add MongoDb to the backend

1. Import MongoClient from mongo-client;
2. Refactor the necessary routes inside start function. useNewUrlParser, useUnifiedTopology.
3. Now store notes collection in noteDb vairable.

## Convert endpoints to use mongodb

1. await notedb.find({}).toArray() to return the notes.
2. await noteDb.insertOne({.....}) to insert the note into db.
3. await noteDb.updateOne({id: noteId}, { $set: {title, content}}).
4. await noteDb.deleteOne({id: noteId}).

## Split express server into multiple files

1. Create each file corresponding to each route like updateNoteRoute.js, deleteNoteRoute.js etc. structure of each file will be like this: {path: '/notes', method:'get', handler:() => {}}
2. Now create a db file which exports the notedb collection and initialize the connection in this file.
3. Rewrite the routes using foreach.

## Rewrite routes to increase performance

1. findOneAndUpdate will return the document. second args: {returnDocument: after}.
2. res.sendStatus(200) for delete.

# Add User Authentication to backend

## Install and setup firebase admin

1. Install and setup firebase admin.
2. Install firebase admin and generate credentials

## Convert endpoints for ownership

1. Now extract the userId from req.params.
2. find the user with the id.
3. now for each note id in user.notes find every note in notedb and store in notes.

## Data ownership in create and delete endpoints

1. Now we have to push the note id in user object, so we $push: notes: newNoteid.
2. Add createBy on each route.

## Protect users data from unwanted access

1. ```const {authToken} = req.headers;
    const user = await admin.auth().verifyIdToken(authToken)
   ```
2. In catch block return sendStatus 401. if authUser.uid !== userId return res.sendStatus(403)

## Prevent unauthorized data modification

1. ```const note = await notesDb.findOne({id: noteId});
     if(note.createdBy !== authUser.uid){ return res.sendStatus(403) }
   ```
2. Add these lines to updateNote Route. 
