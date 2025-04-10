import { Document } from "mongoose"

interface IUserRepository{
    findByUsername(username):Document
    create(userData):Promise<Document>
}

export default IUserRepository