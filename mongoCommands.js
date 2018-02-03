db.tech.insert(
 [
 {
 name: "MongoDB",
 role: "Database"
 },
 {
 name: "Express",
 role: "Web application server"
 },
 {
 name: "Angular",
 role: "Front-end framework"
 },
 {
 name: "Node.js",
 role: "Platform"
 }
 ]
 )
 
 db.tech.find() // finds all documents in tech collection
 
 db.tech.find().pretty() // returns all documents in tech collection in more readable format
 
 db.tech.find({"_id" : ObjectId("5a75e1aff7451453440a173c")}) // finds document with this ObjectId
 
 db.tech.find({name: "Angular"}) // finds document with name of Angular
 
 db.tech.find().sort({name: 1}) // finds all documents and sorts in ascending order. 
 
 db.tech.find().sort({name: -1}) // finds all documents and sorts in descending order. 
 
 db.tech.find({}, {name: true}) // finds all documents and returns only the ObjectId and the name
 
 db.tech.find({}, {name: true, _id: false}) // finds all documents and returns only the name
 // always must be all true or or false, EXCEPT if it is the _id key
 
 db.tech.update({name: "Angular"}, {$set: {name: "AngularJS"}}) // finds the document with the name of Angular, then updates Angular to AngularJS
 
 db.tech.update( {}, 
    { $set: { language: "Javascript" } },
    { multi: true }
    ) // finds all documents and sets a new language key to Javascript, and updates all documents
 
db.tech.remove( { name: "Express" } ) // removes the document with Express name

db.tech.remove({}) // removes all documents in a collection. CAREFUL WITH THIS

db.tech.drop() // removes tech collection

// exporting bson
mongodump --db meantest // this takes the meantest db in mongo and exports it into binary data into a folder. a dump folder will be created

//importing bson
mongorestore --db mean2 dump/meantest // this takes that binary data in the dump/meantest folder and creates a new db in mongo called mean2, with that data
// this only does inserts, not updates. 

//exporting json
mongoexport --db meantest --collection tech --out api/data/tech.json --jsonArray
// this takes data from meantest db, specifically the tech collection, and saves it in a file called tech.json and saves as array

//importing json
mongoimport --db mean3 --collection tech --jsonArray api/data/tech.json
// this takes the data in that tech.json file and imports it into a new db called mean3, inside a collection called tech