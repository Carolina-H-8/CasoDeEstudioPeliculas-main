export default function Header({ activeTab, onNavigate }) {
    const tabs =[
        "Media",
        "Generos",
        "Directores",
        "Productoras",
        "Tipos"
    ]
    return (
        <header className="w-full pt-4 text-white ">
            <section className="w-full h-14 flex justify-between ">
                <div className="flex gap-2 items-center text-Neutral-50" >
                    <img src="src/assets/Background.svg" alt="Media Icon" />
                    <p className="font-semibold text-lg font-Jakarta">IU Digital </p>
                    <p className="font-light">Cinema Admin</p>
                </div>
            </section>

            <nav className="w-full h-12 flex items-center font-Inter">
                <ul className="flex gap-4 text-sm font-bold text-Neutral-50 ">
                    {tabs.map((tab)=>(
                    <li key={tab}>
                        <button
                            type="button"
                            onClick={() => onNavigate(tab)}
                            className={`Focus ${activeTab === tab
                                    ? "text-emerald-400 bg-Neutral-2"
                                    : "hover:text-emerald-400 "
                                }`}
                        >
                            {tab}
                        </button>
                    </li>

                    ))}
                </ul>
            </nav>
        </header>
    );
}