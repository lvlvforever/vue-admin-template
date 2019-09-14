<template lang="html">
<el-container>
    <el-main>
        <el-row >
        </el-row>

        <el-row>
                      <el-divider content-position="left" class="area-title">用户行为</el-divider>

            <el-col :span="24">
                <el-card class="box-card" shadow="hover">
                
                        <el-button type="success" size="small" round v-for="(action,index) in actions" :key="index" @click="addAction(action)" >{{ action.name}}</el-button>
                    
                </el-card>
            </el-col>
        </el-row>



        <el-row v-model="action">
        <el-divider content-position="left" class="area-title">行为参数</el-divider>

        

 <el-col :span="8" >
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>基本属性</span>
                    </div>
                    <el-form  label-width="100px" v-show="action.length != 0">
                        <el-form-item label="id">
                            <span>{{action.id}}</span>
                        </el-form-item>
                         <el-form-item label="类名">
                             <span>{{action.clazz}}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{action.name}}</span>
                        </el-form-item>
                        <el-form-item label="功能">
                            <span>{{action.description}}</span>
                        </el-form-item>
                    </el-form>
                </el-card>

            </el-col>


        <el-col :span="8" v-for="method in action.methods">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <div>{{method.name}}</div>
                    </div>
                <el-form  label-width="100px">
                        <el-form-item label="方法名称">
                            <span>{{method.methodName}}</span>
                        </el-form-item>
                    
                
                         <div v-show="method.inParams && method.inParams.length != 0" style="margin-bottom:10px;">入参</div>

                        <el-form-item v-for="(item,index) in method.inParams" :label="item.name">
                            <el-col :span="4">
                                <span>{{item.type}}</span>
                            </el-col>
                            <el-col :span="18">
                                   <el-input v-model="item.value" :placeholder="item.description"></el-input>
                            </el-col>

                        </el-form-item>

                        <div style="margin-bottom:10px;">返回值</div>
                        <div>{{method.returnValue}}</div>
                        <el-divider></el-divider>

                    </el-form>

                </el-card>
            </el-col>






        </el-row>

        <el-row :gutter="20">
        <el-divider content-position="left" class="area-title">规则设置</el-divider>

            <el-col :span="8">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>前置条件</span>
                        <el-radio style="float: right; padding: 3px 0" type="text" v-model="currentArea"  label="preArea"></el-radio>
                    </div>
                    <div class="text item" v-for="(action,index) in triggerEvent" :key="index">
                        <el-button type="success" round @click="query(triggerEvent,action.id)">{{ action.name}}</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="remove(triggerEvent,action.id)"></el-button>
                        <span></span>
                        <el-divider></el-divider>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>约束条件</span>
                        <el-radio style="float: right; padding: 3px 0" type="text" v-model="currentArea"  label="constraintArea"></el-radio>

                    </div>
                    <div class="text item" v-for="(action,index) in constraintCondition" :key="index">
                        <el-button type="success" round @click="query(constraintCondition,action.id)">{{ action.name}}</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="remove(constraintCondition,action.id)"></el-button>

                        <el-divider></el-divider>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="8">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>下发奖励</span>
                        <el-radio style="float: right; padding: 3px 0" type="text" v-model="currentArea"  label="prizeArea"></el-radio>
                    </div>
                    <div class="text item" v-for="(action,index) in prize" :key="index">
                        <el-button type="success" round @click="query(prize,action.id)">{{ action.name}}</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="remove(prize,action.id)"></el-button>
                        <el-divider></el-divider>
                    </div>
                </el-card>
            </el-col>

        </el-row>
 <el-row :gutter="20">
        <el-divider content-position="left" class="area-title">规则属性设置 </el-divider>
        <el-col :span="4">
            <el-form>
                <el-form-item label="开始时间">
                    <el-input v-model="setting.startTime" placeholder="规则的生效时间"></el-input>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-model="setting.endTime" placeholder="规则的失效时间"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>


        </el-col>



</el-row>

        

    </el-main>
</el-container>
</template>

<script>
import { getUserActionList } from '@/api/rule'

export default {
    data() {
        return {
            actions: [],
            triggerEvent: [],
            constraintCondition: [],
            prize: [],
            operationArea: "前置条件",
            action:{},
            currentArea:"preArea",
            setting:{
                startTime:null,
                endTime:null
            }
        };
    },
    mounted:function(){
            this.refreshUserAction()
    },
    methods: {
        
        refreshUserAction: function () {
            let that = this
          getUserActionList().then((response) =>{
            that.actions = response.actions
            console.log(response.actions)
           }).catch(((response) => {
               console.log(response)
           }))
        },

        addAction: function (action) {
            console.log(this.currentArea);
            if ("preArea" === this.currentArea) {
                this.triggerEvent.push(action);
            } else if ("constraintArea" === this.currentArea) {
                this.constraintCondition.push(action);
            } else if ("prizeArea" === this.currentArea) {
                this.prize.push(action);
            }
        },
        remove: function (data, id) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    data.splice(i, 1)
                }
            }
        },
        query:function(data,id){
          for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    this.action = data[i]
                }
            }
        },
        onSubmit:function(){
            this.$notify({
                title: '提交成功',
                type: 'success',
                message: '规则创建成功!',
                duration: 5000
            })
        }
    }
};
</script>

<style lang="css" scoped>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 10px; */
}

body>.el-container {
    margin-bottom: 40px;
}


.box-card {
    /* width: 480px; */
    margin-left: 20px;
}
.area-title .el-divider__text{
    font-size: 30px;
    border-radius: 10px 10px 10px 10px;
    background: #9292da;
}

</style>
