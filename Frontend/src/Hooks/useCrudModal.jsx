import { useState } from "react";


export function useCrudModal({onAdd,onEdit,onRemove,entityLabel="registros"}){
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [selectedItem,setSelectedItem]=useState(null)

    const handleOpenCreate=()=>{
        setSelectedItem(null)
        setIsModalOpen(true)
    }

    const handleOpenEdit = (item)=>{
        setSelectedItem(item);
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleSave = async (data) => {
        if (selectedItem) {
            const id = selectedItem.id || selectedItem._id;
            if (!id) return false;
            return await onEdit(id, data);
        }
        return await onAdd(data);
    };

    const handleDelete = async (item) => {
        const id = item?.id || item?._id;
        if (!id) return;

        const itemName = item.names || item.name || "";
        const confirmed = window.confirm(
            `¿Estás seguro de eliminar ${entityLabel} "${itemName}"?`
        );
        if (!confirmed) return;

        await onRemove(id);
    };
    return {
        isModalOpen,
        selectedItem,
        handleOpenCreate,
        handleOpenEdit,
        handleClose,
        handleSave,
        handleDelete,
    };


}