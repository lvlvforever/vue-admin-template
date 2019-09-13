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



        <el-row :model="action">
        <el-divider content-position="left" class="area-title">行为参数</el-divider>

        <el-col :span="8" >
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>行为完成标志</span>
                    </div>
                    <div>
                <el-form  label-width="100px" v-for="input in action.inputs">
                        <el-form-item label="名称">
                            <span>{{input.name}}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                            <span>{{input.description}}</span>
                        </el-form-item>
                        <el-form-item label="方法">
                            <span>{{input.methodName}}</span>
                        </el-form-item>
                        
                         <span v-show="input.inParams && input.inParams.length != 0">入参</span>

                        <el-form-item v-for="(item,index) in input.inParams" :label="item.name" prop="name">
                            <el-input v-model="item.value" :placeholder="item.description"></el-input>
                        </el-form-item>



                        <span>返回值</span>
                        <el-form-item label="说明">
                            <span>{{input.returnValue}}</span>
                        </el-form-item>

                        <!-- <el-form-item v-for="(input,index) in event.inputs" :label="input.name" >
                            <el-input v-model="input.description" :disabled="true" ></el-input>
                        </el-form-item> -->
                        <el-divider></el-divider>

                    </el-form>

                        
                    </div>
                    
                    


                </el-card>

            </el-col>

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

<el-col :span="8" >
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>输出</span>
                    </div>
                    <el-form  label-width="100px" v-for="output in action.outputs">
                        <el-form-item label="名称">
                            <span>{{output.name}}</span>
                        </el-form-item>
                        <el-form-item label="描述">
                             <span>{{output.description}}</span>
                        </el-form-item>
                        <el-form-item label="方法">
                             <span>{{output.methodName}}</span>
                        </el-form-item>
                        <span v-show="output.inParams && output.inParams.length != 0">入参</span>
                        <el-form-item v-for="(value,key,index) in output.inParams" :label="key">
                            <el-input v-model="output.inParams[key]"></el-input>
                        </el-form-item>
                        <h4>返回值</h4>
                          <el-form-item label="说明">
                              <span>{{output.returnValue}}</span>
                        </el-form-item>
                        <!-- <el-form-item v-for="(input,index) in event.inputs" :label="input.name" >
                            <el-input v-model="input.description" :disabled="true" ></el-input>
                        </el-form-item> -->
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
            that.actions = response.data.actions
            console.log(response.data.actions)
           }).catch(((response) => {
               console.log(response)
           }))
            // this.actions = [{
            //     id: 1,
            //     name: "用户付费",
            //     clazz:"UserPayed",
            //     description:"",
            //     methods:[
            //         {
            //             name:"用户付费金额",
            //             methodName:"checkPayedCount",
            //             inParams:[
            //                 {
            //                     name:"count",
            //                     type:"Long",
            //                     description:"用户付费的数量(书币/阅点)"
            //                 }


            //             ],
            //             returnValue:"true=用户付费了count书币/阅点 false=未完成付费"
            //         }

            //     ]
            // },
            // ];
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
