export default {
    query,
    getById,
    save,
    checkGameStatus,
    restart
}

let items = [
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

function restart() {
    items = [
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

    return new Promise((resolve, reject) => {
        resolve(items)
    })
}

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
        return 'won'
    else if (items[3].isX && items[4].isX && items[5].isX)
        return 'won'
    else if (items[6].isX && items[7].isX && items[8].isX)
        return 'won'
    else if (items[0].isX && items[3].isX && items[6].isX)
        return 'won'
    else if (items[1].isX && items[4].isX && items[7].isX)
        return 'won'
    else if (items[2].isX && items[5].isX && items[8].isX)
        return 'won'
    else if (items[0].isX && items[4].isX && items[8].isX)
        return 'won'
    else if (items[2].isX && items[4].isX && items[6].isX)
        return 'won'
    else if (items[0].isO && items[1].isO && items[2].isO)
        return 'won'
    else if (items[3].isO && items[4].isO && items[5].isO)
        return 'won'
    else if (items[6].isO && items[7].isO && items[8].isO)
        return 'won'
    else if (items[0].isO && items[3].isO && items[6].isO)
        return 'won'
    else if (items[1].isO && items[4].isO && items[7].isO)
        return 'won'
    else if (items[2].isO && items[5].isO && items[8].isO)
        return 'won'
    else if (items[0].isO && items[4].isO && items[8].isO)
        return 'won'
    else if (items[2].isO && items[4].isO && items[6].isO)
        return 'won'
    // else if (items.every(item => {
    //    if(item.isX || item.isO)
    // }))
    else if (items.every(item =>
        item.isX || item.isO
    ))
        return 'tie'
}

function _updateItem(item, player) {
    // console.log(item, player, 'item')
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
        // console.log(items, 'service')
        resolve(newItem)
    })
}

function save(item, player) {
    return item._id ? _updateItem(item, player) : _addItem(item)
}

