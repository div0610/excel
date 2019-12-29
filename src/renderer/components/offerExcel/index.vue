<template>
  <div>
    <div>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="handchange"
              :show-file-list="false"
              :auto-upload="false"
              multiple
              :file-list="domFileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__text" style="color: #F56C6C">提示：此处为酷家乐输出的报价清单</div>
            </el-upload>

          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="handchange"
              :show-file-list="false"
              :auto-upload="false"
              multiple
              :file-list="domFileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__text" style="color: #F56C6C">提示：此处为工件清单</div>
            </el-upload>

          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on- ="handchange"
              :show-file-list="false"
              :auto-upload="false"
              multiple
              :file-list="domFileList">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__text" style="color: #F56C6C">提示：此处为ERP物料对照表</div>
            </el-upload>

          </el-card>
        </el-col>
      </el-row>
      <!--        <el-form :label-position="labelPosition" label-width="80px">-->
      <el-form label-width="40px" style="margin-top: 10px">
        <el-form-item label="名称">
          <el-row>
            <el-col :span="1">
              <el-tooltip :content=content placement="bottom" effect="light">
                <i class="el-icon-question" content="Top center" placement="top"></i>
              </el-tooltip>
            </el-col>
            <el-col :span="23">
              <el-input v-model="name" placeholder="请输入文件后缀名称"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="margin-top: 10px">
        <el-button type="success" size="mini" @click="onFix">修复</el-button>
        <el-button size="mini" type="warning" @click="handleRemove(false,0)">重置</el-button>
        <el-badge :value="num" class="item" style="margin-left: 10px">
          <el-button size="mini" @click="goFix">修复记录</el-button>
        </el-badge>
      </div>
      <div v-if="domFileList.length>0">
        <el-scrollbar style="height: 200px">
          <ul class="el-upload-list el-upload-list--text">
            <li tabindex="0" class="el-upload-list__item is-fail el-list-enter-to">
              <el-row>
                <el-col :span="12">文件名</el-col>
                <el-col :span="12">文件路径</el-col>
              </el-row>
            </li>
            <li tabindex="0" class="el-upload-list__item is-fail el-list-enter-to"
                v-for="(item,index) in domFileList">
              <a
                class="el-upload-list__item-name">
                <el-row>
                  <el-col :span="12"><i class="el-icon-document"></i>
                    {{item.raw.name}}
                  </el-col>
                  <el-col :span="12">{{item.raw.path}}</el-col>
                </el-row>
              </a>
              <label class="el-div-success" v-if="item.fag">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label>
              <label class="el-div-close" v-else>
                <i class="el-icon-close" @click="handleRemove(true,index)"></i>
              </label>

            </li>

          </ul>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import fs from 'fs';
    import path from 'path';
    import xlsx from 'node-xlsx';
    import moment from 'moment';

    export default {
        name: "index",
        data() {
            return {
                labelPosition: 'right',
                content: '修复后的文件名称示例：原文件为：工件清单.xls。输入的内容为1。修复后文件名为：工件清单_1.xls',
                name: '',
                fileContents: {},
                num: 0,
                domFileList: []
            };
        },
        computed: {
            ...mapState({
                fileList: state => state.FixObj.files.fix,
                count: state => state.FixObj.files.count,
                fileName: state => state.FixObj.files.name,
            }),

        },

        created() {
            this.fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../Log.json'), 'utf8'));
            this.num = this.fileContents.fix.length;
            this.name = this.fileName;
            this.add()

        },
        methods: {
            add: function () {
                this.domFileList = this.fileList
            },
            handleRemove(fag, index) {
                if (fag) {
                    this.domFileList.splice(index, 1);
                } else {
                    if (this.domFileList.length > 0) {
                        this.$confirm('此操作将删除所有文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.domFileList = [];
                            this.$store.dispatch('actionsFileListFix', []);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '你还没有添加文件'
                        });
                    }
                }
            },

            handchange(file, files) {
                file["fag"] = false;
                this.domFileList = files;
                // this.$store.dispatch('actionsFileListFix', files);
            },
            onFix() {
                if (this.domFileList.length === 0) {
                    this.$message({
                        type: 'error',
                        message: '至少需要选择一个文件'
                    });
                    return
                }
                if (this.name === '') {
                    this.$message({
                        type: 'error',
                        message: '请输入文件的后缀名称'
                    });
                    return;
                } else {
                    this.$store.dispatch('actionsFileListName', this.name);
                }
                var fg = false;
                var datas;
                // Mac地址：/Users/Desktop/App/build/APP.app/Contents/Resources/app.asar/dist/electron
                // C:\Users\Administrator\Desktop\win-ia32-unpacked(5)\win-ia32-unpacked\resources\app.asar\dist\electron


                for (var f = 0; f < this.domFileList.length; f++) {
                    if (!this.domFileList[f].fag) {
                        let log = {};
                        log.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                        log.name = this.domFileList[f].raw.name;
                        log.status = 1;
                        log.type = '工件修复';
                        this.fileContents.fix.splice(0, 0, log);
                        var sheets = xlsx.parse(this.domFileList[f].raw.path);
                        var data = sheets[0].data;
                        data[0].splice(0, 0, 'FIdentifyCode', 'FHierarchy');
                        data[1].splice(0, 0, '识别码', '层级');
                        data[0].splice(data.length, 0, 'FIsPacking', 'FIsPicking', 'FRemark');
                        data[1].splice(data.length, 0, '是否扫描包装', '是否领料', '备注');
                        for (let i = 2; i < data.length; i++) {
                            let FIdentifyCode = 0;
                            if (data[i][23] === undefined) {
                                FIdentifyCode = '';
                            } else {
                                FIdentifyCode = parseInt(data[i][23].substring(data[i][23].indexOf('_') + 1, data[i][23].length)) + 1;
                            }
                            if (data[i][1] === 0 || data[i][1] === undefined) {//当子部件ID为0时代表层级为1，非0为2
                                data[i].splice(0, 0, FIdentifyCode, 1);
                            } else {
                                data[i].splice(0, 0, FIdentifyCode, 2);
                            }
                            console.log(data[i].length)
                            if (data[i][24] === '柜体') {//当工件类别为柜体时，是否扫描包装为：1，工件类别为其他，是否扫描包装为：0
                                data[i].splice(data[i].length, 0, '1', '1', '');
                            } else {
                                data[i].splice(data[i].length, 0, '0', '1', '');
                            }
                        }
                        //将经过处理的数据写入新的xlsx文件中
                        const buffer = xlsx.build([
                            {
                                name: sheets[0].name,
                                data: sheets[0].data,
                            }
                        ]);
                        var fileName = this.domFileList[f].raw.name;
                        fileName = fileName.substring(0, fileName.indexOf('.'));
                        var paths = this.$store.state.baseData.url;
                        fileName = fileName + '_' + this.fileName + '.' + this.$store.state.baseData.file_type;
                        fs.writeFileSync(paths + '/' + fileName, buffer, {'flag': 'w'});
                        this.domFileList[f].fag = true;
                        this.num++;
                        fg = true
                    }
                }
                if (fg) {
                    this.$message({
                        type: 'success',
                        message: '修复完毕'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '你要修复的文件在哪里？？？'
                    });
                }
                var fileContentsData = JSON.stringify(this.fileContents);
                fs.writeFile(path.join(__dirname, '../../../Log.json'), fileContentsData, function (error) {
                    if (error) {

                    } else {
                        console.log('写入成功了')
                    }
                })
                // this.$store.dispatch('actionsFileListFix', this.fileList);
            },
            goFix() {
                this.$router.push('/fixlog/first');
                this.$store.dispatch('actionsFileListFix', this.domFileList);
                this.$store.dispatch('actionsFileListCount', this.num);
                this.$store.dispatch('actionsFileListName', this.name);
            }
        }
    }
</script>

<style scoped>
  .el-upload-dragger {
    /*width: 20px !important;*/
  }
</style>
