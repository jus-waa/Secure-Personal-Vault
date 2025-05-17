export default function LoginPage() {
    return(
        <>
            <div className="h-screen w-screen flex flex-col place-content-center items-center">
                <div className="grid h-3/5 w-3/12 justify-center border-2 border-red-500">
                    <div className="border-2 w-full">
                        <h1 className="text-2xl">LockPad</h1>
                        <form action="">
                            Email <br />
                            <input type="text" /><br />
                            Password <br />
                            <input type="text" /> <br />
                            <input className="cursor-pointer border-2" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <div className="border-2">
                    Dont have an Account?<br />
                    <a href="">Sign up</a>
                </div>
            </div>
        </>
    )
}