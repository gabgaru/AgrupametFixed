import './header.css'
import logo from '../../assets/unimetLogo.png'
import { Link } from "react-router-dom";

const items = [
    { title: "¿Quiénes somos?", link: "#about" },
    { title: "Agrupaciones", link: "#groups" },
]
export default function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="Logo Unimet" className="logo" />
            <div className="navigation">
                <ul className="nav">
                    {items.map(item =>
                        <li key={item.title}><a className="nav-links" href={item.link}>{item.title}</a></li>
                    )}
                </ul>
                <Link to="/login"><button type="button" className="login">Ingresar</button></Link>
                <Link to="/register"><button type="button" className="create">Regístrate</button></Link>
            </div>
        </div>
    )
}

