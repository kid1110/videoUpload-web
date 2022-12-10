export default {
    state: {
        isCollapse: false
    },
    mutations: {
        isCollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}
