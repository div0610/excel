<template>
  <div>
    <el-form ref="form" :model="set" label-width="120px">
      <el-form-item label="文件保存目录" id="driver-set-11">
        <el-row>
          <el-col :span="1">
            <el-tooltip :content=content placement="bottom" effect="light">
              <i class="el-icon-question" content="Top center" placement="top"></i>
            </el-tooltip>
          </el-col>
          <el-col :span="23">
            <el-input v-model="fileContents.url" size="large" :placeholder="fileContents.name" label-width="100px" v-if="fag"
                      disabled></el-input>
            <el-input v-model="fileContents.url" size="large" :placeholder="fileContents.name" label-width="100px" v-else></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="软件版本:" id="driver-set-2">
        <el-row>
          <el-col :span="23" :offset="1">
            <el-input v-model="fileContents.version" size="large" label-width="100px" disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="修复库版本:" id="driver-set-3">
        <el-row>
          <el-col :span="23" :offset="1">
            <el-input v-model="fileContents.fixVersion" size="large" label-width="100px" disabled></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="处理后文件类型" id="driver-set-4">
        <el-row>
          <el-col :span="20" :offset="1">
            <el-radio-group v-model="fileContents.resource" v-if="fag" disabled>
              <el-radio label="xls"></el-radio>
              <el-radio label="xlsx"></el-radio>
            </el-radio-group>
            <el-radio-group v-model="fileContents.resource" v-else>
              <el-radio label="xls"></el-radio>
              <el-radio label="xlsx"></el-radio>
            </el-radio-group>
          </el-col>

        </el-row>

      </el-form-item>
      <el-form-item v-if="fag">
        <el-row>
          <el-col :span="6" :offset="1">
            <el-button type="primary" size="mini" @click="onEdit">修改</el-button>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item v-else>
        <el-row>
          <el-col :span="6" :offset="1">
            <el-button type="success" size="mini" @click="onSubmit">保存</el-button>
            <el-button size="mini" type="warning" @click="onCancel">取消</el-button>
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import Driver from "driver.js" // import driver.js
    import "driver.js/dist/driver.min.css" // import driver.js css
    import fs from "fs"
    import path from "path"

    export default {
        name: "set",
        data() {
            return {
                set:{},
                driver: null,
                content: '路径格式示例：Mac电脑:/Users/div/Desktop/。Windows电脑：C:/Users/Administrator/Desktop/',
                fileContents: {},
                fag: true,
            }
        },
        created() {
            this.fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../Log.json'), 'utf8'));
            this.$store.dispatch('actionsUrl', this.fileContents.url);
            this.$store.dispatch('actionsFileType', this.fileContents.resource);
        },
        methods: {
            onSubmit() {
                if (this.fileContents.url === '') {
                    this.$message({
                        message: '请输入地址',
                        type: 'warning'
                    });
                    return
                }
                if (this.fileContents.resource === '') {
                    this.$message({
                        message: '请选择处理后的文件类型',
                        type: 'warning'
                    });
                    return
                }
                console.log(this.fileContents.resource);
                this.$store.dispatch('actionsUrl', this.fileContents.url);
                this.$store.dispatch('actionsFileType', this.fileContents.resource);
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.fag = true;
                fs.writeFile(path.join(__dirname, '../../../Log.json'),JSON.stringify(this.fileContents),function (error) {
                    if (error){

                    }else {
                        console.log('写入成功了')
                    }
                } )
            },
            onEdit() {

                this.fag = false;
            },
            onCancel() {
                this.$message({
                    message: '你已经取消了操作',
                    type: 'warning'
                });
                this.fag = true;
            }
        },
    }
</script>

<style scoped>

</style>
