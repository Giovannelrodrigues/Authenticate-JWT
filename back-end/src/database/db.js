import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://AdminDataBaseName:ADMIN@myecomerce.dvcgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() =>{
    console.log("Connect with database")
}).catch((err) => {
    console.log('Error connect with database')
})

export default mongoose