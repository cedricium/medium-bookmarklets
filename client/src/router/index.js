import Vue from 'vue';
import Router from 'vue-router';
import CardList from '@/components/CardView';
import DomainList from '@/components/DomainList';
import HighlightColor from '@/components/HighlightColor';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: CardList
    },
    {
      path: '/domains',
      name: 'domains',
      component: DomainList
    },
    {
      path: '/colors',
      name: 'highlight-color',
      component: HighlightColor
    }
  ]
});
