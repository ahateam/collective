<template>
    <div>
        <header-box title="分红详情"></header-box>

        <div class="main-box">
            <div class="box-title" v-if="info != ''|| info!= undefined ">
                <div class="box-title-text">
                    {{info.textName}}
                </div>
                <dvi class="box-title-btn">
                    <van-button type="primary" @click="loadBtn">下载</van-button>
                </dvi>
            </div>
            <div class="box-title" v-else> 暂无数据</div>

            <div id="excl-box"></div>
        </div>




    </div>


</template>


<script>
    import HeaderBox from '@/components/head/headerBox'
    import axios from 'axios'
    import XLSX from 'xlsx';
    import { Toast } from 'vant';
    export default {
        name:'bonusInfo',
        components:{
            HeaderBox
        },
        data(){
          return{
              info:''
          }
        },
        methods: {
            loadBtn(){
                window.location.href = this.$route.params.info.url
            },
            process_wb(wb) {
                //console.error("process_wbprocess_wbprocess_wb")
                var output = this.to_csv(wb);
                console.error(output)
                var out = document.getElementById('excl-box');
                if (out.innerText === undefined) {
                    out.textContent = output;
                } else {
                    out.innerText = output;
                    if (typeof console !== 'undefined') console.log("output", new Date());
                }
            },
            to_csv(workbook) {
                var result = [];
                console.error("xxxx" + JSON.stringify(workbook));
                workbook.SheetNames.forEach(function (sheetName) {
                    console.error("yyy" + sheetName);

                    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);


                    if (csv.length > 0) {
                        result.push("SHEET: " + sheetName);
                        result.push("");
                        result.push(csv);
                    }
                });
                return result.join("\n");
            },
        },
        mounted(){
              this.info = this.$route.params.info
            if(this.info == '' || this.info == undefined){
                Toast.fail({
                    duration:500,
                    message:'信息失效,重新选择'
                })
                this.$router.push('/listBonus')
            }else{
                    let url = this.info.url
                    var _this = this;
                    axios.get(url,{responseType: 'arraybuffer'}).then(function (response) {
                        // console.info("axios>" + JSON.stringify(response.data));
                        console.log(response)
                        var data = new Uint8Array(response.data);
                        // console.error("data>" + JSON.stringify(data));
                        var wb = XLSX.read(data, {type: "array"});
                        _this.process_wb(wb);

                    }).catch(function (readyState, status, error) {
                        console.error("axios>>>" + error);
                        console.error(readyState);
                    })


            }
        }
    }

</script>
<style scoped lang="scss">
    .excl-box{
        width: 88%;
        margin: 0 auto;
        margin-top: 2rem;
    }
    .box-title{
        width: 100%;
        height: 5rem;
       background: #fff;
        margin-bottom: 1rem;
        border-bottom: 1px solid #ddd;
    }
    .box-title-text{
        float: left;
        width: 80%;
        height: 5rem;
        font-size: 1.4rem;
        color: #666;
        line-height:5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .box-title-btn{
        float: left;
        width: 20%;
        text-align: center;
        line-height: 5rem;
    }
</style>
