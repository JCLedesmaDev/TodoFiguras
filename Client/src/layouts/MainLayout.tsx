import { useEffect } from "react"
import { Outlet, useNavigation, useParams } from "react-router-dom"
import { Navigate } from "../components/Navigate/Navigate"
import { SpinnerModal } from "../components/SpinnerModal/SpinnerModal"

export const MainLayout: React.FC = () => {

    const navigation = useNavigation()
    /* Devuelve el estado de la navegacion actual
        - idle, submitting, loading
    */
    // useParams()

    // useEffect(()=> {
    //     if(store.state.user) 
    // }, [])

    return (
        <>
            <Navigate />

            <main>
                {navigation.state === 'loading' && (
                    <h1>Cargando pagina... Espere</h1>
                )}

                {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
                <Outlet />
            </main>
            <SpinnerModal />
            <footer>Foooter</footer>
        </>
    )
}