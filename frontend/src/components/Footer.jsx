import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <>
            <div className="flex flex-col py-14 justify-center items-start sm:gap-12 gap-8 sm:px-16 px-5 bg-gray-900 text-white">
                <div className="flex md:flex-row flex-col justify-between items-start gap-7 w-full">
                    <div className="flex flex-col gap-5 items-start justify-center">
                        <div className="flex font-bold sm:text-3xl text-2xl gap-2">
                            <span>Wander</span><h3 className="text-blue-500">Mate</h3>
                        </div>
                        <p className="sm:text-sm text-xs text-gray-400">
                            Your trusted companion for unforgettable journeys.
                        </p>
                    </div>

                    <div className="flex flex-col justify-start sm:gap-6 gap-4 text-gray-400">
                        <h3 className="text-lg text-white">Connect with Us</h3>
                        <ul className="flex sm:gap-7 gap-5">
                            <li className="sm:text-xl text-lg cursor-pointer hover:scale-105 hover:text-white transition"><a href="https://www.linkedin.com/in/abhinav-patel-38480b254/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
                            <li className="sm:text-xl text-lg cursor-pointer hover:scale-105 hover:text-white transition"><a href="https://www.x.com/abhip006" target="_blank" rel="noopener noreferrer"><BsTwitterX /></a></li>
                            <li className="sm:text-xl text-lg cursor-pointer hover:scale-105 hover:text-white transition"><a href="https://www.github.com/abhip06" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
                            <li className="sm:text-xl text-lg cursor-pointer hover:scale-105 hover:text-white transition"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gray-700"></div>

                <div className="sm:text-sm text-xs text-gray-500">
                    <span>
                        &copy; {new Date().getFullYear()} WanderMate — All Rights Reserved.
                    </span>
                </div>
            </div>
        </>
    );
};

export default Footer;
