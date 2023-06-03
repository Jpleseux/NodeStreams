import axios from "axios"
import {Transform, Writable} from "stream"
const url = "http://localhost:3000"

async function consume(){
    const res = await axios({
        url,
        method: "GET",
        responseType: "stream"
    })
    return res.data
}

const stream = await consume()

stream.pipe(
    new Transform({
        transform(chunck, enc, cb){
            const item = JSON.parse(chunck)
            const myNumber = /\d/.exec(item.name)[0]
            let name = item.name
            if(myNumber % 2 ===0){
                name = name.concat("É Par")
            }else{
                name = name.concat("É impar")
            }
            item.name = name
            cb(null, JSON.stringify(item))
        }
    })
).pipe(
    new Transform({
        transform(chunck, enc, cb){
            cb(null, JSON.stringify(chunck.toString().toUpperCase()))
        }
    })
).pipe(
    new Writable({
        write(chunck,enc, cb){
            console.log("Chegou", chunck.toString())

            cb()

        }
    })
)