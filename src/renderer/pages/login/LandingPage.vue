<template>
    <div class="main" @click="goSet">

        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="12">
<!--                <router-link :to="/Index">123</router-link>-->
                <div class="biaoti" @click="">斯可馨外挂小🐷手</div>
                <img src="../../assets/excel.gif" alt="">
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'landing-page',
        methods: {
            goSet(){
                this.$router.push('/base/fourth')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        margin-top: 15%;
        .biaoti {
            font-size: 40px;
            margin: 10px 0;;
            color: #4fbdbe
        }
    }

</style>
