import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <div className="w-full h-14 bg-gray-900">
            <div className="mx-5 flex justify-between">
                <Link to="/" className="text-white font-bold font-serif text-2xl my-3">My Encyclopedia</Link>
                <div className="flex gap-5 my-2 items-center">
                    <img className="w-10 h-10 rounded-full" alt="user_image" src="https://avatars.githubusercontent.com/u/94538229?v=4"/>
                    <span className="text-white">logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;