import PageInfo from "../Components/PageInfo";
import Search from "../Components/Search";
import DataTable from "../Components/DataTable";
import MediaRow from "../Components/MediaRow";
import MediaModal from "../Components/MediaModal";
import ButtonAdd from "../Components/ButtonAdd";
import { useMediaPage } from "../Hooks/useMediaPage";

const COLUMNS = [
    { key: "title", label: "PÓSTER & TÍTULO" },
    { key: "serial", label: "SERIAL ÚNICO" },
    { key: "type", label: "TIPO" },
    { key: "genre", label: "GÉNERO" },
    { key: "director", label: "DIRECTOR PRINCIPAL" },
    { key: "company", label: "PRODUCTORA" },
    { key: "year", label: "AÑO" },
    { key: "actions", label: "ACCIONES" },
];

export default function Media() {

    const { filteredMedia, loading, error, catalogs, filters, modal } = useMediaPage();


    return (
        <div className="w-full max-w-7xl flex flex-col  ">
            <main className="w-full flex flex-col gap-8">
                <PageInfo
                    title={"REPOSITORIO DIGITAL INSTITUCIONAL"}
                    name={"Gestión de Media"}
                    text={
                        "Catálogo audiovisual de películas, series y producciones académicas de la IU Digital de Antioquia."
                    }
                />
                <Search
                    placeholder="Buscar por título, serial, director..."
                    value={filters.searchTerm}
                    onChange={(e) => filters.setSearchTerm(e.target.value)}
                    generos={catalogs.generos}
                    tipos={catalogs.tipos}
                    selectedGenre={filters.selectedGenre}
                    selectedType={filters.selectedType}
                    onGenreChange={filters.setSelectedGenre}
                    onTypeChange={filters.setSelectedType}
                >
                    <ButtonAdd onClick={modal.handleOpenCreate} label="Nueva Produccion" />
                </Search>
                {loading && (
                    <p className="text-Neutral-50 text-center">
                        Cargando producciones.....
                    </p>
                )}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                        Error: {error}
                    </div>
                )}
                {!loading && !error && (
                    <DataTable
                        data={filteredMedia}
                        columns={COLUMNS}
                        renderRow={(item) => (
                            <MediaRow
                                key={item.id}
                                media={item}
                                onEdit={modal.handleOpenEdit}
                                onDelete={modal.handleDelete}
                            />
                        )}
                        label="producciones registradas"
                    />
                )}
            </main>
            <MediaModal
                key={modal.selectedItem?.id || "new"}
                isOpen={modal.isModalOpen}
                onClose={modal.handleClose}
                onSave={modal.handleSave}
                item={modal.selectedItem}
                tipos={catalogs.tipos}
                generos={catalogs.generos}
                directores={catalogs.directores}
                productoras={catalogs.productoras}
            />
        </div>
    );
}
