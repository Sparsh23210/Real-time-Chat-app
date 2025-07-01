import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'
export default function Messagesto({messages, name}) {
    console.log(messages);
  return (
    <ScrollToBottom className="messages-container">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  )
}
