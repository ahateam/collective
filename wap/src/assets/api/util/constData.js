
//localStorage
//  user:用户完整信息，包含组织信息
//  userInfo:用户信息,不包含组织信息
//  voteInfo:创建表决时用到的表决的信息，包含 meetId voteId
//  meet:创建表决时的项目的所有数据的存储

//  vote:普通用户投票时用到的表决信息，包含meetInfo voteInfo

//userPosition：修改用户职务时，所传的用户信息对象

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
    SINGLE:{v:"0",t:"单选"},
    MULTIPLE:{v:"1",t:"多选"},
    MULTIPLE_BALLOT:{v:"2",t:"按用户持有票数限制的多选"},
};

/**
 * 选项（弃权，赞同，反对）
 */
const opt = {
    OPT_ABSTAINED: 0,
    OPT_AGREE: 1,
    OPT_DISAGREE: 2,
}

const crowd = { // zyxhj.economy.domain.VoteProject$CROWD
    ALL:{v:"0",t:"全部"},
    SHAREHOLDER:{v:"1",t:"股东"},
    REPRESENTATIVE:{v:"2",t:"股东代表"},
    DIRECTOR:{v:"3",t:"董事会"},
    SUPERVISOR:{v:"4",t:"监事会"},
};
const status = { // zyxhj.economy.domain.Vote$STATUS
    VOTING:{v:"0",t:"投票中"},
    WAITING:{v:"1",t:"等待中"},
    INVALID:{v:"2",t:"已作废"},
    DONE:{v:"3",t:"已结束"},
};

const permission =[
    {key:100,val:'发起投票'},    {key:102,val:'职务管理'},
]



export default {
    share,
    duty,
    visor,
    type,
    opt,
    crowd,
    status,
    permission
}
