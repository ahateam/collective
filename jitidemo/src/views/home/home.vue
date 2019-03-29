<template>
    <div class="box">
        <div class="list-box">

           <router-link to="/asset">
               <div class="item-box" >
                   组织资产查询
               </div>
           </router-link>
            <router-link to="/vote">
                <div class="item-box" >
                    组织表决查询
                </div>
            </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: "asset",
        methods:{

        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100%;
        padding: 20px 0;
    }
    .list-box{
        padding: 0 2rem;
    }
    .item-box{
        float: left;
        width: 16rem;
        height: 9rem;
        background: #5bc0de;
        border-radius: 25px;
        color: #fff;
        font-size: 2rem;

        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 2rem;
        margin-left: 2rem;

        text-align: center;
        line-height: 9rem;

        cursor: pointer;

        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

</style>
