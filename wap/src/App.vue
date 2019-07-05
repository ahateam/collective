<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    /** 在index.html 进行了全局引入线上版本号*/
    const Version = window.globalConfig.version

    import { Dialog } from 'vant';
    export default {
        name: 'app',
        beforeCreate() {
            document.addEventListener('plusready',function() {
                let uuid= plus.device.uuid
            },false)
        },
        created(){
            var VERSION = 106
            var ua = navigator.userAgent.toLowerCase()
            document.addEventListener('plusready',function() {
                let uuid= plus.device.uuid
                if(ua.match(/iPhone\sOS/i) == "iphone os"){
                    if(Version.version >VERSION){
                        Dialog.alert({
                            title: '版本更新',
                            message: '有新版本更新啦，赶紧下载吧'
                        }).then(() => {
                            plus.runtime.openURL(Version.ios)
                        });
                    }
                }else if(ua.match(/Android/i) == "android"){

                    if(Version.version >VERSION){
                        Dialog.alert({
                            title: '版本更新',
                            message: '有新版本更新啦，赶紧下载吧'
                        }).then(() => {
                            plus.runtime.openURL(Version.android)
                        });
                    }
                }


            },false)





        },
        mounted(){

        }

    }
</script>
<style lang="scss">

</style>

