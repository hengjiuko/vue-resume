<template>
  <div>
      <h1> {{msg}} </h1>
      	<div class="wrap">
      		<!-- 个人信息 -->
      		<userInfo />

      		<!-- 教育经历 -->
      		<education />
      </div>
  </div>
</template>

<script>
import userInfo from './userInfo'
import education from './education'

export default {
    name: 'resume',
    data () {
        return {
            msg:'resume在线简历编辑器'
        }
    },
    components:{userInfo, education}
}
</script>

<style scoped>
.wrap{
	  width:700px;min-height: 350px;margin:10px auto;
	  background: #eee;padding:10px;border:1px solid #ddd;
	  border-radius: 10px;position: relative;padding-left: 200px;
	}

	.logImg{
	  position: absolute;left: 10px;top: 10px;
	  width: 160px;height: 160px;overflow: hidden;border-radius: 10px;
	}
	.logImg img{ width: 180px;height: 180px; }



	/**/
	h1, h2 {
	  font-weight: normal;
	}
	ul {
	  list-style-type: none;
	  padding: 0;
	}
	li {
	  display: inline-block;
	  margin: 0 10px;
	}
	a {
	  color: #42b983;
	}
</style>