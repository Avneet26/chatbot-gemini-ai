import PropTypes from 'prop-types';

export default function ChatBubble({chatObj}) {
    return (
        <div className={`chatbubble ${chatObj.from === 'user' ? 'userbubble' : 'systembubble'}`} >
            <p>{chatObj.from}: {chatObj.message}</p>
        </div>
    )
}

ChatBubble.propTypes = {
    chatObj: PropTypes.shape({
        from: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
};