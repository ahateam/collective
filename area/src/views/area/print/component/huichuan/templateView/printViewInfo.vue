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
                        <div class="title-tags">

                            <div class="tags">
                                <div class="item-tag">
                                    <span style="float: left">
                                        自定义相关资料：
                                    </span>
                                    <el-tag
                                            class="tag-box"
                                            :key="index"
                                            v-for="(tag,index) in dynamicTags"
                                            closable
                                            style="cursor: pointer;"
                                            :disable-transitions="false"
                                            @close="handleClose(tag)"
                                            @click="setValBtn(tag)" >
                                        {{tag.printingName}}
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
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增常用值</el-button>

                                </div>
                            </div>

                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">

                <el-col :span="24">
                    <div style="float:right;text-align: right">
                        <el-button type="primary" @click="addChild">新增打印项</el-button>
                        <el-button type="primary" v-print="'#printBox'">打印预览</el-button>
                        <el-button type="danger" @click="delChildBtn">撤 回</el-button>
                    </div>
                    <div style="float:right;margin-right:40px;height:40px;line-height:40px">
                        <text-panel @changeStyle="getChangeStyle" :fontStyle="fontStyle"></text-panel>
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
                        <div class="box-val" id="printBox">

                            <div v-if="dragArr.length != 0">

                                <VueDragResize
                                        v-for="(item,index) in dragArr" :key="index"
                                        :w="item.rect.width"
                                        :h="item.rect.height"
                                        :x="item.rect.left"
                                        :y="item.rect.top"
                                        :isActive="item.isActive"
                                        @clicked="changeChild(index)"
                                        @deactivated="cancelActive(index)"
                                        @resizing="changeSize($event,index)"
                                        @dragging ="changePosition($event,index)"
                                >
                                    <span :style="item.fontStyle">{{item.text.printingName}}</span>
                                </VueDragResize>
                            </div>


                        </div>
                    </div>
                </el-col>
            </el-row>


        </el-row>
    </div>
</template>

<script>
    import VueDragResize from 'vue-drag-resize'
    import TextPanel from '@/components/textPanel/TextPanel'
    export default {
        name: "printViewInfo",
        data(){
            return{

                templateInfo:'',

                id:'',
                tags:[],
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',



                //节点移动相关
                dragArr:[],
                _index:0,


                //变量匹配所需
                org:'',
                family:'',
                familyUserList:[],
                printInfo:'',

                fontStyle: {fontFamily: "FangSong", fontSize: "4mm"},
            }
        },
        components:{
            VueDragResize,
            TextPanel
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
                this.$nextTick( ()=> {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    let obj ={
                        key:0,
                        isConstant:0,
                        printingName:inputValue,
                        printing:''
                    }

                    this.dynamicTags.push(obj);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //选中当前节点 修改值
            setValBtn(tag){
                console.log(this.dragArr)
                let obj = JSON.parse(JSON.stringify(this.dragArr[this._index]))
                obj.text = tag
                this.dragArr.splice(this._index,1,obj)

            },

            //单击选中节点
            changeChild(index){
                this._index = index
                for(let i=0;i<this.dragArr.length;i++){
                    if( this.dragArr[i].isActive == true){
                        this.dragArr[i].isActive = false
                    }
                }
                this.dragArr[index].isActive = true
            },
            //节点改变宽高相关
            changeSize(newRect,index) {
                this.dragArr[index].rect = newRect
            },
            //节点变化位置
            changePosition(newRect,index){
                this.dragArr[index].rect = newRect
            },
            //点击节点外触发取消所有的选中样式
            cancelActive(index){
                this.dragArr[index].isActive = false
            },


            //新增打印项
            addChild(){
                let obj  ={
                    text:{key:-1,isConstant:0,printingName:'请选择对应的变量或值',printing:''},
                    parma:'',
                    rect:{  left:500, top:100, width:200, height:40},
                    fontStyle: JSON.parse(JSON.stringify(this.fontStyle)),
                    isActive:true,
                }
                for(let i=0;i<this.dragArr.length;i++){
                    if( this.dragArr[i].isActive == true){
                        this.dragArr[i].isActive = false
                    }
                }
                this._index = this.dragArr.length
                this.dragArr.push(obj)
            },


            //撤回按钮
            delChildBtn(){
                if(this.dragArr.length>0){
                    this.dragArr.splice(this.dragArr.length-1,1)
                }else{
                    this.$message.error('请先添加至少一个打印项！')
                }
            },


            //匹配变量常量
            getOrgInfo(){
                let orgId =  this.printInfo.org
                this.family = this.printInfo.family
                let cnt = {
                    orgId : orgId
                }
                this.$area.getORGById(cnt,(res)=>{
                    if(res.data.rc == this.$util.RC.SUCCESS){
                        this.org = this.$util.tryParseJson(res.data.c)
                    }else{
                        this.org = ''
                    }

                    let cnt1={
                        familyNumber: this.family.familyNumber,
                        orgId: orgId
                    }
                    this.$area.getFamilyUserByFamilyNumber(cnt1,(res1)=>{
                        if(res.data.rc == this.$util.RC.SUCCESS){
                            this.familyUserList = this.$util.tryParseJson(res1.data.c)
                        }else{
                            this.familyUserList = []
                        }
                        this.getDataVar()
                    })




                })
            },

            getDataVar(){

                let dataArr = []
                console.log(this.dragArr)
                for(let i=0;i<this.dragArr.length;i++){
                    //org user 已经用parma区分 key区分前端变量

                    //无后端变量
                    if(this.dragArr[i].parma == undefined || this.dragArr[i].parma == ''){  //前端变量
                        if(this.dragArr[i].text.key ==1){   //前端变量--当前日期 （key==-1为静态值不用管）
                            let data = this.$commen.getDateStr()
                            let obj = JSON.parse(JSON.stringify(this.dragArr[i]))
                            obj.text.printingName = data
                            dataArr.push(obj)

                        }else{      //前端的常量
                            let obj = JSON.parse(JSON.stringify(this.dragArr[i]))
                            dataArr.push(obj)
                        }
                    }else {     //后端变量
                        if(this.dragArr[i].parma == 'org'){     //对应org信息
                            let str = this.dragArr[i].text.printing
                            let data = this.org[str]
                            let obj = JSON.parse(JSON.stringify(this.dragArr[i]))
                            obj.text.printingName = data
                            dataArr.push(obj)

                        }else if( this.dragArr[i].parma =='user'){  //对应familyUserList信息
                            if( this.dragArr[i].index< this.familyUserList.length){
                                //遍历roles判断是否为集体经济组织成员


                                let str = this.dragArr[i].text.printing

                                let _index = this.dragArr[i].index
                                let data = this.familyUserList[_index][str]
                                let obj = JSON.parse(JSON.stringify(this.dragArr[i]))
                                obj.text.printingName = data
                                dataArr.push(obj)

                            }
                        }
                    }

                }

                this.dragArr = dataArr
                console.log('-------------------------')
                console.log(dataArr)
                console.log(  this.dragArr)
            },
            /** 获取节点最新的样式信息 */
            getChangeStyle(styleObj) {
                this.fontStyle = styleObj
                if (this._index != -1) {
                    this.dragArr[this._index].fontStyle = JSON.parse(JSON.stringify(this.fontStyle))
                }
            }

        },


        mounted(){


            this.printInfo = JSON.parse(localStorage.getItem('print'))
            this.dynamicTags = []


            let cnt ={
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.$constData.printType[0].key, // Byte 打印模板类型
                page: 2, // Byte 页码  1左 2右
            }
            this.$area.getPrintingTemplateByType(cnt,(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){

                    if(JSON.parse(res.data.c) == null){
                        this.$message.error('请先设置好模板')
                    }else{
                        this.templateInfo = JSON.parse(res.data.c)
                        this.dragArr =JSON.parse(this.templateInfo.data)

                        this.getOrgInfo()
                    }
                }
            })



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
        width: 280mm;
        height: 200mm;
        border: 1px solid #aaa;
    }
    .bg{
        position: absolute;
        width: 280mm;
        height: 200mm;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .box-val{
        position: absolute;
        cursor: pointer;
        width: 280mm;
        height: 200mm;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .box-left{
        float: left;
        width: 138mm;
        height: 200mm;
        border-right: 1px solid #aaa;
        background:#ddd ;
    }
    .box-right{
        float: left;
        width: 138mm;
        height: 200mm;
        cursor: pointer;
    }
    .box-edit{
        width: auto;
        height: 200mm;
    }
    .title-change{
        width: auto;

    }
    .title{
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
        padding-top: 20mm;
        width: auto;
        color: #333;
        font-size: 10mm;
        text-align: center;
    }
    .info-number{
        margin-top: 11mm;
        font-size: 4mm;
        color: #333;
        margin-left: 70mm;

    }
    .info-name{
        width: 105mm;
        margin: 0 auto;
        margin-top: 15mm;
        height: 5mm;
    }
    .book-title{
        float: left;
        width: 30mm;

        font-size:5mm;
        color: #666;
        height: 50px;
    }
    .book-val{
        float: left;
        width:75mm;
        height: 5mm;
        border-bottom: 1px dashed #333;
    }
    .info-time{
        margin-left: 58mm;
        margin-top: 30mm;
    }
    .content-box{
        width: 280mm;
        height: 200mm;
        z-index: 1100;
        position: relative;
    }
    .title-tags {
        width: auto;
        border: 1px solid #eee;
        padding: 10px;
    }
    .tags{
        width: auto;
        margin-top: 10px;
        line-height: 40px;
        font-size: 14px;
        color: #666;
    }
    .item-tag{
        width: auto;
        height: 40px;
    }
    .tag-box:hover{
        background: #409eff;
        color: #fff;
    }
    .tag-box:active{
        background: #66b1ff;
        color: #fff;
    }
</style>
