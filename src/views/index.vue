<template>
  <div class="index">
    <div class="head">
      <h1 class="head_title">RUI ICON</h1>
      <h4 class="head_txt">
        提供在线图标链接，用于个人NAS设备显示使用
      </h4>
      <div style="max-width: 400px;display: flex;">
        <el-input
        v-model="data.search"
        placeholder="搜索图标"
        class="search"
        size="large"
        @keyup.enter="handleSearch"
      />
      <el-button
        class="bt_search"
        :icon="Search"
        @click="handleSearch"
        round
        size="large"
        color="#dcab78"
      />
      </div>
      
    </div>

    <div class="content">
      <div class="content_head">
        <div class="content_title">{{ data.selectlabel }}</div>
        <div class="content_sum">{{ data.icondata.length }}</div>
      </div>
      <el-space wrap style="justify-content: center">
        <div
          v-for="(item, index) in pagedIconData"
          :key="index"
          class="card"
          @click="handleClick(item.name + '.svg')"
        >
          <el-image
            lazy
            class="card_img"
            :src="'https://cdn.jsdelivr.net/gh/bestruirui/RUI_ICON@icon/' + item.name + '.svg'"
          />
          <div class="card_txt" >
            {{ item.name }}
          </div>
        </div>
      </el-space>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="data.icondata.length"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="foot">
      <div class="foot_txt">© 2023.09.30 | By <a href="https://github.com/bestruirui/RUI_ICON" style="color: #5d667a;">BESTRUI</a></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import clipboard3 from "vue-clipboard3";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const { toClipboard } = clipboard3();
    const data = reactive({
      selectlabel: "全部",
      selectvalue: "",
      search: "",
      icondata: [] as any,
      publicPath: process.env.BASE_URL,
    });
    const currentPage = reactive({ value: 1 });
    const pageSize = 21;

    //加载数据
    onMounted(async () => {
      let arr = await readName();
      data.icondata = arr;
    });

    //读取图片
    function readName() {
  return new Promise((resolve, reject) => {
    fetch("https://icon-api.bestrui.top/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // 进行排序操作
        function sortprice(a, b) {
          return a.name.localeCompare(b.name);
        }
        data.sort(sortprice);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

    //搜索
    async function handleSearch() {
      let keyword = data.search;
      let tempdata = (await readName()) as any;
      let arr = [] as any;
      for (var i = 0; i < tempdata.length; i++) {
        if (tempdata[i].name.toUpperCase().indexOf(keyword.toUpperCase()) >= 0) {
          arr.push(tempdata[i]);
        }
      }
      data.icondata = arr;
      currentPage.value = 1;
    }

    //按钮
    async function handleClick(url) {
      //获取图片url
      //let currenturl = window.location.href;
      let iconurl = 'https://cdn.jsdelivr.net/gh/bestruirui/RUI_ICON@icon/'  + url;
      let fullurl =  iconurl;
      await toClipboard(fullurl);
      ElMessage({
        message: "图标链接复制成功~",
        type: "success",
      });
    }

  

    //分页
    const pagedIconData = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      const end = start + pageSize;
      return data.icondata.slice(start, end);
    });

    //当前页数改变时触发
    function handleCurrentChange(val) {
      currentPage.value = val;
    }

    return {
      data,
      handleClick,
      handleSearch,
      //图标
      Search,
      currentPage,
      pageSize,
      pagedIconData,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss">
.index {
  height: 100%;
}
.head {
  padding: 50px;
  background-color: #f5f7fc;
}

.head_title {
  font-weight: 400;
  margin-bottom: 20px;
}
.head_txt {
  color: #5d667a;
  font-weight: 400;
  margin-bottom: -10px;
}
.use {
  margin-top: 50px;
  color: #5d667a;
  display: flex;
  align-items: center;
}
.use_img {
  width: 30px;
  height: 30px;
}
.use_txt {
  font-size: 16px;
  margin-left: 10px;
  margin-right: 20px;
}
.el-divider {
  margin-left: 10px;
  margin-right: 20px;
}
// 搜索
.search {
  margin-top: 50px;
}

.search .el-input__wrapper {
  border-radius: 50px !important;
}
.select .el-input__wrapper {
  border-radius: 50px 0 0 50px !important;
}

.el-input-group__prepend {
  box-shadow: none;
}
.bt_search {
  margin-top: 50px;
  margin-left: 10px;
  color: #ffffff;
}
.bt_search:hover {
  color: #ffffff;
}

//主体
.content {
  padding: 50px;
  min-height: calc(100% - 535px);
}
.content_head {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.content_title {
  font-weight: 600;
  font-size: 18px;
  color: #1a2947;
}
.content_sum {
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 8px;
  color: #5d667a;
  background-color: #f5f7fc;
}
.card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
  border-radius: 10px;
  border: 1px solid #f5f7fc;
}
.card:hover {
  // border: 1px solid #f5f7fc;
  box-shadow: 0 8px 24px #1a29470a, 0 2px 8px #1a294714;
}
.card_img {
  width: 45px;
  height: 45px;
}
.card_txt {
  text-align: center;
  color: #afb7c7;
  margin-top: 2px;
  font-size: 13px;
  //省略号
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

//底部
.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  font-size: 13px;
  color: #5d667a;
  // position: relative;
}
.foot_txt {
  margin-right: 50px;
  font-weight: lighter;
}
.foot_url {
  position: absolute;
  right: 80px;
}
.qrcode_img {
  width: 125px;
  height: 125px;
}
.foot_img {
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin: 0 15px;
  // opacity: 0.6;
}
</style>
