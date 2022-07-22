<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img class="the_img" src="../../assets/images/avatar.jpg" alt="" v-if="!this.avatar" />
      <img class="the_img" alt="" v-else :src="this.avatar" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="upLoad">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateAvatarAPI } from '@/api/index.js'
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片
    chooseImg () {
      this.$refs.iptRef.click()
    },
    // 选择文件
    onFileChange (e) { // 原生的时间对象
      const files = e.target.files
      if (files.length === 0) {
        // 证明知识打开了窗口，但是没有选择文件
      } else {
        console.log(files[0])
        // 纯前端浏览器点击文件图片预览的方式
        // 方法1：文件转成base64位字符串（可以发送给后台）
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          this.avatar = e.target.result
        }
        // 方法2：文件转为内存临时地址（不能发送给给后台）
        // this.avatar = URL.createObjectURL(files[0])
      }
    },
    // 上传图片
    async upLoad () {
      const { data: res } = await updateAvatarAPI(this.avatar)
      if (res.code !== 0) return this.$message.error(res.message)
      // 更新成功
      this.$message.success(res.message)
      // 重新让vuex获取后台的数据
      this.$store.dispatch('getUserInfoAction')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}

.preview {
  object-fit: cover;
}

.the_img {
  width: 350px;
  height: 350px;
}
</style>
