<template>
<div class="page1" id="app">
    <h1>page1 hah</h1>
    <Test class="test1"></Test>
    <Button @click="handleClick1">btn1</Button>
    <Button @click="handleClick2">btn2</Button>
    <div class="link">
        <a href="/page2/page2A/">/page2/page2A/</a>
    </div>
    <div class="fl" style="margin-top: 20px">左浮动</div>
</div>
</template>

<script>
import Test from 'component/common/Test';
import request from 'component/util/request';
import API from 'component/api/index';
import { USER_AGE } from 'component/const/user';

export default {
    created() {
        console.log(USER_AGE);
    },

    components: {
        Test
    },

    methods: {
        handleClick1() {
            this.$Message.success('你点了我！');
        },

        handleClick2() {
            request.get(API.SEARCH_USERS, {query: 'animabear'})
                .then(res => {
                    this.$Message.success('请求成功！');
                })
                .catch(err => {
                    this.$Message.error('请求失败！');
                });
        }
    }
}
</script>

<style lang="scss">
@import 'static/style/layout.scss';
body {
    padding: 10px;
    h1 {
        font-size: 24px;
    }
    .test1 {
        margin: 20px 0;
    }
    .link {
        margin-top: 20px;
    }
    .a {
        display: flex;
    }
}
</style>
