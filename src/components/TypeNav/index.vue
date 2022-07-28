<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <!-- 事件的委派 -->
        <div @mouseleave="leaveIndex" @mouseenter="enterIndex">
          <h2 class="all">全部商品分类</h2>
          <!-- 三级联动 -->
          <!-- 过渡动画 -->
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  :class="{ cur: index == currentIndex }"
                >
                  <h3 @mouseenter="changeIndex(index)">
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <!-- 二级、三级分类 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入了lodash的全部功能函数
// 按需引入，只引入lodash的节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: false, //控制一级分类的显示与隐藏
    };
  },

  mounted() {
    if (this.$route.path == "/home") {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标移入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，可能出现上下文this指向问题
    changeIndex: throttle(function (index) {
      // index鼠标移到某一级分类元素的索引值
      // 正常情况（用户慢慢的操作）：鼠标进入每一个h3，都会触发鼠标移入事件
      // 非正常情况（用户操作非常快）：本应该触发所有h3的鼠标移入事件，但测试后发现只有一部分触发
      // 即用户操作过快，浏览器反应不过来。如果回调函数中有复杂业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 40),

    // 一级分类鼠标移出事件回调
    leaveIndex() {
      // 鼠标移出，currentIndex变为-1
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        //Search组件中鼠标移出，typeNav组件隐藏
        this.show = false;
      }
    },

    // 在Search组件中鼠标移入显示typeNav组件
    enterIndex() {
      if (this.$route.path != "/home") {
        //Search组件中鼠标移入展示typeNav
        this.show = true;
      }
    },

    // 点击三级联动元素进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航 + 事件的委派
      // 事件委派存在的一些问题：1确定点击的一定是a标签？2如何获取参数（判断是几级分类）？【产品名称、ID】

      // 第一个问题：把a标签加上一个自定义属性data-categotyName,其余子节点是没有的
      // 第二个问题: 为每级分类添加自定义属性data-category几Id
      let element = event.target;
      // 获取到触发该事件的节点对象，如果有data-categoryname属性的节点，一定是a标签（浏览器会自动将属性的驼峰命名转小写）
      // 节点对象有一个属性dataset，可以获取节点的自定义属性与属性值(自定义属性必须是data-xxxx格式才能获取到)
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签上拥有categoryname属性则一定是a标签
      if (categoryname) {
        // 整理跳转路由的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 整理一级、二级、三级分类的a标签的ID
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          //this.$route上原本就有query、params属性，初始值均为空对象.所以此if一定为真
          // 整理参数
          location.params = this.$route.params;
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始的状态(进入)
    .sort-enter {
      height: 0px;
    }
    // 过渡动画的结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、频率
    .sort-enter-active {
      transition: all 0.3s linear;
      overflow: hidden;
    }
  }
}
</style>