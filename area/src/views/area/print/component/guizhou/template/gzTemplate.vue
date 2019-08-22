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
                                        合作社基本资料：
                                    </span>
                                    <div class="list">
                                        <el-tag v-for="(item,index) in tags.orgInfo"
                                                :key="index"
                                                style="cursor: pointer"
                                                class="tag-box"
                                                @click="setValBtn(item,'org')">
                                            {{item.printingName}}
                                        </el-tag>
                                    </div>
                                </div>
                            </div>

                            <div class="family-box">
                                <div class="family-btn-box">
                                    <div class="family-title">
                                        家庭户基本资料：
                                        <el-button type="primary" size="mini" class="family-btn" @click="addUserBtn">
                                            新增家庭成员
                                        </el-button>
                                    </div>
                                </div>
                                <div class="family-content-box" v-if="newUserList.length!=0">
                                    <div class="family-user-list">
                                        <div v-for="(item,index) in newUserList">
                                            <el-tag type="warning" :class="userActive==index?'user-tag-active':'user-tag'" @click="changeUserBtn(index)">
                                                用户{{index+1}}
                                            </el-tag>
                                        </div>
                                    </div>

                                    <div style="width: auto;margin-top: 20px;line-height: 25px;margin-bottom: 10px">
                                        <div class="list">
                                            <el-tag v-for="(item1,index1) in newUserList[userActive]"
                                                    :key="index1"
                                                    style="cursor: pointer"
                                                    class="tag-box"
                                                    @click="setValBtn(item1,'user',userActive)">
                                                用户{{userActive+1}}.{{item1.printingName}}
                                            </el-tag>
                                        </div>
                                    </div>
                                </div>
                            </div>


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
                                            @click="setValBtn(tag)">
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
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增常用值
                                    </el-button>

                                </div>
                            </div>

                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-col :span="24" style="text-align: right">
                    <el-button type="primary" @click="addChild">新增打印项</el-button>
                    <el-button type="primary" v-print="'#printBox'">打印预览</el-button>
                    <el-button type="success" @click="createPrint" v-if="isEdit == false">保存为打印模板</el-button>
                    <el-button type="success" @click="editPrint" v-if="isEdit == true">保存为打印模板</el-button>
                    <el-button type="danger" @click="delChildBtn">撤 回</el-button>
                </el-col>
            </el-row>


            <el-row style="margin-top: 20px">
                <el-col :span="24">
                    <div class="box-bg">
                        <div class="bg">
                            <div class="box-left">

                            </div>
                            <div class="box-right">
                                <div class="box-bg-title">股东基本信息登记</div>
                                <div class="bg-info-table">
                                    <div class="bg-info-head">
                                        <div class="bg-info-row">
                                            <div class="bg-row-col-title">
                                                持证人(户主)
                                                <br>姓名
                                            </div>
                                            <div class="bg-row-col-text">

                                            </div>
                                            <div class="bg-row-col1-title">
                                                性别
                                            </div>
                                        </div>
                                        <div class="bg-info-row">
                                            <div class="bg-row-col-title" style="line-height: 9.5mm;text-align: center">
                                                家庭住址
                                            </div>
                                        </div>
                                        <div class="bg-info-row">
                                            <div class="bg-row-col-title" style="line-height: 9.5mm;text-align: center">
                                                集体组织名称
                                            </div>
                                        </div>
                                        <div class="bg-info-row2">
                                            <div class="bg-info-row2-title">
                                                <p>集体资产</p>
                                                <p>量化总股数</p>
                                            </div>
                                            <div class="bg-row2-item">
                                                <div class="bg-row2-item-title">
                                                    资产股
                                                </div>
                                            </div>
                                            <div class="bg-row2-item">
                                                <div class="bg-row2-item-title" style="line-height: 4.7mm">
                                                    其中原社资产股
                                                </div>
                                            </div>
                                            <div class="bg-row2-item">
                                                <div class="bg-row2-item-title">
                                                    资源股
                                                </div>
                                            </div>
                                            <div class="bg-row2-item" style="width: auto;border-right: none">
                                                <div class="bg-row2-item-title" style="line-height: 4.7mm">
                                                    其中原社资产股
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-info-row">
                                            <div class="bg-row-col-title" style="line-height: 9.5mm">
                                                本户持有股份数
                                            </div>
                                            <div class="bg-row-col1-title">
                                                资产股
                                            </div>
                                            <div class="bg-row-col1-title">

                                            </div>
                                            <div class="bg-row-col1-title">
                                                资源股
                                            </div>
                                        </div>
                                        <div class="bg-info-row">
                                            <div class="bg-row-col-title" style="line-height: 9.5mm">
                                                股东姓名
                                            </div>
                                            <div class="bg-row-col3-title">
                                                性别
                                            </div>
                                            <div class="bg-row-col4-title">
                                                身份证号
                                            </div>
                                            <div class="bg-row-col1-title" style="border-right: none">
                                                与户主关系
                                            </div>
                                        </div>
                                        <div class="item-tr" v-for="(item,index) in userList" :key="index" :style="index==userList.length-1?{borderBottom:'1px solid #aaa'}:''">
                                            <div class="bg-row-col-title"  style="height:8.45mm;line-height: 8.45mm">

                                            </div>
                                            <div class="bg-row-col3-title" style="height:8.45mm;line-height: 8.45mm">

                                            </div>
                                            <div class="bg-row-col4-title"  style="height:8.45mm;line-height: 8.45mm">

                                            </div>
                                            <div class="bg-row-col1-title" style="border-right: none;height:8.45mm;line-height: 8.45mm">

                                            </div>
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
                                        @dragging="changePosition($event,index)"
                                >
                                    <span style="font-size: 4mm;color: #333;font-family: FangSong">{{item.text.printingName}}</span>
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

    export default {
        name: "printTemplate",
        data() {
            return {
                //判断是否是修改操作
                isEdit: false,
                templateInfo: '',

                id: '',
                tags: [],
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                userList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],


                //节点移动相关
                dragArr: [],
                _index: -1,

                //处理批量用户相关
                newUserList: [],
                userActive:-1,

            }
        },
        components: {
            VueDragResize
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
            //保存为打印模板
            createPrint() {
                let cnt = {
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    data: JSON.stringify(this.dragArr), // String 模板数据
                    type: this.$constData.printType[4].key, // Byte 模板类型
                    page: 2, // Byte 左右页  1为左  2为右
                }
                this.$area.createPrintingTemplate(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.$message.success('操作成功')
                    } else {
                        this.$message.error('/操作失败')
                    }
                    this.$router.push('/areaPrintBook')
                })
            },
            //保存修改信息
            editPrint() {
                let cnt = {
                    prTeId: this.templateInfo.id,
                    orgId: localStorage.getItem('orgId'), // Long 组织编号
                    data: JSON.stringify(this.dragArr), // String 模板数据
                    type: this.$constData.printType[4].key, // Byte 模板类型
                    page: 2, // Byte 左右页  1为左  2为右
                }

                console.log(cnt)
                this.$area.editPrintingTemplate(cnt, (res) => {
                    if (res.data.rc == this.$util.RC.SUCCESS) {
                        this.$message.success('操作成功')
                    } else {
                        this.$message.error('/操作失败')
                    }
                    this.$router.push('/areaPrintBook')
                })

            },

            //新增家庭用户批量变量
            addUserBtn() {
                this.newUserList.push(this.tags.userInfo)
                console.log(this.tags.userInfo);

                this.userActive = this.newUserList.length-1
            },
            //选中其他用户
            changeUserBtn(_index){
                this.userActive = _index
            }

        },
        mounted() {

            this.dynamicTags = JSON.parse(JSON.stringify(this.$constData.printConstant))
            this.$area.getPrintingType({}, (res) => {
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    this.tags = this.$util.tryParseJson(res.data.c)
                } else {
                    this.tags = []
                }

                console.log(this.tags)
            })


            let cnt = {
                orgId: localStorage.getItem('orgId'), // Long 组织编号
                type: this.$constData.printType[4].key, // Byte 打印模板类型
                page: 2, // Byte 页码  1左 2右
            }
            this.$area.getPrintingTemplateByType(cnt, (res) => {
                if (res.data.rc == this.$util.RC.SUCCESS) {
                    if (JSON.parse(res.data.c) == null) {
                        this.templateInfo = ''
                        this.isEdit = false
                    } else {
                        this.isEdit = true
                        this.templateInfo = JSON.parse(res.data.c)
                        this.dragArr = JSON.parse(this.templateInfo.data)
                    }
                }
                console.log(this.templateInfo)

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
        height: 100px;
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

        cursor: pointer;
    }
    .box-bg-title {
        width: auto;
        height: 12.5mm;
        text-align: center;
        font-size: 4.5mm;
        font-weight: 600;
        color: #333;
    }

    .bg-info-table {
        width: auto;
    }

    .bg-info-head {
        width: auto;
        height: 67mm;
    }

    .bg-info-row {
        width: auto;
        height: 9.5mm;
        font-size: 4mm;
        border: 1px solid #aaa;
        border-bottom: none;
    }

    .bg-row-col-title {
        float: left;
        width: 34mm;
        height: 9.5mm;
        text-align: center;
        border-right: 1px solid #aaa;
    }

    .bg-row-col-text {
        float: left;
        width: 43.5mm;
        height: 9.5mm;
        border-right: 1px solid #aaa;
    }
    .bg-row-col1-title{
        float: left;
        width: 21.5mm;
        height: 9.5mm;
        border-right: 1px solid #aaa ;
        text-align: center;
        line-height: 9.5mm;
    }
    .bg-info-row2{
        width: auto;
        height: 19mm;
        font-size: 4mm;
        border: 1px solid #aaa;
        border-bottom: none;
    }
    .bg-info-row2-title{
        float: left;
        width: 34mm;
        height: 19mm;
        font-size: 4mm;
        text-align: center;
        line-height: 4mm;
        border-right: 1px solid #aaa;
    }
    .bg-row2-item{
        float: left;
        width: 21.5mm;
        height: 19mm;
        text-align: center;
        line-height: 9.5mm;
        border-right: 1px solid #aaa;
    }
    .bg-row2-item-title{
        width: 21.5mm;
        height: 9.5mm;
        border-bottom: 1px solid #aaa;
    }
    .bg-row-col3-title{
        float: left;
        width: 10.87mm;
        height: 9.5mm;
        line-height: 9.5mm;
        border-right: 1px solid #aaa;
        text-align: center;
    }
    .bg-row-col4-title{
        float: left;
        width: 54mm;
        height: 9.5mm;
        line-height: 9.5mm;
        border-right: 1px solid #aaa;
        text-align: center;
    }
    .item-tr{
        width:auto ;
        height: 8.45mm;
        border: 1px solid #aaa;
        border-bottom: none;
    }


</style>
