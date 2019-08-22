<template>
    <div v-if="checkIndex">
        <template v-if="checkIndex == 'hc1'">
            <areaPrintTemplate></areaPrintTemplate>
        </template>
        <template v-else-if="checkIndex == 'hc2'">
            <areaPrintTemplate1></areaPrintTemplate1>
        </template>
        <template v-else-if="checkIndex == 'hc3'">
            <areaPrintTemplate2></areaPrintTemplate2>
        </template>
        <template v-else-if="checkIndex == 'hc4'">
            <areaPrintTemplate3></areaPrintTemplate3>
        </template>
        <template v-else-if="checkIndex == 'hc5'">
            <areaPrintTemplate4></areaPrintTemplate4>
        </template>

        <template v-else-if="checkIndex == 's1'">
            <gzTemplate></gzTemplate>
        </template>
        <template v-else-if="checkIndex == 's2'">
            <gzTemplate1></gzTemplate1>
        </template>
        <template v-else-if="checkIndex == 's3'">
            <gzTemplate2></gzTemplate2>
        </template>
        <template v-else-if="checkIndex == 's4'">
            <gzTemplate3></gzTemplate3>
        </template>
        <template v-else-if="checkIndex == 's5'">
            <gzTemplate4></gzTemplate4>
        </template>
    </div>
</template>

<script>

    import areaPrintTemplate from './component/huichuan/template/printTemplate'
    import areaPrintTemplate1 from './component/huichuan/template/printTemplate1'
    import areaPrintTemplate2 from './component/huichuan/template/printTemplate2'
    import areaPrintTemplate3 from './component/huichuan/template/printTemplate3'
    import areaPrintTemplate4 from './component/huichuan/template/printTemplate4'


    import gzTemplate from './component/guizhou/template/gzTemplate'
    import gzTemplate1 from './component/guizhou/template/gzTemplate1'
    import gzTemplate2 from './component/guizhou/template/gzTemplate2'
    import gzTemplate3 from './component/guizhou/template/gzTemplate3'
    import gzTemplate4 from './component/guizhou/template/gzTemplate4'

    export default {
        name: "printTemplate",
        data(){
            return{
                checkIndex:''
            }
        },
        components:{
            areaPrintTemplate,
            areaPrintTemplate1,
            areaPrintTemplate2,
            areaPrintTemplate3,
            areaPrintTemplate4,

            gzTemplate,
            gzTemplate1,
            gzTemplate2,
            gzTemplate3,
            gzTemplate4
        },
        mounted(){
            this.checkIndex = this.$route.params.id
        }

    }
</script>

<style scoped lang="scss">

</style>
