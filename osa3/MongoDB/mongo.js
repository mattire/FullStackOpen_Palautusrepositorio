const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
console.log('here');

const Person = mongoose.model('Person', personSchema);

function AddPerson(url, name, number ){
    const person = new Person({
        name: name,
        number: number,
    });
    person.save().then(result => {
        mongoose.connection.close();
        //console.log(result);
        console.log(`added ${result.name} number ${result.number} to phonebook`);
    }, reason => {
        console.log('person add failed!')
        mongoose.connection.close()
        console.log(reason);
    });
}

function PrintPhonebook(url){
    Person.find({}).then((res)=>{
        console.log('phonebook');
        res.forEach(p=>{
            //console.log(p);
            console.log(`${p.name} ${p.number}`);
        });
        mongoose.connection.close();
    });
}

function Info(){
    if (process.argv.length < 5) {
      console.log('give password as parameter 1')
      console.log('give name     as parameter 2')
      console.log('give number   as parameter 3')
      process.exit(1)
    }
}

if(process.argv.length >= 3){
    const password = process.argv[2]
    const url = `mongodb+srv://muurinpohjalettu_db_user:${password}@cluster0.rhujics.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url, { family: 4 })
    //console.log(url);
    if (process.argv.length == 3) {
        PrintPhonebook(url);
    } else if (process.argv.length == 5) {
        AddPerson(url, process.argv[3], process.argv[4]);
    }
    else if (process.argv.length == 2 || process.argv.length>5){ Info(); }
}

