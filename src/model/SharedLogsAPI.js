import * as querystring from "querystring";

export default class SharedLogsAPI {
    constructor(record) {
        for (const prop in record) {
            this[prop] = record[prop]
        }
    }

    static get ID() {
        return "id"
    }

    static get CREATED() {
        return "created"
    }

    static get MODIFIED() {
        return "modified"
    }

    static all(table, params, type, callback) {
        const query = querystring.stringify(params)
        fetch(`${process.env.REACT_APP_API_URL}/${table}?${query}`)
            .then(response => response.json())
            .then(list => {
                list.map((e, i, n) => {
                    n[i] = new type(e)
                    return true
                })
                if (callback && typeof callback === "function") callback(list)
            })
    }

    static get(table, id, params, type, callback) {
        const query = querystring.stringify(params)
        fetch(`${process.env.REACT_APP_API_URL}/${table}/${id}?${query}`)
            .then(response => response.json())
            .then(record => {
                if (callback && typeof callback === "function") callback(new type(record))
            })
    }

    static create(table, params, type, callback) {
        fetch(`${process.env.REACT_APP_API_URL}/${table}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(record => {
                if (callback && typeof callback === "function") callback(new type(record))
            })
    }

    static update(table, params, type, callback) {
        fetch(`${process.env.REACT_APP_API_URL}/${table}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(record => {
                if (callback && typeof callback === "function") callback(new type(record))
            })
    }

    static delete(table, id, type, callback) {
        fetch(`${process.env.REACT_APP_API_URL}/${table}/${id}`, { method: "delete" })
            .then(response => response.json())
            .then(record => {
                if (callback && typeof callback === "function") callback(new type(record))
            })
    }
}