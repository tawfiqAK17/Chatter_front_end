
const InputField = ( { state, setState, value, placeHolder }) => {
   return (
        <input
            type="text"
            placeholder={placeHolder}
            className="flex-1 border dark:border-darkInput-border rounded-lg py-2 px-4 mx-2 dark:bg-primary-light dark:text-darkText-primary focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-darkInput-border"
            value={ state ? state : value }
            onChange={(e) => setState(e.target.value)}
        />
   ); 
}

export default InputField;
