<template>
    <div class="scoped-class">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="报价修复" name="first"><offer-excel></offer-excel></el-tab-pane>
            <el-tab-pane label="工件修复" name="second">
                <excel-fix></excel-fix>
            </el-tab-pane>
            <el-tab-pane label="待开发功能" name="third" disabled>报价修复</el-tab-pane>
            <el-tab-pane label="设置" name="fourth" >
                <base-set></base-set>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import BaseSet from '../Set/index';
    import ExcelFix from '../ExcelFix/ExcelFix';
    import OfferExcel from '../offerExcel/index';
    import Driver from "driver.js" // import driver.js
    import "driver.js/dist/driver.min.css" // import driver.js css
    import steps from "../../guide"

    export default {
        name: "Base",
        components: {
            BaseSet,
            OfferExcel,
            ExcelFix
        },
        data() {
            return {
                // driver: null,
                activeName: this.$route.params.activeName
            }
        },
        // mounted() {
        //     this.driver = new Driver({
        //
        //         className: "scoped-class", // className to wrap driver.js popover
        //         animate: true, // Animate while changing highlighted element
        //         opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
        //         padding: 10, // Distance of element from around the edges
        //         allowClose: false, // Whether clicking on overlay should close or not
        //         overlayClickNext: false, // Should it move to next step on overlay click
        //         doneBtnText: "完成", // Text on the final button
        //         closeBtnText: "关闭", // Text on the close button for this step
        //         nextBtnText: "下一步", // Next button text for this step
        //         prevBtnText: "上一步" // Previous button text for this step
        //         // Called when moving to next step on any step
        //     })
        //     this.driver.defineSteps(steps)
        //     this.driver.start()
        // },
    }
</script>

<style scoped>

</style>
