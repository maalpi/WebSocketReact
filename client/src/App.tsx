import { useState } from 'react'

import Join from './components/join/join'
import Chat from './components/chat/chat'
import './App.css'

function App() {
  const [chatVisibily, setChatVisibility] = useState<boolean>(false)
  const [socket, setSocket] = useState(null)

  return (
    <div>
      {
        chatVisibily ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </div>
  )
}

export default App
