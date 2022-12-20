const PROTO_PATH = "splitter.proto"

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const messageRequest = {
    message: "HELLO, SOA, 2022, FALL TERM",
    splitter: ","
}

const SplitterService = grpc.loadPackageDefinition(packageDefinition).SplitterService

const client = new SplitterService("localhost:3000", grpc.credentials.createInsecure())

client.messageSplitter(messageRequest, (err, data) => {
    if (!err) {
        console.log(data.result);
    } else {
        console.log(err);
    }
})