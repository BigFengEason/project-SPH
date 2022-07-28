<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index">
              {{ attr.split(":")[1]}}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格排序结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne">{{searchParams.order.indexOf('desc')!=-1?'↓':'↑'}}</span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo">{{searchParams.order.indexOf('desc')!=-1?'↓':'↑'}}</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters , mapState} from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器用的，代表当前是第几页
        pageNo: 1,
        // 代表每一页展示数据的个数
        pageSize: 10,
        // 平台售卖属性参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 发请求之前整理参数，用于发给服务器
  beforeMount() {
    // 在发请求之前，把接口需要传递的参数进行整理，服务器就会返回所查询的数据
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  // 组件挂载完毕执行一次
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    // 判断order类名给谁
    isOne(){
      return this.searchParams.order.indexOf(1)!=-1;
    },
    isTwo(){
      return this.searchParams.order.indexOf(2)!=-1;
    },
    // 获取search模块展示产品一共多少数据
    ...mapState({
      total:state => state.search.searchList.total
    })
  },
  methods: {
    // 把向服务器请求获取search模块数据封装成一个函数（在需要调用时调用即可）
    async getData() {
      try {
        await this.$store.dispatch("getSearchList", this.searchParams);
      } catch (error) {
        alert(error.message)
      }
    },
    // 面包屑小×,删除分类的名字
    removeCategoryName() {
      // 把带给服务器的参数置空了，还需要向服务器发送请求
      // 而带给服务器的数据是可有可无的，如果属性值为空串还是会把相应字段带给服务器
      // 但是若把相应字段设为undefined，则当前字段不会带给服务器
      this.searchParams.categoryName = undefined;
      // 重新发请求前，应该处于初始状态
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要修改，进行路由跳转(但是若有params参数不能丢失)
      if (this.$route.params) {
        //此判断总会执行true，因为判断的是个对象
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字面包屑
    removeKeyword() {
      // 给服务器带的searchParams的keyword置空
      this.searchParams.keyword = undefined;
      // 再次发送请求(下方push操作已经被监听，会自动发请求)
      // this.getData();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      // 路径中的params参数也应该删除，所以进行路由跳转
      if(this.$route.query){
        this.$router.push({name:'search',query : this.$route.query})
      };
    },
    // 自定义事件回调（品牌面包屑，子向父传参）
    trademarkInfo(trademark){
      // 整理品牌字段的参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 发请求、
      this.getData()
    },
    // 删除品牌面包屑
    removeTradeMark(){
      // 给服务器带的searchParams的trademark置空
      this.searchParams.trademark = undefined
      // 向服务器发请求
      this.getData()
    },
    // 自定义事件回调（商品属性面包屑）
    attrInfo(attrs,attrValue){
      // 整理商品属性字段参数
      let info = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      // 数组去重
      if(this.searchParams.props.indexOf(info)==-1){
        // 压入数组
        this.searchParams.props.push(info)
      }   
      // 发请求
      this.getData()
    },
    // 删除商品属性面包屑
    removeAttr(index){
      // 从searchParams中的props删除所选中的商品属性
      this.searchParams.props.splice(index,1)
      // 发请求
      this.getData()
    },
    // 排序操作
    changeOrder(flag){
      // flag形参：代表用户点击的是综合1还是价格2
      // 获取初始状态
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
      // 若排序类别没变，则改变排序方式
      if(flag == originFlag){
        if(originSort == 'desc'){
          this.searchParams.order = `${flag}:asc`
        }else{
          this.searchParams.order = `${flag}:desc`
        }
      }else{
        // 若排序类别变了，则改变排序类别，并将排序方式改为降序
        if(originFlag == 1){
          this.searchParams.order = '2:desc'
        }else{
          this.searchParams.order = '1:desc'
        }
      }
      // 重新发请求
      this.getData()
    },
    // 自定义事件回调（获取当前第几页）
    getPageNo(pageNo){
      // 修改向服务器发送的参数
      this.searchParams.pageNo = pageNo
      // 发请求
      this.getData()
    }
  },
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，则重新发请求获取信息
    $route(newValue, oldValue) {
      // 每一次请求前，应该把上次的1、2、3级分类的id置空，让他接受下一次的1/2/3id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // 再次整理数据给服务器发请求
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

    }
  }
}
</style>