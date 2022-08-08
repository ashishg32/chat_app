import React, { useState } from 'react'
import io from 'socket.io-client'

const ChatWindow = () => {
  const [chatMsg, setMsg] = useState(null)
  let socket = {}
  let chatServerUrl
  let retryCount = 0

  try {
    const {
      REACT_APP_CHAT_SERVER_URL
    } = process.env
    chatServerUrl = REACT_APP_CHAT_SERVER_URL || 'http://localhost:3001'
    socket = io.connect(chatServerUrl, {
      reconnectionAttempts: 3,
      reconnectionDelay: 100
    })
    socket.on('connect_error', () => {
      setTimeout(() => {
        if (retryCount < 3) {
          console.log(111)
          socket.connect()
          retryCount += 1
        } else {
          socket.disconnect()
        }
      }, 1000)
    })
  } catch (e) {
    console.log('error', e)
  }

  const emitMsg = () => {
    socket.emit('message', {
      type: 'message',
      content: JSON.stringify({
        id: socket.id,
        message: chatMsg
      })
    })
  }

  // set the value of chatMsg on change
  const onChange = (e) => {
    setMsg(e.target.value)
  }

  return (
    <div>
      <h1>Welcome to React Chat App</h1>
      <div>
        <input type="text" id="chatMsg" name="chatMsg" onChange={onChange} />
      </div>
      <button onClick={emitMsg}>Send Msg</button>
    </div>
  )
}

export default ChatWindow
