<template>
    <div v-if="checkIndex">
        <template v-if="checkIndex == 1">
            <areaPrintViewInfo></areaPrintViewInfo>
        </template>
        <template v-else-if="checkIndex ==2">
            <areaPrintViewInfo1></areaPrintViewInfo1>
        </template>
        <template v-else-if="checkIndex ==3">
            <areaPrintViewInfo2></areaPrintViewInfo2>
        </template>
        <template v-else-if="checkIndex ==4">
            <areaPrintViewInfo3></areaPrintViewInfo3>
        </template>
        <template v-else>
            <areaPrintViewInfo4></areaPrintViewInfo4>
        </template>
    </div>
</template>

<script>
    import areaPrintViewInfo from './component/huichuan/templateView/printViewInfo'
    import areaPrintViewInfo1 from './component/huichuan/templateView/printViewInfo1'
    import areaPrintViewInfo2 from './component/huichuan/templateView/printViewInfo2'
    import areaPrintViewInfo3 from './component/huichuan/templateView/printViewInfo3'
    import areaPrintViewInfo4 from './component/huichuan/templateView/printViewInfo4'
    export default {
        name: "printTemplateView",
        data(){
            return{
                checkIndex:'',
            }
        },
        components:{
            areaPrintViewInfo,
            areaPrintViewInfo1,
            areaPrintViewInfo2,
            areaPrintViewInfo3,
            areaPrintViewInfo4
        },
        mounted(){
            this.checkIndex = this.$route.params.id
        }
    }
</script>

<style scoped lang="scss">

</style>
