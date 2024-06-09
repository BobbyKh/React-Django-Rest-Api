function NotFound() {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">404</h1>
                    <p className="text-2xl mb-8">Sorry, the page you are looking for could not be found.</p>
                    <a className="text-blue-500 hover:underline" href="/">Go back home</a>
                </div>
            </div>
        </>
    )
}

export default NotFound