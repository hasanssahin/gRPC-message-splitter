const PROTO_PATH="splitter.proto"

const grpc=require('@grpc/grpc-js')
const protoLoader=require('@grpc/proto-loader')

const packageDefinition=protoLoader.loadSync(PROTO_PATH,{
    keepCase:true,
    longs:String,
    enums:String,
    arrays:true
})
const splitterProto = grpc.loadPackageDefinition(packageDefinition)
const server = new grpc.Server()


server.addService(splitterProto.SplitterService.service, {
    messageSplitter:(call, callback)=>{
        const splitter=call.request.splitter
        const splitted_msg = call.request.message.split(splitter)
        const result=splitted_msg[0]
        callback(null,{result})
    }
})


server.bindAsync("localhost:3000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    server.start()
    console.log("Server started on localhost:3000");
})


