import { ChatEngine } from 'react-chat-engine';

const Chat = () => {
    return (
        <section className="chat">
            <ChatEngine
                projectID='da6c84e0-e17e-4d3b-b5a4-9e0dd17b1115'
                userName='theloc'
                userSecret='theloc2001'
            />
        </section>
    )
}

export default Chat