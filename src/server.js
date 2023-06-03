import http from "http"
import {Readable} from "stream"
import {randomUUID} from "crypto"

    function * run(){
        for(let index =0; index<=5000; index++){
            const data = {
                id: randomUUID,
                name: `joao/${index}`
            }
            yield data
        }
    }

    async function handler(req, res){
        const readable = new Readable({
            read(){
                for(const data of run()){
                    console.log(`sending data:${data}`)
                    this.push(JSON.stringify(data)+"\n")
                }
                //para quebrar ou dizer que acabou
                this.push(null)
            }
        })
        readable.pipe(res)
    }

http.createServer(handler).listen(3000).on("listening", ()=>console.log("Servidor rodando na porta 3000"))