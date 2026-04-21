import "./App.css"
import logo from "/Img/LogoE-comerce.png"
import cartImg from "/Img/carritoImg.svg"
import { FiSearch, FiMenu, FiShoppingCart, FiUser, FiLock } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc";
import { HiOutlineX } from "react-icons/hi";
import { useState, useEffect } from "react"
export function App () {
    const [accOpened, setAccOpened] = useState(false)
    const [cartOpened, setCartOpened] = useState(false)
    const [nameUser, setNameUser] = useState("Mi Cuenta")
    const [usrInput, setUsrInput] = useState()
    const [pswInput, setPswInput] = useState()
    const name = "Santiago"
    const email = "santiago123@gmail.com"
    const password = "123"
    const [users, setUsers] = useState({name:"Santiago"})
    const [images, setImages] = useState([])

    function startSesion (){
        if (usrInput == email && pswInput === password) {
            setNameUser(name)
            setAccOpened(false)
        }
        
    }

    useEffect(() => {
        async function loadImages() {
            const response = await fetch("http://localhost:3001/images")
            const data = await response.json()
            console.log(data.photos[0].src)
            setImages(data.photos)
        }

        loadImages()
    }, [])
    return (
        <div className="min-h-screen bg-[#23272f] text-white">
            
            {/**CONTENIDO DEL LOGIN */}
            {accOpened && ( // --> Renderizado condicional para el MODAL
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setAccOpened(false)}>
                    <div className="bg-white text-black p-7 rounded-lg shadow-lg w-80 relative" onClick={(e) => e.stopPropagation()}>
                      <button className="absolute top-2 right-2.5 text-2xl cursor-pointer" onClick={()=>{setAccOpened(false)}}>
                        <HiOutlineX className="hover:text-red-500 hover:bg-gray-100 transition"/>
                    </button>
                      <div className="flex flex-col gap-5">
                            <h3 className="flex justify-center text-xl font-semibold">Iniciar sesión</h3>
                            <form className="flex flex-col gap-3" onSubmit={(e) => {e.preventDefault()
                                                                                            startSesion()
                                                                                            }}>
                                <div className="flex items-center gap-2" >
                                    <label htmlFor="Email"><FiUser className="text-xl"/></label><input type="email" id="Email" className="border p-1 flex flex-1 pl-3" placeholder="Email" required onChange={(e) => setUsrInput(e.target.value)}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="Password"><FiLock className="text-xl"/></label><input type="password" id="Password" className="border p-1 flex flex-1 pl-3" placeholder="Password" required onChange={(e) => setPswInput(e.target.value)}/>
                                </div>
                                <button type="submit" className="border cursor-pointer bg-amber-500 p-1 w-full py-2 font-semibold rounded hover:bg-amber-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400">
                                    Iniciar Sesion
                                </button>
                            </form>
                            <span className="underline text-xs cursor-pointer font-medium">He olvidado mi contraseña</span>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 my-4">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                    <span className="text-gray-500 text-sm whitespace-nowrap">
                                      o continúa con
                                    </span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button className="flex border cursor-pointer gap-2 items-center p-1 justify-center hover:bg-gray-100 transition"><FcGoogle className="text-xl"/>Continuar con Google</button>
                                    <span className="flex text-xs gap-1 justify-center font-medium"><h3>No tienes una cuenta?</h3><h3 className="text-blue-500 cursor-pointer font-bold">Crear una</h3></span>    
                                </div>
                          </div>
                      </div>
                    </div>
                </div>
            )}
            {/**CONTENIDO DE LA CESTA */}
            <div className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
                      cartOpened ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`} 
                    onClick={() => setCartOpened(false)}>
                <div className={`absolute top-0 right-0 h-screen w-100 bg-white text-black shadow-lg transform transition-transform duration-300 ${
                          cartOpened ? "translate-x-0" : "translate-x-full"
                        }`}onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between border-b pb-3 mb-3 p-5">
                        <h3 className="font-semibold text-xl">Mi cesta</h3>
                        <button className="text-2xl cursor-pointer" onClick={()=>{setCartOpened(false)}}>
                            <HiOutlineX className="hover:text-red-500 hover:bg-gray-100 transition"/>
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <img src={cartImg} alt="logo_EComerce" className="w-25 bg-amber-400 rounded-4xl p-2"/>
                        <h3 className="font-semibold">Cesta vacía</h3>
                        <p className="flex text-center">Explora artículos desde nuestra página principal</p>
                        <a className="border p-2 rounded bg-amber-500 cursor-pointer hover:text-white hover:bg-amber-600 focus:ring-2 focus:ring-orange-400" href="http://localhost:5173">
                            Explorar artículos
                        </a>
                        
                    </div>
                </div>
            </div>

            <header className="border-b p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3" id="headLeft">
                        <a href="#">
                            <img src={logo} alt="logo_EComerce" className="w-16"/>
                        </a>
                        <div className="flex items-center gap-2 cursor-pointer p-3 rounded hover:bg-gray-600 transition">
                            <FiMenu className="text-xl"/><h3>Todas las categorías</h3>
                        </div>
                    </div>
                    <div className="flex flex-1" id="headMid">
                        <input type="text" className="border h-10 rounded-l-md border-r-0 pl-4 flex-1" placeholder="Buscar" name="search"/>
                        <button className="border h-10 px-3 py-2 bg-orange-500 border-l-0 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-amber-600 transition focus:ring-2 focus:ring-orange-400">
                            <FiSearch className="text-xl"/>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-3" id="headRight">
                        <div className="flex items-center gap-2 cursor-pointer p-3 rounded hover:bg-gray-600 transition focus:bg-gray-900" onClick={() => setAccOpened(true)}>
                            <FiUser className="text-xl"/>
                            <span>{nameUser}</span>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer p-3 rounded hover:bg-gray-600 transition" onClick={() => setCartOpened(true)}>
                            <div className="relative">
                                <FiShoppingCart className="text-xl" />
                                <span id="cartArticlesNum" className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
                            </div>
                            <h3>Mi cesta</h3>
                        </div>
                    </div>
                </div>   
            </header>
            <section>
                <div className="mt-5">
                    {images.map((image) => (
                        <div key={image.id} className="flex flex-row">
                            <img src={image.src.original} alt={image.alt}/>
                        </div>
                    ))}
                </div>
            </section>
            <footer>
                pie de página
            </footer>
        </div>
    )
}