<template>
    <div>
        <div class="text-box">
            <div class="text-title">选择字体</div>
            <div class="item-box">
                <el-select v-model="fontStyle.fontFamily" @change="changeFontStyle" placeholder="请选择字体" size="small">
                    <el-option
                            v-for="(item,index) in fontFamilyList"
                            :key="index"
                            :label="item.val"
                            :value="item.key"

                    ></el-option>
                </el-select>
            </div>
            <div class="text-title" style="margin-left:20px">选择字号</div>
            <div class="item-box">
                <el-select v-model="fontStyle.fontSize" placeholder="请选择字号" size="small" @change="changeFontStyle">
                    <el-option
                            v-for="(item,index) in fontSizeList"
                            :key="index"
                            :label="item.fontSize"
                            :value="item.fontSize"

                    ></el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextPanle",
        data() {
            return {
                fontFamilyList: [
                    {
                        key: " SimSun",
                        val: "宋体"
                    },
                    {
                        key: " SimHei",
                        val: "黑体"
                    },
                    {
                        key: "FangSong",
                        val: "仿宋"
                    },
                    {
                        key: " Microsoft Yahei",
                        val: "微软雅黑"
                    },
                    {
                        key: " Microsoft JhengHei",
                        val: "微软正黑体 "
                    },
                    {
                        key: "KaiTi",
                        val: "楷体"
                    },
                    {
                        key: " NSimSun",
                        val: "宋体"
                    },
                    {
                        key: " SimSun",
                        val: "新宋体"
                    },
                    {
                        key: " PingFang SC",
                        val: "苹方"
                    },

                    {
                        key: " STHeiti",
                        val: "华文黑体"
                    },
                    {
                        key: " STKaiti",
                        val: "华文楷体"
                    },
                    {
                        key: " STXingkai",
                        val: "华文行楷  "
                    },
                    {
                        key: "  STFangsong",
                        val: "华文仿宋 "
                    },
                    {
                        key: "STLiti",
                        val: "华文隶书"
                    },

                    {
                        key: "Xingkai SC",
                        val: "行楷-简"
                    },
                    {
                        key: "Songti SC",
                        val: "宋体-简"
                    },
                    {
                        key: "YouYuan",
                        val: "幼圆"
                    },
                    {
                        key: "LiSu",
                        val: "隶书"
                    },
                    {
                        key: "FZShuTi",
                        val: "方正舒体 "
                    },
                    {
                        key: "Arial",
                        val: "Arial"
                    },
                    {
                        key: "Avant Garde",
                        val: "Avant Garde"
                    },
                    {
                        key: "Calibri",
                        val: "Calibri"
                    },
                    {
                        key: "Candara",
                        val: "Candara"
                    },
                    {
                        key: "Futura",
                        val: "Futura"
                    },
                    {
                        key: "Helvetica",
                        val: "Helvetica"
                    }
                ],
                fontSizeList: [
                    {fontSize: "1mm"},
                    {fontSize: "2mm"},
                    {fontSize: "3mm"},
                    {fontSize: "3.5mm"},
                    {fontSize: "4mm"},
                    {fontSize: "4.5mm"},
                    {fontSize: "5mm"},
                    {fontSize: "5.5mm"},
                    {fontSize: "6mm"},
                    {fontSize: "7mm"},
                    {fontSize: "7.5mm"},
                    {fontSize: "8mm"},
                    {fontSize: "8.5mm"},
                    {fontSize: "9mm"},
                    {fontSize: "9.5mm"},
                    {fontSize: "10mm"}
                ],
                fontStyle: { fontFamily: "FangSong", fontSize: "4mm" },
            };
        },
        methods: {
            changeFontStyle() {
                this.$emit('changeStyle', this.fontStyle)
            }
        }
    };
</script>

<style scoped lang="scss">
    .text-box {
        width: 400px;
        height: 40px;
        line-height: 40px;
    }

    .text-title {
        float: left;
        width: 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #666;
        font-size: 14px;
    }

    .item-box {
        float: left;
        width: 100px;
        height: 40px;
        line-height: 40px;
    }
</style>
