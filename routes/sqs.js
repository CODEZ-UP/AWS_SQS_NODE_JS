import express from 'express'
import { sendData, receiveData, deleteData } from '../services/sqs'

const router = express.Router()

// Send Message to SQS
router.post('/send', async (req, res) => {
  const { success, data } = await sendData(req.body)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// Receive File from SQS
router.get('/receive', async (req, res) => {
  const { success, data } = await receiveData()
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

// Delete Message from SQS
router.delete('/delete', async (req, res) => {
  const { receipt } = req.body
  const { success, data } = await deleteData(receipt)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

export default router

