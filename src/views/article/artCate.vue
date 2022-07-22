<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateShowDialogBtnFn">添加分类</el-button>
        <el-dialog title="添加文章分类" :visible.sync="dialogVisible" width="35%" @closed="onAddClosedFn">
          <!-- 添加的表单 -->
          <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
            <el-form-item label="分类名称" prop="cate_name">
              <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="分类别名" prop="cate_alias">
              <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelFn">取 消</el-button>
            <el-button type="primary" @click="confirmFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分类数据列表 -->
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作">
          <!-- scope对象:{row对象} -->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="removeFn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//  经验：如果用同一个按钮，想要状态区分
// 1.定义一个标记变量isEdit（true编辑，false新增），还要定义本次要编辑的数据唯一id值，editId
// 2.在点击修改的时候，isEdit改为true，editId保存要修改的数据id
// 3.点击新增按钮的时候，isEdit改为false，editId置空
// 4.在点击保存按钮时(确认按钮)，可以用isEdit变量做区分
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, delArtCateAPI } from '@/api/index.js'
export default {
  name: 'ArtCate',
  data () {
    return {
      // 文章的分类列表
      cateList: [],
      dialogVisible: false, // 对话框的显示与隐藏
      editId: '', // 保存要修改的文章id的值
      isEdit: false, // 保存编辑状态（false新增，true编辑）
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    // 调用获取文章分类
    this.initCateListFn()
  },
  methods: {
    // 获取文章分类
    async initCateListFn () {
      const res = await getArtCateListAPI()
      console.log(res)
      this.cateList = res.data.data
    },
    // 添加分类按钮点击事件
    addCateShowDialogBtnFn () {
      this.dialogVisible = true // 对话框显示
      this.isEdit = false // 状态改为新增状态
      this.editId = '' // 置空修改编辑的id
    },
    // 确认关闭对话框
    confirmFn () {
      // 表单预校验
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          //  校验成功
          if (this.isEdit) {
            // 修改信息调用api
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            console.log(res)
            if (res.code !== 0) return this.$message.error('更新分类失败！')
            this.$message.success('更新成功！')
          } else {
            // 新增文章调用api
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error('添加分类失败！')
            this.$message.success('添加分类成功！')
          }
          // 重新请求列表数据
          this.initCateListFn()
          // 关闭对话框
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 取消关闭对话框
    cancelFn () {
      this.dialogVisible = false
    },
    // 对话框关闭回调
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },
    // 修改分类按钮-- - 点击事件（先做数据回显）
    // 修改-按钮点击事件
    updateFn (obj) {
      console.log(obj)
      this.editId = obj.id // 保存要编辑的文章分类ID
      this.isEdit = true // 设置编辑状态
      this.dialogVisible = true // 让对话框显示
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    async removeFn (id) {
      const { data: res } = await delArtCateAPI(id)
      if (res.code !== 0) return this.$message.error('删除分类失败！')
      this.$message.success('删除分类成功！')
      // 重新请求列表数据
      this.initCateListFn()
    }

  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
