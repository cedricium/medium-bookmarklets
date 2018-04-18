<template>
  <section class="section">
    <div class="container">
      <h4 class="title is-4">Domain List</h4>
      <h6 class="subtitle is-6">
        Publications on Medium that do not have the "medium.com" domain must be added
        here in order for bookmarklets to work on them.
      </h6>
      <b-field custom-class="is-small">
        <b-input disabled value="medium.com" size="is-small">
        </b-input>
        <p class="control">
          <button disabled class="button is-small is-danger">Delete</button>
        </p>
      </b-field>
      <b-field>
        <b-input disabled value="medium.freecodecamp.org" size="is-small">
        </b-input>
        <p class="control">
          <button class="button is-small is-danger">Delete</button>
        </p>
      </b-field>
      <b-field>
        <b-input disabled value="blog.sindresorhus.com" size="is-small">
        </b-input>
        <p class="control">
          <button class="button is-small is-danger">Delete</button>
        </p>
      </b-field>
      <b-field>
        <b-input disabled value="code.likeagirl.io" size="is-small">
        </b-input>
        <p class="control">
          <button class="button is-small is-danger">Delete</button>
        </p>
      </b-field>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
