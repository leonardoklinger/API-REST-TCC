const AdminModel = require("../model/Administrado.Model")

class usuarioRepository {
    buscarLog = async (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await AdminModel.findById({ _id: _id })
                resolve(dados)
            } catch (error) {
                reject(error)
            }
        })
    }

    cadastrarLog = async (_id, log) => {
        const cadastrarLog = new AdminModel({
            _id: _id,
            logs: log,
        })

        return new Promise(async (resolve, reject) => {
            try {
                await cadastrarLog.save()
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    updateLog = async (_id, log) => {
        return new Promise(async (resolve, reject) => {
            try {
                await AdminModel.updateOne({ _id: _id }, { $push:{ logs: log } })
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new usuarioRepository()