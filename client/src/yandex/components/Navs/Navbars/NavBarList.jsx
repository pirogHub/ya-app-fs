
const NavBarList = ({ className, children }) => {


    return (
        <ul className={"nav-item navbar-list" + (className ? ` ${className}` : "")}>
            {children.length > 1
                ? children.map((c, idx) => <li key={idx} className="nav-item">{c}</li>)
                : <li className="nav-item">{children}</li>}
        </ul>
    )
}

export default NavBarList