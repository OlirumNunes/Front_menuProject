import { useEffect, useState } from "react";
import { MenuData } from '../../interface/MenuData';
import { useMenuDataMutate } from "../../hooks/useMenuDataMutate";

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: string | number): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                value={value}
                onChange={event => updateValue(event.target.value)}
            >
            </input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useMenuDataMutate();

    const submit = () => {
        const menuData: MenuData = {
            title,
            price,
            image
        }
        mutate(menuData);
    }

    useEffect(() => {
        if (!isSuccess) return
        closeModal();
    }, [closeModal, isSuccess])//ponto de atencao aqui;

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Add a new item in the menu</h2>
                <form className="input-container">
                    <Input
                        label="title"
                        value={title}
                        updateValue={(value: string | number) => setTitle(String(value))}
                    />
                    <Input
                        label="price"
                        value={price}
                        updateValue={(value: string | number) => setPrice(Number(value))}
                    />
                    <Input
                        label="image"
                        value={image}
                        updateValue={(value: string | number) => setImage(String(value))}
                    />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'posting...' : 'post'}
                </button>
            </div>
        </div>
    )
}