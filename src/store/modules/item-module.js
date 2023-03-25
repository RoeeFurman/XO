import itemService from '../../services/itemService.js'

export default {
    state: {
        items: null,
        filterBy: null,
        currPlayer: null,
        victoryMsg: 'game on',
    },
    getters: {
        items(state) {
            return state.items
        },
        currPlayer(state) {
            return state.currPlayer
        },
        victoryMsg(state) {
            return state.victoryMsg
        },
    },
    mutations: {
        setItems(state, { items }) {
            state.items = items
        },
        setStartingPlayer(state, { value }) {
            state.currPlayer = value;
        },
        setVictoryMsg(state, { msg }) {
            state.victoryMsg = msg;
        },
        removeItem(state, { id }) {
            const idx = state.items.findIndex((item) => item._id === id)
            state.items.splice(idx, 1)
        },
        saveItem(state, { newItem }) {
            // console.log(newItem, 'itemmm')
            const idx = state.items.findIndex((currItem) => currItem._id === newItem._id)
            // console.log(state.items[idx], 'before splice')
            if (idx !== -1) state.items[idx] = { ...newItem }
            // state.items.splice(idx, 1, newItem)
            // console.log(state.items[idx], 'after')
            console.log(state.items)
            // else state.items.push(item)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {

        async loadItems({ commit, state }) {
            try {
                const items = await itemService.query(state.filterBy)
                commit({ type: 'setItems', items })
            } catch (err) {
                console.log('loadItems err', err);
            }
        },
        async removeItem({ commit }, { id }) {
            try {
                const item = await itemService.remove(id)
                commit({ type: 'removeItem', id })

            } catch (err) {
                console.log('removeItem err', err);
            }
        },
        // async saveItem({ commit }, { item }) {
        //     try {
        //         const getItem = await itemService.save(item)
        //         // console.log(getItem, 'get')
        //         commit({ type: 'saveItem', newItem: getItem })
        //         newI
        //     } catch (err) {
        //         console.log('saveItem err', err);
        //         newI
        //     }
        // },
        async playTurn({ commit, state }, { item }) {
            try {
                const getItem = await itemService.save(item, state.currPlayer)
                console.log(getItem, 'get')
                commit({ type: 'saveItem', newItem: getItem })
                let value = state.currPlayer === 'x' ? 'o' : 'x'
                commit({ type: 'setStartingPlayer', value })
                const msg = itemService.checkGameStatus()
                commit({ type: 'setVictoryMsg', msg })
            } catch (err) {
                console.log('saveItem err', err)
            }
        },
        filter({ commit, dispatch }, { filterBy }) {
            // itemService.query(filterBy).then((items) => {
            //   commit({type: 'setItems', items});
            // });
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadItems' });
        },
    },
}
