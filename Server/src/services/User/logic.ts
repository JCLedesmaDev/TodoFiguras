import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"
import { ILoginDto } from "./dto/frontToBack/ILogin.dto"
import bcrypt from "../../utils/bcryptPassword"
import responseMessage from "../../utils/responseMessage"
import mapper from './mapper.dto'
import { IAuthDto } from "./dto/backToFront/IAuth.dto"
import { IRegisterDto } from "./dto/frontToBack/IRegister.dto"

const loginUser = async (payload: ILoginDto) => {
    try {

        const user = await externalDb.getUserByField('email', payload.email);

        if (user === null) {
            throw new ApplicationError('Usuario inexistente. Intentelo nuevamente');
        }

        const comparePassword = await bcrypt.compare(user.password, payload.password)

        if (!comparePassword) {
            throw new ApplicationError('Contraseña incorrecta. Intentelo nuevamente')
        }

        const userMapper: IAuthDto = await mapper.singleUserAuth(user)

        return responseMessage.success<IAuthDto>(
            'Ha iniciado sesion correctamente!', userMapper
        )

    } catch (error) {
        throw new ApplicationError("Ocurrio un error al querer iniciar sesion.", error);
    }
}

const registerUser = async (payload: IRegisterDto) => {
    try {

        // const user = await externalDb.getUserByField('email', payload.email);

        // if (user === null) {
        //     throw new ApplicationError('Usuario inexistente. Intentelo nuevamente');
        // }

        // const comparePassword = await bcrypt.compare(user.password, payload.password)

        // if (!comparePassword) {
        //     throw new ApplicationError('Contraseña incorrecta. Intentelo nuevamente')
        // }

        // const userMapper:IAuthDto = await mapper.singleUserAuth(user)

        // return responseMessage.success<IAuthDto>(
        //     'Ha iniciado sesion correctamente!', userMapper
        // )

    } catch (error) {
        throw new ApplicationError("Ocurrio un error al querer registrarse.", error);
    }
}

export default {
    loginUser,
    registerUser
}