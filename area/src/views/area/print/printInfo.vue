<template>
    <div>
        <el-row class="row-box">
            <el-col :span="24">
                <span class="col-title"> 股权证书首页打印</span>
            </el-col>
        </el-row>
        <el-row class="row-box1">
            <el-row>
                <el-col :span="24">
                   <div class="title-change">
                        <div class="title">
                            常用资料选择：
                        </div>
                       <div class="list">
                           <el-tag
                                   :key="tag"
                                   v-for="tag in dynamicTags"
                                   closable
                                   style="cursor: pointer;"
                                   :disable-transitions="false"
                                   @close="handleClose(tag)"
                                   @click="setBtn(tag)" >
                               {{tag}}
                           </el-tag>
                           <el-input
                                   class="input-new-tag"
                                   v-if="inputVisible"
                                   v-model="inputValue"
                                   ref="saveTagInput"
                                   size="small"
                                   @keyup.enter.native="handleInputConfirm"
                                   @blur="handleInputConfirm"
                           >
                           </el-input>
                           <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>


                       </div>
                   </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <div class="box-bg">
                       <div class="bg">
                           <div class="box-left">

                           </div>
                           <div class="box-right">
                               <div class="box-edit">
                                    <div class="info-title">
                                        成 员 股 权 证
                                    </div>
                                   <div class="info-number">
                                       证书编号:
                                   </div>
                                   <div class="info-name">
                                        <div class="book-title">
                                            合作社名称:
                                        </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           合作社地址:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           成立时间:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-name">
                                       <div class="book-title">
                                           合作社代码:
                                       </div>
                                       <div class="book-val">

                                       </div>
                                   </div>
                                   <div class="info-time">
                                       <div class="book-title">
                                           发证日期:
                                       </div>
                                   </div>
                               </div>

                           </div>
                       </div>
                        <div class="box-val" >

                            <div class="content-box" ref="contentBox" v-html="appendChilds" id="printBox"  @mousedown.stop="moveStart" @mouseup.stop="moveChild">

                            </div>

                        </div>
                    </div>
                </el-col>
            </el-row>

            <el-row style="margin-top: 20px">
                <el-col :span="24" style="text-align: center">
                    <el-button type="primary" v-print="'#printBox'">打印预览</el-button>
                    <el-button type="danger" @click="delBtn">撤 回</el-button>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "printInfo",
        data(){
            return{
                id:'',
                dynamicTags: ['松林集体经济组织', '汇集权制0111225', '汇川区松林镇松林村','SLZ05626','2019-06-02'],
                inputVisible: false,
                inputValue: '',


                appendChilds:'',
                appendChildArr:[],
                appendIndex:-1,

                //移动相关
                isMoveStart:false,
                moveChildIndex:0,
                seat:{x:0,y:0},     //节点位置
                cur:{x:0,y:0},      //鼠标位置
                appendStyle:'position:absolute;padding: 10px;font-size: 16px;color:#333',
                appendActiveStyle:'position:absolute;padding: 10px;font-size: 16px;color:#333;border-radius:5px;background:#b3d4fc',
            }
        },
        methods:{
            choseBtn(){

                console.log('2222')
            },
            //tags操作
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //选中一个开始移动
            moveStart(e){
                //重置样式
                this.changeStyle(this.appendIndex,this.appendStyle)
                this.appendIndex = parseInt(e.target.getAttribute('key'))
                //添加选中样式
                this.changeStyle(this.appendIndex,this.appendActiveStyle)

                this.seat.x = this.$refs.contentBox.children[this.appendIndex].
                this.seat.y = this.$refs.contentBox.children[this.appendIndex].style.top
                this.cur.x = e.clientX
                this.cur.y = e.clientY

                console.log(this.seat)
                console.log(this.cur)


            },
            moveChild(e){
                console.log('2222')
            },


            //动态更改被选中节点的样式，不同背景色
            changeStyle(index,styleActive){
                let text = this.$refs.contentBox.children[index].innerText
                let seatY = this.$refs.contentBox.children[index].style.top
                let seatX = this.$refs.contentBox.children[index].style.left
                let  html ='<span  style="left:'+seatX+';top:'+seatY+';'+styleActive+'"  key="'+index+'">'+text+'</span>  '
                this.appendChildArr[index] = html
                this.appendChilds = this.appendChildArr.join('')
            },

            //点击tag 对当前选中的位置进行赋值
            setBtn(val){
                if(this.appendIndex != -1){
                    this.changeStyle(this.appendIndex,this.appendStyle)
                }
                this.appendIndex = this.appendChildArr.length
                let seatX = 600
                let seatY = parseInt(Math.random()*500)+30
                let html ='<span  style="left:'+seatX+'px;top:'+seatY+'px;'+ this.appendActiveStyle+'"  key="'+this.appendIndex+'">'+val+'</span>  '
                this.appendChildArr.push(html)
                this.appendChilds = this.appendChildArr.join('')
            },
            //撤回按钮
            delBtn(){
                let num = this.appendChildArr.length
                this.appendChildArr.splice(num-1,1)
                this.appendChilds = this.appendChildArr.join('')
            }


        },
        mounted(){
            this.id = this.$route.params.id
            let data1 = '<span style="left:0px;top:0px;position:absolute;padding: 10px;font-size: 16px;color:#333" key="1000">松林集体经济组织</span>'
            let data2 = '<span style="left:0px;top:630px;position:absolute;padding: 10px;font-size: 16px;color:#333" key="1000">松林集体经济组织</span>'
            let data5 = '<span style="left:425px;top:300px;position:absolute;padding: 10px;font-size: 16px;color:#333" key="1000">松林集体经济组织</span>'
            let data3 = '<span style="left:891px;top:0px;position:absolute;padding: 10px;font-size: 16px;color:#333" key="1000">松林集体经济组织</span>'
            let data4 = '<span style="left:891px;top:630px;position:absolute;padding: 10px;font-size: 16px;color:#333" key="1000">松林集体经济组织</span>'
            this.appendChildArr.push(data1)
            this.appendChildArr.push(data2)
            this.appendChildArr.push(data3)
            this.appendChildArr.push(data4)
            this.appendChildArr.push(data5)
            this.appendChilds = this.appendChildArr.join('')
            // if(this.id == undefined || this.id == ''){
            //     this.$message.error('信息失效，请先选择一个打印模板')
            //     this.$router.push('/printBook')
            // }
        }
    }
</script>

<style scoped lang="scss">
    @page {
        margin: 0mm;

        @top-left {
            display: none;
        }
    }

    .nav-btn{
        float: left;
        margin-left: 15px;
    }
    .row-box{
        background: #fff;
        padding:15px 0;
    }
    .row-box1{
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }
    .col-title{
        padding-left: 10px;
        line-height: 20px;
        color: #666;
        font-size: 16px;
    }
    .box-bg{
        margin: 0 auto;
        position: relative;
        width: 891px;
        height: 630px;
        border: 1px solid #aaa;
    }
    .bg{
        position: absolute;
        width: 891px;
        height: 630px;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .box-val{
        position: absolute;
        cursor: pointer;
        width: 891px;
        height: 630px;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .box-left{
        float: left;
        width: 445px;
        height: 630px;
        border-right: 1px solid #aaa;
        background:#ddd ;
    }
    .box-right{
        float: left;
        width:445px ;
        height: 630px;
        cursor: pointer;
    }
    .box-edit{
        width: auto;
        height: 630px;
    }
    .title-change{
        width: auto;

    }
    .title{
        float: left;
        color: #666;
        font-size: 16px;
        line-height: 30px;
    }
    .list{
        float: left;
        margin-left: 20px;
    }
    .list-item{
        float:left;
        margin-left: 10px;
        margin-top: 10px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .info-title{
        margin-top: 10px;
        width: auto;
        color: #666;
        font-size: 20px;
        text-align: center;
    }
    .info-number{
        margin-top: 20px;
        font-size: 14px;
        color: #666;
        margin-left: 55%;
    }
    .info-name{
        width: 90%;
        margin: 0 auto;
        margin-top: 30px;
        height: 50px;
    }
    .book-title{
        float: left;
        width: 100px;
        line-height: 70px;
        font-size: 16px;
        color: #666;
        height: 50px;
    }
    .book-val{
        float: left;
        width:280px;
        height: 40px;
        border-bottom: 1px dashed #333;
    }
    .info-time{
        margin-left: 50%;
        margin-top: 60px;
    }
    .content-box{
        width: 891px;
        height: 630px;
        z-index: 1100;
        position: relative;
    }
    .append{
        position:absolute;
        padding: 10px;
        font-size: 16px;
        color: #333;
        background: #b3d4fc;
    }
</style>
