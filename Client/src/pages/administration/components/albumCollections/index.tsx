import { Fragment, useEffect, useState } from "react";
import styleCSS from '../../index.module.css'
import { ModalContainer } from "../../../../components/PopupModal";
import { usePaginate } from "../../../../hooks/usePaginate";
import { useFormCustom } from "../../../../Hooks/useFormCustom";
import { InputsMockColeccion } from "./mocks/InputsColeccion";
import { Input } from "../../../../components/Input";
import { IInputs } from "../../../../components/Input/IInputs";
import { ICreateCollectionDto } from "../../interface/frontToBack/ICreateCollection.dto";
import { IAlbumCollectionModels } from "../../../../interface/models/IAlbumCollection.models";
import { useAppStore } from "../../../appStore";
import { useAdministrationStore } from "../../store";
// import appStore from "../../../appStore";

export const Collection: React.FC = () => {

    const appStore = useAppStore()
    const store = useAdministrationStore()

    const [statusAction, setStatusAction] = useState({ action: "", idColeccion: '' })

    const { form, handleChange, resetForm, setForm } = useFormCustom<ICreateCollectionDto>({
        title: ""
    });


    //METODOS
    const createCollection = async (event: any) => {
        event.preventDefault();

        const isCreate = await store.actions.createCollection(form)

        if (!isCreate) return
        await getAll();
        appStore.actions.setShowPopup(false)
        resetForm()
    };

    const getAll = async (page: number = 1) => {
        await appStore.actions.getAllAlbumCollections({ page })
    };

    const showPopupCreateCollection = () => {
        setForm({ title: "" })
        setStatusAction({
            action: "add",
            idColeccion: ''
        })
        appStore.actions.setShowPopup(true)
    }

    const showPopupUpdateCollection = (ColeccionAlbumes: IAlbumCollectionModels) => {
        setForm({ title: ColeccionAlbumes.title })
        setStatusAction({
            action: "update",
            idColeccion: ColeccionAlbumes.id
        })
        appStore.actions.setShowPopup(true)
    }

    const updateCollection = async (event: any) => {


    };

    const deleteCollection = async (id: string) => {

        const isDelete = await store.actions.deleteCollection(id)
        if (!isDelete) return
        await getAll();
    };

    useEffect(() => {
        getAll();
    }, []);


    return (

        <Fragment>

            <table className={`${styleCSS.tableContainer}`} border={1}>
                <thead>
                    <tr>
                        <th>Selcciona la opcion deseada</th>
                        <th>
                            <button className={`${styleCSS.button}`} onClick={showPopupCreateCollection}>
                                Agregar coleccion
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        appStore.state.collection?.map((albumCollection: IAlbumCollectionModels, indexColeccion: number) => (
                            <tr key={indexColeccion}>
                                <th>{albumCollection.title}</th>
                                <th>
                                    <button className={`${styleCSS.buttonAdmin}`} onClick={
                                        () => showPopupUpdateCollection(albumCollection)
                                    }>Modificar</button>
                                    <button
                                        className={`${styleCSS.buttonAdmin}`}
                                        onClick={() => deleteCollection(albumCollection.id)}
                                    >
                                        Eliminar
                                    </button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <ModalContainer personCss={`${styleCSS.containerModalColeccion}`}>

                <p onClick={() => { appStore.actions.setShowPopup(false) }}
                    className={styleCSS.containerModalColeccion__closeBtn}
                >
                    <i className="fas fa-times"></i>
                </p>

                <h1>{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</h1>

                <form onSubmit={statusAction.action === 'add' ? createCollection : updateCollection} >

                    {InputsMockColeccion.map((inputProps: IInputs, index: number) => (
                        <Input
                            key={index}
                            inputProps={inputProps}
                            value={form[inputProps.name]}
                            handleChange={handleChange}
                            errorMessage={inputProps.errorMessage}
                            pattern={inputProps.expReg}
                        />
                    ))}

                    <button type="submit">{statusAction.action === 'add' ? 'Crear' : 'Actualizar'}</button>
                </form>

            </ModalContainer>
        </Fragment >

    )
}