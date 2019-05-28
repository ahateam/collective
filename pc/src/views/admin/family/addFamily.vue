<template>
    <div>
        新增户成员
    </div>
</template>

<script>
    export default {
        name: "addFamily",
        data(){
            return{
                data:[
                    {name:'111',age:23},
                    {name:'222',age:25},
                    {name:'333',age:26},
                    {name:'444',age:12},
                ]
            }
        },
        methods:{
            chageData(){
                this.data[1].name = '啦啦啦'
                console.log(this.data)
            },

        },
        mounted(){
            this.chageData()



        }
    }
</script>

<style scoped>

</style>
