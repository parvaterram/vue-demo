<template>
  <div>
    <myHeader></myHeader>
    <h2>{{dat.title}}</h2>
    <p>作者：{{dat.author.loginname}}    发表于：{{$utils.formatTime(dat.create_at)}}</p>
    <article v-html="dat.content"></article>
    <h3>网友回复：</h3>
    <ul>
      <li v-for="i in dat.replies">
        <p>评论者：{{i.author.loginname}}　　评论于：{{$utils.formatTime(i.create_at)}}</p>
        <article v-html="i.content"></article>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>
<script>
  import myHeader from '../components/header.vue'
  import myFooter from '../components/footer.vue'
  export default {
    components: {
      myHeader, myFooter
    },
    data () {
      return {
        id: this.$route.params.id,
        dat: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('topic/' + this.id, null, res => {
          this.dat = res.data
        })
      }
    }
  }
</script>
