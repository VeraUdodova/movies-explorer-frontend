import "./Message.css";

function Message(props) {
    return (
        <div className={`message ${props.isOpen && 'message_opened'}`}>
            <div className={`message__container`}>
                <button
                    type="button"
                    onClick={props.onClose}
                    className="message__close">
                </button>
                <div>
                    <div className={props.isMessageSuccess ? "message__success-image" : "message__failure-image"}></div>
                    <p className='message__failure-text'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Message;