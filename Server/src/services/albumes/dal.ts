import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPage } from "../../interface/IPage"
import { IAlbumSchema } from "../../models/collections/Albumes"
import { IPurchasedAlbumSchema } from "../../models/collections/PurchasedAlbumes"
import collections from "../../models/index.models"
import { ApplicationError } from "../../utils/applicationError"
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"


const createAlbum = async (payload: ICreateAlbumDto): Promise<IAlbumSchema> => {
    try {
        return await collections.Albumes.create({
            collectionAlbum: new Types.ObjectId(payload.idCollection),
            image: payload.image,
            title: payload.title
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear un Album', source: error })
    }
}

const findAlbum = async (field: string, value: string): Promise<IAlbumSchema | null> => {
    try {
        return await collections.Albumes.findOne({ [field]: value })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar este Album', source: error })
    }
}

const getListAlbumes = async ({ page, filterText }: IPage): Promise<PaginateResult<IAlbumSchema>> => {
    try {
        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: 'figurites'
        }
        const query: FilterQuery<IAlbumSchema> = {
            ...(filterText !== '' && {
                title: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.Albumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

const deleteAlbum = async (payload: string): Promise<any> => {
    try {
        return await collections.Albumes.deleteById(payload)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    }
}

const updateAlbum = async (payload: IUpdateAlbumDto): Promise<IAlbumSchema | null> => {
    try {
        return await collections.Albumes.findByIdAndUpdate(payload.id, {
            title: payload.title,
            image: payload.image,
            collectionAlbum: new Types.ObjectId(payload.idCollection)
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al actualziar este album', source: error })
    }
}

const findPurchasedAlbum = async (payload: IBuyAlbumDto): Promise<IPurchasedAlbumSchema | null> => {
    try {
        return await collections.PurchasedAlbumes.findOne({
            album: payload.idAlbum,
            user: payload.idUsuario
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al verificar la compra del Album', source: error })
    }
}

const buyAlbum = async (payload: IBuyAlbumDto): Promise<IPurchasedAlbumSchema> => {
    try {
        return await collections.PurchasedAlbumes.create({
            album: new Types.ObjectId(payload.idAlbum),
            user: new Types.ObjectId(payload.idUsuario)
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al comprar este Album', source: error })
    }
}

export default {
    createAlbum,
    findAlbum,
    getListAlbumes,
    deleteAlbum,
    updateAlbum,
    findPurchasedAlbum,
    buyAlbum
}