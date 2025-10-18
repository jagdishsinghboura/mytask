import { GoDotFill } from "react-icons/go";
function LoadingPage() {

    return (
        <div className="w-full h-96">
            <div className="flex justify-center h-full items-center animate-bounce ">
                <div className="animate-bounceCustom w-2 h-2  bg-blue-500 rounded-full"></div>
            </div>
        </div>
    )
}

export default LoadingPage