<template>
  <!-- 这个模块，不用做的太复杂，只是一个演示读、写的过程 -->
  <div class="userInfo">
      <ul>
          <li>
              <label>姓名</label>
              <input type='text' v-model="nameinfo" />
          </li>
          <li>
              <label>电话</label>
              <input type='text' v-model="phoneinfo" />
          </li>
          <li>
              <label>邮箱</label>
              <input type='text' v-model="emilinfo" />
          </li>
          <li>
              <label>所在地</label>
              <input type='text' v-model="addressinfo" />
          </li>
          <li>
              <!-- 注意，要处理不能点击多次 -->
              <input type='button' 
                    value="提交个人信息" 
                    @click="submitMyInfo"
                    />
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'userInfo',
    data () {
        return {
            nameinfo : '请输入姓名',
            phoneinfo : '请输入电话',
            emilinfo : '邮箱 ',
            addressinfo : '地址'
        }
    },
    created(){
        this.getMyInfo();
    },
    methods:{
        // 获取个人信息
        getMyInfo(){
                axios.get('http://localhost:1258/resume/find-my-info',)
                  .then( _d =>{
                        // console.log( _d.data );
                        this.nameinfo = _d.data[0].nameinfo;
                        this.phoneinfo = _d.data[0].phoneinfo;
                        this.emilinfo = _d.data[0].emilinfo;
                        this.addressinfo = _d.data[0].addressinfo;
                  });
        },
        // 提交个人信息
        submitMyInfo(){
            axios.get('http://localhost:1258/resume/submit-my-info',{
                        params:{
                              nameinfo : this.nameinfo,
                              phoneinfo : this.phoneinfo,
                              emilinfo : this.emilinfo,
                              addressinfo : this.addressinfo
                        }
                  })
                  .then( _d =>{
                        // console.log( _d.data );
                  });
        }
    }
}
</script>


<style scoped>

  
  .userInfo{
      position: absolute;left: 10px;top: 10px;
      width: 160px;height: 340px;border-radius: 10px;
      background: #ddd;border: 1px solid #acacac;
  }
  .userInfo li{
    clear: both;width:90%;margin: 5px auto;text-align: left;
    height: 55px;font-size: 14px;line-height: 25px;overflow: hidden;
  }
  .userInfo li label,
  .userInfo li input{
    float: left;
  }
  .userInfo li input{
    border:1px solid #acacac;padding-left: 5px;
    background: #fff;color: #333;padding: 0 5px;float: left;
  }
  .userInfo li input.subBtn{
    width: 90%;background: #fff;color: #f00;
  }


  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
