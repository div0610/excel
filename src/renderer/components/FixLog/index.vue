<template>
    <div>
        <div class="head">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <!--            <el-breadcrumb-item><label  @click="goBlack">返回</label></el-breadcrumb-item>-->
                <el-breadcrumb-item :to="{path:'/base/'+this.activeName}">返回</el-breadcrumb-item>
                <el-breadcrumb-item>操作记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
                :data="tableData3"
                height="500"
                stripe
                style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            width="300">
          </el-table-column>
            <el-table-column
                    prop="name"
                    label="文件"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="操作"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="80"
                    label="状态">
                <el-tag type="success">成功</el-tag>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:'my-tour',
        data() {
            return {
                tableData3: [],
                activeName:this.$route.params.activeName
            }
        },
        methods: {
            goBlack() {
                this.$router.push('/base/' + this.activeName)
            },
        },
        created(){
            var fs = require('fs');
            var path = require('path');
            let fileContents = fs.readFileSync(path.join(__dirname, '../../../Log.json'), 'utf8');
            console.log(fileContents);
            this.tableData3 = JSON.parse(fileContents).fix;
        }

    }
</script>

<style scoped lang="scss">
    .head {
        padding: 10px;
        background-color: #ffffff;
    }

</style>
