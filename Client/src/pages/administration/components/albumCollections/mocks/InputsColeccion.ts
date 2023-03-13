import { IInputs } from "../../../../../components/Input/IInputs";

export const InputsMockColeccion: IInputs[] = [
    {
        placeholder: "Titulo de la coleccion: ",
        type: "text",
        name: "title",
        expReg: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{2,40}$/i,
        errorMessage: "Solo puede contener letras. Minimo 2 caracteres",
    }
];