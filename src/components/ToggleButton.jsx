

const ToggleButton = ( { onClick, state } ) => {
    return (
        <button className={`relative w-16 h-8 rounded-3xl ${state ? 'bg-secondary': 'bg-gray-300'} `} onClick={() => onClick()}>
            <div className={`absolute bg-white rounded-full top-1/2 -translate-y-1/2 w-7 h-7 transition-all duration-300 ease-in-out ${state ? 'translate-x-8' : 'translate-x-1'} `}></div>            
        </button>
    )
}

export default ToggleButton;
