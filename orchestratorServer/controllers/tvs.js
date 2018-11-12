const axios = require('axios')
const redisClient = require('redis').createClient()

module.exports = {
    
    showAll () {
        return new Promise((resolve, reject) => {
            redisClient.get('tvs-all', (err, data) => {
                if (err) {
                    reject(err.response.data)
                } else if (data) {
                    resolve(JSON.parse(data))
                } else {
                    axios({
                        url: 'http://localhost:3002'
                    })
                    .then(({ data }) => {
                        if (data.data) {
                            redisClient.set('tvs-all', JSON.stringify(data.data), 'EX', 3600)
                        }
                        resolve(data.data)
                    })
                    .catch(err => {
                        reject(err.response.data)
                    })
                }
            })
        })
    },

    showOne (id) {
        return new Promise((resolve, reject) => {
            axios({
                url: `http://localhost:3002/${id}`
            })
            .then(({ data }) => {
                resolve([data.datum])
            })
            .catch(err => {
                reject(err.response.data)
            })
        })
    },

    create (input) {
        return new Promise((resolve, reject) => {
            axios({
                url: `http://localhost:3002`,
                method: 'post',
                data: input
            })
            .then(({ data }) => {
                redisClient.del('tvs-all')
                resolve([data.data])
            })
            .catch(err => {
                reject(err.response.data)
            })
        })
    },

    filter (req, res) {
        axios({
            url: `http://localhost:3002/filter`,
            method: 'post',
            data: req.body
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    update (req, res) {
        axios({
            url: `http://localhost:3002/${req.params.id}`,
            method: 'put',
            data: req.body
        })
        .then(({ data }) => {
            redisClient.del('tvs-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    },

    remove (req, res) {
        axios({
            url: `http://localhost:3002/${req.params.id}`,
            method: 'delete',
        })
        .then(({ data }) => {
            redisClient.del('tvs-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    }
}