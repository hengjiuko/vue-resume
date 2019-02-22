<template>
  <div class="enterInfoWrap">
        <h1> {{msg}} </h1>
        <span class="add_education" 
            @click="isShowFn"
            title="增加教育经历按钮" >增加教育经历按钮
        </span>

        <!-- 教育经历列表 -->
        <div class="ed_result">
            <li v-for="n in educationData">
                <p>开始时间： {{n.startTime}}</p>
                <p>结束时间 ：{{n.endTime}}</p>
                <p>毕业学校： {{n.school}}</p>
                <p>专业： {{n.major}}</p>
                <p>自我评价： {{n.summary}}</p>
                <input type='button' @click="editBtn(n._id)" value="修改简历" />
                <input type='button' @click="removeBtn(n._id)" value="删除简历" />
            </li>
        </div>

        <!-- 增加教育经历的窗口 -->
        <div class="enterInfoWrap" v-if="isShow">
              <h1>增加教育经历</h1>
              <ul>
                  <li>
                      <label>开始时间</label>
                      <input type='text' v-model="startTime" />
                  </li>
                  <li>
                      <label>结束时间</label>
                      <input type='text' v-model="endTime" />
                  </li>
                  <li>
                      <label>毕业学校</label>
                      <input type='text' v-model="school" />
                  </li>
                  <li>
                      <label>专业</label>
                      <input type='text' v-model="major" />
                  </li>
                  <li>
                      <label>自我评价</label>
                      <input type='text' v-model="summary" />
                  </li>
                  <li>
                      <input type='button' @click="submitFn" value="提交" />
                      <input type='button' @click="isHideFn" value="取消" />
                  </li> 
              </ul>
        </div>

        <!-- 修改教育经历的窗口 -->
        <div class="enterInfoWrap" v-if="isEdit">
              <h1>修改教育经历</h1>
              <ul>
                  <li>
                      <label>开始时间</label>
                      <input type='text' v-model="startTime" />
                  </li>
                  <li>
                      <label>结束时间</label>
                      <input type='text' v-model="endTime" />
                  </li>
                  <li>
                      <label>毕业学校</label>
                      <input type='text' v-model="school" />
                  </li>
                  <li>
                      <label>专业</label>
                      <input type='text' v-model="major" />
                  </li>
                  <li>
                      <label>自我评价</label>
                      <input type='text' v-model="summary" />
                  </li>
                  <li>
                      <input type='button' @click="submitEditFn" value="提交修改" />
                      <input type='button' @click="hideEditBtn" value="取消修改" />
                  </li> 
              </ul>
        </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'education',
    data () {
        return {
              msg:'教育经历',
              startTime:'',
              endTime:'',
              school:'',
              major:'',
              summary:'',

              isShow:false,
              educationData:'',

              itemEditId:'',
              isEdit : false
        }
    },
    created(){
        this.queryEducation();
    },
    methods:{
        // 增加教育窗口，显示 
        isShowFn(){
              this.isShow = true;
        },
         // 增加教育窗口，隐藏
        isHideFn(){
              this.isShow = false;
        },
        // 增加教育经历
        submitFn(){
              axios.get('http://localhost:1258/resume/resume-insert',{
                        params:{
                              startTime : this.startTime,
                              endTime : this.endTime,
                              school : this.school,
                              major : this.major,
                              summary : this.summary
                        }
                  })
                  .then( _d =>{
                        // console.log( _d.data );
                        // 更新页面
                        this.queryEducation();
                        this.isHideFn();

                        // 把增加的各个输入框，置空
                        this.startTime = '';
                        this.endTime = '';
                        this.school = '';
                        this.major = '';
                        this.summary = '';
                  });
        },
        // 获取教育信息
        queryEducation(){
              axios.get('http://localhost:1258/resume/education-list')
                  .then( _d =>{
                        console.log( _d.data );
                        this.educationData = _d.data;
                  });
        },
        // 删除简历
        removeBtn( _idx ){
              axios.get('http://localhost:1258/resume/remove-data',{
                        params:{
                             '_id' : _idx
                        }
                  })
                  .then( _d =>{
                        // console.log( _d.data );
                        // 更新页面
                        this.queryEducation();

                        // 把增加的各个输入框，置空
                        this.startTime = '';
                        this.endTime = '';
                        this.school = '';
                        this.major = '';
                        this.summary = '';
                  });
        },
        // 修改简历，这其实是根据id获取，然后写入到简历修改的dom中
        editBtn( _itemId ){
              this.itemEditId = _itemId;

            axios.get('http://localhost:1258/resume/education-list-id',{
                        params : { "_id" :  _itemId} 
                  })
                  .then( _d =>{
                        console.log( _d.data );

                        this.startTime = _d.data.startTime
                        this.endTime = _d.data.endTime
                        this.school = _d.data.school
                        this.major = _d.data.major
                        this.summary = _d.data.summary
                          
                          // 修改简历窗口，根据id获得数据之后，它才能显示
                          this.isEdit = true;
                  });
        },
        // 取消修改
        hideEditBtn(){
            this.isEdit = false;
        },
        // 确认修改，这其实是根据id更新
        submitEditFn(){
            // 这里要使用 this.itemEditId

            axios.get('http://localhost:1258/resume/edit-data-id',{
                        params : {
                            "_id" :  this.itemEditId,
                            "editMsg" : {
                                   startTime : this.startTime,
                                    endTime : this.endTime,
                                    school : this.school,
                                    major : this.major,
                                    summary : this.summary
                            }
                        } 
                  })
                  .then( _d =>{
                        console.log( _d.data );
                          this.queryEducation();
                          
                          // 修改简历窗口，关闭
                          this.isEdit = false;

                          // 把增加的各个输入框，置空
                        this.startTime = '';
                        this.endTime = '';
                        this.school = '';
                        this.major = '';
                        this.summary = '';
                  });
        }
    }
}
</script>


<style scoped>
ol,ul,li{list-style: none;}
  .add_education{
    background: #ddd;padding:5px;border-radius: 5px;
    cursor: pointer;
  }
  .ed_result{
      width:95%;margin:10px auto;overflow: hidden;
  }
  .ed_result h1{font-size: 22px;}
  .ed_result li{
    background: #acacac;border-radius: 10px;padding-top: 10px;
    float: left;width: 40%;margin-right:10px!important;
    clear:none!important;
  }
  .ed_result li p{
    clear: both;padding:5px 10px;font-size: 14px;color: #fff;
    background: #666;border-radius: 10px;margin: 10px;
  }
  /**/
  .enterInfoWrap{
    /*width:80%;*/
    background: #fff; 
    /*position: absolute;top: 10px;left: 56px;z-index: 5;*/
    overflow: hidden;
    border:1px solid #ddd;border-radius: 10px;
    padding:20px 10px;
  }
  .enterInfoWrap ul{clear: both;display: block;}
  .enterInfoWrap h1{
    clear: both;font-size: 24px;font-weight: bold;text-align: center;
    display: block;margin:10px 0;
  }
  .enterInfoWrap li{
    clear: both;margin:10px 0;
    float: left;
  }
  .enterInfoWrap li label{
    position: static;
  }

  .educationWrap{
    width: 98%; min-height: 100px; background: #ddd;
    border-radius: 10px;margin:10px auto;position: relative;
    border: 1px solid #acacac;
  }
  .educationWrap label{
    position: absolute;top: 10px;left: 10px;
    height: 40px;line-height: 30px;
    padding-left: 35px;
    background-size: 30px;
    background-repeat: no-repeat;
  }
  .educationWrap label.bg_1{
      background:#ddd;
      border:1px solid #0f0;
  }
  .educationWrap span{
    position: absolute;top: 10px;right: 10px;
    width: 30px;height: 30px;border-radius: 100%;
    display: block;cursor: pointer;
    background: #ddd;
  }
</style>
