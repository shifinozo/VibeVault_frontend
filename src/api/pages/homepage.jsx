import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import Allsongs from "../components/Allsongs";


export default function Homepage() {
// const navigate = useNavigate();

    return (
        <div>
            <Navbar/>
            <Allsongs/>
        </div>

);
}




