function LoadingPage() {

    return (
        <div className="w-full h-96">
            <div className="flex justify-center h-full items-center  ">
                <h1 className="text-5xl font-extrabold text-blue-500 pb-9">Loading</h1>
                <div className="flex">
                    <div className=" w-3 h-3  bg-blue-500 rounded-full animate-bounceCustom " style={{ animationDelay: "100ms" }}></div>
                <div className=" w-3 h-3  bg-blue-500 rounded-full animate-bounceCustom " style={{ animationDelay: "200ms" }}></div>
                <div className=" w-3 h-3 bg-blue-500 rounded-full animate-bounceCustom " style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage