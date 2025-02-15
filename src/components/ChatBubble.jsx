import PropTypes from 'prop-types';

export default function ChatBubble({chatObj}) {
    return (
        <div className={`chatbubble ${chatObj.from === 'user' ? 'userbubble' : 'systembubble'}`} >
            <pre>{chatObj.message}</pre>
        </div>
    )
}

ChatBubble.propTypes = {
    chatObj: PropTypes.shape({
        from: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
};