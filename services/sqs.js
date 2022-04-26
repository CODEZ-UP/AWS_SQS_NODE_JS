import AWS from 'aws-sdk'

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const QUEUE_URL = process.env.AWS_QUEUE_URL;

  // Send Data to SQS
  const sendData = async (body) => {
    try {
      const { name, author, description } = body
      const params = {
        MessageAttributes: {
          "Name": {
            DataType: "String",
            StringValue: name,
          },
          "Author": {
            DataType: "String",
            StringValue: author,
          },
          "Description": {
            DataType: "String",
            StringValue: description,
          }
        },
        MessageBody: JSON.stringify(body),
        QueueUrl: QUEUE_URL
       };
      const data = await sqs.sendMessage(params).promise();
      return { success: true, data }
    } catch(error) {
      console.log("🚀 ~ file: sqs.js ~ line 38 ~ sendData ~ error", error)
      return { success: false, data: null }
    }
  }
  
  // Receive Data from SQS
  const receiveData = async () => {
    try {
      const params = {
        QueueUrl: QUEUE_URL,
      }
      const data = await sqs.receiveMessage(params).promise()
      return { success: true, data }
    } catch(error) {
      return { success: false, data: null }
    }
  }

  // Delete Data from SQS
  const deleteData = async (receipt) => {
    try {
      const params = {
        QueueUrl: QUEUE_URL,
        ReceiptHandle: receipt,
      }
      const data = await sqs.deleteMessage(params).promise();
      return { success: true, data: "Message Deleted Successfully" }
    } catch(error) {
      return { success: false, data: null }
    }
  }

export {
  sendData,
  receiveData,
  deleteData,
}
