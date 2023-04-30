
import "./Button.scss"

const Button = ({
    type = "button",
    className,
    label,
    isDisabled,
    children,
    ...eventHandlers }) => {

    if (isDisabled) {
        return (
            <button
                className={className + " disabled"}
                type={type}
            >
                {children ? children : label}
            </button>
        )

    } else {
        return (
            <button
                type={type}
                className={className}
                {...eventHandlers}
            >
                {children ? children : label}
            </button>
        )
    }
}

export default Button