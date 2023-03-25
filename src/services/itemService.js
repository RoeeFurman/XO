export default {
    query,
    getById,
    remove,
    save,
    getEmptyItem,
    checkGameStatus
    // playTurn
}

const items = [
    {
        "isX": false,
        "isO": false,
        _id: 1
    },
    {
        "isX": false,
        "isO": false,
        _id: 2
    },
    {
        "isX": false,
        "isO": false,
        _id: 3
    },
    {
        "isX": false,
        "isO": false,
        _id: 4
    },
    {
        "isX": false,
        "isO": false,
        _id: 5
    },
    {
        "isX": false,
        "isO": false,
        _id: 6
    },
    {
        "isX": false,
        "isO": false,
        _id: 7
    },
    {
        "isX": false,
        "isO": false,
        _id: 8
    },
    {
        "isX": false,
        "isO": false,
        _id: 9
    }
];

// function sort(arr) {
//     return arr.sort((a, b) => {
//         if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//             return -1;
//         }
//         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//             return 1;
//         }

//         return 0;
//     })
// }

function query(filterBy = null) {
    return new Promise((resolve, reject) => {
        var itemsToReturn = items;
        if (filterBy && filterBy.term) {
            itemsToReturn = filter(filterBy.term)
        }
        resolve(itemsToReturn)
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        const item = items.find(item => item._id === id)
        item ? resolve(item) : reject(`Item id ${id} not found!`)
    })
}

function checkGameStatus() {
    if (items[0].isX && items[1].isX && items[2].isX)
        return true
    if (items[3].isX && items[4].isX && items[5].isX)
        return true
    if (items[6].isX && items[7].isX && items[8].isX)
        return true
    if (items[0].isX && items[3].isX && items[6].isX)
        return true
    if (items[1].isX && items[4].isX && items[7].isX)
        return true
    if (items[2].isX && items[5].isX && items[8].isX)
        return true
    if (items[0].isX && items[4].isX && items[8].isX)
        return true
    if (items[2].isX && items[4].isX && items[6].isX)
        return true
    if (items[0].isO && items[1].isO && items[2].isO)
        return true
    if (items[3].isO && items[4].isO && items[5].isO)
        return true
    if (items[6].isO && items[7].isO && items[8].isO)
        return true
    if (items[0].isO && items[3].isO && items[6].isO)
        return true
    if (items[1].isO && items[4].isO && items[7].isO)
        return true
    if (items[2].isO && items[5].isO && items[8].isO)
        return true
    if (items[0].isO && items[4].isO && items[8].isO)
        return true
    if (items[2].isO && items[4].isO && items[6].isO)
        return true
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const index = items.findIndex(item => item._id === id)
        if (index !== -1) {
            items.splice(index, 1)
        }

        resolve(items)
    })
}

function _updateItem(item, player) {
    console.log(item, player, 'item')
    return new Promise((resolve, reject) => {
        const index = items.findIndex(c => item._id === c._id)
        let newItem = {};
        if (index !== -1) {
            newItem = {
                ...item,
                isX: player === 'x',
                isO: player === 'o',
            }
            items[index] = newItem
        }
        console.log(items, 'service')
        resolve(newItem)
    })
}

function _addItem(item) {
    return new Promise((resolve, reject) => {
        item._id = _makeId()
        items.push(item)
        resolve(item)
    })
}

function save(item, player) {
    return item._id ? _updateItem(item, player) : _addItem(item)
}

// to UPDATE
function getEmptyItem() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function filter(term) {
    term = term.toLocaleLowerCase()
    return items.filter(item => {
        return item.name.toLocaleLowerCase().includes(term) ||
            item.phone.toLocaleLowerCase().includes(term) ||
            item.email.toLocaleLowerCase().includes(term)
    })
}
