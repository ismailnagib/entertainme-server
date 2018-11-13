const axios = require('axios')
const redisClient = require('redis').createClient()

module.exports = {
    
    showAll () {
        return new Promise((resolve, reject) => {
            redisClient.get('movie-all', (err, data) => {
                if (err) {
                    reject(err.response.data)
                } else if (data) {
                    resolve(JSON.parse(data))
                } else {
                    axios({
                        url: 'http://localhost:3001'
                    })
                    .then(({ data }) => {
                        if (data.data) {
                            redisClient.set('movie-all', JSON.stringify(data.data), 'EX', 3600)
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
                url: `http://localhost:3001/${id}`
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
                url: `http://localhost:3001`,
                method: 'post',
                data: input
            })
            .then(({ data }) => {
                redisClient.del('movie-all')
                resolve([data.data])
            })
            .catch(err => {
                reject(err.response.data)
            })
        })
    },

    filter (req, res) {
        axios({
            url: `http://localhost:3001/filter`,
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

    update (changes) {
        return new Promise((resolve, reject) => {
            const { id, ...rest } = changes
            axios({
                url: `http://localhost:3001/${id}`,
                method: 'put',
                data: rest
            })
            .then(({ data }) => {
                redisClient.del('movie-all')
                resolve(data)
            })
            .catch(err => {
                reject(err.response.data)
            })
        })
    },

    remove (req, res) {
        axios({
            url: `http://localhost:3001/${req.params.id}`,
            method: 'delete',
        })
        .then(({ data }) => {
            redisClient.del('movie-all')
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err.response.data)
        })
    }
}