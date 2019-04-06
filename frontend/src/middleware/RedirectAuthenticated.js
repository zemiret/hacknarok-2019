export default function RedirectAuthenticated(router) {
  router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token');
    if ((token) && (to.name === 'login' || to.name === 'register')) {
    }
    console.log(to)
    if(!(token) && (to.name !== 'Login' && to.name !== 'Register')) {
      router.push('/login');
      return;
    }
    next()
  })
}
