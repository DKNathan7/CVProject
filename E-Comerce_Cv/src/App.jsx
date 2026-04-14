import "./App.css"
import logo from "/Img/LogoE-comerce.png"
import { FiSearch, FiMenu, FiShoppingCart, FiUser, FiLock } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc";
import { HiOutlineX } from "react-icons/hi";
import { useState, useEffect } from "react"
export function App () {
    const [open, setOpen] = useState(false)
    return (
        <div className="min-h-screen bg-gray-700 text-white">
            {open && ( // --> Renderizado condicional para el MODAL
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={() => setOpen(false)}>
                  <div className="bg-white text-black p-7 rounded-lg shadow-lg w-80 relative" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-2 right-2.5 text-2xl cursor-pointer" onClick={()=>{setOpen(false)}}><HiOutlineX className="hover:text-red-500 transition"/></button>
                    <div className="flex flex-col gap-5">
                        <h3 className="flex justify-center text-xl">Iniciar sesión</h3>
                    <form className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <label htmlFor="Email"><FiUser className="text-xl"/></label><input type="email" id="Email" className="border p-1 flex flex-1 pl-3" placeholder="Email" required/>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="Password"><FiLock className="text-xl"/></label><input type="password" id="Password" className="border p-1 flex flex-1 pl-3" placeholder="Password" required/>
                        </div>
                        <button className="border cursor-pointer bg-amber-500 p-1 w-full py-2 font-semibold rounded hover:bg-amber-600 transition focus:outline-none focus:ring-2 focus:ring-orange-400">Iniciar Sesion</button>
                    </form>
                    <span className="underline text-xs cursor-pointer">He olvidado mi contraseña</span>
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
                            <span className="flex text-xs gap-1 justify-center"><h3>No tienes una cuenta?</h3><h3 className="text-blue-500 cursor-pointer">Crear una</h3></span>    
                        </div>
                        
                    </div>
                    </div>
                    
                  </div>
                </div>
            )}
            <header className="border-b">
                <div className="flex items-center justify-between px-6 gap-6">
                    <a href="#">
                        <img src={logo} alt="logo_EComerce" className="w-16"/>
                    </a>
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-600 transition">
                        <FiMenu className="text-xl"/><h3>Todas las categorías</h3>
                    </div>
                    <div className="flex w-96">
                        <input type="text" className="border h-10 rounded-l-md border-r-0 pl-4 flex-1" placeholder="Buscar" name="search"/>
                        <button className="border h-10 px-3 py-2 bg-orange-500 border-l-0 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-amber-600 transition">
                            <FiSearch className="text-xl"/>
                        </button>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-600 transition" onClick={() => setOpen(true)}>
                        <FiUser className="text-xl"/>
                        <span>Mi cuenta</span>
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-600 transition">
                        <div className="relative">
                            <FiShoppingCart className="text-xl" />
                            <span id="cartArticlesNum" className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
                        </div>
                        <h3>Mi cesta</h3>
                    </div>
                    
                    </div>
            </header>
            <section>
                cuerpo section
            </section>
            <footer>
                pie de página
            </footer>
        </div>
    )
}