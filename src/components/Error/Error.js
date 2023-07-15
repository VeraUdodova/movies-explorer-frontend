import "./Error.css";

function Error(props) {
    return (
        <div className={`error ${props.isOpen && 'error_opened'}`}>
            <div className={`error__container`}>
                <button
                    type="button"
                    onClick={props.onClose}
                    className="error__close">
                </button>
                <div>
                    <div className="error__failure-image"></div>
                    <p className='error__failure-text'>{props.message}</p>
                </div>
            </div>
        </div>
    )
}

export default Error;