<template>
  <section class="section">
    <div class="container">
      <!-- Cards rendered here using localStorage data -->
      <h4 class="title is-4">Bookmarklets</h4>
      <nav class="panel">
        <a class="panel-block" v-for="card in cards" v-bind:key="card.title" :href="card.url">
          <span class="panel-icon">
            <figure class="image is-16x16">
              <img :src="card.image">
            </figure>
          </span>
          <span><strong>{{ card.title }}</strong> - <small><em>{{ card.author }}</em></small></span>
        </a>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      cards: [
        { "title": "Pillow of Death", "author": "Norman Gauvin", "url": "https://nytimes.com/vestibulum/ante/ipsum/primis.html", "image": "https://cdn-images-1.medium.com/fit/c/128/128/1*76XiKOa05Yya6_CdYX8pVg.jpeg" },
        { "title": "King Lear (Korol Lir)", "author": "Roanne Palumbo", "url": "http://over-blog.com/nibh/quisque/id/justo/sit/amet/sapien.json", "image": "https://cdn-static-1.medium.com/_/fp/icons/favicon-rebrand-medium.3Y6xpZ-0FSdWDnPM3hSBIA.ico" },
        { "title": "Camouflage", "author": "Barbaraanne Clayill", "url": "http://newsvine.com/in/felis/donec.js", "image": "https://cdn-images-1.medium.com/fit/c/128/128/1*FuQ4lphVCJ4_XhwsD-lL2g.png" },
        { "title": "Who Are the DeBolts? [And Where Did They Get 19 Kids?]", "author": "Josie Andrin", "url": "http://qq.com/sollicitudin.html", "image": "https://cdn-images-1.medium.com/fit/c/128/128/1*mNmxddJJTzkiBfK77mWuGA.png" },
        { "title": "Lad: A Dog", "author": "Jefferson Gauche", "url": "http://shinystat.com/nulla/facilisi/cras/non/velit/nec.xml", "image": "http://dummyimage.com/64x64.png/5fa2dd/ffffff" },
        { "title": "Clean, Shaven", "author": "Winslow Soigne", "url": "http://webs.com/libero.png", "image": "https://cdn-images-1.medium.com/fit/c/128/128/1*76XiKOa05Yya6_CdYX8pVg.jpeg" },
        { "title": "Beijing Bicycle (Shiqi sui de dan che)", "author": "Timmi Swift", "url": "http://printfriendly.com/odio/curabitur.png", "image": "https://cdn-static-1.medium.com/_/fp/icons/favicon-rebrand-medium.3Y6xpZ-0FSdWDnPM3hSBIA.ico" },
        { "title": "Guinevere", "author": "Ailis Weaben", "url": "https://booking.com/a/ipsum/integer/a/nibh/in.js", "image": "https://cdn-images-1.medium.com/fit/c/128/128/1*76XiKOa05Yya6_CdYX8pVg.jpeg" }
      ]
    }
  }
};
</script>

<style scoped>
.content p:not(:last-child) {
  margin-bottom: 0;
}
</style>
