import itemService from '../../services/itemService.js'

export default {
    state: {
        items: null,
        filterBy: null,
        currPlayer: null,
        victoryMsg: 'Choose player',
        gameOver: false,
    },
    getters: {
        items(state) {
            return state.items
        },
        gameOver(state) {
            return state.gameOver
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
            // console.log(items, 'set items')
            state.items = items
        },
        setStartingPlayer(state, { value }) {
            state.victoryMsg = '';
            state.currPlayer = value;
        },
        setVictoryMsg(state, { msg }) {
            state.victoryMsg = msg;
        },
        setGameOver(state, { value }) {
            state.gameOver = value;
        },
        removeItem(state, { id }) {
            const idx = state.items.findIndex((item) => item._id === id)
            state.items.splice(idx, 1)
        },

        saveItem(state, { newItem }) {
            const idx = state.items.findIndex((currItem) => currItem._id === newItem._id)
            if (idx !== -1) state.items[idx] = { ...newItem }
            // console.log(state.items)
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
        async restartGame({ dispatch, commit, state }) {
            try {
                let freshItems = await itemService.restart()
                // console.log(freshItems, 'fresh')
                await dispatch({ type: 'loadItems' })
                commit({ type: 'setItems', items: freshItems })
                commit({ type: 'setGameOver', value: false })
                commit({ type: 'setVictoryMsg', msg: 'Choose player' })
                commit({ type: 'setStartingPlayer', value: '' })

            } catch (err) {
                console.log(err, 'Failed to restart game')
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
        async playTurn({ commit, state }, { item }) {
            try {
                if (state.gameOver) return
                if (item.isX || item.isO) return
                const getItem = await itemService.save(item, state.currPlayer)
                commit({ type: 'saveItem', newItem: getItem })
                const gameOver = itemService.checkGameStatus()
                if (gameOver) {
                    commit({ type: 'setGameOver', value: true })
                    commit({ type: 'setVictoryMsg', msg: gameOver === 'won' ? `${state.currPlayer.toUpperCase()} Won!!!` : 'Game over, Try again' })
                } else {
                    let value = state.currPlayer === 'x' ? 'o' : 'x'
                    commit({ type: 'setStartingPlayer', value })
                }
            } catch (err) {
                console.log('saveItem err', err)
            }
        },
    },
}
