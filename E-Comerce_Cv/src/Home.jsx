import "./App.css"
import logo from "/Img/LogoE-comerce.png"
import cartImg from "/Img/carritoImg.svg"
import star from "/Img/star.svg"
import { FiSearch, FiMenu, FiShoppingCart, FiUser, FiLock, FiChevronLeft, FiChevronRight, FiInstagram } from "react-icons/fi"
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineX } from "react-icons/hi";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useState, useEffect } from "react"

export function Home () {
    const [accOpened, setAccOpened] = useState(false)
    const [cartOpened, setCartOpened] = useState(false)
    const [nameUser, setNameUser] = useState("Mi Cuenta")
    const [usrInput, setUsrInput] = useState()
    const [pswInput, setPswInput] = useState()
    const name = "Santiago"
    const email = "santiago123@gmail.com"
    const password = "123"
    const [users, setUsers] = useState({name:"Santiago"})
    const [heroImages, setHeroImages] = useState([])
    const [productsImages, setProductsImages] = useState([])
    const [helmetImages, setHelmetImages] = useState([])
    const [protectionsImages, setProtectionsImages] = useState([])
    const [wheelsImages, setWheelsImages] = useState([])
    const [homeData, setHomeData] = useState()
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentImage = heroImages[currentIndex]
    
    {/**`${import.meta.env.VITE_API_URL}/home-data` */}
    function startSesion (){
        if (usrInput == email && pswInput === password) {
            setNameUser(name)
            setAccOpened(false)
        }
    }

    useEffect(() => {
        async function loadHomeImages(){
            const response = await fetch("/api/pexels")
            const data = await response.json()
            setHeroImages(data.heroImages || [])
            setHelmetImages(data.helmets || [])
            setProtectionsImages(data.protections || [])
            setWheelsImages(data.wheels || [])
            setProductsImages(data.products || [])
        }
        loadHomeImages()
    }, [])

    // Carrousell automático de imágenes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
        }, 4000);

        return () => clearInterval(interval) // --> Limpieza del buffer
    }, [heroImages.length])
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
                            <span className="text-xs cursor-pointer font-medium hover:underline">He olvidado mi contraseña</span>
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
                        <a className="border p-2 rounded bg-amber-500 cursor-pointer hover:text-white hover:bg-amber-600 focus:ring-2 focus:ring-orange-400 transition duration-300" href="http://localhost:5173">
                            Explorar artículos
                        </a>
                    </div>
                </div>
            </div>
            <header className="border-b p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3" id="headLeft">
                        <a href="#" id="logoHome">
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
                {/**Contenido del Hero */}
                <div className="overflow-hidden relative w-full h-150">
                    <FiChevronLeft id="leftArrow" className="absolute bg-gray-600 opacity-50 hover:opacity-100 z-30 top-1/2 -translate-y-1/2 left-5 text-6xl transition cursor-pointer"
                        onClick={() => setCurrentIndex((prevIndex) => prevIndex == 0? (heroImages.length - 1) : (prevIndex-1))}/>
                    <div style={{transform: `translateX(-${currentIndex * 100}%)` }} className="flex transition-transform duration-500 h-full">
                        {heroImages.map(image => (
                            <div key={image.id} className="w-full h-full shrink-0">
                                
                                <img src={image.src.large2x} alt={image.alt} className="w-full h-full object-cover mask-b-from-50%"/>
                                
                            </div>
                        ))}
                    </div>
                    <FiChevronRight id="rightArrow" className="absolute bg-gray-600 opacity-50 hover:opacity-100 z-30 top-1/2 -translate-y-1/2 right-5 text-6xl transition cursor-pointer focus:p-5"
                        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)}/>
                    
                </div>
                {/**Productos hero */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-6 w-full max-w-7xl mx-auto items-center justify-center gap-3 -mt-20 px-4">
                    {productsImages.slice(0, 8).map((imgProd) => (
                        <div key={imgProd.id} className="bg-white text-black rounded-xl shadow-lg overflow-hidden hover:cursor-pointer hover:bg-amber-300 transition duration-400">
                            <div className="h-48">
                                <img src={imgProd.src.medium} alt={imgProd.alt} loading="lazy" className="w-full h-full object-cover"/>
                            </div>
                            <div className="p-5 flex flex-col gap-2">
                                <h3 className="font-body text-xl font-semibold">Patín Artístico</h3>
                                <p className="font-body text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <h2 className="font-body text-3xl font-bold">89'99€</h2>
                                <span className="flex items-center"><h3 className="font-body"><b>8/10 ·</b></h3>
                                    <img src={star} alt="star" className="w-5 h-full"/><h3 className="font-body">1000 reseñas</h3>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" bg-gray-600 mt-10">
                    
                    <div className="grid w-full max-w-7xl mx-auto items-center justify-center p-8 gap-3">
                        <div className="flex justify-between"><h2 className="text-4xl font-title">Productos más vendidos</h2><h3 className="font-body underline cursor-pointer">Ver más</h3></div>
                        <div className="grid grid-cols-4 gap-3">
                            {productsImages.slice(8,12).map((imgProd) => (
                                <div key={imgProd.id} className="bg-white rounded-xl overflow-hidden hover:cursor-pointer hover:bg-amber-300 transition duration-400">
                                    <div className="h-48">
                                        <img src={imgProd.src.medium} alt={imgProd.alt} loading="lazy" className="w-full h-full object-cover"/> 
                                    </div>
                                    <div className="p-5 flex flex-col gap-2 text-black">
                                        <h3 className="font-body text-xl font-semibold">Patín Agresivo</h3>
                                        <p className="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        <h2 className="font-body text-3xl font-bold">89'99€</h2>
                                        <span className="flex items-center"><h3 className="font-body"><b>8/10 ·</b></h3>
                                            <img src={star} alt="star" className="w-5 h-full"/><h3 className="font-body">1000 reseñas</h3>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/**Grid divs*/}
                <div className="w-full max-w-7xl mx-auto items-center justify-center pt-10">
                    <div className="flex items-center justify-center gap-5">
                        <div className="bg-white grid grid-cols-2 p-8 gap-3 w-1/3">
                            {helmetImages.map(helmet => (
                                <div key={helmet.id} className="bg-white overflow-hidden cursor-pointer ">
                                    <div key={helmet.id} className="h-45">
                                        <img src={helmet.src.medium} loading="lazy" alt={helmet.alt} className="w-full h-full object-cover"/>
                                    </div>
                                    <span className="text-black font-body">Casco</span>
                                </div>
                            ))}
                            <span className="text-blue-500 font-body font-semibold cursor-pointer w-fit hover:underline">Ver más</span>
                        </div>
                        <div className="bg-white grid grid-cols-2 p-8 gap-3 w-1/3">
                            {protectionsImages.map(helmet => (
                                <div key={helmet.id} className="bg-white overflow-hidden cursor-pointer">
                                    <div key={helmet.id} className="h-45">
                                        <img src={helmet.src.medium} loading="lazy" alt={helmet.alt} className="w-full h-full object-cover"/>
                                    </div>
                                    <span className="text-black font-body">Protección</span>
                                </div>
                            ))}
                            <span className="text-blue-500 font-body font-semibold cursor-pointer w-fit hover:underline">Ver más</span>
                        </div>
                        <div className="bg-white grid grid-cols-2 p-8 gap-3 w-1/3">
                            {wheelsImages.map(helmet => (
                                <div key={helmet.id} className="bg-white overflow-hidden cursor-pointer">
                                    <div key={helmet.id} className="h-45">
                                        <img src={helmet.src.medium} loading="lazy" alt={helmet.alt} className="w-full h-full object-cover"/>
                                    </div>
                                    <span className="text-black font-body">Ruedas</span>
                                </div>
                            ))}
                            <span className="text-blue-500 font-body font-semibold cursor-pointer w-fit hover:underline">Ver más</span>
                        </div>
                    </div> 
                </div>

                <div className="grid w-full max-w-7xl mx-auto items-center justify-center p-8 gap-3">
                        <h2 className="grid text-4xl font-title">Productos en Oferta</h2>
                        <div className="grid grid-cols-4 gap-3">
                            {productsImages.slice(12,16).map((imgProd) => (
                                <div key={imgProd.id} className="bg-white rounded-xl overflow-hidden hover:cursor-pointer border hover:bg-amber-300 transition duration-400 relative">
                                    <h3 className="bg-red-500 absolute font-bold font-body p-1 rounded-xl">-50%</h3>
                                    <div className="h-48">
                                        <img src={imgProd.src.medium} loading="lazy" alt={imgProd.alt} className="w-full h-full object-cover"/> 
                                    </div>
                                    <div className="p-5 flex flex-col gap-2 text-black ">
                                        <h3 className="font-body text-xl font-semibold">Patín fitness</h3>
                                        <p className="font-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        <span className="flex items-center gap-3"><h2 className="font-body text-3xl font-bold">44'99€</h2><h3 className="font-body text-xl line-through text-gray-500">89'99€</h3></span>
                                        <span className="flex items-center"><h3 className="font-body"><b>8/10 ·</b></h3>
                                            <img src={star} alt="star" className="w-5 h-full"/><h3 className="font-body">1000 reseñas</h3>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </section>
            {/**Footer section */}
            <footer className="bg-[#17191a] font-body mt-10">
                <div className="w-full max-w-7xl mx-auto items-center p-8">
                    <div id="footerSuperior" className="flex mt-5 justify-between items-center">
                        <div className="flex flex-col gap-5 max-w-80 ">
                            <a href="#logoHome" className="text-4xl font-title hover:text-yellow-500 transition duration-500 w-fit rounded">Prime Roller Skates</a>
                            <h5 className="text-gray-400"><i>La tienda que necesitas para comprar lo que desees, para rodar a gusto y seguro</i></h5>
                        </div>
                        <nav className="flex items-center gap-4">
                            <a href="#logoHome" className="hover:text-gray-400 transition">Inicio</a>
                            <span class="text-gray-600">|</span>
                            <a href="#" className="hover:text-gray-400 transition">Servicios</a>
                            <span class="text-gray-600">|</span>
                            <a href="#" className="hover:text-gray-400 transition">Sobre mi</a>
                            <span class="text-gray-600">|</span>
                            <a href="#" className="hover:text-gray-400 transition">Contacto</a>
                        </nav>
                        <div className="flex gap-7">
                            <a href="https://www.instagram.com/e_nathan7" className="text-2xl hover:text-orange-400 transition"><FiInstagram/></a>
                            <a href="https://www.linkedin.com/in/emilio-haro-aa76bb175/" className="text-2xl hover:text-blue-400 transition"><FaLinkedin /></a>
                            <a href="https://github.com/emilio-devx" className="text-2xl hover:text-purple-400 transition"><FaGithub /></a>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 my-10">
                        <div className="flex-1 h-px bg-white opacity-40"></div>
                    </div>
                    <div id="footerInferior" className="flex mt-5 justify-between">
                        <div className="text-gray-400 flex flex-col gap-3">
                            <h5 className="hover:underline transition cursor-pointer w-fit">Condiciones de Uso y Venta</h5>
                            <h5 className="hover:underline transition cursor-pointer w-fit">Aviso de privacidad</h5>
                            <h5 className="hover:underline transition cursor-pointer w-fit">Área legal</h5>
                            <h5 className="hover:underline transition cursor-pointer w-fit">Cookies</h5>
                        </div>
                        <div>
                            <a href="#logoHome" className="transition duration-300 flex gap-2 text-gray-400 items-center hover:text-white"><IoIosArrowRoundUp className="text-3xl"/>Volver Arriba</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}