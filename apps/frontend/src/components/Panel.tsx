

const Panel = ({children, className=""}:any) => {
    
    return (
        <div className={"relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 _sm:mx-auto _sm:max-w-lg sm:rounded-lg xsm:px-10 "+className}>
        {children}
        </div>
    )
}

export default Panel;