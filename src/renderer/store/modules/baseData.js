const state = {
        url: '',//文件保存路径
        file_type: '',//文件格式
    }
;

const getters = {
    url: state => state.url,
    file_type: state => state.file_type,
};

const mutations = {
    mutationsUrl(state, url) {
        state.url = url;
    },
    mutationsFileType(state, file) {
        state.file_type = file;
    },
};
const actions = {
    actionsUrl(context, url) {
        context.commit("mutationsUrl", url)
    },
    actionsFileType(context, file) {
        context.commit("mutationsFileType", file)
    },
};


export default {
    state,
    mutations,
    actions,
    getters
}
