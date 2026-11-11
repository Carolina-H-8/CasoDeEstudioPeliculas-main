export default function Header() {
    return (
        <header className="w-full  p-6 text-white flex justify-between items-center px-8 ">
            <h1 className="text-2xl font-bold text-red-500">Mi App</h1>

            <nav>
                <ul className="flex gap-4">
                    <li><a href="#" className="hover:underline">Inicio</a></li>
                    <li><a href="#" className="hover:underline">Películas</a></li>
                </ul>
            </nav>
        </header>
    );
}