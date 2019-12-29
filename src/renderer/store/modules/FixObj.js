const state = {
  files: {//当前操作的文件对象
    'fix': [//修复的文件对象
      // {
      //     'fag': true,
      //     'name': '',
      //     'percentage': 0,
      //     'raw': {},
      //     'size': 0,
      //     'status': '',
      //     'uid': 0,
      // }
    ],
    'count': 0,//修复记录值
    'name': ''
  },
};
const getters = {
  files: state => state.files,
};
const mutations = {
  mutationsFiles(state, files) {
    state.files = files;
  },
  mutationsFileListFix(state, list) {
    state.files.fix = list;
  },
  mutationsFileListCunt(state, count) {
    state.files.count = count;
  },
  mutationsFileListName(state, name) {
    state.files.name = name;
  }
};
const actions = {
  actionsFileListFix(context, file) {
    context.commit("mutationsFileListFix", file)
  },
  actionsFileListCount(context, count) {
    context.commit("mutationsFileListCunt", count)
  },
  actionsFileListName(context, name) {
    context.commit("mutationsFileListName", name)
  }
};


export default {
  state,
  mutations,
  actions,
  getters
}
