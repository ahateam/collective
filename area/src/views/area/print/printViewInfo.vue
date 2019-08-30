<template>
    <div v-if="checkIndex">
        <template v-if="checkIndex == 'hc1'">
            <areaPrintViewInfo></areaPrintViewInfo>
        </template>
        <template v-else-if="checkIndex == 'hc2'">
            <areaPrintViewInfo1></areaPrintViewInfo1>
        </template>

        <template v-else-if="checkIndex == 'hc3'">
            <areaPrintViewInfo1Back></areaPrintViewInfo1Back>
        </template>

        <template v-else-if="checkIndex == 'hc4'">
            <areaPrintViewInfo2></areaPrintViewInfo2>
        </template>
        <template v-else-if="checkIndex == 'hc5'">
            <areaPrintViewInfo3></areaPrintViewInfo3>
        </template>
        <template v-else-if="checkIndex == 'hc6'">
            <areaPrintViewInfo4></areaPrintViewInfo4>
        </template>

        <template v-else-if="checkIndex == 's1'">
            <gzTemplateInfo></gzTemplateInfo>
        </template>
        <template v-else-if="checkIndex == 's2'">
            <gzTemplateInfo1></gzTemplateInfo1>
        </template>
        <template v-else-if="checkIndex == 's3'">
            <gzTemplateInfo2></gzTemplateInfo2>
        </template>
        <template v-else-if="checkIndex == 's4'">
            <gzTemplateInfo3></gzTemplateInfo3>
        </template>
        <template v-else-if="checkIndex == 's5'">
            <gzTemplateInfo4></gzTemplateInfo4>
        </template>
    </div>
</template>

<script>
    import areaPrintViewInfo from './component/huichuan/templateView/printViewInfo'
    import areaPrintViewInfo1 from './component/huichuan/templateView/printViewInfo1'
    import areaPrintViewInfo1Back from './component/huichuan/templateView/printViewInfo1back'
    import areaPrintViewInfo2 from './component/huichuan/templateView/printViewInfo2'
    import areaPrintViewInfo3 from './component/huichuan/templateView/printViewInfo3'
    import areaPrintViewInfo4 from './component/huichuan/templateView/printViewInfo4'


    import gzTemplateInfo from './component/guizhou/templateView/gzTemplateInfo'
    import gzTemplateInfo1 from './component/guizhou/templateView/gzTemplateInfo1'
    import gzTemplateInfo2 from './component/guizhou/templateView/gzTemplateInfo2'
    import gzTemplateInfo3 from './component/guizhou/templateView/gzTemplateInfo3'
    import gzTemplateInfo4 from './component/guizhou/templateView/gzTemplateInfo4'

    export default {
        name: "printViewInfo",
        data(){
            return{
                checkIndex:'',
            }
        },
        components:{
            areaPrintViewInfo,
            areaPrintViewInfo1,
            areaPrintViewInfo1Back,
            areaPrintViewInfo2,
            areaPrintViewInfo3,
            areaPrintViewInfo4,

            gzTemplateInfo,
            gzTemplateInfo1,
            gzTemplateInfo2,
            gzTemplateInfo3,
            gzTemplateInfo4
        },
        mounted(){
            this.checkIndex = this.$route.params.id
        }
    }
</script>

<style scoped>

</style>
