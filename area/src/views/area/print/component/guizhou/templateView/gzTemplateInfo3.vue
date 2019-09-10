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
                                <div class="box-title">
                                    收益分配领取记录
                                </div>
                                <div class="bg-box-head">
                                    <div class="bj-box-head-item" style="line-height: 8.17mm;width: 23mm">
                                        <p>分配时间</p>
                                        <p>（年月日）</p>
                                    </div>
                                    <div class="bj-box-head-item" style="width: 19mm">
                                        每股收益
                                    </div>
                                    <div class="bj-box-head-item" style="width: 21mm;line-height: 8.17mm">
                                        <p>家庭分配</p>
                                        <p>
                                            总额
                                        </p>
                                    </div>
                                    <div class="bj-box-head-item" style="width: 18mm;">
                                        领款人
                                    </div>
                                    <div class="bj-box-head-item" style="width: 18mm;">
                                        经办人
                                    </div>
                                    <div class="bj-box-head-item" style="width: 20mm;border-right: none">
                                        备注
                                    </div>
                                </div>
                                <div class="item-tr" v-for="(item,index) in userList" :key="index"
                                     :style="index==userList.length-1?{borderBottom:'1px solid #aaa'}:''">
                                    <div class="bj-box-head-item" style="line-height: 8.17mm;width: 23mm;height: 8.17mm">

                                    </div>
                                    <div class="bj-box-head-item" style="width: 19mm;height: 8.17mm">

                                    </div>
                                    <div class="bj-box-head-item" style="width: 21mm;line-height: 8.17mm;height: 8.17mm">

                                    </div>
                                    <div class="bj-box-head-item" style="width: 18mm;height: 8.17mm">

                                    </div>
                                    <div class="bj-box-head-item" style="width: 18mm;height: 8.17mm">

                                    </div>
                                    <div class="bj-box-head-item" style="width: 20mm;border-right: none;height: 8.17mm">

                                    </div>
                                </div>


                            </div>
                            <div class="box-right"></div>
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
                                        @dragging="changePosition($event,index)"
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
        name: "printTemplate",
        data() {
            return {

                templateInfo: '',

                id: '',
                tags: [],
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                userList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},{},{},{},{},{}],


                //节点移动相关
                dragArr: [],
                _index: -1,

                //变量匹配所需
                org:'',
                family:'',
                familyUserList:[],
                printInfo:'',
                fontStyle: {fontFamily: "FangSong", fontSize: "4mm"},


            }
        },
        components: {
            VueDragResize,
            TextPanel
        },
        methods: {
            choseBtn() {

                console.log('2222')
            },
            //tags操作
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
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
            setValBtn(tag, parma='', _index=-1) {

                if (this._index != -1) {
                    let obj = JSON.parse(JSON.stringify(this.dragArr[this._index]))
                    obj.text = JSON.parse(JSON.stringify(tag))
                    obj.parma = parma
                    if(_index != -1){
                        obj.index = _index
                        let key =_index+1
                        let str =tag.printingName+ key
                        obj.text.printingName= str
                    }


                    this.dragArr.splice(this._index, 1, obj)
                }
            },
            //单击选中节点
            changeChild(index) {
                this._index = index
                for (let i = 0; i < this.dragArr.length; i++) {
                    if (this.dragArr[i].isActive == true) {
                        this.dragArr[i].isActive = false
                    }
                }
                this.dragArr[index].isActive = true
            },
            //节点改变宽高相关
            changeSize(newRect, index) {
                this.dragArr[index].rect = newRect
            },
            //节点变化位置
            changePosition(newRect, index) {
                this.dragArr[index].rect = newRect
            },
            //点击节点外触发取消所有的选中样式
            cancelActive(index) {
                this.dragArr[index].isActive = false
            },


            //新增打印项
            addChild() {
                let obj = {
                    text: {key: -1, isConstant: 0, printingName: '请选择对应的变量或值', printing: ''},
                    parma: '',
                    index: -1,
                    rect: {left: 500, top: 100, width: 200, height: 20},
                    isActive: true,
                }
                for (let i = 0; i < this.dragArr.length; i++) {
                    if (this.dragArr[i].isActive == true) {
                        this.dragArr[i].isActive = false
                    }
                }
                this._index = this.dragArr.length
                this.dragArr.push(obj)
            },


            //撤回按钮
            delChildBtn() {
                if (this.dragArr.length > 0) {
                    this.dragArr.splice(this.dragArr.length - 1, 1)
                } else {
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
        mounted() {

            this.printInfo = JSON.parse(localStorage.getItem('print'))
            this.dynamicTags = []



            let cnt = {
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.$constData.printType[7].key, // Byte 打印模板类型
                page: 1, // Byte 页码  1左 2右
            }

            this.$area.getPrintingTemplateByType(cnt, (res) => {
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    if (JSON.parse(res.data.c) == null) {
                        this.templateInfo = ''
                    } else {
                        this.templateInfo = JSON.parse(res.data.c)
                        this.dragArr = JSON.parse(this.templateInfo.data)
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

    .nav-btn {
        float: left;
        margin-left: 15px;
    }

    .row-box {
        background: #fff;
        padding: 15px 0;
    }

    .row-box1 {
        margin-top: 20px;
        padding: 15px;
        background: #fff;
    }

    .col-title {
        padding-left: 10px;
        line-height: 20px;
        color: #666;
        font-size: 16px;
    }

    .box-bg {
        margin: 0 auto;
        position: relative;
        width: 280mm;
        height: 200mm;
        border: 1px solid #aaa;
    }

    .bg {
        position: absolute;
        width: 280mm;
        height: 200mm;
        top: 0;
        left: 0;
        z-index: 100;
    }

    .box-val {
        position: absolute;
        cursor: pointer;
        width: 280mm;
        height: 200mm;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    .box-left {
        float: left;
        width: 138mm;
        height: 200mm;
        border-right: 1px solid #aaa;
        background: #ddd;
    }

    .box-right {
        float: left;
        width: 138mm;
        height: 200mm;
        cursor: pointer;
    }

    .box-edit {
        width: auto;
        height: 200mm;
    }

    .title-change {
        width: auto;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 5px
    }

    .title {
        color: #666;
        font-size: 16px;
        line-height: 30px;
    }

    .list {
        float: left;
        margin-left: 20px;
    }

    .list-item {
        float: left;
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

    .info-title {
        padding-top: 15mm;
        width: auto;
        color: #333;
        font-size: 6mm;
        text-align: center;
    }

    .info-number {
        margin-top: 11mm;
        font-size: 4mm;
        color: #333;
        margin-left: 70mm;

    }

    .info-name {
        width: 105mm;
        margin: 0 auto;
        margin-top: 15mm;
        height: 5mm;
    }

    .book-title {
        float: left;
        width: 30mm;

        font-size: 5mm;
        color: #666;
        height: 50px;
    }

    .book-val {
        float: left;
        width: 75mm;
        height: 5mm;
        border-bottom: 1px dashed #333;
    }

    .info-time {
        margin-left: 58mm;
        margin-top: 30mm;
    }

    .content-box {
        width: 280mm;
        height: 200mm;
        z-index: 1100;
        position: relative;
    }

    .info-table {
        width: 120mm;
        margin: 0 auto;
        margin-top: 6mm;

    }

    .table-header {
        width: 120mm;
        height: 17mm;
    }

    .item-row {
        width: 120mm;
        height: 11mm;
        border: 1px solid #aaa;

    }

    .item-box {
        float: left;
        font-size: 3mm;
        color: #333;
        text-align: center;
    }

    .item-row1 {
        width: 120mm;
        height: 6mm;
        border: 1px solid #aaa;
        border-top: none;
    }

    p {
        margin: 0;
        padding: 0;
    }

    .item-th {
        width: 120mm;
        height: 17mm;
        border: 1px solid #aaa;
        border-top: none;
        overflow: hidden;

    }

    .item-th-td {
        float: left;
        font-size: 3mm;
        color: #333;
        text-align: center;
        overflow: hidden;
    }

    .item-tr {
        width: 120mm;
        height: 8mm;
        border: 1px solid #aaa;
        border-top: none;
    }

    .table-footer {
        height: 41mm;
        width: 120mm;
        border: 1px solid #aaa;
        border-top: none;

    }

    .table-footer-left {
        float: left;
        width: 55mm;
        height: 41mm;
        border-right: 1px solid #aaa;
    }

    .table-footer-right {
        float: left;
        width: 62mm;
        height: 41mm;

    }

    .footer-title {
        width: auto;
        font-size: 3mm;
        margin-top: 2mm;
        margin-left: 2mm;
    }

    .footer-chapter {
        margin-top: 17mm;
        width: auto;
        margin-right: 4mm;
        text-align: right;
        font-size: 3mm;
    }

    .footer-time {
        width: auto;
        text-align: right;
        margin-right: 2mm;
        margin-top: 6mm;

    }

    .footer-time1 {
        width: auto;
        padding-left: 20mm;

        margin-top: 6mm;

    }

    .content-box {
        width: 280mm;
        height: 200mm;
        z-index: 1100;
        position: relative;
    }

    .title-tags {
        width: auto;

    }

    .tags {
        width: auto;
        margin-top: 10px;
        line-height: 40px;
        font-size: 14px;
        color: #666;
    }

    .item-tag {
        width: auto;
        height: 40px;
    }

    .tag-box:hover {
        background: #409eff;
        color: #fff;
    }

    .tag-box:active {
        background: #66b1ff;
        color: #fff;
    }

    .family-box {
        margin: 10px 0;

    }

    .family-btn-box {
        width: auto;
    }

    .family-title {
        line-height: 25px;
        font-size: 14px;
        color: #666;
    }

    .family-btn {
        margin-left: 15px;
    }

    .family-content-box {
        width: auto;
        margin-top: 10px;
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 5px;

    }

    .family-user-list {
        width: auto;
        line-height: 30px;
        height: 30px;
    }

    .user-tag {
        float: left;
        cursor: pointer;
        margin-left: 20px;
    }

    .user-tag:hover {
        background: #e6a23c;
        color: #fff;
    }

    .user-tag:active {
        background: #e6a23c;

        color: #fff;
    }

    .user-tag-active {
        float: left;
        cursor: pointer;
        background: #e6a23c;
        color: #fff;
        margin-left: 15px;
    }
    /*内部背景样式*/
    .box-right {
        float: left;
        width: 122mm;
        height: 180mm;
        padding: 9.5mm;

        background: #ddd;
    }

    .box-left {
        float: left;
        cursor: pointer;
        width: 122mm;
        height: 180mm;
        padding: 7mm;
        background: #fff;
        border-right: 1px solid #aaa;
    }

    .box-title {
        width: auto;
        height: 30.5mm;
        font-size: 4.5mm;
        font-weight: 600;
        line-height: 50mm;
        text-align: center;
    }

    .bg-box-head {
        width: auto;
        height: 16.35mm;
        border: 1px solid #aaa;
        border-bottom: none;
    }

    .bj-box-head-item {
        float: left;
        height: 16.35mm;
        font-size: 4mm;
        text-align: center;
        line-height: 16.35mm;
        border-right: 1px solid #aaa;
    }

    .item-tr {
        width: auto;
        height: 8.17mm;
        border: 1px solid #aaa;
        border-bottom: none;
    }



</style>
