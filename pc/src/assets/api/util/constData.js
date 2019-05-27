
/**
 *股东类型
 */
const share = {
    SHARE_NONE: 20,// 非股东
    SHARE_SHAREHOLDER: 21, //股东
    SHARE_REPRESENTATIVE: 22,//股东代表
};

/**
 * 董事会成员类型
 */
const duty = {
    DUTY_NONE: 10,//非董事
    DUTY_DIRECTOR: 11,// 董事
    DUTY_CHAIRMAN: 12,// 董事长（主席）
    DUTY_VICE_CHAIRMAN: 13,// 副董事长
};

/**
 * 监事会成员类型
 */
const visor = {
    VISOR_NONE: 10,// 非监事
    VISOR_SUPERVISOR: 11,// 监事
    VISOR_CHAIRMAN: 12,// 监事长（主席）
    VISOR_VICE_SUPERVISOR: 13,// 副监事长
}

/**
 *投票类型
 */
const type = {
    TYPE_SINGLE: 0,//单选
    TYPE_MULTIPLE: 1,//多选
};

/**
 * 选项（弃权，赞同，反对）
 */
const opt = {
    OPT_ABSTAINED: 0,
    OPT_AGREE: 1,
    OPT_DISAGREE: 2,
}

const contentType=[
    {v:"0",t:"相册"},
    {v:"1",t:"音频"},
    {v:"2",t:"短视频"},
    {v:"3",t:"视频"},
    {v:"4",t:"直播"},
    {v:"5",t:"H5文本"},
    {v:"6",t:"帖子"},
    {v:"7",t:"内容集合"},
]


/*
* 组织等级
*
* */
const orgLevel = [
    {key:1,val:'省级'}, {key:2,val:'市级'}, {key:3,val:'区级'}, {key:4,val:'合作社'},{key:5,val:'其他'}
]
/*
* 操作权限
* */
const permission = [
    {key:100,val:'发起投票'}
]

/**
* 审批类型
* */
const examineType = [{key:0,val:'组织申请'},{key:1,val:'分户申请'},{key:2,val:'股权变更申请'}]
const examineStatus = [{key:0,val:'等待组织审核'},{key:1,val:'组织审核通过，等待区级审核'},{key:2,val:'区级审核通过'},{key:3,valv:'制证完成'},{key:4,val:'制证失败'}]
/**
 * 分户常量
 * */
const tab = [{key:0,val:'移除'},{key:1,val:'移入'}]
const familyType = [
    {key:0,val:'createFamily'}, {key:1,val:'leaveFamily'}, {key:2,val:'addFamily'}, {key:3,val:'deleteFamily'}, {key:4,val:'moveFamily'},
]


export default {
    share,
    duty,
    visor,
    type,
    opt,
    contentType,
    orgLevel,
    permission,
    examineType,
    examineStatus,
    tab,
    familyType

}
