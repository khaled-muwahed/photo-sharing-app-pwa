const Button = (props) => {
    return (
        <button onClick={props.onClick} block size="lg" type="submit" className="rounded-xl bg-purple-500 font-semibold py-5 px-16 text-white shadow-md">
            {props.children}
        </button>
    );
}

export default Button;
