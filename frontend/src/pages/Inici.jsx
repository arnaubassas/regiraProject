import { Link } from "react-router-dom";
import Contexte from "../components/Contexte";
import { useContext } from "react";


const Inici = () => {

    const { loguejat } = useContext(Contexte)

    if (!loguejat) {
        return (
            <>
                <div className="text-4xl font-semibold flex flex-col items-center justify-evenly gap-y-16 " >
                    <div className="pt-4 tracking-wide">
                        <p className="py-2 tracking-wide">Connect every team,</p>
                        <p className="py-2 tracking-wide">task, and project</p>
                        <p className="py-2 tracking-wide">together with Regira</p>
                    </div>
                    <div className="border-2 border-black bg-white px-8 py-3 rounded-full"><Link to="/login">Sign In</Link></div>
                    <div className="border-2 border-black bg-white px-8 py-3 rounded-full"><Link to="/register">Sign Up</Link></div>
                </div>
            </>
        )
    }
}


export default Inici